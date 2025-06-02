"use client"

import { motion } from "framer-motion"
import { Shield, Lock, Eye, Users, Database, Trash2, Mail } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function PrivacyPage() {
  const router = useRouter()

  const sections = [
    {
      icon: <Database className="h-6 w-6" />,
      title: "Information We Collect",
      content: [
        "Account information from MyAnimeList or AniList (username, anime lists, preferences)",
        "Usage data (anime you swipe, preferences, interactions)",
        "Device information (browser type, IP address for security)",
        "Cookies and local storage for authentication and preferences"
      ]
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "How We Use Your Data",
      content: [
        "Provide personalized anime recommendations",
        "Sync your watchlist with connected platforms",
        "Improve our recommendation algorithms",
        "Ensure platform security and prevent abuse",
        "Send important service updates (with your consent)"
      ]
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Data Sharing",
      content: [
        "We do NOT sell your personal data to third parties",
        "Anonymous usage statistics may be shared with analytics providers",
        "Data is shared with MyAnimeList/AniList only as required for service functionality",
        "Legal compliance: We may disclose data if required by law"
      ]
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Data Security",
      content: [
        "All data transmission is encrypted using HTTPS",
        "OAuth 2.0 authentication - we never store your passwords",
        "Regular security audits and monitoring",
        "Secure cloud infrastructure with industry-standard protections",
        "Limited access to your data on a need-to-know basis"
      ]
    },
    {
      icon: <Trash2 className="h-6 w-6" />,
      title: "Your Rights",
      content: [
        "Access: Request a copy of your personal data",
        "Correction: Update or correct your information",
        "Deletion: Request deletion of your account and data",
        "Portability: Export your data in a readable format",
        "Withdrawal: Revoke consent for data processing at any time"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden flex flex-col">
      {/* Animated background */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20"></div>
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent"></div>
      
      <Header />

      <main className="relative z-10 container mx-auto px-4 py-8 md:py-16 max-w-4xl flex-1">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full">
              <Shield className="h-12 w-12 text-pink-400" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Privacy Policy
            </span>
          </h1>
          
          <p className="text-xl text-white/80 mb-4 max-w-2xl mx-auto">
            Your privacy matters to us. Here's how we protect and handle your data.
          </p>
          
          <p className="text-white/60 text-sm">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </motion.div>

        {/* Quick Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-400/30 p-6">
            <h2 className="text-xl font-bold text-green-400 mb-4">🔒 Privacy at a Glance</h2>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-semibold text-white mb-1">No Data Sales</div>
                <div className="text-white/70">We never sell your personal information</div>
              </div>
              <div>
                <div className="font-semibold text-white mb-1">Secure Storage</div>
                <div className="text-white/70">Your data is encrypted and protected</div>
              </div>
              <div>
                <div className="font-semibold text-white mb-1">Your Control</div>
                <div className="text-white/70">Delete your data anytime</div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Main Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <Card className="bg-white/5 border-white/20 p-6 backdrop-blur-sm">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-lg text-pink-400 flex-shrink-0">
                    {section.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                </div>
                
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3 text-white/80">
                      <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16"
        >
          <Card className="bg-white/5 border-white/20 p-8 backdrop-blur-sm text-center">
            <Mail className="h-8 w-8 text-pink-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Questions About Privacy?</h2>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              If you have any questions about this Privacy Policy or how we handle your data, 
              please don't hesitate to reach out to us.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => window.location.href = 'mailto:privacy@aniswipe.com'}
                className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <Mail className="mr-2 h-4 w-4" />
                Contact Us
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => router.push("/")}
                className="border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-full transition-all hover:scale-105"
              >
                Back to Home
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Cookie Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-8"
        >
          <Card className="bg-blue-500/10 border-blue-400/30 p-4">
            <div className="flex items-start gap-3">
              <div className="text-blue-400 mt-1">🍪</div>
              <div className="text-sm">
                <div className="font-semibold text-blue-400 mb-1">Cookie Usage</div>
                <div className="text-white/70">
                  We use essential cookies for authentication and preferences. No tracking cookies are used without your consent.
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </main>

      <div className="flex-shrink-0">
        <Footer />
      </div>
    </div>
  )
}