"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CreditCard, Truck, MapPin } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/contexts/CartContext"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const { state } = useCart()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)

  const shipping = state.total > 200 ? 0 : 15
  const tax = state.total * 0.19
  const finalTotal = state.total + shipping + tax

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate form processing
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Redirect to payment page
    router.push("/payment")
  }

  if (state.items.length === 0) {
    router.push("/cart")
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <Link href="/cart" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al Carrito
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <div className="space-y-6">
              {/* Shipping Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Información de Envío
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Nombre</Label>
                      <Input id="firstName" placeholder="Juan" required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Apellido</Label>
                      <Input id="lastName" placeholder="Pérez" required />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input id="email" type="email" placeholder="juan@email.com" required />
                  </div>
                  <div>
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" type="tel" placeholder="+57 300 123 4567" required />
                  </div>
                  <div>
                    <Label htmlFor="address">Dirección</Label>
                    <Input id="address" placeholder="Calle 123 #45-67" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">Ciudad</Label>
                      <Input id="city" placeholder="Bogotá" required />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Código Postal</Label>
                      <Input id="postalCode" placeholder="110111" required />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Truck className="h-5 w-5 mr-2" />
                    Método de Envío
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg bg-orange-50 border-orange-200">
                      <div>
                        <p className="font-medium">Envío Estándar</p>
                        <p className="text-sm text-gray-600">2-3 días hábiles</p>
                      </div>
                      <Badge className="bg-orange-600">{shipping === 0 ? "Gratis" : `$${shipping}`}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Resumen del Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items */}
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {state.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-gray-500">Cantidad: {item.quantity}</p>
                        </div>
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  <hr />

                  {/* Totals */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${state.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Envío</span>
                      <span>{shipping === 0 ? "Gratis" : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>IVA (19%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <hr />
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span>${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-700 text-lg py-6"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      "Procesando..."
                    ) : (
                      <>
                        <CreditCard className="h-5 w-5 mr-2" />
                        Proceder al Pago
                      </>
                    )}
                  </Button>

                  <div className="text-xs text-gray-500 text-center">
                    Al hacer clic en "Proceder al Pago", aceptas nuestros términos y condiciones
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
