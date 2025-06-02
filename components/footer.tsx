"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Github } from "lucide-react"

export default function Footer() {
  return (
    <motion.footer 
      className="relative z-10 bg-black/30 backdrop-blur-sm border-t border-white/10 mt-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          {/* Left side - Copyright */}
          <div className="text-white/50 text-xs">
            © {new Date().getFullYear()} Asumi. Not affiliated with MyAnimeList or Anilist.
          </div>
          
          {/* Right side - Links */}
          <div className="flex items-center gap-4 text-xs">
            <Link 
              href="https://github.com/Shikiiii/aniswipe" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition-colors flex items-center gap-1"
            >
              <Github className="h-3 w-3" />
              GitHub
            </Link>
            <span className="text-white/30">•</span>
            <Link 
              href="/about" 
              className="text-white/50 hover:text-white transition-colors"
            >
              About
            </Link>
            <span className="text-white/30">•</span>
            <Link 
              href="/privacy" 
              className="text-white/50 hover:text-white transition-colors"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}