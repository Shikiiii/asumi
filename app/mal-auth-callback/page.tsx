"use client"
import { useEffect } from "react"

export default function MalAuthCallback() {
  useEffect(() => {
    const handleAuthCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      const returnedState = urlParams.get("state");
      const malCodeVerifier = sessionStorage.getItem("mal_code_verifier");

      const response = await fetch("/api/auth/callback/mal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          state: returnedState,
          mal_code_verifier: malCodeVerifier,
        }),
      });

      if (response.ok === false) {
        window.location.href = "/login";
        return;
      }

      const { access_token, refresh_token } = await response.json();

      const newUser = {
        provider: "mal",
        access_token: access_token,
        refresh_token: refresh_token,
      };

      localStorage.setItem("asumi_session", JSON.stringify(newUser));

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