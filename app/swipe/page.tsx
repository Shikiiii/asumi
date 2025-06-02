"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/app/context/auth-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
// Update your imports to include Home
import { Info, RotateCcw, Sparkles, User, Home } from "lucide-react"
import SwipeableCard from "@/components/swipeable-card"
import type { Anime } from "@/types/anime"
import { getRecommendations } from "@/lib/recommendations"
import { motion } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function SwipePage() {
  const router = useRouter()
  const [recommendations, setRecommendations] = useState<Anime[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  
  interface UserData {
    provider: string;
    access_token: string;
    refresh_token: string | null;
  }
  const userData: UserData = {provider: "", access_token: "", refresh_token: null};
  
  const [currentAnime, setCurrentAnime] = useState<Anime | null>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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
      <div className="min-h-screen bg-black text-white overflow-hidden">
        {/* Animated background */}
        <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20"></div>
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent"></div>
        
        <Header isMobile={isMobile} />
        
        <main className="relative container mx-auto max-w-md px-4 py-8 md:py-16 flex flex-col justify-center min-h-[80vh]">
          {/* Loading content */}
          <motion.div 
            className="flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mb-6">
              <Sparkles className="h-8 w-8 text-white animate-pulse" />
            </div>
            <div className="text-white text-xl mb-2 text-center font-medium">Finding your perfect anime...</div>
            {/* <div className="text-white/60 text-sm text-center">Powered by AI recommendations</div> */}
            
            {/* Loading animation */}
            <div className="flex gap-1 mt-6">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-purple-400 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </main>

        <Footer />
      </div>
    )
  }

  if (recommendations.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white overflow-hidden">
        {/* Animated background */}
        <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20"></div>
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent"></div>
        
        <Header isMobile={isMobile} />

        <main className="relative container mx-auto max-w-md px-4 py-8 md:py-16 flex flex-col justify-center min-h-[80vh]">
          <motion.div 
            className="flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center mb-6">
              <Info className="h-8 w-8 text-white" />
            </div>
            <div className="text-white text-xl mb-4 text-center font-medium">No recommendations found</div>
            <div className="text-white/60 text-sm text-center mb-6">We couldn't find any anime to recommend right now</div>
            <Button 
              onClick={() => setCurrentIndex(0)}
              className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white shadow-lg"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </motion.div>
        </main>

        <Footer />
      </div>
    )
  }

  if (currentIndex >= recommendations.length) {
    return (
      <div className="min-h-screen bg-black text-white overflow-hidden">
        {/* Animated background */}
        <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20"></div>
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent"></div>
        
        <Header isMobile={isMobile} />

        <main className="relative container mx-auto max-w-md px-4 py-8 md:py-16 flex flex-col justify-center min-h-[80vh]">
          <motion.div 
            className="flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-6">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <div className="text-white text-xl mb-4 text-center font-medium">All caught up!</div>
            <div className="text-white/60 text-sm text-center mb-6">You've seen all recommendations for now</div>
            <Button 
              onClick={() => setCurrentIndex(0)}
              className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white shadow-lg"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Start Over
            </Button>
          </motion.div>
        </main>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20"></div>
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent"></div>
      
      {/* Minimal top bar instead of full header */}
      <motion.div 
              className="relative z-20 flex justify-between items-center p-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Clickable logo to go home */}
              <button 
                onClick={() => router.push("/")}
                className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent hover:from-pink-300 hover:to-purple-300 transition-all cursor-pointer"
              >
                AnimeSwipe
              </button>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-white/80 hover:text-white hover:bg-white/10"
                  onClick={() => router.push("/")}
                >
                  <Home className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-white/80 hover:text-white hover:bg-white/10"
                  onClick={() => router.push("/profile")}
                >
            <User className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>
      
      {/* Main content with more space */}
      <main className="relative z-20 container mx-auto max-w-md px-4 pb-8 flex flex-col" style={{ minHeight: 'calc(100vh - 140px)' }}>
        {/* Progress indicator */}
        <motion.div 
          className="mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-white/60">Progress</span>
            <span className="text-sm text-white/60">{currentIndex + 1} of {recommendations.length}</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <motion.div 
              className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / recommendations.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>

        {/* Card container - takes remaining space */}
        <div className="flex-1 flex items-center justify-center">
          {currentAnime ? (
            <motion.div 
              className="relative w-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Next card - behind the current one */}
              {recommendations[currentIndex + 1] && (
                <div className="absolute inset-0 z-0 transform scale-95 opacity-50">
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
            </motion.div>
          ) : (
            <div className="text-white text-xl">You've seen all recommendations for now.</div>
          )}
        </div>

        {/* Helper text - fixed at bottom */}
        <motion.div 
          className="text-center mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-white/50 text-sm">Swipe the card to continue</p>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}