"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { XCircle, ArrowLeft, RefreshCw, Headphones } from "lucide-react"
import Link from "next/link"

export default function PaymentErrorPage() {
  const handleRetry = () => {
    window.history.back()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Error Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="h-12 w-12 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Error en el Pago</h1>
            <p className="text-gray-600">
              Hubo un problema al procesar tu pago. No te preocupes, no se realizó ningún cargo.
            </p>
          </div>

          {/* Error Details */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-red-600">¿Qué pasó?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant="destructive">
                <AlertDescription>El pago no pudo ser procesado. Esto puede deberse a varios motivos:</AlertDescription>
              </Alert>

              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Fondos insuficientes en tu cuenta o tarjeta
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Información de tarjeta incorrecta o vencida
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Problemas temporales con el procesador de pagos
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Restricciones del banco o tarjeta de crédito
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Solutions */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>¿Qué puedes hacer?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Verifica tu información</h4>
                    <p className="text-sm text-gray-600">
                      Asegúrate de que los datos de tu tarjeta sean correctos y que no esté vencida.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Prueba otro método de pago</h4>
                    <p className="text-sm text-gray-600">Intenta con PayPal, Mercado Pago o una tarjeta diferente.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Contacta a tu banco</h4>
                    <p className="text-sm text-gray-600">
                      Si el problema persiste, verifica con tu banco que no haya restricciones.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button onClick={handleRetry} className="w-full bg-orange-600 hover:bg-orange-700">
                <RefreshCw className="h-4 w-4 mr-2" />
                Intentar Nuevamente
              </Button>
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/cart">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver al Carrito
                </Link>
              </Button>
            </div>

            <Button variant="outline" className="w-full bg-transparent" asChild>
              <Link href="/contact">
                <Headphones className="h-4 w-4 mr-2" />
                Contactar Soporte
              </Link>
            </Button>
          </div>

          {/* Support Info */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">¿Necesitas ayuda?</h4>
            <p className="text-sm text-blue-800 mb-3">
              Nuestro equipo de soporte está disponible 24/7 para ayudarte con cualquier problema de pago.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 text-sm">
              <span className="text-blue-800">📞 +57 300 123 4567</span>
              <span className="text-blue-800">📧 soporte@motofull.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
