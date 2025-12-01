"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, CheckCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"

export default function VerifyEmailPage() {
  const [isResending, setIsResending] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const email = searchParams.get("email") || "tu@email.com"

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [countdown])

  const handleResendEmail = async () => {
    setIsResending(true)
    setResendSuccess(false)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setResendSuccess(true)
      setCountdown(60)
      setCanResend(false)
    } catch (error) {
      console.error("Error resending email:", error)
    } finally {
      setIsResending(false)
    }
  }

  const handleVerificationComplete = () => {
    // Simulate email verification
    router.push("/auth/login?verified=true")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to home */}
        <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a Motofull
        </Link>

        <Card className="shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Verifica tu Correo</CardTitle>
            <CardDescription>Te hemos enviado un enlace de verificación</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">Hemos enviado un enlace de verificación a:</p>
              <p className="font-medium text-gray-900 bg-gray-50 p-2 rounded">{email}</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Instrucciones:</h4>
              <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                <li>Revisa tu bandeja de entrada</li>
                <li>Busca el correo de Motofull</li>
                <li>Haz clic en el enlace de verificación</li>
                <li>Regresa aquí para continuar</li>
              </ol>
            </div>

            {resendSuccess && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>Correo de verificación reenviado exitosamente</AlertDescription>
              </Alert>
            )}

            <div className="space-y-3">
              <Button
                onClick={handleResendEmail}
                variant="outline"
                className="w-full bg-transparent"
                disabled={isResending || !canResend}
              >
                {isResending ? "Reenviando..." : canResend ? "Reenviar Correo" : `Reenviar en ${countdown}s`}
              </Button>

              {/* Demo button for testing */}
              <Button onClick={handleVerificationComplete} className="w-full bg-green-600 hover:bg-green-700">
                ✓ Simular Verificación Completada
              </Button>
            </div>

            <div className="text-center text-sm text-gray-600">
              <p>¿No recibiste el correo?</p>
              <p>Revisa tu carpeta de spam o correo no deseado</p>
            </div>

            <div className="text-center">
              <Link href="/auth/login" className="text-sm text-orange-600 hover:text-orange-700">
                Volver al inicio de sesión
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
