"use client"
import { useEffect } from "react"

export default function AnilistAuthCallback() {
  useEffect(() => {
    const handleAuthCallback = async () => {
      const hash = window.location.hash.substring(1); // remove the '#' at the start
      const params = new URLSearchParams(hash);

      const newUser = {
        provider: "anilist",
        access_token: params.get("access_token"),
      };

      localStorage.setItem("animeswipe_session", JSON.stringify(newUser));

      window.location.href = "/swipe";
    };

    handleAuthCallback();
  }, [])

return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <h1>Just a moment...</h1>
    </div>
);
}