"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Package, Truck, Mail, Download } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function PaymentSuccessPage() {
  const [orderNumber, setOrderNumber] = useState("")
  const searchParams = useSearchParams()

  useEffect(() => {
    const order = searchParams.get("order")
    if (order) {
      setOrderNumber(order.toUpperCase())
    } else {
      setOrderNumber("MF" + Math.random().toString(36).substr(2, 9).toUpperCase())
    }
  }, [searchParams])

  const orderDetails = {
    date: new Date().toLocaleDateString("es-CO"),
    estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString("es-CO"),
    total: 1299.99,
    items: [
      { name: "Kit de Frenos Brembo Racing", quantity: 1, price: 299.99 },
      { name: "Escape Akrapovic Titanio", quantity: 1, price: 899.99 },
      { name: "Filtro K&N Performance", quantity: 1, price: 79.99 },
    ],
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">¡Pago Exitoso!</h1>
            <p className="text-gray-600">
              Tu pedido ha sido procesado correctamente y pronto recibirás un correo de confirmación.
            </p>
          </div>

          {/* Order Details */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Detalles del Pedido</span>
                <Badge className="bg-green-500">Confirmado</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Número de Orden</p>
                  <p className="font-bold text-lg">#{orderNumber}</p>
                </div>
                <div>
                  <p className="text-gray-600">Fecha del Pedido</p>
                  <p className="font-medium">{orderDetails.date}</p>
                </div>
                <div>
                  <p className="text-gray-600">Total Pagado</p>
                  <p className="font-bold text-lg text-green-600">${orderDetails.total}</p>
                </div>
                <div>
                  <p className="text-gray-600">Entrega Estimada</p>
                  <p className="font-medium">{orderDetails.estimatedDelivery}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>¿Qué sigue?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Confirmación por Email</h4>
                    <p className="text-sm text-gray-600">
                      Te enviaremos un correo con todos los detalles de tu pedido y el número de seguimiento.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Package className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Preparación del Pedido</h4>
                    <p className="text-sm text-gray-600">
                      Nuestro equipo preparará tu pedido en las próximas 24 horas.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Truck className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Envío y Entrega</h4>
                    <p className="text-sm text-gray-600">Tu pedido será enviado y llegará en 2-3 días hábiles.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="w-full bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Descargar Factura
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                <Package className="h-4 w-4 mr-2" />
                Seguir Pedido
              </Button>
            </div>

            <Button className="w-full bg-orange-600 hover:bg-orange-700" asChild>
              <Link href="/">Continuar Comprando</Link>
            </Button>
          </div>

          {/* Support */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 mb-2">¿Tienes alguna pregunta sobre tu pedido?</p>
            <div className="flex justify-center space-x-4 text-sm">
              <Link href="/contact" className="text-orange-600 hover:text-orange-700">
                Contactar Soporte
              </Link>
              <span className="text-gray-400">|</span>
              <Link href="/faq" className="text-orange-600 hover:text-orange-700">
                Preguntas Frecuentes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
