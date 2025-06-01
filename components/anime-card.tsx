import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Clock } from "lucide-react"
import type { Anime } from "@/types/anime"

interface AnimeCardProps {
  anime: Anime
}

export default function AnimeCard({ anime }: AnimeCardProps) {
  return (
    <Card className="overflow-hidden bg-black/40 backdrop-blur-md border-white/10 w-full">
      <div className="relative h-80">
        <img
          src={anime.coverImage || "/placeholder.svg?height=320&width=256"}
          alt={anime.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center gap-3">
            <Badge className="bg-pink-600">{anime.type}</Badge>
            {anime.score && (
              <div className="flex items-center text-yellow-400 text-sm">
                <Star className="h-4 w-4 mr-1 fill-yellow-400" />
                {anime.score}
              </div>
            )}
            {anime.episodes && (
              <div className="flex items-center text-blue-400 text-sm">
                <Clock className="h-4 w-4 mr-1" />
                {anime.episodes} eps
              </div>
            )}
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <h2 className="text-xl font-bold text-white mb-2 line-clamp-2">{anime.title}</h2>

        <div className="flex flex-wrap gap-2 mb-3">
          {anime.genres?.slice(0, 3).map((genre, index) => (
            <Badge key={index} variant="outline" className="text-xs text-white/80 border-white/20">
              {genre}
            </Badge>
          ))}
        </div>

        <p className="text-white/70 text-sm line-clamp-3">{anime.synopsis}</p>

        {anime.recommendationReason && (
          <div className="mt-4 p-3 bg-white/10 rounded-lg">
            <p className="text-sm text-white/90 italic">
              <span className="font-semibold">Recommended because:</span> {anime.recommendationReason}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
