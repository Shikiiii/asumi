import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, Heart, X, RotateCcw, Info, Share2, ExternalLink } from "lucide-react"
import type { Anime } from "@/types/anime"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface AnimeCardProps {
  anime: Anime
  onSwipe?: (direction: 'left' | 'right') => void
  onRewind?: () => void
  onInfo?: () => void
  onShare?: () => void
  showButtons?: boolean
}

export default function AnimeCard({ anime, onSwipe, onRewind, onInfo, onShare, showButtons = true }: AnimeCardProps) {
  const [showInfo, setShowInfo] = useState(false)
  const router = useRouter()

  const handleInfoClick = () => {
    setShowInfo(!showInfo)
    onInfo?.()
  }

    const handleDetailsClick = () => {
    router.push(`/anime/${anime.id}`)
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Main Card - Taller and more mobile friendly */}
      <Card className="relative overflow-hidden bg-white border-0 shadow-2xl rounded-3xl">
        <div className="relative h-[70vh] min-h-[500px]">
          <img
            src={anime.coverImage || "/placeholder.svg?height=600&width=400"}
            alt={anime.title}
            className="w-full h-full object-cover"
          />
          
          {/* Gradient overlay - stronger for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          
          {/* Top info bar */}
          <div className="absolute top-6 left-6 right-6">
            <div className="flex justify-between items-start">
              <Badge className="bg-pink-500/90 text-white border-0 font-medium backdrop-blur-sm">
                {anime.type}
              </Badge>
              {anime.score && (
                <div className="flex items-center bg-black/60 backdrop-blur-sm rounded-full px-3 py-1.5">
                  <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                  <span className="text-yellow-400 text-sm font-semibold">{anime.score}</span>
                </div>
              )}
            </div>
          </div>

          {/* Bottom info section - Tinder style */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="space-y-4">
              {/* Title and basic info */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-2 leading-tight">
                  {anime.title}
                </h2>
                
                <div className="flex items-center gap-4 text-white/90 text-sm">
                  {anime.episodes && (
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {anime.episodes} episodes
                    </div>
                  )}
                </div>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2">
                {anime.genres?.slice(0, 3).map((genre, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="text-xs text-white border-white/40 bg-white/15 backdrop-blur-sm"
                  >
                    {genre}
                  </Badge>
                ))}
              </div>

              {/* Synopsis preview */}
              <div className="space-y-3">
                {anime.synopsis && (
                  <p className="text-white/80 text-sm line-clamp-2 leading-relaxed">
                    {anime.synopsis}
                  </p>
                )}

                {anime.recommendationReason && (
                  <div className="p-3 bg-gradient-to-r from-purple-500/25 to-pink-500/25 rounded-lg border border-white/20 backdrop-blur-sm">
                    <p className="text-white/95 text-sm">
                      <span className="font-medium text-pink-300">Why you'll love it: </span>
                      <span className="italic">{anime.recommendationReason}</span>
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* Expandable detailed info */}
        {showInfo && (
  <div className="absolute inset-0 bg-black/95 backdrop-blur-sm p-6 flex flex-col animate-in slide-in-from-bottom duration-300 z-20">
    <div className="flex-1 overflow-y-auto space-y-4">
      {/* Header */}
      <div className="text-center border-b border-white/20 pb-4">
        <h3 className="text-xl font-bold text-white mb-2">{anime.title}</h3>
        <div className="flex justify-center items-center gap-3">
          <Badge className="bg-pink-500">{anime.type}</Badge>
          {anime.score && (
            <div className="flex items-center text-yellow-400">
              <Star className="h-4 w-4 mr-1 fill-current" />
              <span className="font-semibold">{anime.score}</span>
            </div>
          )}
          {anime.episodes && (
            <div className="flex items-center text-white/70">
              <Clock className="h-4 w-4 mr-1" />
              <span className="text-sm">{anime.episodes} eps</span>
            </div>
          )}
        </div>
      </div>

      {/* Genres */}
      {anime.genres && anime.genres.length > 0 && (
        <div>
          <h4 className="text-pink-300 font-medium mb-2 text-sm">Genres</h4>
          <div className="flex flex-wrap gap-2">
            {anime.genres.map((genre, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-xs text-white border-white/30 bg-white/10"
              >
                {genre}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Synopsis - Truncated with show more */}
      {anime.synopsis && (
        <div>
          <h4 className="text-pink-300 font-medium mb-2 text-sm">Synopsis</h4>
          <p className="text-white/80 text-sm leading-relaxed line-clamp-7">
            {anime.synopsis.length > 300 
              ? `${anime.synopsis.substring(0, 300)}...` 
              : anime.synopsis
            }
          </p>
        </div>
      )}

      {/* Recommendation reason - More prominent */}
      {anime.recommendationReason && (
        <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-400/30">
          <div className="flex items-center mb-2">
            <Heart className="h-4 w-4 text-pink-400 mr-2" />
            <h4 className="text-pink-300 font-medium text-sm">Why you'll love it</h4>
          </div>
          <p className="text-white/95 text-sm">
            {anime.recommendationReason}
          </p>
        </div>
      )}
    </div>

    {/* Fixed bottom buttons */}
    <div className="flex-shrink-0 pt-4 border-t border-white/20">
      <div className="flex gap-3">
        <button 
          onClick={handleDetailsClick}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all hover:scale-[1.02] shadow-lg"
        >
          <ExternalLink className="h-4 w-4" />
          Full Details
        </button>
        
        <button 
          onClick={handleInfoClick}
          className="px-6 py-3 bg-white/15 backdrop-blur-sm rounded-xl text-white hover:bg-white/25 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
      </Card>

      {/* Action buttons - only show when not swiping */}
      <div className={`flex justify-center items-center gap-3 mt-6 ${showButtons ? 'visible' : 'invisible'}`}>
        <button 
          onClick={onRewind}
          disabled={!onRewind}
          className={`p-2.5 rounded-full shadow-lg transition-all ${
            onRewind 
              ? "bg-yellow-500 hover:bg-yellow-600 hover:scale-110 active:scale-95" 
              : "bg-gray-400 cursor-not-allowed opacity-50"
          }`}
        >
          <RotateCcw className="h-5 w-5 text-white" />
        </button>

        <button 
          onClick={() => onSwipe?.('left')}
          className="p-3.5 bg-red-500 hover:bg-red-600 rounded-full shadow-lg transition-all hover:scale-110 active:scale-95"
        >
          <X className="h-6 w-6 text-white" />
        </button>

        <button 
          onClick={handleInfoClick}
          className={`p-2.5 rounded-full shadow-lg transition-all hover:scale-110 active:scale-95 ${
            showInfo ? 'bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          <Info className="h-5 w-5 text-white" />
        </button>

        <button 
          onClick={() => onSwipe?.('right')}
          className="p-3.5 bg-green-500 hover:bg-green-600 rounded-full shadow-lg transition-all hover:scale-110 active:scale-95"
        >
          <Heart className="h-6 w-6 text-white" />
        </button>

        <button 
          onClick={onShare}
          className="p-2.5 bg-purple-500 hover:bg-purple-600 rounded-full shadow-lg transition-all hover:scale-110 active:scale-95"
        >
          <Share2 className="h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  )
}