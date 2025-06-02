"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Star, Clock, Calendar, Heart, Play, Share2, Bookmark } from "lucide-react"
import { motion } from "framer-motion"
import TrailerModal from "@/components/trailer-modal"
import type { Anime } from "@/types/anime"

export default function AnimePage() {
  const params = useParams()
  const router = useRouter()
  const [anime, setAnime] = useState<Anime | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [trailerOpen, setTrailerOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      setIsLoading(true)
      try {
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
                  
                  <Button 
                    variant="outline" 
                    className={`border-2 rounded-full px-4 py-3 transition-all hover:scale-105 ${
                      isLiked 
                        ? 'bg-pink-600 border-pink-600 text-white' 
                        : 'border-white/30 text-white hover:bg-white/10'
                    }`}
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className={`border-2 rounded-full px-4 py-3 transition-all hover:scale-105 ${
                      isBookmarked 
                        ? 'bg-blue-600 border-blue-600 text-white' 
                        : 'border-white/30 text-white hover:bg-white/10'
                    }`}
                    onClick={() => setIsBookmarked(!isBookmarked)}
                  >
                    <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="border-2 border-white/30 text-white hover:bg-white/10 rounded-full px-4 py-3 transition-all hover:scale-105"
                  >
                    <Share2 className="h-5 w-5" />
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