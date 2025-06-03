"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Provider = "mal" | "anilist"

interface User {
  provider: Provider
  access_token: string,
  refresh_token: string,
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (provider: Provider) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      try {
        const response = await fetch("/api/auth/session")
        if (response.ok) {
          const data = await response.json()
          if (data.user) {
            setUser(data.user)
          }
        }
      } catch (error) {
        console.error("Error checking session:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [])

  const login = async (provider: Provider) => {
    setIsLoading(true)

    try {
      if (provider === "mal") {
        const { url, code_verifier, state } = await (await fetch("/api/auth/mal")).json();

        // Save `code_verifier` and `state` in sessionStorage for later use
        sessionStorage.setItem("mal_state", state);
        sessionStorage.setItem("mal_code_verifier", code_verifier);

        // Redirect to the auth URL
        window.location.href = url;
        return;
      } else {
        const client_id = process.env.NEXT_PUBLIC_ANILIST__CLIENT_ID;
        window.location.href = `https://anilist.co/api/v2/oauth/authorize?client_id=${client_id}&response_type=token`;
        return;
      }
    } catch (error) {
      console.error(`Error logging in with ${provider}:`, error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("asumi_session")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
