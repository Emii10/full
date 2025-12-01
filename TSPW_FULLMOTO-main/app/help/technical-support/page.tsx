"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wrench, Phone, MessageCircle, Video, Clock } from "lucide-react"
import Link from "next/link"

const supportServices = [
  {
    title: "Asesoría de Compatibilidad",
    description: "Te ayudamos a encontrar los repuestos exactos para tu motocicleta",
    duration: "15-30 min",
    availability: "Lun-Vie 9:00-18:00",
    methods: ["Teléfono", "Chat", "Email"],
  },
  {
    title: "Guías de Instalación",
    description: "Instrucciones paso a paso para instalar tus repuestos",
    duration: "Según producto",
    availability: "24/7 Online",
    methods: ["Video", "PDF", "Chat"],
  },
  {
    title: "Soporte Post-Venta",
    description: "Ayuda con productos ya instalados y resolución de problemas",
    duration: "30-60 min",
    availability: "Lun-Sáb 9:00-18:00",
    methods: ["Teléfono", "WhatsApp", "Video"],
  },
]

const commonIssues = [
  {
    category: "Frenos",
    issues: [
      "Ruido al frenar después de instalar pastillas nuevas",
      "Vibración en el freno delantero",
      "Pérdida de potencia de frenado",
    ],
  },
  {
    category: "Escapes",
    issues: [
      "Ruido excesivo después de la instalación",
      "Pérdida de potencia con escape nuevo",
      "Problemas de montaje",
    ],
  },
  {
    category: "Suspensión",
    issues: ["Ajuste de precarga y compresión", "Fugas en amortiguadores", "Configuración para peso del piloto"],
  },
]

export default function TechnicalSupportPage() {
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
            <Wrench className="h-16 w-16 text-orange-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Soporte Técnico</h1>
            <p className="text-lg text-gray-600">Nuestros expertos están aquí para ayudarte</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {supportServices.map((service, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">{service.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{service.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {service.availability}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {service.methods.map((method, methodIndex) => (
                      <Badge key={methodIndex} className="text-xs bg-orange-100 text-orange-700">
                        {method}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Contacto Directo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Phone className="h-4 w-4 mr-2" />
                  Llamar: +52 55 3718 76
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp: +52 55 3718 76
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Video className="h-4 w-4 mr-2" />
                  Videollamada (Con cita)
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Horarios de Atención</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-medium">Lunes - Viernes</span>
                  <span className="text-sm">9:00 - 18:00</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium">Sábados</span>
                  <span className="text-sm">9:00 - 14:00</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Domingos</span>
                  <span className="text-sm text-gray-500">Cerrado</span>
                </div>
                <p className="text-xs text-gray-500 mt-4">*Chat online disponible 24/7 con respuesta automática</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Problemas Comunes y Soluciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {commonIssues.map((category, index) => (
                  <div key={index} className="space-y-3">
                    <h4 className="font-semibold text-lg text-orange-600">{category.category}</h4>
                    <ul className="space-y-2">
                      {category.issues.map((issue, issueIndex) => (
                        <li key={issueIndex} className="text-sm text-gray-600 flex items-start">
                          <span className="text-orange-600 mr-2">•</span>
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
