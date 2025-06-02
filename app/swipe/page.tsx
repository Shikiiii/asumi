"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/app/context/auth-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Heart, X, Info } from "lucide-react"
import SwipeableCard from "@/components/swipeable-card"
import type { Anime } from "@/types/anime"
import { getRecommendations } from "@/lib/recommendations"
import { set } from "date-fns"

export default function SwipePage() {
  const router = useRouter()
  const [recommendations, setRecommendations] = useState<Anime[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  interface UserData {
    provider: string;
    access_token: string;
    refresh_token: string | null;
  }
  const userData: UserData = {provider: "", access_token: "", refresh_token: null};
  
  const [currentAnime, setCurrentAnime] = useState<Anime | null>(null)

  useEffect(() => {
    console.log("Current Anime:", currentAnime);
  }, [currentAnime])

  useEffect(() => {
    // Check if animeswipe_session exists in local storage
    const session = localStorage.getItem("animeswipe_session")
    if (session) {
      try {
        const parsedSession = JSON.parse(session);
        userData.provider = parsedSession.provider || "";
        userData.access_token = parsedSession.access_token || "";
        userData.refresh_token = parsedSession.refresh_token || null;
      } catch (error) {
        console.error("Error parsing animeswipe_session:", error);
        router.push("/login");
        return;
      }
    } else {
        router.push("/login");
        return;
    }

    const fetchRecommendations = async () => {
      setIsLoading(true)
      try {
        const data = await getRecommendations("provider", "access_token", "refresh_token") // pass provider and access_token, refresh_token
        setRecommendations(data)
        setCurrentAnime(data[0] || null)
      } catch (error) {
        console.error("Error fetching recommendations:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecommendations()
  }, [router])

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "right") {
      console.log("Liked:", recommendations[currentIndex])
    }

    // Update immediately - no setTimeout!
    setCurrentIndex((prev) => prev + 1)
  }

  useEffect(() => {
  if (currentIndex < recommendations.length) {
    setCurrentAnime(recommendations[currentIndex])
  } else {
    setCurrentAnime(null)
  }
}, [currentIndex, recommendations])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black p-4">
        <div className="container mx-auto max-w-md py-8">
          <div className="flex justify-between items-center mb-8">
            <div className="text-2xl font-bold text-white">AnimeSwipe</div>
            <Button variant="ghost" className="text-white" onClick={() => router.push("/profile")}>
              Profile
            </Button>
          </div>

        <div className="flex flex-col items-center justify-center mt-16">
          <div className="text-white text-xl mb-4 text-center">Loading recommendations...</div>
        </div>
        </div>
      </div>
    )
  }

  if (recommendations.length === 0) {
    return (
      <div className="min-h-screen bg-black p-4">
        <div className="container mx-auto max-w-md py-8">
          <div className="flex justify-between items-center mb-8">
            <div className="text-2xl font-bold text-white">AnimeSwipe</div>
            <Button variant="ghost" className="text-white" onClick={() => router.push("/profile")}>
              Profile
            </Button>
          </div>

        <div className="flex flex-col items-center justify-center mt-16">
          <div className="text-white text-xl mb-4 text-center">No recommendations found.</div>
          <Button onClick={() => setCurrentIndex(0)}>Start Over</Button>
        </div>
        </div>
      </div>
    )
  }

  if (currentIndex >= recommendations.length) {
    return (
      <div className="min-h-screen bg-black p-4">
        <div className="container mx-auto max-w-md py-8">
          <div className="flex justify-between items-center mb-8">
            <div className="text-2xl font-bold text-white">AnimeSwipe</div>
            <Button variant="ghost" className="text-white" onClick={() => router.push("/profile")}>
              Profile
            </Button>
          </div>

        <div className="flex flex-col items-center justify-center mt-16">
          <div className="text-white text-xl mb-4 text-center">You've seen all recommendations!</div>
          <Button onClick={() => setCurrentIndex(0)}>Start Over</Button>
        </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="container mx-auto max-w-md py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="text-2xl font-bold text-white">AnimeSwipe</div>
          <Button variant="ghost" className="text-white" onClick={() => router.push("/profile")}>
            Profile
          </Button>
        </div>

        {currentAnime ? (
          <>
            <div className="mb-8 relative">
              {/* Next card - behind the current one */}
              {recommendations[currentIndex + 1] && (
                <div className="absolute inset-0 z-0">
                  <SwipeableCard 
                    key={`next-${recommendations[currentIndex + 1].id}`}
                    anime={recommendations[currentIndex + 1]} 
                    onSwipe={() => {}} // No swipe handler for background card
                    isBackground={true}
                  />
                </div>
              )}
              
              {/* Current card - on top */}
              <div className="relative z-10">
                <SwipeableCard 
                  key={currentAnime.id}
                  anime={currentAnime} 
                  onSwipe={handleSwipe} 
                />
              </div>
            </div>
          </>
        ) : (
          <div className="text-white text-xl">You've seen all recommendations for now.</div>
        )}
      </div>
    </div>
  )
}
