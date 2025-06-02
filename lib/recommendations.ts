import type { Anime } from "@/types/anime"
import axios from "axios";

const ANILIST_API_URL = "https://graphql.anilist.co";

async function filterOutAlreadyWatched(
  token: string | undefined,
  userName: string | null,
  animeIds: number[]
): Promise<number[]> {
  const query = `
    query ($userName: String, $ids: [Int]) {
      MediaListCollection(userName: $userName, type: ANIME) {
        lists {
          entries {
            mediaId
          }
        }
      }
    }`;

  try {
    const response = await axios.post(
      ANILIST_API_URL,
      { query, variables: { userName, ids: animeIds } },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const lists = response.data.data.MediaListCollection?.lists ?? [];
    const seenIds = new Set<number>();

    for (const list of lists) {
      for (const entry of list.entries) {
        seenIds.add(entry.mediaId);
      }
    }

    // Filter out any ID that already exists in the user's list
    return animeIds.filter(id => !seenIds.has(id));
  } catch (error) {
    console.error("Failed to filter out watched anime:", error);
    return animeIds; // fallback to returning all if the query fails
  }
}

async function fetchViewerName(accessToken: string | undefined): Promise<string | null> {
  const query = `
    query {
      Viewer {
        name
      }
    }
  `;

  try {
    const response = await axios.post(
      ANILIST_API_URL,
      { query },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log("Response from fetching name:", response.status);

    return response.data.data.Viewer.name;
  } catch (error) {
    console.error('Failed to fetch viewer name:', error);
    return null;
  }
}

export async function getRecommendations(provider?: string, access_token?: string, refresh_token?: string | null): Promise<Anime[]> {
  if (provider === "mal") {
    // Fetch recommendations from MAL API
    const response = await fetch("/api/recommendations/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        provider,
        accessToken: access_token,
        refreshToken: refresh_token,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch recommendations from MAL API");
    }

    const data = await response.json();
    console.log("MAL Recommendations Data:", data);

    // Helper to clean HTML tags and entities from synopsis
    function cleanSynopsis(s: string): string {
      if (!s) return "";
      return s.replace(/<[^>]*>/g, '').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim();
    }

    // Helper to format status
    function formatStatus(status: string): string {
      switch (status?.toLowerCase()) {
        case "finished_airing":
        case "finished":
          return "Finished Airing";
        case "currently_airing":
        case "airing":
        case "ongoing":
          return "Ongoing";
        case "not_yet_aired":
        case "not_yet_released":
          return "Not Yet Released";
        case "cancelled":
          return "Cancelled";
        default:
          return status ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase() : "";
      }
    }

    // Helper to format type
    function formatType(type: string | undefined): string {
      if (!type) return "TV";
      switch (type.toLowerCase()) {
        case "tv":
          return "TV";
        case "movie":
          return "Movie";
        case "ova":
          return "OVA";
        case "special":
          return "Special";
        case "ona":
          return "ONA";
        default:
          return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
      }
    }

    // Helper to format score
    function formatScore(score: number): number {
      if (!score) return 0;
      return Math.round(score * 10) / 10;
    }

    // Map MAL recommendations to Anime[]
    const recommendations: Anime[] = (data.recommendations || []).map((item: any) => ({
      id: String(item.id),
      title: item.title,
      type: formatType(item.type),
      episodes: item.num_episodes,
      status: formatStatus(item.status),
      score: formatScore(item.mean),
      genres: Array.isArray(item.genres) ? item.genres.map((g: any) => g.name) : [],
      synopsis: cleanSynopsis(item.synopsis),
      coverImage: item.banner?.large?.url || item.banner?.medium?.url || "",
      bannerImage: "", // MAL doesn't provide a separate banner image
      recommendationReason: "Recommended based on your MAL profile",
      trailerUrl: "", // MAL doesn't provide trailer URLs
    }));

    return recommendations;

  } else if (provider === "anilist") {
    // Fetch recommendations from Anilist API
    const response = await fetch("/api/recommendations/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        provider,
        accessToken: access_token,
        refreshToken: refresh_token,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch recommendations from Anilist API");
    }

    const data = await response.json();
    console.log("AniList Recommendations Data:", data);

    // Helper to clean HTML tags from synopsis
    function cleanSynopsis(s: string): string {
      if (s === null) return '';
      return s.replace(/<[^>]*>/g, '').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim();
    }

    // Helper to format status
    function formatStatus(status: string): string {
      switch (status.toUpperCase()) {
        case "FINISHED":
        case "FINISHED_AIRING":
          return "Finished Airing";
        case "RELEASING":
        case "ONGOING":
          return "Ongoing";
        case "NOT_YET_RELEASED":
          return "Not Yet Released";
        case "CANCELLED":
          return "Cancelled";
        default:
          // Capitalize first letter, lowercase the rest
          return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
      }
    }

    // Helper to format type
    function formatType(type: string | undefined): string {
      if (!type) return "TV";
      return type.replace(/_/g, " ");
    }

    // Helper to format score
    function formatScore(score: number): number {
      if (score > 10) return Math.round(score) / 10;
      return score;
    }

    // Merge recent and topRated, remove duplicates by id, and map to Anime[]
    const merged: any[] = [...(data.recent || []), ...(data.topRated || [])];
    console.log("Merged", merged);

    const animeIds = Array.from(new Set(merged.map(item => item.id)));

    const userName = await fetchViewerName(access_token);
    const filteredOutAnimeIds = await filterOutAlreadyWatched(access_token, userName, animeIds);

    // now use the filtered out anime ids to remove the ones that are no longer in the list via the merged array
    const filteredMerged = merged.filter(item => filteredOutAnimeIds.includes(item.id));

    const seen = new Set();
    const recommendations: Anime[] = filteredMerged
      .filter(item => {
        if (seen.has(item.id)) return false;
        seen.add(item.id);
        return true;
      })
      .map(item => ({
        id: String(item.id),
        title: item.title,
        type: formatType(item.type),
        episodes: item.episodes,
        status: formatStatus(item.status),
        score: formatScore(item.score),
        genres: item.genres,
        synopsis: cleanSynopsis(item.synopsis),
        coverImage: item.coverImage,
        bannerImage: item.bannerImage,
        recommendationReason: "Recommended based on your AniList profile",
        trailerUrl: item.trailerUrl,
      }));

    return recommendations;
  }

  else {
    return [];
  }
}
