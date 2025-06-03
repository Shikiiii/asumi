"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/app/context/auth-context"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Sparkles, Zap, ArrowLeft } from "lucide-react"
import { SiMyanimelist, SiAnilist } from "react-icons/si"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function LoginPage() {
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState<{ mal: boolean; anilist: boolean }>({ mal: false, anilist: false })
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleLogin = async (provider: "mal" | "anilist") => {
    setIsLoading(prev => ({ ...prev, [provider]: true }))
    try {
      await login(provider)
    } catch (error) {
      console.error(`Error logging in with ${provider}:`, error)
    } finally {
      setIsLoading(prev => ({ ...prev, [provider]: false }))
    }
  }

  return (
      <div className="min-h-screen bg-black text-white overflow-hidden flex flex-col">
      {/* Animated background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20"></div>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent"></div>

      <Header isMobile={isMobile} />

      <main className="relative container mx-auto px-4 py-8 md:py-16 flex flex-col items-center justify-center min-h-[80vh]">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl">
            <CardHeader className="text-center space-y-4 pb-6">
              <motion.div
                className="mx-auto w-14 h-14 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mb-2"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
              >
                <Sparkles className="h-7 w-7 text-white" />
              </motion.div>

              <CardTitle className="text-2xl md:text-3xl font-bold text-white bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Welcome to Asumi
              </CardTitle>

              <CardDescription className="text-base text-white/70 leading-relaxed px-2">
                Connect your anime account to unlock personalized recommendations powered by AI
              </CardDescription>

              {/* Feature badges */}
              <div className="flex justify-center gap-2 pt-2">

                <div className="inline-flex items-center gap-1 px-2 py-1 bg-pink-600/20 rounded-full border border-pink-500/30 text-xs text-pink-300">
                  <Sparkles className="h-3 w-3" />
                  Smart Matching
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 px-6 pb-6">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h3 className="text-white/90 font-medium mb-4 text-base">Connect with</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    className="h-12 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm flex items-center justify-center gap-2 border border-blue-500/30 shadow-sm transition-all"
                    onClick={() => handleLogin("mal")}
                    disabled={isLoading.mal || isLoading.anilist}
                  >
                    {isLoading.mal ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : (
                      <>
                        <SiMyanimelist className="w-5 h-5" />
                        <span>MAL</span>
                      </>
                    )}
                  </Button>
                  <Button
                    className="h-12 px-4 bg-cyan-600 hover:bg-cyan-700 text-white text-sm flex items-center justify-center gap-2 border border-cyan-500/30 shadow-sm transition-all"
                    onClick={() => handleLogin("anilist")}
                    disabled={isLoading.mal || isLoading.anilist}
                  >
                    {isLoading.anilist ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : (
                      <>
                        <SiAnilist className="w-5 h-5" />
                        <span>Anilist</span>
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>

              <motion.div
                className="text-center pt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <p className="text-xs text-white/50 mb-3 leading-relaxed">
                  By connecting, you agree to our{" "}
                  <span className="text-purple-400 hover:text-purple-300 cursor-pointer underline">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-purple-400 hover:text-purple-300 cursor-pointer underline">
                    Privacy Policy
                  </span>
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/60 hover:text-white hover:bg-white/5 transition-all"
                  onClick={() => router.push("/")}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </motion.div>
            </CardContent>
          </Card>

          {/* Additional info */}
          <motion.div
            className="mt-6 text-center space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}