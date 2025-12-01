"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag, Truck, Shield } from "lucide-react"
import Link from "next/link"
import { useCart } from "../contexts/CartContext";

import { useRouter } from "next/navigation"

export default function CartPage() {
  const { state, updateQuantity, removeFromCart, clearCart } = useCart()
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const [discount, setDiscount] = useState(0)
  const router = useRouter()

  const shipping = state.total > 200 ? 0 : 15
  const tax = state.total * 0.19 // 19% IVA
  const finalTotal = state.total + shipping + tax - discount

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity >= 0) {
      updateQuantity(id, newQuantity)
    }
  }

  const handlePromoCode = () => {
    if (promoCode.toLowerCase() === "motofull10") {
      setDiscount(state.total * 0.1)
      setPromoApplied(true)
    } else if (promoCode.toLowerCase() === "welcome20") {
      setDiscount(state.total * 0.2)
      setPromoApplied(true)
    } else {
      alert("Código promocional inválido")
    }
  }

  const handleCheckout = () => {
    // Redirect to checkout page (will be implemented in payment integration)
    router.push("/checkout")
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="border-b bg-white">
          <div className="container mx-auto px-4 py-4">
            <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continuar Comprando
            </Link>
          </div>
        </header>

        {/* Empty Cart */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Tu carrito está vacío</h1>
            <p className="text-gray-600 mb-8">
              Agrega algunos productos increíbles para tu moto y regresa aquí para finalizar tu compra.
            </p>
            <Button asChild className="bg-orange-600 hover:bg-orange-700">
              <Link href="/">Explorar Productos</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continuar Comprando
            </Link>
            <h1 className="text-2xl font-bold">Carrito de Compras</h1>
            <Button
              variant="outline"
              size="sm"
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 bg-transparent"
            >
              Vaciar Carrito
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <Badge variant="secondary" className="mt-1">
                        {item.category}
                      </Badge>
                      <p className="text-2xl font-bold text-orange-600 mt-2">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, Number.parseInt(e.target.value) || 0)}
                        className="w-16 text-center"
                        min="1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-700 mt-2"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Eliminar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  Productos en tu Carrito
                  <Badge variant="secondary">{state.itemCount} productos</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {state.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <div className="flex-1">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-gray-500 ml-2">x{item.quantity}</span>
                    </div>
                    <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <hr className="my-3" />
                <div className="flex justify-between font-semibold">
                  <span>Subtotal de Productos:</span>
                  <span>${state.total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Promo Code */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Código Promocional</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Ingresa tu código"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    disabled={promoApplied}
                  />
                  <Button onClick={handlePromoCode} disabled={promoApplied || !promoCode} variant="outline">
                    Aplicar
                  </Button>
                </div>
                {promoApplied && (
                  <Alert>
                    <AlertDescription>¡Código aplicado! Descuento de ${discount.toFixed(2)}</AlertDescription>
                  </Alert>
                )}
                <div className="text-xs text-gray-500">
                  <p>Códigos de prueba: MOTOFULL10, WELCOME20</p>
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal ({state.itemCount} productos)</span>
                    <span>${state.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center">
                      <Truck className="h-4 w-4 mr-1" />
                      Envío
                    </span>
                    <span className={shipping === 0 ? "text-green-600 font-semibold" : ""}>
                      {shipping === 0 ? "¡Gratis!" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>IVA (19%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Descuento aplicado</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <hr className="border-2" />

                <div className="flex justify-between text-xl font-bold bg-orange-50 p-3 rounded-lg">
                  <span>Total a Pagar</span>
                  <span className="text-orange-600">${finalTotal.toFixed(2)} MXN</span>
                </div>

                {shipping > 0 && (
                  <Alert className="border-orange-200 bg-orange-50">
                    <Truck className="h-4 w-4" />
                    <AlertDescription className="text-orange-800">
                      <strong>¡Casi tienes envío gratis!</strong> Agrega ${(200 - state.total).toFixed(2)} más para
                      obtener envío gratuito.
                    </AlertDescription>
                  </Alert>
                )}

                {/* Security Features */}
                <div className="space-y-2 text-sm text-gray-600 mt-4">
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-green-600" />
                    Compra 100% segura
                  </div>
                  <div className="flex items-center">
                    <Truck className="h-4 w-4 mr-2 text-blue-600" />
                    Envío rápido y confiable
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Continue Shopping */}
            <Button variant="outline" className="w-full bg-transparent" asChild>
              <Link href="/">Continuar Comprando</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
