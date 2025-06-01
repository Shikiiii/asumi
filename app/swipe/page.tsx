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
      // Save to liked list
      console.log("Liked:", recommendations[currentIndex])
    }

    // Add a small delay to allow the animation to complete
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1)
    }, 100)
    setTimeout(() => {
    }, 200)
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
            <div className="mb-8">
              <SwipeableCard anime={currentAnime} onSwipe={handleSwipe} />
            </div>

            <div className="flex justify-center gap-6 mt-8">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full w-16 h-16 p-0 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white bg-black"
                onClick={() => handleSwipe("left")}
              >
                <X className="h-8 w-8" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="rounded-full w-16 h-16 p-0 border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white bg-black"
                onClick={() => router.push(`/anime/${currentAnime.id}`)}
              >
                <Info className="h-8 w-8" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="rounded-full w-16 h-16 p-0 border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white bg-black"
                onClick={() => handleSwipe("right")}
              >
                <Heart className="h-8 w-8" />
              </Button>
            </div>
          </>
        ) : (
          <div className="text-white text-xl">You've seen all recommendatations for now.</div>
        )}
      </div>
    </div>
  )
}
