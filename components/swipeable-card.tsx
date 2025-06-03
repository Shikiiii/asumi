import { useState } from 'react'
import { motion, PanInfo, useMotionValue, useTransform, animate } from 'framer-motion' // Import animate
import AnimeCard from './anime-card'
import type { Anime } from '@/types/anime'

interface SwipeableCardProps {
  anime: Anime
  onSwipe?: (direction: 'left' | 'right') => void
  onRewind?: () => void
  onInfo?: () => void
  onShare?: (id: string) => void
  isBackground?: boolean
}

export default function SwipeableCard({ anime, onSwipe, onRewind, onInfo, onShare, isBackground = false }: SwipeableCardProps) {
  const [isDragging, setIsDragging] = useState(false)
  
  const x = useMotionValue(0)
  // Reduced rotation for a less dramatic effect, can make it feel smoother
  const rotate = useTransform(x, [-200, 200], [15, -15]) 
  // Adjust opacity range to ensure full fade-out during exit animation
  const opacity = useTransform(x, [-250, -150, 0, 150, 250], [0, 1, 1, 1, 0])

  
  const handleDragStart = () => {
    setIsDragging(true)
  }

  const handleDragEnd = (event: any, info: PanInfo) => {
    setIsDragging(false)
    
    const swipeThreshold = 80 // How far the card needs to be dragged to be considered a swipe
    const velocityThreshold = 200 // How fast the card needs to be moving
    const { offset, velocity } = info
    
    if (Math.abs(offset.x) > swipeThreshold || Math.abs(velocity.x) > velocityThreshold) {
      const direction = offset.x > 0 ? 'right' : 'left'
      const exitX = direction === 'right' ? 300 : -300  // Fixed: changed : to ?
      
      // Call onSwipe IMMEDIATELY, not after animation
      onSwipe?.(direction)
      
      // Then animate the current card out
      animate(x, exitX, { 
        type: "spring", 
        stiffness: 400,
        damping: 35
      })
    } else {
      // Snap back to center smoothly
      animate(x, 0, { 
        type: "spring", 
        stiffness: 500,
        damping: 30
      })
    }
  }

  const dragProps = isBackground ? {} : {
    drag: "x" as const,
    dragConstraints: { left: -250, right: 250 },
    dragElastic: 0.3,
    onDragStart: handleDragStart,
    onDragEnd: handleDragEnd,
  }

  return (
    <motion.div
      className={`w-full max-w-sm mx-auto ${!isBackground ? 'cursor-grab active:cursor-grabbing' : ''}`}
      style={{ 
        x: isBackground ? 0 : x, 
        rotate: isBackground ? 0 : rotate, 
        opacity: isBackground ? 0.3 : opacity, 
        transformOrigin: 'top center',
        scale: isBackground ? 0.95 : 1, 
      }}
      initial={{ opacity: 0, scale: isBackground ? 0.9 : 0.8 }}
      animate={{ 
        opacity: isBackground ? 0.3 : 1, 
        scale: isBackground ? 0.95 : (isDragging ? 1.05 : 1) 
      }}
      transition={{ 
        opacity: { duration: 0.3 },
        scale: { type: "spring", stiffness: 400, damping: 25 }
      }}
      {...dragProps}
    >
      {/* Swipe indicators */}
      {!isBackground && (
        <>
          {/* LIKE indicator */}
          <motion.div
            className="absolute top-1/2 left-8 transform -translate-y-1/2 z-10 select-none"
            style={{ 
              opacity: useTransform(x, [20, 80], [0, 1]),
              scale: useTransform(x, [20, 80], [0.8, 1.2]),
              rotate: useTransform(x, [20, 80], [-10, 10])
            }}
          >
            <div className="relative">
              {/* Glowing background */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl blur-lg opacity-60 animate-pulse"></div>
              
              {/* Main content */}
              <div className="relative bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-black text-xl tracking-wider shadow-2xl border-2 border-green-300">
                <span className="drop-shadow-lg">💚 LOVE</span>
                
                {/* Sparkle effects */}
                <div className="absolute -top-2 -right-2 text-yellow-300 text-xs animate-bounce">✨</div>
                <div className="absolute -bottom-1 -left-1 text-yellow-300 text-xs animate-bounce delay-100">⭐</div>
              </div>
            </div>
          </motion.div>
          
          {/* NOPE indicator */}
          <motion.div
            className="absolute top-1/2 right-8 transform -translate-y-1/2 z-10 select-none"
            style={{ 
              opacity: useTransform(x, [-80, -20], [1, 0]),
              scale: useTransform(x, [-80, -20], [1.2, 0.8]),
              rotate: useTransform(x, [-80, -20], [10, -10])
            }}
          >
            <div className="relative">
              {/* Glowing background */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-rose-500 rounded-xl blur-lg opacity-60 animate-pulse"></div>
              
              {/* Main content */}
              <div className="relative bg-gradient-to-r from-red-500 to-rose-600 text-white px-6 py-3 rounded-xl font-black text-xl tracking-wider shadow-2xl border-2 border-red-300">
                <span className="drop-shadow-lg">❌ NOPE</span>
                
                {/* Fire effects */}
                <div className="absolute -top-2 -right-2 text-orange-400 text-xs animate-bounce">🔥</div>
                <div className="absolute -bottom-1 -left-1 text-orange-400 text-xs animate-bounce delay-150">💥</div>
              </div>
            </div>
          </motion.div>
        </>
      )}

      <AnimeCard 
        anime={anime}
        onSwipe={onSwipe}
        onRewind={onRewind}
        onInfo={onInfo}
        onShare={onShare}
        showButtons={!isDragging && !isBackground} // Hide buttons for background cards
      />
    </motion.div>
  )
}