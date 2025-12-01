"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

const warrantyInfo = [
  {
    category: "Frenos y Pastillas",
    duration: "12 meses",
    coverage: "Defectos de fabricación, desgaste prematuro",
    brands: ["Brembo", "EBC", "Ferodo"],
    color: "bg-red-50 text-red-700 border-red-200",
  },
  {
    category: "Escapes",
    duration: "24 meses",
    coverage: "Soldaduras, corrosión, defectos estructurales",
    brands: ["Akrapovic", "Yoshimura", "Arrow"],
    color: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    category: "Suspensión",
    duration: "12 meses + Servicio técnico",
    coverage: "Fugas, defectos internos, calibración",
    brands: ["Öhlins", "WP", "Showa"],
    color: "bg-green-50 text-green-700 border-green-200",
  },
  {
    category: "Filtros K&N",
    duration: "Garantía de por vida",
    coverage: "Defectos de fabricación, limpieza gratuita",
    brands: ["K&N"],
    color: "bg-purple-50 text-purple-700 border-purple-200",
  },
  {
    category: "Cadenas y Sprockets",
    duration: "6 meses",
    coverage: "Defectos de fabricación, desgaste anormal",
    brands: ["DID", "RK", "Regina"],
    color: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
]

export default function WarrantiesPage() {
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
            <Shield className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Garantías</h1>
            <p className="text-lg text-gray-600">Todos nuestros productos cuentan con garantía del fabricante</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {warrantyInfo.map((item, index) => (
              <Card key={index} className={`border-2 ${item.color}`}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {item.category}
                    <Badge className={item.color}>{item.duration}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Cobertura:</h4>
                    <p className="text-sm text-gray-600">{item.coverage}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Marcas incluidas:</h4>
                    <div className="flex flex-wrap gap-2">
                      {item.brands.map((brand, brandIndex) => (
                        <Badge key={brandIndex} variant="outline" className="text-xs">
                          {brand}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  Qué incluye la garantía
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-1" />
                  <p className="text-sm">Defectos de fabricación</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-1" />
                  <p className="text-sm">Reemplazo gratuito de productos defectuosos</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-1" />
                  <p className="text-sm">Soporte técnico especializado</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-1" />
                  <p className="text-sm">Envío gratuito de productos de reemplazo</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                  Qué NO incluye la garantía
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-4 w-4 text-red-600 mt-1" />
                  <p className="text-sm">Desgaste normal por uso</p>
                </div>
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-4 w-4 text-red-600 mt-1" />
                  <p className="text-sm">Daños por accidentes o mal uso</p>
                </div>
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-4 w-4 text-red-600 mt-1" />
                  <p className="text-sm">Modificaciones no autorizadas</p>
                </div>
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-4 w-4 text-red-600 mt-1" />
                  <p className="text-sm">Instalación incorrecta</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>¿Cómo hacer válida tu garantía?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                    1
                  </div>
                  <h4 className="font-semibold mb-2">Contacta</h4>
                  <p className="text-sm text-gray-600">Llama al +52 55 3718 76 o envía un email</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                    2
                  </div>
                  <h4 className="font-semibold mb-2">Proporciona</h4>
                  <p className="text-sm text-gray-600">Número de pedido y descripción del problema</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                    3
                  </div>
                  <h4 className="font-semibold mb-2">Recibe</h4>
                  <p className="text-sm text-gray-600">Tu producto de reemplazo sin costo</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
