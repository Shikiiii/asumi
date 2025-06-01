"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Star, Clock, Calendar, Heart, Play } from "lucide-react"
import TrailerModal from "@/components/trailer-modal"
import type { Anime } from "@/types/anime"

export default function AnimePage() {
  const params = useParams()
  const router = useRouter()
  const [anime, setAnime] = useState<Anime | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [trailerOpen, setTrailerOpen] = useState(false)

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would fetch from the API
        // For now, we'll use mock data
        const mockAnime: Anime = {
          id: params.id as string,
          title: "Fullmetal Alchemist: Brotherhood",
          type: "TV",
          episodes: 64,
          status: "Finished Airing",
          score: 9.1,
          genres: ["Action", "Adventure", "Drama", "Fantasy"],
          synopsis:
            "After a horrific alchemy experiment goes wrong in the Elric household, brothers Edward and Alphonse are left in a catastrophic new reality. Ignoring the alchemical principle banning human transmutation, the boys attempted to bring their recently deceased mother back to life. Instead, they suffered brutal personal loss: Alphonse's body disintegrated while Edward lost a leg and then sacrificed an arm to keep Alphonse's soul in the physical realm by binding it to a hulking suit of armor.",
          coverImage: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx143200-42OaDCS6VEy3.png",
          bannerImage: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/5114-q0V5URebphSG.jpg",
          recommendationReason: "Based on your high ratings for action and fantasy anime",
          trailerUrl: "https://www.youtube.com/watch?v=--IcmZkvL0Q",
        }
        setAnime(mockAnime)
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-900 via-purple-800 to-indigo-900">
        <div className="text-white text-xl">Loading anime details...</div>
      </div>
    )
  }

  if (!anime) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center black p-4">
        <div className="text-white text-xl mb-4">Anime not found</div>
        <Button onClick={() => router.push("/swipe")}>Back to Recommendations</Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Banner image */}
      {anime.bannerImage && (
        <div className="absolute top-0 left-0 right-0 h-48 md:h-64 overflow-hidden z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/70 to-indigo-900"></div>
          <img
            src={anime.bannerImage || "/placeholder.svg"}
            alt={`${anime.title} banner`}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="container mx-auto max-w-4xl py-8 relative z-10">
        <Button variant="ghost" className="text-black mb-6 bg-white hover:bg-gray-300" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <div className="grid md:grid-cols-[300px_1fr] gap-6">
          <div>
            <Card className="overflow-hidden bg-black/40 backdrop-blur-md border-white/10 max-w-[150px] sm:max-w-[200px] md:max-w-[300px]">
              <img
                src={anime.coverImage || "/placeholder.svg?height=450&width=300"}
                alt={anime.title}
                className="w-full aspect-[2/3] object-cover"
              />
            </Card>

            <div className="mt-4 flex flex-col gap-3">
              {anime.trailerUrl && (
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white" onClick={() => setTrailerOpen(true)}>
                  <Play className="mr-2 h-4 w-4" /> Watch Trailer
                </Button>
              )}
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{anime.title}</h1>

            <div className="flex flex-wrap gap-2 mb-4">
              {anime.genres?.map((genre, index) => (
                <Badge key={index} className="bg-purple-700 hover:bg-purple-800">
                  {genre}
                </Badge>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-black/30 p-3 rounded-lg flex flex-col items-center">
                <Star className="h-5 w-5 text-yellow-400 mb-1" />
                <div className="text-lg font-bold text-white">{anime.score}</div>
                <div className="text-xs text-white/60">Score</div>
              </div>

              <div className="bg-black/30 p-3 rounded-lg flex flex-col items-center">
                <Clock className="h-5 w-5 text-blue-400 mb-1" />
                <div className="text-lg font-bold text-white">{anime.episodes}</div>
                <div className="text-xs text-white/60">Episodes</div>
              </div>

              <div className="bg-black/30 p-3 rounded-lg flex flex-col items-center">
                <Calendar className="h-5 w-5 text-green-400 mb-1" />
                <div className="text-lg font-bold text-white">{anime.status}</div>
                <div className="text-xs text-white/60">Status</div>
              </div>
            </div>

            <Card className="bg-black/40 backdrop-blur-md border-white/10">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-white mb-3">Synopsis</h2>
                <p className="text-white/80 leading-relaxed">{anime.synopsis}</p>

                {anime.recommendationReason && (
                  <div className="mt-6 p-4 bg-purple-900/50 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-2">Why we recommended this</h3>
                    <p className="text-white/80 italic">{anime.recommendationReason}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {anime.trailerUrl && (
        <TrailerModal trailerUrl={anime.trailerUrl} isOpen={trailerOpen} onClose={() => setTrailerOpen(false)} />
      )}
    </div>
  )
}
