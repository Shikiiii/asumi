"use client"

import { useState, useEffect, useRef } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TrailerModalProps {
  trailerUrl: string
  isOpen: boolean
  onClose: () => void
}

export default function TrailerModal({ trailerUrl, isOpen, onClose }: TrailerModalProps) {
  const [mounted, setMounted] = useState(false)
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

    return `https://www.youtube.com/embed/${videoId}?autoplay=1`
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
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div ref={modalRef} className="relative w-full max-w-3xl mx-4 bg-black rounded-lg overflow-hidden">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 z-10 text-white bg-black/50 hover:bg-black/70 rounded-full"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>

        <div className="aspect-video w-full">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              className="w-full h-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-black text-white">
              Trailer not available
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
