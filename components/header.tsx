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
        <Link href="/" className="text-xl md:text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          Asumi
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
      <Link href="/" className="text-xl md:text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
        Asumi
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