// app/layout.tsx
import type { Metadata } from "next"
import "./globals.css"
import { Inter } from "next/font/google"
import type { ReactNode } from "react"

// 🔹 Theme provider y botones flotantes
import { ThemeProvider } from "@/components/theme-provider"
import AccessibilityFeatures from "@/components/AccessibilityFeatures"
import Chatbot from "@/components/Chatbot"

// 🔹 Contextos de auth y carrito
import { AuthProvider } from "./contexts/AuthContext"
import { CartProvider } from "./contexts/CartContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Motofull",
  description: "Tienda de refacciones para moto",
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <CartProvider>
              {children}

              {/* 👇 Botón de accesibilidad y chatbot globales */}
              <AccessibilityFeatures />
              <Chatbot />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
