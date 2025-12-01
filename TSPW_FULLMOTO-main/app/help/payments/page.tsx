"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Smartphone, Building, Shield } from "lucide-react"
import Link from "next/link"

const paymentMethods = [
  {
    icon: CreditCard,
    title: "Tarjetas de Crédito y Débito",
    methods: ["Visa", "MasterCard", "American Express"],
    features: ["Pago inmediato", "Meses sin intereses", "Seguridad SSL"],
    color: "text-blue-600",
  },
  {
    icon: Smartphone,
    title: "Pagos Digitales",
    methods: ["PayPal", "Mercado Pago", "Apple Pay"],
    features: ["Pago rápido", "Sin compartir datos", "Protección al comprador"],
    color: "text-green-600",
  },
  {
    icon: Building,
    title: "Transferencia Bancaria",
    methods: ["BBVA", "Santander", "Banamex", "HSBC"],
    features: ["Descuento 3%", "Confirmación 24hrs", "Seguro y confiable"],
    color: "text-purple-600",
  },
]

export default function PaymentsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white border-2 border-orange-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-orange-700 font-bold text-xl">M</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">Motofull</span>
            </Link>
            <Link href="/help" className="text-orange-600 hover:text-orange-700">
              ← Volver a Ayuda
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <CreditCard className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Métodos de Pago</h1>
            <p className="text-lg text-gray-600">Elige la forma de pago que más te convenga</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {paymentMethods.map((method, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <method.icon className={`h-12 w-12 ${method.color} mx-auto mb-4`} />
                  <CardTitle className="text-lg">{method.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {method.methods.map((item, itemIndex) => (
                      <Badge key={itemIndex} variant="outline" className="mr-2 mb-2">
                        {item}
                      </Badge>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {method.features.map((feature, featureIndex) => (
                      <p key={featureIndex} className="text-sm text-gray-600">
                        ✓ {feature}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Meses Sin Intereses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">3 meses</span>
                    <span className="text-sm text-gray-600">Compras desde $1,500</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">6 meses</span>
                    <span className="text-sm text-gray-600">Compras desde $3,000</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">12 meses</span>
                    <span className="text-sm text-gray-600">Compras desde $6,000</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  *Disponible con tarjetas participantes. Sujeto a aprobación bancaria.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 text-green-600 mr-2" />
                  Seguridad en Pagos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Shield className="h-4 w-4 text-green-600 mt-1" />
                  <p className="text-sm">Encriptación SSL de 256 bits</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="h-4 w-4 text-green-600 mt-1" />
                  <p className="text-sm">Certificación PCI DSS</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="h-4 w-4 text-green-600 mt-1" />
                  <p className="text-sm">Verificación 3D Secure</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="h-4 w-4 text-green-600 mt-1" />
                  <p className="text-sm">Protección antifraude</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Pago en Efectivo - OXXO</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-red-50 rounded-lg">
                  <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                    1
                  </div>
                  <h4 className="font-semibold mb-2">Selecciona</h4>
                  <p className="text-sm text-gray-600">Pago en OXXO al finalizar compra</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                    2
                  </div>
                  <h4 className="font-semibold mb-2">Recibe</h4>
                  <p className="text-sm text-gray-600">Código de barras por email</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                    3
                  </div>
                  <h4 className="font-semibold mb-2">Paga</h4>
                  <p className="text-sm text-gray-600">En cualquier tienda OXXO</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                    4
                  </div>
                  <h4 className="font-semibold mb-2">Confirma</h4>
                  <p className="text-sm text-gray-600">Tu pedido se procesa automáticamente</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Importante:</strong> Tienes 3 días para realizar el pago. Después de este tiempo, el pedido se
                  cancelará automáticamente.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
