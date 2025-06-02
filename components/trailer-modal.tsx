"use client"

import { useState, useEffect, useRef } from "react"
import { X, Play, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

interface TrailerModalProps {
  trailerUrl: string
  isOpen: boolean
  onClose: () => void
  animeTitle?: string // Add anime title for better context
}

export default function TrailerModal({ trailerUrl, isOpen, onClose, animeTitle }: TrailerModalProps) {
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  // Handle YouTube URL formatting
  const getEmbedUrl = (url: string) => {
    if (!url) return ""

    // If it's already an embed URL, return it
    if (url.includes("youtube.com/embed")) return url

    // Extract video ID from various YouTube URL formats
    let videoId = ""

    if (url.includes("youtube.com/watch")) {
      const urlParams = new URLSearchParams(url.split("?")[1])
      videoId = urlParams.get("v") || ""
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1].split("?")[0]
    }

    if (!videoId) return ""

    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&rel=0&modestbranding=1`
  }

  const embedUrl = getEmbedUrl(trailerUrl)

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  // Handle escape key to close
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey)
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [isOpen, onClose])

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div 
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Content */}
          <motion.div 
            ref={modalRef} 
            className="relative w-full max-w-5xl mx-4 bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ duration: 0.4, type: "spring", damping: 25 }}
          >
            {/* Header */}
            <div className="relative p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-600 rounded-full">
                    <Play className="h-4 w-4 text-white fill-current" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      {animeTitle ? `${animeTitle} - Trailer` : 'Anime Trailer'}
                    </h3>
                    <p className="text-gray-400 text-sm">Official Trailer</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Mute/Unmute button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white bg-white/10 hover:bg-white/20 rounded-full border border-white/20"
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>

                  {/* Close button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white bg-white/10 hover:bg-red-600/80 rounded-full border border-white/20 hover:border-red-500"
                    onClick={onClose}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Video Container */}
            <div className="relative aspect-video w-full bg-black">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black">
                  <motion.div 
                    className="flex flex-col items-center gap-4 text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <p className="text-gray-400">Loading trailer...</p>
                  </motion.div>
                </div>
              )}

              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  className="w-full h-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  onLoad={() => setIsLoading(false)}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-white">
                  <div className="p-8 bg-red-600/20 rounded-full mb-4">
                    <X className="h-12 w-12 text-red-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Trailer Not Available</h3>
                  <p className="text-gray-400 text-center max-w-md">
                    Sorry, the trailer for this anime is currently unavailable. Please try again later.
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-gradient-to-r from-gray-900/50 to-black/50 border-t border-white/10">
              <div className="flex items-center justify-between text-sm text-gray-400">
                <p>Press ESC to close • Click outside to close</p>

              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}