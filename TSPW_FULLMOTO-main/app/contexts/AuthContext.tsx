"use client"

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

type Role = "admin" | "customer"

export type AuthUser = {
  id: number
  name: string
  email: string
  role: Role
}

type AuthContextValue = {
  user: AuthUser | null
  login: (user: AuthUser) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)

  // Leer usuario del localStorage al cargar
  useEffect(() => {
    if (typeof window === "undefined") return
    const saved = localStorage.getItem("user")
    if (saved) {
      try {
        const parsed: AuthUser = JSON.parse(saved)
        setUser(parsed)
      } catch (e) {
        console.error("Error al leer usuario de localStorage", e)
        localStorage.removeItem("user")
      }
    }
  }, [])

  const login = (userData: AuthUser) => {
    setUser(userData)
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(userData))
    }
  }

  const logout = () => {
    setUser(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem("user")
    }
  }

  const value: AuthContextValue = { user, login, logout }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error("useAuth debe usarse dentro de un <AuthProvider>")
  }
  return ctx
}
