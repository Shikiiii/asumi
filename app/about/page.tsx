"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Heart, Zap, Users, Shield, Code, Github, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function AboutPage() {
  const router = useRouter()

  const features = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Smart Recommendations",
      description: "Discover anime tailored to your taste through intelligent matching algorithms"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast",
      description: "Swipe through recommendations instantly with smooth, responsive animations"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Social Integration",
      description: "Connect with MyAnimeList and AniList to sync your watchlist seamlessly"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Privacy First",
      description: "Your data stays secure with OAuth authentication and minimal data collection"
    }
  ]

  const techStack = [
    "Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", 
    "MyAnimeList API", "AniList GraphQL", "OAuth 2.0"
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20"></div>
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent"></div>
      
      <Header />

      <main className="relative z-10 container mx-auto px-4 py-8 md:py-16 max-w-4xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Asumi
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto">
            The modern way to discover your next favorite anime. Swipe, match, and watch.
          </p>
          
          <div className="flex flex-wrap gap-2 justify-center">
            {techStack.map((tech, index) => (
              <Badge 
                key={index}
                variant="outline" 
                className="text-white/70 border-white/30 bg-white/10"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6 mb-16"
        >
          {features.map((feature, index) => (
            <Card key={index} className="bg-white/5 border-white/20 p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-lg text-pink-400">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/70">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Connect", desc: "Link your MyAnimeList or AniList account" },
              { step: "2", title: "Swipe", desc: "Browse personalized anime recommendations" },
              { step: "3", title: "Discover", desc: "Build your watchlist and find new favorites" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-white/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <Card className="bg-white/5 border-white/20 p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-4">About This Project</h2>
            <div className="space-y-4 text-white/80">
              <p>
                AnimeSwipe was born from the idea that discovering new anime should be as engaging as watching it. 
                Instead of scrolling through endless lists, why not make it interactive and fun?
              </p>
              <p>
                Built with modern web technologies, AnimeSwipe provides a smooth, responsive experience that works 
                seamlessly across all your devices. The app integrates directly with popular anime platforms to 
                keep your watchlist synchronized.
              </p>
              <p>
                Whether you're a seasoned otaku or just starting your anime journey, AnimeSwipe helps you find 
                shows that match your taste and discover hidden gems you might have missed.
              </p>
            </div>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Swiping?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => router.push("/login")}
              className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Get Started
            </Button>
            

          </div>
        </motion.div>
      </main>
    <div className="flex-shrink-0">
        <Footer />
    </div>
    </div>
  )
}