// app/auth/login/page.tsx
"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// 👇 Ruta relativa desde app/auth/login → app/contexts
import { useAuth } from "../../contexts/AuthContext"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      // 👇 En lugar de res.json() directo
      const text = await res.text()
      let data: any = null

      if (text) {
        try {
          data = JSON.parse(text)
        } catch (parseError) {
          console.error("Error al parsear JSON de /api/auth/login:", parseError, text)
        }
      }

      if (!res.ok) {
        // si la API mandó { error: "..." }
        throw new Error(data?.error || "Error al iniciar sesión")
      }

      if (!data?.user) {
        throw new Error("Respuesta inválida del servidor")
      }

      // 👇 igual que tu código original
      login(data.user)

      if (data.user.role === "admin") {
        router.push("/admin/dashboard")
      } else {
        router.push("/")
      }
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Error inesperado")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h1>

        {error && (
          <p className="mb-4 text-red-600 text-sm text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Correo</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Contraseña</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        <p className="mt-4 text-sm text-center">
          ¿No tienes cuenta?{" "}
          <Link href="/auth/register" className="text-blue-600 hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  )
}
