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
import Link from "next/link"

interface SwipeStats {
  matches: number;
  passed: number;
  total_swipes: number;
  today: number;
  streak: number;
  last_day_logged_in: string; // ISO date string
  first_day_logged_in: string; // ISO date string
}

const AsumiLogo = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="160"
    height="70"
    viewBox="0 0 280 120"
    className={className}
  >
    <defs>
      {/* Enhanced gradients */}
      <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff6b9d" />
        <stop offset="25%" stopColor="#f72585" />
        <stop offset="50%" stopColor="#b5179e" />
        <stop offset="75%" stopColor="#7209b7" />
        <stop offset="100%" stopColor="#560bad" />
      </linearGradient>

      <linearGradient id="hoverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff8cc8" />
        <stop offset="25%" stopColor="#ff4da6" />
        <stop offset="50%" stopColor="#d63384" />
        <stop offset="75%" stopColor="#9d4edd" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>

      <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ff6b9d" opacity="0.8" />
        <stop offset="50%" stopColor="#b5179e" opacity="0.9" />
        <stop offset="100%" stopColor="#560bad" opacity="0.8" />
      </linearGradient>

      {/* Enhanced glow effect */}
      <filter id="logoGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Shimmer effect */}
      <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgba(255,255,255,0)" />
        <stop offset="50%" stopColor="rgba(255,255,255,0.3)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        <animateTransform
          attributeName="gradientTransform"
          type="translate"
          values="-100 0;300 0;-100 0"
          dur="3s"
          repeatCount="indefinite"
        />
      </linearGradient>
    </defs>

    {/* Background decorative elements */}
    <g opacity="0.6">
      {/* Floating particles */}
      <circle cx="50" cy="30" r="3" fill="#ff6b9d">
        <animate attributeName="cy" values="30;20;30" dur="4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
      </circle>
      
      <circle cx="230" cy="80" r="2.5" fill="#b5179e">
        <animate attributeName="cy" values="80;70;80" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.5s" repeatCount="indefinite" />
      </circle>

      <circle cx="35" cy="85" r="2" fill="#7209b7">
        <animate attributeName="cx" values="35;45;35" dur="5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
      </circle>

      <circle cx="245" cy="35" r="2.5" fill="#560bad">
        <animate attributeName="cx" values="245;235;245" dur="4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite" />
      </circle>
    </g>

    {/* Decorative stars */}
    <g opacity="0.7">
      <path d="M25 65 L26.5 69 L30.5 69 L27.25 71.5 L28.75 75.5 L25 73 L21.25 75.5 L22.75 71.5 L19.5 69 L23.5 69 Z"
        fill="#ff6b9d" transform="scale(0.6)">
        <animateTransform attributeName="transform" type="rotate" values="0 25 70;360 25 70" dur="20s" repeatCount="indefinite" />
      </path>

      <path d="M255 25 L256.5 29 L260.5 29 L257.25 31.5 L258.75 35.5 L255 33 L251.25 35.5 L252.75 31.5 L249.5 29 L253.5 29 Z"
        fill="#b5179e" transform="scale(0.7)">
        <animateTransform attributeName="transform" type="rotate" values="360 255 30;0 255 30" dur="15s" repeatCount="indefinite" />
      </path>
    </g>

    {/* Main text shadow for depth */}
<text
      x="140"
      y="65"
      fontFamily="'Comfortaa', 'Quicksand', 'Nunito', system-ui, sans-serif"
      fontSize="38"
      fontWeight="650"
      textAnchor="middle"
      fill="rgba(0,0,0,0.3)"
      transform="translate(2, 2)"
      letterSpacing="5px"
    >
      Asumi
    </text>

    {/* Main text */}
    <text
      x="140"
      y="65"
      fontFamily="'Comfortaa', 'Quicksand', 'Nunito', system-ui, sans-serif"
      fontSize="38"
      fontWeight="650"
      textAnchor="middle"
      fill="url(#mainGradient)"
      filter="url(#logoGlow)"
      letterSpacing="5px"
      className="transition-all duration-500 group-hover:fill-[url(#hoverGradient)]"
    >
      Asumi
    </text>

    {/* Shimmer overlay */}
    <text
      x="140"
      y="65"
      fontFamily="'Comfortaa', 'Quicksand', 'Nunito', system-ui, sans-serif"
      fontSize="38"
      fontWeight="650"
      textAnchor="middle"
      fill="url(#shimmer)"
      letterSpacing="5px"
      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    >
      Asumi
    </text>

    {/* Enhanced underline with gradient */}
    <path
      d="M80 78 Q140 85 200 78"
      stroke="url(#accentGradient)"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
      className="transition-all duration-500 group-hover:stroke-[url(#hoverGradient)] group-hover:stroke-width-[3]"
    />

    {/* Subtle dots accent */}
    <g className="transition-all duration-300 group-hover:opacity-100" opacity="0.6">
      <circle cx="75" cy="78" r="1.5" fill="url(#mainGradient)" />
      <circle cx="205" cy="78" r="1.5" fill="url(#mainGradient)" />
    </g>

    {/* Side flourishes */}
    <g
      className="transition-all duration-500 group-hover:scale-110 group-hover:opacity-100"
      opacity="0.4"
      transform="translate(140,60)"
      style={{ transformOrigin: "140px 60px" }}
    >
      <path d="M60 55 Q65 50 70 55 Q65 60 60 55" fill="url(#accentGradient)" />
      <path d="M210 55 Q215 50 220 55 Q215 60 210 55" fill="url(#accentGradient)" />
    </g>
  </svg>
)

export default function SwipePage() {
  const router = useRouter()
  const [recommendations, setRecommendations] = useState<Anime[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  const [swipeHistory, setSwipeHistory] = useState<Array<{ index: number, direction: 'left' | 'right' }>>([])

  const [userAsumiStats, setUserAsumiStats] = useState<SwipeStats | null>(null);

  useEffect(() => {
    const session = localStorage.getItem("asumi_stats");

    if (session) {
      const parsedSession = JSON.parse(session);
      const asumiStats = { matches: parsedSession.matches, passed: parsedSession.passed, total_swipes: parsedSession.total_swipes, today: parsedSession.today, streak: parsedSession.streak, last_day_logged_in: parsedSession.last_day_logged_in, first_day_logged_in: parsedSession.first_day_logged_in };

      // check current date in iso format
      const todayIso = new Date().toISOString().slice(0, 10);

      if (asumiStats.last_day_logged_in !== todayIso) {
        // Check if last_day_logged_in is exactly yesterday
        const lastDate = new Date(asumiStats.last_day_logged_in);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const lastDateIso = lastDate.toISOString().slice(0, 10);
        const yesterdayIso = yesterday.toISOString().slice(0, 10);

        if (lastDateIso === yesterdayIso) {
          // Continue streak
          asumiStats.streak += 1;
          asumiStats.last_day_logged_in = todayIso;
          asumiStats.today = 0;
        } else {
          // Reset streak
          asumiStats.streak = 1;
          asumiStats.first_day_logged_in = todayIso;
          asumiStats.last_day_logged_in = todayIso;
          asumiStats.today = 0;
        }
        localStorage.setItem(
          "asumi_stats",
          JSON.stringify({ ...parsedSession, ...asumiStats })
        );
      }
      setUserAsumiStats(asumiStats);
    } else {
        // set localStorage item, and set UserAsumiStats with 0's and todays date
        const todayIso = new Date().toISOString().slice(0, 10);
        const initialStats: SwipeStats = {
          matches: 0,
          passed: 0,
          total_swipes: 0,
          today: 0,
          streak: 1,
          last_day_logged_in: todayIso,
          first_day_logged_in: todayIso,
        };
        localStorage.setItem("asumi_stats", JSON.stringify(initialStats));
        setUserAsumiStats(initialStats);
    }
  }, [])

  // everytime userAsumiStats changes, update the local storage item asumi_stats to reflect the changes
  useEffect(() => {
    if (userAsumiStats) {
      const session = localStorage.getItem("asumi_stats");
      let parsedSession = {};
      if (session) {
        try {
          parsedSession = JSON.parse(session);
        } catch (e) {
          parsedSession = {};
        }
      }
      localStorage.setItem(
        "asumi_stats",
        JSON.stringify({ ...parsedSession, ...userAsumiStats })
      );
    }
  }, [userAsumiStats]);


  interface UserData {
    provider: string;
    access_token: string;
    refresh_token: string | null;
  }
  const [userData, setUserData] = useState<UserData>({
    provider: "",
    access_token: "",
    refresh_token: null,
  });
  
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
    // Check if asumi_session exists in local storage
    const session = localStorage.getItem("asumi_session")

    let tempUserData: UserData = {provider: '', access_token: '', refresh_token: ''};

    if (session) {
      try {
        const parsedSession = JSON.parse(session);
        setUserData({
          provider: parsedSession.provider || "",
          access_token: parsedSession.access_token || "",
          refresh_token: parsedSession.refresh_token || null,
        });
        tempUserData = {provider: parsedSession.provider || "", access_token: parsedSession.access_token || "", refresh_token: parsedSession.refresh_token || ""};
      } catch (error) {
        console.error("Error parsing asumi_session:", error);
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
        const data = await getRecommendations(tempUserData.provider, tempUserData.access_token, tempUserData.refresh_token) // pass provider and access_token, refresh_token
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
    // Only keep the LAST left swipe in history (max 1 item)
    if (direction === "left") {
      setSwipeHistory([{ index: currentIndex, direction }]) // Replace entire history with just this one
      setUserAsumiStats(prev => prev ? { ...prev, passed: prev.passed + 1, total_swipes: prev.total_swipes + 1, today: prev.today + 1 } : null)
    }

    // Handle RIGHT swipe (like/add to list)
    if (direction === "right") {
      setUserAsumiStats(prev => prev ? { ...prev, matches: prev.matches + 1, total_swipes: prev.total_swipes + 1, today: prev.today + 1 } : null)
      console.log("Provider:", userData.provider);
      console.log("User data:", userData);
      console.log("Current anime:", currentAnime);

      setSwipeHistory([])
      
      if (userData.provider === "mal") {
        if (currentAnime) {
          fetch("/api/like", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              provider: userData.provider,
              accessToken: userData.access_token,
              refreshToken: userData.refresh_token,
              animeId: Number(currentAnime.id),
            }),
          }).catch((err) => {
            console.error("Failed to like anime:", err);
          });
        }
      }
      else if (userData.provider === "anilist") {
        if (currentAnime) {
          const query = `
            mutation ($animeId: Int!, $status: MediaListStatus) {
              SaveMediaListEntry(mediaId: $animeId, status: $status) {
                id
                status
              }
            }
          `;

          const variables = {
            animeId: currentAnime.id,
            status: "PLANNING" as const
          };

          fetch("https://graphql.anilist.co", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${userData.access_token}`,
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              query: query,
              variables: variables
            })
          })
            .then(res => res.json())
            .then(data => {
              console.log("Success:", data);
            })
            .catch(error => {
              console.error("Error:", error);
            });
        }
      }
    }

    // Move to next card
    setCurrentIndex((prev) => prev + 1)
  }

  const handleRewind = () => {
    if (swipeHistory.length === 0) return

    // Get the last (and only) LEFT swipe from history
    const lastLeftSwipe = swipeHistory[0]
    
    // Clear history completely
    setSwipeHistory([])
    
    // Go back to the previous rejected card
    setCurrentIndex(lastLeftSwipe.index)
  }

  // Check if rewind is available (only need to check if there's history)
  const canRewind = swipeHistory.length > 0

  useEffect(() => {
  if (currentIndex < recommendations.length) {
    setCurrentAnime(recommendations[currentIndex])
  } else {
    setCurrentAnime(null)
  }
}, [currentIndex, recommendations])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white overflow-hidden flex flex-col">
        {/* Animated background */}
        <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20"></div>
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent"></div>
        
        <Header isMobile={isMobile} />
        
        <main className="relative container mx-auto max-w-md px-4 py-8 md:py-16 flex flex-col justify-center flex-1">
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

        <div className="flex-shrink-0">
          <Footer />
        </div>
      </div>
    )
  }

  if (recommendations.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white overflow-hidden flex flex-col">
        {/* Animated background */}
        <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20"></div>
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent"></div>
        
        <Header isMobile={isMobile} />

        <main className="relative container mx-auto max-w-md px-4 py-8 md:py-16 flex flex-col justify-center flex-1">
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

        <div className="flex-shrink-0">
          <Footer />
        </div>
      </div>
    )
  }

  if (currentIndex >= recommendations.length) {
    return (
      <div className="min-h-screen bg-black text-white overflow-hidden flex flex-col">
        {/* Animated background */}
        <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20"></div>
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent"></div>
        
        <Header isMobile={isMobile} />

        <main className="relative container mx-auto max-w-md px-4 py-8 md:py-16 flex flex-col justify-center flex-1">
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

        <div className="flex-shrink-0">
          <Footer />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden flex flex-col">
      {/* Animated background */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20"></div>
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent"></div>
      
      {/* Minimal top bar instead of full header */}
      <motion.header 
        className="container mx-auto px-4 py-4 md:py-6 flex justify-between items-center relative z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
      <Link href="/" className="flex items-center group"> {/* The 'group' class enables group-hover */}
        <div className="transition-all duration-300 group-hover:scale-110 group-hover:brightness-110">
          <AsumiLogo className="text-white" /> {/* text-white might not be needed if SVG controls all fills */}
        </div>
      </Link>
        
        {/* Right side buttons */}
        <div className="flex gap-2 md:gap-4">
          <Button 
            variant="ghost" 
            size={isMobile ? "sm" : "default"}
            className="text-white hover:text-white hover:bg-white/10 transition-all"
            onClick={() => router.push("/")}
          >
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
          <Button 
            variant="ghost" 
            size={isMobile ? "sm" : "default"}
            className="text-white hover:text-white hover:bg-white/10 transition-all"
            onClick={() => router.push("/profile")}
          >
            <User className="mr-2 h-4 w-4" />
            Profile
          </Button>
        </div>
      </motion.header>
      
      {/* Main content takes remaining space */}
      <main className="relative z-20 container mx-auto max-w-md px-4 pb-8 flex flex-col flex-1">
        {/* Progress indicator */}
        <motion.div 
          className="mb-4 flex-shrink-0"
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
        <div className="flex-1 flex items-center justify-center min-h-0">
          {currentAnime ? (
            <motion.div 
              className="relative w-full h-full flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Next card - behind the current one */}
              {recommendations[currentIndex + 1] && (
                <div className="absolute inset-0 z-0 transform scale-95 opacity-50 flex items-center justify-center">
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
                onRewind={canRewind ? handleRewind : undefined}
              />
            </div>
            </motion.div>
          ) : (
            <div className="text-white text-xl">You've seen all recommendations for now.</div>
          )}
        </div>

        {/* Helper text - fixed at bottom */}
        <motion.div 
          className="text-center mt-4 flex-shrink-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-white/50 text-sm">Swipe the card to continue</p>
        </motion.div>
      </main>

      <div className="flex-shrink-0">
        <Footer />
      </div>
    </div>
  )
}