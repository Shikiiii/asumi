"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

// Sample anime covers for the grid - doubled for continuous scrolling
const animeCovers = [
  {
    title: "Fullmetal Alchemist: Brotherhood",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx5114-KJTQz9AIm6Wk.jpg",
    year: "2009",
    type: "TV Series",
    color: "blue",
  },
  {
    title: "Jujutsu Kaisen",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415-bbBWj4pEFseh.jpg",
    year: "2020",
    type: "TV Series",
    color: "cyan",
  },
  {
    title: "Demon Slayer",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101922-PEn1CTc93blC.jpg",
    year: "2019",
    type: "TV Series",
    color: "green",
  },
  {
    title: "Attack on Titan",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498-C6FPmWm59CyP.jpg",
    year: "2013",
    type: "TV Series",
    color: "orange",
  },
  {
    title: "Spy x Family",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx140960-vN39AmOWrVB5.jpg",
    year: "2022",
    type: "TV Series",
    color: "pink",
  },
  {
    title: "Goblin Slayer",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx101165-dVgOyGhEP4mB.jpg",
    year: "2018",
    type: "TV Series",
    color: "green",
  },
  {
    title: "Chainsaw Man",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx127230-FlochcFsyoF4.png",
    year: "2022",
    type: "TV Series",
    color: "red",
  },
]

// Double the array for continuous scrolling
const doubledAnimeCovers = [...animeCovers, ...animeCovers]

// AnimeCard component with tilt
const AnimeCard = ({ anime, delay = 0 }: { anime: (typeof animeCovers)[0]; delay?: number }) => {
  return (
    <motion.div
      className="relative mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      style={{ transform: "rotate(3deg)" }} // Tilt to the right
    >
      <img src={anime.image || "/placeholder.svg"} alt={anime.title} className="w-full rounded-lg shadow-lg" />
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
        <div className={`w-2 h-2 rounded-full bg-${anime.color}-400 mb-1 inline-block mr-2`}></div>
        <h3 className="font-semibold text-sm md:text-base truncate">{anime.title}</h3>
        <div className="flex items-center text-xs text-white/60 mt-1">
          <span>{anime.year}</span>
          <span className="mx-2">•</span>
          <span>{anime.type}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Home() {
  const [scrollHeight, setScrollHeight] = useState(2000) // Default height

  // Calculate the total height needed for scrolling
  useEffect(() => {
    // Set a height that ensures we have enough content to scroll
    setScrollHeight(window.innerHeight * 2)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="container mx-auto py-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-white">AnimeSwipe</div>
        <div className="flex gap-4">
          <Link href="/">
            <Button variant="ghost" className="text-white hover:text-white hover:bg-white/20">
              About
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" className="text-black border-white bg-white hover:bg-gray-200 hover:text-black">
              Login
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-16">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Text and button - left on desktop, top on mobile */}
            <div className="md:w-1/2 space-y-6 md:sticky md:top-24 md:self-start text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Discover your next <span className="text-pink-400">favorite anime</span> with a swipe
            </h1>
            <p className="text-lg text-white/80">
              Connect your MyAnimeList or Anilist account and get personalized recommendations based on what you already
              love.
            </p>
            <div className="flex justify-center md:justify-start gap-4 pt-4">
              <Link href="/login">
              <Button size="lg" className="bg-pink-600 hover:bg-pink-700 text-white">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              </Link>
            </div>
            </div>

          {/* Auto-scrolling grid of anime covers - right on desktop, bottom on mobile */}
          <div className="md:w-1/2 mt-12 md:mt-0">
            <div className="relative h-[600px] md:h-[700px] overflow-hidden">
              {/* Gradient overlay at top for fade effect */}
              <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black to-transparent z-10"></div>

              {/* First column - auto-scrolling */}
              <motion.div
                className="absolute left-0 w-[48%]"
                initial={{ y: 0 }}
                animate={{ y: [-scrollHeight / 2, 0] }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  duration: 40,
                  ease: "linear",
                }}
              >
                {doubledAnimeCovers.map(
                  (anime, index) =>
                    index % 2 === 0 && <AnimeCard key={`col1-${index}`} anime={anime} delay={index * 0.1} />,
                )}
              </motion.div>

              {/* Second column - auto-scrolling with offset */}
              <motion.div
                className="absolute right-0 w-[48%] mt-12"
                initial={{ y: 0 }}
                animate={{ y: [0, -scrollHeight / 2] }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  duration: 40, // Slightly different speed for visual interest
                  ease: "linear",
                }}
              >
                {doubledAnimeCovers.map(
                  (anime, index) =>
                    index % 2 === 1 && <AnimeCard key={`col2-${index}`} anime={anime} delay={index * 0.1 + 0.15} />,
                )}
              </motion.div>

              {/* Gradient overlay at bottom for fade effect */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent z-10"></div>
            </div>
          </div>
        </div>
      </main>

      <footer className="container mx-auto py-6 text-center text-white/60 text-sm">
        &copy; {new Date().getFullYear()} AnimeSwipe. Not affiliated with MyAnimeList or Anilist.
      </footer>
    </div>
  )
}
