"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/app/context/auth-context"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState<{ mal: boolean; anilist: boolean }>({ mal: false, anilist: false })
  const router = useRouter()

  const handleLogin = async (provider: "mal" | "anilist") => {
    setIsLoading({ ...isLoading, [provider]: true })
    try {
      await login(provider)
    } catch (error) {
      console.error(`Error logging in with ${provider}:`, error)
    } finally {
      setIsLoading({ ...isLoading, [provider]: false })
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border-white/10">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-white">Welcome to AnimeSwipe</CardTitle>
        <CardDescription className="text-white/70">
        Connect your account to get personalized anime recommendations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12"
        onClick={() => handleLogin("mal")}
        disabled={isLoading.mal}
        >
        {isLoading.mal ? "Connecting..." : "Connect with MyAnimeList"}
        </Button>

        <Button
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-12"
        onClick={() => handleLogin("anilist")}
        disabled={isLoading.anilist}
        >
        {isLoading.anilist ? "Connecting..." : "Connect with Anilist"}
        </Button>
      </CardContent>
      <CardFooter className="flex flex-col items-center text-sm text-white/60 space-y-2">
        <div>By connecting, you agree to our Terms of Service and Privacy Policy</div>
        <Button
        className="bg-white hover:bg-gray-300 text-black h-10"
        onClick={() => router.push("/")}
        >
        Go back
        </Button>
      </CardFooter>
      </Card>
      <footer className="mt-4 text-sm text-white/60 text-center">
      © 2025 AnimeSwipe. Not affiliated with MyAnimeList or Anilist.
      </footer>
    </div>
  )
}
