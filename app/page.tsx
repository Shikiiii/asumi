"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Play, Star, Zap, Heart, Users } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import router from "next/router"

// Sample anime covers for the grid
const animeCovers = [
  {
    title: "Fullmetal Alchemist: Brotherhood",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx5114-KJTQz9AIm6Wk.jpg",
    year: "2009",
    type: "TV Series",
    rating: 9.1,
  },
  {
    title: "Jujutsu Kaisen",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415-bbBWj4pEFseh.jpg",
    year: "2020",
    type: "TV Series",
    rating: 8.5,
  },
  {
    title: "Demon Slayer",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101922-PEn1CTc93blC.jpg",
    year: "2019",
    type: "TV Series",
    rating: 8.7,
  },
  {
    title: "Attack on Titan",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498-C6FPmWm59CyP.jpg",
    year: "2013",
    type: "TV Series",
    rating: 9.0,
  },
  {
    title: "Spy x Family",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx140960-vN39AmOWrVB5.jpg",
    year: "2022",
    type: "TV Series",
    rating: 8.6,
  },
  {
    title: "Goblin Slayer",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx101165-dVgOyGhEP4mB.jpg",
    year: "2018",
    type: "TV Series",
    rating: 7.4,
  },
  {
    title: "Chainsaw Man",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx127230-FlochcFsyoF4.png",
    year: "2022",
    type: "TV Series",
    rating: 8.8,
  },
]

// Enhanced AnimeCard component - mobile optimized
const AnimeCard = ({ anime, delay = 0 }: { anime: (typeof animeCovers)[0]; delay?: number }) => {
  return (
    <motion.div
      className="relative mb-4 md:mb-6 group cursor-pointer flex-shrink-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      style={{ transform: "rotate(2deg)" }}
      whileHover={{ scale: 1.05, rotate: 0 }}
    >
      <div className="relative overflow-hidden rounded-lg md:rounded-xl shadow-xl md:shadow-2xl">
        <img 
          src={anime.image || "/placeholder.svg"} 
          alt={anime.title} 
          className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        
        {/* Hover overlay - hidden on mobile */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-white font-semibold">{anime.rating}</span>
            </div>
            <h3 className="font-bold text-white text-sm leading-tight">{anime.title}</h3>
            <div className="flex items-center text-xs text-white/80 mt-1">
              <span>{anime.year}</span>
              <span className="mx-2">•</span>
              <span>{anime.type}</span>
            </div>
          </div>
        </div>

        {/* Always visible gradient overlay on mobile, hidden on desktop hover */}
        <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 bg-gradient-to-t from-black/80 to-transparent md:opacity-0 md:group-hover:opacity-0 transition-opacity duration-300">
          <h3 className="font-semibold text-xs md:text-sm text-white truncate">{anime.title}</h3>
          <div className="flex items-center text-xs text-white/60 mt-1">
            <span>{anime.year}</span>
            <span className="mx-1 md:mx-2">•</span>
            <span className="text-xs">{anime.type}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Home() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const session = localStorage.getItem("asumi_session")
    if (session) {
      try {
        const parsedSession = JSON.parse(session);
        if (parsedSession.access_token) {
          setIsAuthenticated(true);
        }
        setIsLoading(false);
      } catch (error) {
        // ignore
        setIsLoading(false);
      }
    } else { // Added else to ensure isLoading is set if no session
        setIsLoading(false);
    }
  }, [])

  const handleGetStarted = () => {
    if (isAuthenticated) {
      console.log('Redirecting to /swipe')
      window.location.href = '/swipe'
    } else {
      console.log('Redirecting to /login')
      window.location.href = '/login'
    }
  }

  const col1Cards = animeCovers.filter((_, index) => index % 2 === 0)
  const col2Cards = animeCovers.filter((_, index) => index % 2 === 1)
  
  const tripleCol1 = [...col1Cards, ...col1Cards, ...col1Cards]
  const tripleCol2 = [...col2Cards, ...col2Cards, ...col2Cards]

  // All anime covers, duplicated for seamless horizontal scroll on mobile
  const mobileAnimeScrollCovers = [...animeCovers, ...animeCovers];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <style jsx>{`
        @keyframes scrollUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-33.333%); }
        }
        
        @keyframes scrollDown {
          0% { transform: translateY(-33.333%); }
          100% { transform: translateY(0); }
        }
        
        .scroll-up { animation: scrollUp 40s linear infinite; }
        .scroll-down { animation: scrollDown 45s linear infinite; }

        @keyframes scrollHorizontalMobile {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); } /* Scrolls one half of the 200% width container */
        }

        .animate-scroll-horizontal-mobile {
          display: flex;
          width: 200%; /* Container is twice the width of its parent for seamless scroll */
          animation: scrollHorizontalMobile 25s linear infinite;
        }

        .pause-animation-on-hover:hover {
          animation-play-state: paused;
        }
        
        @media (max-width: 768px) { /* md breakpoint */
          .scroll-up { animation: scrollUp 30s linear infinite; }
          .scroll-down { animation: scrollDown 35s linear infinite; }
        }
      `}</style>

      <Header isMobile={isMobile} />

      {isMobile ? (
        // Mobile Layout
        <main className="flex flex-col min-h-[calc(100vh-64px)]">
          {/* Hero Text Section - Bigger and more prominent */}
          <section className="flex-grow flex flex-col items-center justify-center text-center px-4 pt-8 pb-4">
            <motion.h1 
              className="text-[3rem] sm:text-6xl md:text-7xl font-black text-white leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Discover your next{" "}
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                favorite anime
              </span>{" "}
              with a swipe
            </motion.h1>
          </section>

          <section className="py-8 bg-black/30">
            <div className="overflow-hidden relative group pause-animation-on-hover">
              <div className="animate-scroll-horizontal-mobile">
                {mobileAnimeScrollCovers.map((anime, index) => (
                  <div key={`mobile-anime-${index}`} className="w-72 sm:w-78 mx-3 flex-shrink-0">
                    <AnimeCard anime={anime} />
                  </div>
                ))}
              </div>
              <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-20 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none z-10"></div>
              <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-20 bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none z-10"></div>
            </div>
          </section>

          <section className="px-4 py-6 text-center">
            <motion.div
              className="w-full max-w-sm mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button 
                onClick={handleGetStarted}
                disabled={isLoading}
                size="lg"
                className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white shadow-2xl hover:shadow-pink-500/25 transition-all hover:scale-105 px-10 py-5 text-xl font-semibold disabled:opacity-50"
              >
                {isLoading ? (
                  "Loading..."
                ) : isAuthenticated ? (
                  <>Start Swiping <ArrowRight className="ml-3 h-6 w-6" /></>
                ) : (
                  <>Get Started <ArrowRight className="ml-3 h-6 w-6" /></>
                )}
              </Button>
            </motion.div>
          </section>
          
          {/* Remaining content for mobile */}
          <section className="container mx-auto px-4 py-8 text-center">
            <motion.p 
              className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-md mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Connect your MyAnimeList or Anilist account and get personalized recommendations.
            </motion.p>

            <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
              {[
                { icon: <Heart className="h-5 w-5 text-pink-400" />, title: "Smart Matching", desc: "Personalized suggestions", bgColor: "bg-pink-600/20" },
                { icon: <Users className="h-5 w-5 text-purple-400" />, title: "Community", desc: "Join anime lovers", bgColor: "bg-purple-600/20" },
                { icon: <Star className="h-5 w-5 text-cyan-400" />, title: "Quality", desc: "Curated content", bgColor: "bg-cyan-600/20" },
              ].map((feature, idx) => (
                <motion.div 
                  key={idx} 
                  className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + idx * 0.1 }}
                >
                  <div className={`p-2 ${feature.bgColor} rounded-lg shrink-0`}>{feature.icon}</div>
                  <div className="text-left">
                    <div className="font-semibold text-white text-sm">{feature.title}</div>
                    <div className="text-xs text-gray-400">{feature.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </main>
      ) : (
        // Desktop Layout (Original Structure)
        <main className="container mx-auto px-4 py-4 md:py-8 lg:py-16">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            {/* Enhanced Anime Grid - Desktop */}
            <motion.div 
              className="w-full lg:w-1/2 order-1 lg:order-2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative h-[600px] lg:h-[700px] overflow-hidden rounded-xl md:rounded-2xl">
                <div className="absolute top-0 left-0 right-0 h-16 md:h-20 bg-gradient-to-b from-black via-black/80 to-transparent z-10"></div>
                <div className="absolute bottom-0 left-0 right-0 h-16 md:h-20 bg-gradient-to-t from-black via-black/80 to-transparent z-10"></div>
                <div className="absolute left-0 top-0 bottom-0 w-4 md:w-8 bg-gradient-to-r from-black/60 to-transparent z-10"></div>
                <div className="absolute right-0 top-0 bottom-0 w-4 md:w-8 bg-gradient-to-l from-black/60 to-transparent z-10"></div>

                <div className="absolute left-0 w-[48%] scroll-up">
                  {tripleCol1.map((anime, index) => (
                    <AnimeCard key={`col1-${index}`} anime={anime} />
                  ))}
                </div>
                <div className="absolute right-0 w-[48%] scroll-down" style={{ marginTop: '80px' }}>
                  {tripleCol2.map((anime, index) => (
                    <AnimeCard key={`col2-${index}`} anime={anime} />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Enhanced Hero Section - Desktop */}
            <motion.div 
              className="w-full lg:w-1/2 space-y-6 md:space-y-8 lg:sticky lg:top-24 lg:self-start text-center lg:text-left order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Badge commented out in original */}
              {/* <motion.div ... > ... </motion.div> */}
              <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-white leading-tight">
                Discover your next{" "}
                <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  favorite anime
                </span>{" "}
                with a swipe
              </h1>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 md:gap-4 pt-4">
                <Button 
                  onClick={handleGetStarted}
                  disabled={isLoading}
                  size={"lg"} // Explicitly lg for desktop consistency
                  className="w-full sm:w-auto bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white shadow-2xl hover:shadow-pink-500/25 transition-all hover:scale-105 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold disabled:opacity-50"
                >
                  {isLoading ? (
                    "Loading..."
                  ) : isAuthenticated ? (
                    <>Start Swiping <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" /></>
                  ) : (
                    <>Get Started <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" /></>
                  )}
                </Button>
              </div>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Connect your MyAnimeList or Anilist account and get personalized recommendations.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 py-4 md:py-6">
                <div className="flex items-center gap-3 p-3 md:p-0 bg-gray-900/50 md:bg-transparent rounded-lg md:rounded-none">
                  <div className="p-2 bg-pink-600/20 rounded-lg shrink-0">
                    <Heart className="h-4 w-4 md:h-5 md:w-5 text-pink-400" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-white text-sm md:text-base">Smart Matching</div>
                    <div className="text-xs md:text-sm text-gray-400">Personalized suggestions</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 md:p-0 bg-gray-900/50 md:bg-transparent rounded-lg md:rounded-none">
                  <div className="p-2 bg-purple-600/20 rounded-lg shrink-0">
                    <Users className="h-4 w-4 md:h-5 md:w-5 text-purple-400" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-white text-sm md:text-base">Community</div>
                    <div className="text-xs md:text-sm text-gray-400">Join anime lovers</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 md:p-0 bg-gray-900/50 md:bg-transparent rounded-lg md:rounded-none">
                  <div className="p-2 bg-cyan-600/20 rounded-lg shrink-0">
                    <Star className="h-4 w-4 md:h-5 md:w-5 text-cyan-400" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-white text-sm md:text-base">Quality</div>
                    <div className="text-xs md:text-sm text-gray-400">Curated content</div>
                  </div>
                </div>
              </div>
              {/* Stats commented out in original */}
              {/* <motion.div ... > ... </motion.div> */}
            </motion.div>
          </div>
        </main>
      )}
      <Footer />
    </div>
  );
}