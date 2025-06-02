"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Play, Star, Zap, Heart, Users } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useAuth } from "@/app/context/auth-context"
import { useRouter } from "next/navigation"

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
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  // Add debugging
  console.log('Auth state:', { user, isAuthenticated, isLoading })

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleGetStarted = () => {
    console.log('Button clicked, auth state:', { user, isAuthenticated, isLoading })
    if (isAuthenticated) {
      console.log('Redirecting to /swipe')
      router.push('/swipe')
    } else {
      console.log('Redirecting to /login')
      router.push('/login')
    }
  }

  // Create duplicated arrays for seamless scrolling
  const col1Cards = animeCovers.filter((_, index) => index % 2 === 0)
  const col2Cards = animeCovers.filter((_, index) => index % 2 === 1)
  
  // Triple each column for seamless loop
  const tripleCol1 = [...col1Cards, ...col1Cards, ...col1Cards]
  const tripleCol2 = [...col2Cards, ...col2Cards, ...col2Cards]

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Add CSS keyframes */}
      <style jsx>{`
        @keyframes scrollUp {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-33.333%);
          }
        }
        
        @keyframes scrollDown {
          0% {
            transform: translateY(-33.333%);
          }
          100% {
            transform: translateY(0);
          }
        }
        
        .scroll-up {
          animation: scrollUp 40s linear infinite;
        }
        
        .scroll-down {
          animation: scrollDown 45s linear infinite;
        }
        
        @media (max-width: 768px) {
          .scroll-up {
            animation: scrollUp 30s linear infinite;
          }
          
          .scroll-down {
            animation: scrollDown 35s linear infinite;
          }
        }
      `}</style>

      <Header isMobile={isMobile} />

      <main className="container mx-auto px-4 py-4 md:py-8 lg:py-16">
        {/* Layout: flex-col for mobile, lg:flex-row for desktop */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          {/* Enhanced Anime Grid - Mobile first (appears on top on mobile) */}
          <motion.div 
            className="w-full lg:w-1/2 order-1 lg:order-2"
            initial={{ opacity: 0, x: isMobile ? 0 : 50, y: isMobile ? -20 : 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative h-[400px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-xl md:rounded-2xl">
              {/* Enhanced gradients */}
              <div className="absolute top-0 left-0 right-0 h-16 md:h-20 bg-gradient-to-b from-black via-black/80 to-transparent z-10"></div>
              <div className="absolute bottom-0 left-0 right-0 h-16 md:h-20 bg-gradient-to-t from-black via-black/80 to-transparent z-10"></div>
              <div className="absolute left-0 top-0 bottom-0 w-4 md:w-8 bg-gradient-to-r from-black/60 to-transparent z-10"></div>
              <div className="absolute right-0 top-0 bottom-0 w-4 md:w-8 bg-gradient-to-l from-black/60 to-transparent z-10"></div>

              {/* First column - CSS animation */}
              <div className="absolute left-0 w-[48%] scroll-up">
                {tripleCol1.map((anime, index) => (
                  <AnimeCard key={`col1-${index}`} anime={anime} />
                ))}
              </div>

              {/* Second column - CSS animation with offset */}
              <div className="absolute right-0 w-[48%] scroll-down" style={{ marginTop: isMobile ? '60px' : '80px' }}>
                {tripleCol2.map((anime, index) => (
                  <AnimeCard key={`col2-${index}`} anime={anime} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Enhanced Hero Section - Mobile first */}
          <motion.div 
            className="w-full lg:w-1/2 space-y-6 md:space-y-8 lg:sticky lg:top-24 lg:self-start text-center lg:text-left order-2 lg:order-1"
            initial={{ opacity: 0, x: isMobile ? 0 : -50, y: isMobile ? 20 : 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Badge */}
{/*             <motion.div
              className="inline-flex items-center gap-2 px-3 py-2 md:px-4 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-full border border-purple-500/30 text-xs md:text-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Zap className="h-3 w-3 md:h-4 md:w-4 text-yellow-400" />
              <span>Powered by AI Recommendations</span>
            </motion.div> */}

            

            <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-white leading-tight">
              Discover your next{" "}
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                favorite anime
              </span>{" "}
              with a swipe
            </h1>

            {/* CTA Buttons - Mobile optimized */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 md:gap-4 pt-4">
              <Button 
                onClick={handleGetStarted}
                disabled={isLoading}
                size={isMobile ? "default" : "lg"}
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

            {/* Feature highlights - Mobile optimized */}
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

            {/* Stats - Mobile optimized */}
{/*             <motion.div 
              className="flex justify-center lg:justify-start gap-6 md:gap-8 pt-6 md:pt-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div>
                <div className="text-2xl md:text-3xl font-bold text-white">10K+</div>
                <div className="text-xs md:text-sm text-gray-400">Anime Titles</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-white">50K+</div>
                <div className="text-xs md:text-sm text-gray-400">Happy Users</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-white">1M+</div>
                <div className="text-xs md:text-sm text-gray-400">Matches Made</div>
              </div>
            </motion.div> */}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}