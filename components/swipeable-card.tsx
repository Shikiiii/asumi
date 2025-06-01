"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion"
import type { Anime } from "@/types/anime"
import AnimeCard from "@/components/anime-card"

interface SwipeableCardProps {
  anime: Anime
  onSwipe: (direction: "left" | "right") => void
}

export default function SwipeableCard({ anime, onSwipe }: SwipeableCardProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null)

  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15])
  const controls = useAnimation()

  const rightBgOpacity = useTransform(
    x,
    [0, 50, 100, 200],
    [0, 0, isDragging ? 0.8 : 0, isDragging ? 1 : 0]
  )
  const leftBgOpacity = useTransform(
    x,
    [-200, -100, -50, 0],
    [isDragging ? 1 : 0, isDragging ? 0.8 : 0, 0, 0]
  )

  const glowColor = useTransform(
    x,
    [-200, -100, -50, 0, 50, 100, 200],
    [
      "0px 0px 20px 5px rgba(255, 0, 0, 0.7)",
      "0px 0px 15px 3px rgba(255, 0, 0, 0.5)",
      "0px 0px 10px 2px rgba(255, 0, 0, 0.3)",
      "0px 0px 0px 0px rgba(0, 0, 0, 0)",
      "0px 0px 10px 2px rgba(0, 255, 0, 0.3)",
      "0px 0px 15px 3px rgba(0, 255, 0, 0.5)",
      "0px 0px 20px 5px rgba(0, 255, 0, 0.7)"
    ]
  )

  // 👇 Reset when new anime comes in
  useEffect(() => {
    setSwipeDirection(null)
    x.set(0)
    controls.set({ x: 0, opacity: 1 })
  }, [anime])

  const handleDragEnd = () => {
    const xVal = x.get()
    setIsDragging(false)

    if (xVal > 100) {
      setSwipeDirection("right")
      controls.start({
        x: 500,
        opacity: 0,
        transition: { duration: 0.3 }
      })
    } else if (xVal < -100) {
      setSwipeDirection("left")
      controls.start({
        x: -500,
        opacity: 0,
        transition: { duration: 0.3 }
      })
    } else {
      controls.start({
        x: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      })
    }
  }

  const handleAnimationComplete = () => {
    if (swipeDirection) {
      onSwipe(swipeDirection)
    }
  }

  return (
    <div className="relative w-full">
      {isDragging && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
          style={{ opacity: rightBgOpacity as any }}
        >
          <div className="border-4 border-green-500 rounded-full p-4 bg-white/20 backdrop-blur-sm">
            <span className="text-green-500 font-bold text-2xl">LIKE</span>
          </div>
        </motion.div>
      )}

      {isDragging && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
          style={{ opacity: leftBgOpacity as any }}
        >
          <div className="border-4 border-red-500 rounded-full p-4 bg-white/20 backdrop-blur-sm">
            <span className="text-red-500 font-bold text-2xl">PASS</span>
          </div>
        </motion.div>
      )}

      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        style={{ x, rotate, boxShadow: glowColor }}
        animate={controls}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        onAnimationComplete={handleAnimationComplete}
        className="touch-none cursor-grab active:cursor-grabbing rounded-xl overflow-hidden"
      >
        <AnimeCard anime={anime} />
      </motion.div>
    </div>
  )
}
