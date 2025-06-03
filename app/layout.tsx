import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/app/context/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Asumi - Discover Your Next Favorite Anime",
  description: "Swipe through personalized anime recommendations based on your MyAnimeList or Anilist profile",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  openGraph: {
    title: "Asumi - Discover Your Next Favorite Anime",
    description: "Swipe through personalized anime recommendations based on your MyAnimeList or Anilist profile",
    url: "https://asumi.vercel.app/",
    siteName: "Asumi",
    images: [
      {
        url: "https://asumi.vercel.app/embed_image.png",
        width: 809,
        height: 340,
        alt: "Asumi preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Asumi - Discover Your Next Favorite Anime",
    description: "Swipe through personalized anime recommendations based on your MyAnimeList or Anilist profile",
    images: ["https://asumi.vercel.app/embed_image.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
