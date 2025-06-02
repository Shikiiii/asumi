"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut } from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  interface UserData {
    provider: string;
    access_token: string;
    refresh_token: string | null;
  }
  const [userData, setUserData] = useState<UserData>({ provider: "", access_token: "", refresh_token: null });

  interface UserInfo {
    username: string;
    avatar: string;
  }
  const [userInfo, setUserInfo] = useState<UserInfo>({ username: "", avatar: "" });

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
              const updatedUserInfo = {username: data.username, avatar: data.avatar}
              console.log("Updated user info:", updatedUserInfo);
              setUserInfo(updatedUserInfo);
            })
            .catch((error) => {
              console.error("Error fetching user info from MAL:", error);
              router.push("/login");
            });
        } else if (updatedUserData.provider === "anilist") {
          
            // Fetch user info from AniList
            const query = `
              query {
                Viewer {
                name
                avatar {
                  large
                }
                }
              }
            `;
            fetch("https://graphql.anilist.co", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${updatedUserData.access_token}`,
              },
              body: JSON.stringify({ query }),
            })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Failed to fetch user info from AniList");
              }
              return response.json();
            })
            .then((data) => {
              const viewer = data.data?.Viewer;
              if (viewer) {
                const updatedUserInfo = {
                  username: viewer.name,
                  avatar: viewer.avatar?.large || "",
                };
                setUserInfo(updatedUserInfo);
              } else {
                throw new Error("No user info returned from AniList");
              }
            })
            .catch((error) => {
              console.error("Error fetching user info from AniList:", error);
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
    // Clear session storage and redirect to login
    localStorage.removeItem("animeswipe_session")
    window.location.href = "/login";
  }

  return (
    <div className="min-h-screen p-4 bg-black">
      <div className="container mx-auto max-w-4xl py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">Your Profile</h1>
          <Button variant="ghost" className="text-white" onClick={() => router.push("/swipe")}>
            Back to Swiping
          </Button>
        </div>

        <div className="flex justify-center pt-8">
          <div className="grid md:grid-cols-[300px_1fr] gap-6">
            <div className="space-y-6">
              <Card className="bg-black/40 backdrop-blur-md border-white/10">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <Avatar className="w-24 h-24 border-2 border-purple-500">
                      <AvatarImage src={userInfo.avatar || "/placeholder.svg?height=96&width=96"} alt={userInfo.username} />
                      <AvatarFallback>{userInfo.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>

                    <h2 className="mt-4 text-xl font-bold text-white">{userInfo.username}</h2>
                    <div className="text-sm text-white/60 mt-1">
                      {userData.provider === "mal"
                      ? "Connected via MyAnimeList"
                      : userData.provider === "anilist"
                      ? "Connected via Anilist"
                      : "Connected via ..."}
                    </div>

                    <Button
                      variant="outline"
                      className="mt-6 w-full text-black border-white/20 hover:bg-gray-300 bg-white"
                      onClick={handleLogout} 
                    >
                      <LogOut className="mr-2 h-4 w-4"/> Logout
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
