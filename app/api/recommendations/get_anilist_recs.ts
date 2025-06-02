import axios from 'axios';

const ANILIST_API_URL = 'https://graphql.anilist.co';

interface Anime {
    id: number;
    title: string;
    type: string;
    episodes: number;
    status: string;
    score: number;
    genres: string[];
    synopsis: string;
    coverImage: string;
    bannerImage: string;
    recommendationReason: string;
    trailerUrl: string;
}

interface Recommendation {
    id: number;
    title: string;
    type: string;
    episodes: number;
    status: string;
    score: number;
    genres: string[];
    synopsis: string;
    coverImage: string;
    bannerImage: string;
    trailerUrl: string;
    count: number;
}

async function fetchViewerName(accessToken: string): Promise<string | null> {
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

async function fetchUserCompletedAnime(token: string, userName: string, sort: 'UPDATED_TIME_DESC' | 'SCORE_DESC'): Promise<number[]> {
    const query = `
    query ($userName: String, $sort: [MediaListSort], $status: MediaListStatus) {
      MediaListCollection(userName: $userName, type: ANIME, status: $status, sort: $sort) {
        lists {
          entries {
            media {
              id
            }
          }
        }
      }
    }
  `;

    const variables = {
        userName,
        sort: [sort],
        status: 'COMPLETED',
    };

    try {
        const response = await axios.post(
            ANILIST_API_URL,
            { query, variables },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const entries = response.data.data.MediaListCollection.lists.flatMap((list: any) => list.entries);
        const mediaIds = entries.slice(0, 5).map((entry: any) => entry.media.id);
        return mediaIds;
    } catch (error) {
        if (typeof error === 'object' && error !== null && 'response' in error) {
            // Server responded with a status outside the 2xx range
            const err = error as any;
            console.error("AniList Error Response:");
            console.error("Status:", err.response.status);
            console.error("Status Text:", err.response.statusText);
            console.error("Headers:", err.response.headers);
            console.error("Data:", JSON.stringify(err.response.data, null, 2)); // <-- This shows what AniList actually says
        } else if (typeof error === 'object' && error !== null && 'request' in error) {
            // Request was made but no response
            const err = error as any;
            console.error("No response received:", err.request);
        } else if (error instanceof Error) {
            // Something else triggered the error
            console.error("Error setting up request:", error.message);
        } else {
            console.error("Unknown error occurred:", error);
        }

        return [];
    }
}

async function fetchBatchRecommendations(token: string, animeIds: number[]): Promise<Recommendation[]> {
    const query = `
    query ($ids: [Int]) {
      Page(perPage: 50) {
        media(id_in: $ids, type: ANIME) {
          id
          recommendations(sort: RATING_DESC, perPage: 10) {
            nodes {
              mediaRecommendation {
                id
                title {
                  romaji
                }
                format
                episodes
                status
                meanScore
                genres
                description
                coverImage {
                  medium
                  large
                  extraLarge
                }
                bannerImage
                trailer {
                  site
                  id
                }
              }
            }
          }
        }
      }
    }
    `;

    const variables = { ids: animeIds };

    try {
        const response = await axios.post(
            ANILIST_API_URL,
            { query, variables },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const mediaList = response.data.data.Page.media;
        const allRecs: Recommendation[] = [];

        for (const media of mediaList) {
            const nodes = media.recommendations?.nodes ?? [];
            for (const node of nodes) {
                const rec = node.mediaRecommendation;
                if (rec) {
                    allRecs.push({
                        id: rec.id,
                        title: rec.title.romaji,
                        type: rec.type,
                        episodes: rec.episodes,
                        status: rec.status,
                        score: rec.meanScore,
                        genres: rec.genres,
                        synopsis: rec.description,
                        coverImage: rec.coverImage.extraLarge || rec.coverImage.large,
                        bannerImage: rec.bannerImage,
                        trailerUrl: rec.trailer ? `https://www.youtube.com/watch?v=${rec.trailer.id}` : '',
                        count: 1,
                    });
                }
            }
        }

        return allRecs;
    } catch (error) {
        console.error("Failed to fetch batch recommendations", error);
        return [];
    }
}

function aggregateRecommendations(recommendationsList: Recommendation[][]): Recommendation[] {
    const recommendationMap: { [id: number]: Recommendation } = {};

    for (const recommendations of recommendationsList) {
        for (const rec of recommendations) {
            if (recommendationMap[rec.id]) {
                recommendationMap[rec.id].count += 1;
            } else {
                recommendationMap[rec.id] = { ...rec };
            }
        }
    }

    const aggregated = Object.values(recommendationMap);
    aggregated.sort((a, b) => b.count - a.count);
    return aggregated;
}

export const getALRecommendations = async (accessToken: string) => {
    console.log("This is access token typeshit", accessToken);

    const userName = await fetchViewerName(accessToken);
    if (!userName) throw new Error('Failed to fetch username');

    const recentAnimeIds = await fetchUserCompletedAnime(accessToken, userName, 'UPDATED_TIME_DESC');
    console.log('Recent Anime IDs:', recentAnimeIds);
    // sleep for 0.5 seconds
    await new Promise((resolve) => setTimeout(resolve, 500));
    const topRatedAnimeIds = await fetchUserCompletedAnime(accessToken, userName, 'SCORE_DESC');
    console.log('Top Rated Anime IDs:', topRatedAnimeIds);

    const recentRecs = await fetchBatchRecommendations(accessToken, recentAnimeIds);
    const topRatedRecs = await fetchBatchRecommendations(accessToken, topRatedAnimeIds);

    return {
        recent: aggregateRecommendations([recentRecs]),
        topRated: aggregateRecommendations([topRatedRecs]),
    };
};