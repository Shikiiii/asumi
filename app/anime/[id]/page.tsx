"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Star, Clock, Calendar, Heart, Play, Share2, Bookmark, CheckCircle, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import TrailerModal from "@/components/trailer-modal"
import type { Anime } from "@/types/anime"

// Helper to clean HTML tags from synopsis
function cleanSynopsis(s: string): string {
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
function formatScore(score: number | null): number | undefined {
  if (score === null) return undefined;
  if (score > 10) return Math.round(score) / 10;
  return score;
}


export default function AnimePage() {
  const params = useParams()
  const router = useRouter()
  const [anime, setAnime] = useState<Anime | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [trailerOpen, setTrailerOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [userData, setUserData] = useState<any>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      setIsLoading(true)
      try {
        const session = localStorage.getItem("animeswipe_session")
        const parsedSession = JSON.parse(session || '{}');
        let tempUserData: any = null;
        setUserData({
          provider: parsedSession.provider || "",
          access_token: parsedSession.access_token || "",
          refresh_token: parsedSession.refresh_token || null,
        });
        tempUserData = {provider: parsedSession.provider || "", access_token: parsedSession.access_token || "", refresh_token: parsedSession.refresh_token || ""};


        
        if (tempUserData.provider === "mal") {
            // Fetch anime info from Anilist using MyAnimeList ID (params.id)
            const query = `
              query ($idMal: Int) {
                Media(idMal: $idMal, type: ANIME) {
                  id
                  idMal
                  title {
                    romaji
                    english
                    native
                  }
                  type
                  episodes
                  status
                  averageScore
                  genres
                  description(asHtml: false)
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
            `;

            const variables = { idMal: Number(params.id) };
            const response = await fetch("https://graphql.anilist.co", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ query, variables }),
            });
            const { data } = await response.json();
            if (data && data.Media) {
              const media = data.Media;
              setAnime({
                id: String(media.idMal || media.id),
                title: media.title.english || media.title.romaji || media.title.native,
                type: formatType(media.type),
                episodes: media.episodes,
                status: formatStatus(media.status?.replace("_", " ")) || "",
                score: formatScore(media.averageScore ? media.averageScore / 10 : null),
                genres: media.genres,
                synopsis: cleanSynopsis(media.description?.replace(/<[^>]+>/g, "")) || "",
                coverImage: media.coverImage?.large || "",
                bannerImage: media.bannerImage || "",
                recommendationReason: undefined,
                trailerUrl:
                media.trailer && media.trailer.site === "youtube"
                  ? `https://www.youtube.com/watch?v=${media.trailer.id}`
                  : undefined,
              });
            } else {
              setAnime(null);
            }

        } else if (tempUserData.provider === "anilist") {
            const query = `
              query ($id: Int) {
                Media(id: $id, type: ANIME) {
                  id
                  idMal
                  title {
                    romaji
                    english
                    native
                  }
                  type
                  episodes
                  status
                  averageScore
                  genres
                  description(asHtml: false)
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
            `;

            const variables = { id: Number(params.id) };
            const response = await fetch("https://graphql.anilist.co", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ query, variables }),
            });
            const { data } = await response.json();
            if (data && data.Media) {
              const media = data.Media;
              setAnime({
                id: String(media.id),
                title: media.title.english || media.title.romaji || media.title.native,
                type: formatType(media.type),
                episodes: media.episodes,
                status: formatStatus(media.status?.replace("_", " ")) || "",
                score: formatScore(media.averageScore ? media.averageScore / 10 : null),
                genres: media.genres,
                synopsis: cleanSynopsis(media.description?.replace(/<[^>]+>/g, "")) || "",
                coverImage: media.coverImage?.large || "",
                bannerImage: media.bannerImage || "",
                recommendationReason: undefined,
                trailerUrl:
                media.trailer && media.trailer.site === "youtube"
                  ? `https://www.youtube.com/watch?v=${media.trailer.id}`
                  : undefined,
              });
            } else {
              setAnime(null);
            }

        }

      } catch (error) {
        console.error("Error fetching anime details:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnimeDetails()
  }, [params.id])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <motion.div 
          className="text-white text-xl"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Loading anime details...
        </motion.div>
      </div>
    )
  }

  if (!anime) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black p-4">
        <div className="text-white text-xl mb-4">Anime not found</div>
        <Button onClick={() => router.push("/swipe")}>Back to Recommendations</Button>
      </div>
    )
  }

  // Function to handle sharing the current page URL
  function handleShare() {
    if (typeof window !== "undefined" && window.location) {
      navigator.clipboard.writeText(window.location.href);

      setCopiedText("Copied!");

      setTimeout(() => {
        setCopiedText(null);
      }, 2000);
    }
  }

  function handleAniListLink() {
    if (!anime || !userData?.provider) return; // Add null checks
    
    if (userData.provider === "mal") {
      // For MAL users, we need to use the AniList ID from the fetched data
      window.open(`https://anilist.co/anime/${anime.id}`, '_blank');
    } else if (userData.provider === "anilist") {
      // For AniList users, use the current ID
      window.open(`https://anilist.co/anime/${params.id}`, '_blank');
    }
  }


  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Banner */}
      <div className="relative h-[60vh] overflow-hidden">
        {anime.bannerImage && (
          <img
            src={anime.bannerImage}
            alt={`${anime.title} banner`}
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/40" />
        
        {/* Back button */}
        <motion.div 
          className="absolute top-6 left-6 z-20"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button 
            variant="ghost" 
            className="bg-black/50 backdrop-blur-md text-white hover:bg-black/70 border border-white/20"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </motion.div>

        {/* Main content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-[300px_1fr] gap-8 items-end">
              {/* Cover Image */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex justify-center md:justify-start"
              >
                <div className="relative group">
                  <img
                    src={anime.coverImage}
                    alt={anime.title}
                    className="w-64 md:w-72 aspect-[2/3] object-cover rounded-2xl shadow-2xl border-4 border-white/20"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>

              {/* Title and Info */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center md:text-left"
              >
                <h1 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {anime.title}
                </h1>
                
                {/* Genres */}
                <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
                  {anime.genres?.map((genre, index) => (
                    <Badge 
                      key={index} 
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 px-3 py-1 text-sm font-medium"
                    >
                      {genre}
                    </Badge>
                  ))}
                </div>

                {/* Quick Stats */}
                <div className="flex items-center gap-6 mb-6 justify-center md:justify-start">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="text-2xl font-bold">{anime.score}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-400" />
                    <span className="text-lg">{anime.episodes} episodes</span>
                  </div>
                  <Badge className="bg-green-600/80 text-white border-0">
                    {anime.status}
                  </Badge>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 justify-center md:justify-start">
                  {anime.trailerUrl && (
                    <Button 
                      className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
                      onClick={() => setTrailerOpen(true)}
                    >
                      <Play className="mr-2 h-5 w-5" /> Watch Trailer
                    </Button>
                  )}
                  
                  {/* Juicy Share Button */}
                  <Button 
                    variant="outline" 
                    className={`border-2 transition-all duration-300 rounded-full px-4 py-3 ${
                      copiedText 
                        ? "border-green-400 bg-green-400/20 text-green-400 scale-110" 
                        : "border-white/30 text-white hover:bg-white/10 hover:scale-105"
                    }`}
                    onClick={handleShare}
                  >
                    {copiedText ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">{copiedText}</span>
                      </motion.div>
                    ) : (
                      <Share2 className="h-5 w-5" />
                    )}
                  </Button>

                  {/* AniList Button */}
                  <Button 
                    variant="outline" 
                    className="border-2 border-blue-400/30 text-blue-400 hover:bg-blue-400/10 hover:border-blue-400 rounded-full px-4 py-3 transition-all hover:scale-105"
                    onClick={handleAniListLink}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    <span className="font-medium">AniList</span>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto max-w-4xl px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Synopsis
              </h2>
              <p className="text-gray-300 leading-relaxed text-lg mb-8">
                {anime.synopsis}
              </p>

              {anime.recommendationReason && (
                <div className="p-6 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-2xl border border-purple-500/20">
                  <h3 className="text-xl font-semibold mb-3 text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                    💡 Why we recommended this
                  </h3>
                  <p className="text-gray-300 italic text-lg">
                    {anime.recommendationReason}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Trailer Modal */}
      {anime.trailerUrl && (
        <TrailerModal 
          trailerUrl={anime.trailerUrl} 
          isOpen={trailerOpen} 
          onClose={() => setTrailerOpen(false)}
          animeTitle={anime.title} // Add this
        />
      )}
    </div>
  )
}