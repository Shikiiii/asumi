"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, Settings, Star, Heart, TrendingUp, Calendar, ArrowLeft, Edit, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ProfilePage() {
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)
  
  interface UserData {
    provider: string;
    access_token: string;
    refresh_token: string | null;
  }
  const [userData, setUserData] = useState<UserData>({ provider: "", access_token: "", refresh_token: null });

  interface UserInfo {
    username: string;
    avatar: string;
    watching: number,
    completed: number,
    ptw: number,
    onhold: number,
    dropped: number,
    days_watched: number,
    episodes: number,
    avg_score: number,
  }
  const [userInfo, setUserInfo] = useState<UserInfo>({ username: "", avatar: "", watching: 0, completed: 0, ptw: 0, onhold: 0, dropped: 0, days_watched: 0, episodes: 0, avg_score: 0 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Check if animeswipe_session exists in local storage
    const session = localStorage.getItem("animeswipe_session")
    if (session) {
      try {
        const parsedSession = JSON.parse(session);
        const updatedUserData = { provider: parsedSession.provider || "", access_token: parsedSession.access_token || "", refresh_token: parsedSession.refresh_token || null };
        setUserData(updatedUserData);
        if (updatedUserData.provider === "mal") {
            fetch("/api/info/mal", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                access_token: updatedUserData.access_token,
                refresh_token: updatedUserData.refresh_token,
              }),
            })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Failed to fetch user info from MAL");
              }
              return response.json();
            })
            .then((data) => {
              console.log("Updated user info:", data);
              setUserInfo(data);
            })
            .catch((error) => {
              console.error("Error fetching user info from MAL:", error);
              router.push("/login");
            });
        } else if (updatedUserData.provider === "anilist") {
          const viewerQuery = `
            query {
              Viewer {
                name
              }
            }
          `;

          // Step 1: Get username
          fetch("https://graphql.anilist.co", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${updatedUserData.access_token}`,
            },
            body: JSON.stringify({ query: viewerQuery }),
          })
            .then(res => res.json())
            .then(viewerData => {
              const username = viewerData.data?.Viewer?.name;
              if (!username) throw new Error("Could not retrieve AniList username");

              // Step 2: Fetch full info
              const fullQuery = `
                query ($userName: String!) {
                  Viewer {
                    name
                    avatar {
                      large
                    }
                    statistics {
                      anime {
                        episodesWatched
                        meanScore
                        minutesWatched
                      }
                    }
                  }
                  MediaListCollection(userName: $userName, type: ANIME) {
                    lists {
                      status
                      entries {
                        id
                      }
                    }
                  }
                }
              `;

              return fetch("https://graphql.anilist.co", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${updatedUserData.access_token}`,
                },
                body: JSON.stringify({
                  query: fullQuery,
                  variables: { userName: username },
                }),
              });
            })
            .then(res => res.json())
            .then(data => {
              const viewer = data.data?.Viewer;
              const stats = viewer?.statistics?.anime;
              const lists = data.data?.MediaListCollection?.lists || [];

              const listCounts: Record<string, number> = {
                COMPLETED: 0,
                CURRENT: 0,
                PLANNING: 0,
                PAUSED: 0,
                DROPPED: 0,
              };

              for (const list of lists) {
                if (list.status in listCounts) {
                  listCounts[list.status] = list.entries.length;
                }
              }

              const userInfo: UserInfo = {
                username: viewer.name,
                avatar: viewer.avatar?.large || "",
                watching: listCounts.CURRENT,
                completed: listCounts.COMPLETED,
                ptw: listCounts.PLANNING,
                onhold: listCounts.PAUSED,
                dropped: listCounts.DROPPED,
                days_watched: Math.round(stats.minutesWatched / 1440),
                episodes: stats.episodesWatched,
                avg_score: Math.round(stats.meanScore * 10) / 10,
              };

              setUserInfo(userInfo);
            })
            .catch(error => {
              console.error("Error fetching AniList user info:", error);
              router.push("/login");
            });
        }
      } catch (error) {
        console.error("Error parsing animeswipe_session:", error);
        router.push("/login");
        return;
      }
    } else {
        router.push("/login");
        return;
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("animeswipe_session")
    router.push("/login")
  }

  // Mock swiping stats
  const swipeStats = {
    totalSwipes: 324,
    matches: 89,
    passed: 235,
    matchRate: 27.5,
    todaySwipes: 12,
    streak: 5
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20"></div>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent"></div>
      
      <Header isMobile={isMobile} />

      <main className="relative container mx-auto px-4 py-8 md:py-16">
        {/* Header with back button */}
        <motion.div 
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Button
            variant="ghost"
            onClick={() => router.push("/swipe")}
            className="text-white/60 hover:text-white hover:bg-white/10 transition-all"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Swiping
          </Button>
          
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 hover:border-white/40"
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-[350px_1fr] gap-8">
            {/* Profile Card */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl">
                <CardContent className="pt-8 pb-6">
                  <div className="flex flex-col items-center text-center">
                    {/* Avatar with edit button */}
                    <div className="relative group">
                      <Avatar className="w-28 h-28 border-4 border-gradient-to-r from-pink-500 to-purple-500">
                        <AvatarImage src={userInfo.avatar || "/placeholder.svg?height=112&width=112"} alt={userInfo.username} />
                        <AvatarFallback className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500">
                          {userInfo.username.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    {/* User info */}
                    <h2 className="mt-6 text-2xl font-bold text-white bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                      {userInfo.username}
                    </h2>

                    {/* Provider button - clickable */}
                    <Button
                      variant="ghost"
                      onClick={() => {
                        const profileUrl = userData.provider === 'mal' 
                          ? `https://myanimelist.net/profile/${userInfo.username}`
                          : `https://anilist.co/user/${userInfo.username}`;
                        window.open(profileUrl, '_blank');
                      }}
                      className="flex items-center gap-2 mt-2 px-3 py-1 bg-white/10 rounded-full hover:bg-white/20 transition-all hover:scale-105"
                    >
                      <div className={`w-2 h-2 rounded-full ${userData.provider === 'mal' ? 'bg-blue-400' : 'bg-cyan-400'}`} />
                      <span className="text-sm text-white/80">
                        {userData.provider === "mal"
                          ? "MyAnimeList"
                          : userData.provider === "anilist"
                          ? "AniList"
                          : "Unknown Provider"}
                      </span>
                      <ExternalLink className="h-3 w-3 text-white/60" />
                    </Button>

                    {/* Quick stats */}
                    <div className="grid grid-cols-2 gap-4 mt-6 w-full">
                      <div className="bg-white/5 rounded-lg p-3 text-center">
                        <div className="text-lg font-bold text-white">{userInfo.completed + userInfo.watching + userInfo.onhold + userInfo.dropped}</div>
                        <div className="text-xs text-white/60">Total Anime</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3 text-center">
                        <div className="text-lg font-bold text-white">
                          {userInfo.avg_score
                            ? Math.round(
                                (userInfo.avg_score > 10
                                  ? userInfo.avg_score / 10
                                  : userInfo.avg_score) * 10
                              ) / 10
                            : 0}/10</div>
                        <div className="text-xs text-white/60">Avg Score</div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2 mt-6 w-full">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-white/20 text-white hover:bg-white/10 hover:border-white/40"
                      >
                        <Edit className="mr-2 h-3 w-3" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleLogout}
                        className="flex-1 bg-red-600/80 hover:bg-red-600 border-0"
                      >
                        <LogOut className="mr-2 h-3 w-3" />
                        Logout
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Stats and Activity */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Detailed Stats */}
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <TrendingUp className="h-5 w-5 text-purple-400" />
                    Your Anime Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-green-600/20 to-green-700/20 rounded-lg p-4 border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="h-4 w-4 text-green-400" />
                        <span className="text-sm text-white/80">Completed</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{userInfo.completed}</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-cyan-600/20 to-teal-700/20 rounded-lg p-4 border border-cyan-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-cyan-400" />
                        <span className="text-sm text-white/80">Watching</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{userInfo.watching}</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-600/20 to-blue-700/20 rounded-lg p-4 border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-blue-400" />
                        <span className="text-sm text-white/80">Plan to Watch</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{userInfo.ptw}</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-yellow-600/20 to-amber-700/20 rounded-lg p-4 border border-yellow-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm text-white/80">On Hold</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{userInfo.onhold}</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-red-600/20 to-red-700/20 rounded-lg p-4 border border-red-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-red-400" />
                        <span className="text-sm text-white/80">Dropped</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{userInfo.dropped}</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-pink-600/20 to-purple-600/20 rounded-lg p-4 border border-pink-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="h-4 w-4 text-pink-400" />
                        <span className="text-sm text-white/80">Episodes</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{userInfo.episodes}</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 rounded-lg p-4 border border-yellow-500/20 md:col-span-2">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm text-white/80">Days Watched</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{userInfo.days_watched}</div>
                      <div className="text-xs text-white/60 mt-1">That's {Math.round(userInfo.days_watched * 24)} hours!</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-lg p-4 border border-purple-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="h-4 w-4 text-purple-400" />
                        <span className="text-sm text-white/80">Avg Rating</span>
                      </div>
                      <div className="text-2xl font-bold text-white">
                      {userInfo.avg_score
                        ? Math.round(
                            (userInfo.avg_score > 10
                              ? userInfo.avg_score / 10
                              : userInfo.avg_score) * 10
                          ) / 10
                        : 0}/10</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              {/* Swiping Stats */}
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Heart className="h-5 w-5 text-pink-400" />
                    Your Swiping Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-pink-600/20 to-red-600/20 rounded-lg p-4 border border-pink-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Heart className="h-4 w-4 text-pink-400" />
                        <span className="text-sm text-white/80">Matches</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{swipeStats.matches}</div>
                      <div className="text-xs text-white/60 mt-1">You liked these!</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-gray-600/20 to-gray-700/20 rounded-lg p-4 border border-gray-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-white/80">Passed</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{swipeStats.passed}</div>
                      <div className="text-xs text-white/60 mt-1">Not your type</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-lg p-4 border border-purple-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-purple-400" />
                        <span className="text-sm text-white/80">Match Rate</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{swipeStats.matchRate}%</div>
                      <div className="text-xs text-white/60 mt-1">Pretty selective!</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-lg p-4 border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="h-4 w-4 text-blue-400" />
                        <span className="text-sm text-white/80">Total Swipes</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{swipeStats.totalSwipes}</div>
                      <div className="text-xs text-white/60 mt-1">Keep swiping!</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-orange-600/20 to-yellow-600/20 rounded-lg p-4 border border-orange-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-orange-400" />
                        <span className="text-sm text-white/80">Today</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{swipeStats.todaySwipes}</div>
                      <div className="text-xs text-white/60 mt-1">Swipes today</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-lg p-4 border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-green-400" />
                        <span className="text-sm text-white/80">Streak</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{swipeStats.streak}</div>
                      <div className="text-xs text-white/60 mt-1">Days active</div>
                    </div>
                  </div>
                  
                  {/* Quick action button */}
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <Button
                      onClick={() => router.push("/swipe")}
                      className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white shadow-lg hover:shadow-pink-500/25 transition-all hover:scale-105"
                    >
                      <Heart className="mr-2 h-4 w-4" />
                      Continue Swiping
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}