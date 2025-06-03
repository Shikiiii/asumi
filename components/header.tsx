"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { User, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

interface HeaderProps {
  isMobile?: boolean
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
      fontWeight="750"
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
      fontWeight="750"
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
      fontWeight="750"
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
    <g className="transition-all duration-500 group-hover:scale-110 group-hover:opacity-100" opacity="0.4" transformOrigin="140 60">
      <path d="M60 55 Q65 50 70 55 Q65 60 60 55" fill="url(#accentGradient)" />
      <path d="M210 55 Q215 50 220 55 Q215 60 210 55" fill="url(#accentGradient)" />
    </g>
  </svg>
)

export default function Header({ isMobile = false }: HeaderProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in by checking for session
    const checkAuthStatus = () => {
      const session = localStorage.getItem("asumi_session")
      setIsLoggedIn(!!session)
      setIsLoading(false)
    }

    checkAuthStatus()

    // Listen for storage changes (in case user logs in/out in another tab)
    window.addEventListener('storage', checkAuthStatus)
    
    return () => {
      window.removeEventListener('storage', checkAuthStatus)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("asumi_session")
    setIsLoggedIn(false)
    if (pathname === "/") {
      window.location.reload()
    } else {
      router.push("/")
    }

  }

  if (isLoading) {
    // Show skeleton buttons while checking auth status
    return (
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
        <div className="flex gap-2 md:gap-4">
          <div className="w-16 h-9 bg-white/10 rounded animate-pulse"></div>
          <div className="w-16 h-9 bg-white/10 rounded animate-pulse"></div>
        </div>
      </motion.header>
    )
  }
  
  return (
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
      
      <div className="flex gap-2 md:gap-4">
        {/* Show different buttons based on auth state */}
        {isLoggedIn ? (
          // Logged in: Show Profile and Logout
          <>
            {pathname !== '/profile' && (
              <Link href="/profile">
                <Button variant="ghost" size={isMobile ? "sm" : "default"} className="text-white hover:text-white hover:bg-white/10 transition-all">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
              </Link>
            )}
            {pathname !== '/swipe' && (
              <Link href="/swipe">
                <Button size={isMobile ? "sm" : "default"} className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all">
                  Swipe
                </Button>
              </Link>
            )}
            <Button 
              variant="outline" 
              size={isMobile ? "sm" : "default"} 
              onClick={handleLogout}
              className="border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-all"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </>
        ) : (
          // Not logged in: Show About and Login
          <>
            {pathname !== '/about' && (
              <Link href="/about">
                <Button variant="ghost" size={isMobile ? "sm" : "default"} className="text-white hover:text-white hover:bg-white/10 transition-all">
                  About
                </Button>
              </Link>
            )}
            {pathname !== '/login' && (
              <Link href="/login">
                <Button size={isMobile ? "sm" : "default"} className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all">
                  Login
                </Button>
              </Link>
            )}
            {pathname === '/login' && (
              <Link href="/">
                <Button variant="ghost" size={isMobile ? "sm" : "default"} className="text-white hover:text-white hover:bg-white/10 transition-all">
                  Home
                </Button>
              </Link>
            )}
          </>
        )}
      </div>
    </motion.header>
  )
}