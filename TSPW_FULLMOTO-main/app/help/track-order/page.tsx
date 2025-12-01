"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Truck, CheckCircle, Clock, MapPin } from "lucide-react"
import Link from "next/link"

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("")
  const [trackingResult, setTrackingResult] = useState<any>(null)

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulación de seguimiento
    setTrackingResult({
      orderNumber: orderNumber,
      status: "En tránsito",
      estimatedDelivery: "Mañana 15:00 - 18:00",
      currentLocation: "Centro de distribución CDMX",
      timeline: [
        { status: "Pedido confirmado", date: "Hace 2 días", completed: true },
        { status: "En preparación", date: "Hace 1 día", completed: true },
        { status: "Enviado", date: "Hoy 08:00", completed: true },
        { status: "En tránsito", date: "Hoy 14:30", completed: true },
        { status: "Entregado", date: "Pendiente", completed: false },
      ],
    })
  }

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
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Rastrear Pedido</h1>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Ingresa tu número de pedido</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTrackOrder} className="space-y-4">
                <Input
                  placeholder="Ej: MOT-2024-001234"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  required
                />
                <Button type="submit" className="w-full">
                  <Truck className="h-4 w-4 mr-2" />
                  Rastrear Pedido
                </Button>
              </form>
            </CardContent>
          </Card>

          {trackingResult && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Pedido #{trackingResult.orderNumber}
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    {trackingResult.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                  <Clock className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">Entrega estimada</p>
                    <p className="text-sm text-green-600">{trackingResult.estimatedDelivery}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-800">Ubicación actual</p>
                    <p className="text-sm text-blue-600">{trackingResult.currentLocation}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Historial del pedido</h3>
                  {trackingResult.timeline.map((item: any, index: number) => (
                    <div key={index} className="flex items-center space-x-3">
                      {item.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <div className="h-5 w-5 border-2 border-gray-300 rounded-full" />
                      )}
                      <div className="flex-1">
                        <p className={`font-medium ${item.completed ? "text-gray-900" : "text-gray-500"}`}>
                          {item.status}
                        </p>
                        <p className="text-sm text-gray-500">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
