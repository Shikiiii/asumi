export interface Anime {
  id: string
  title: string
  type: string
  episodes?: number
  status?: string
  score?: number
  genres?: string[]
  synopsis?: string
  coverImage?: string
  bannerImage?: string
  recommendationReason?: string
  trailerUrl?: string
}
