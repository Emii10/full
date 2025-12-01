"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { CreditCard, ArrowLeft, Shield, Loader2 } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/contexts/CartContext"
import { useRouter } from "next/navigation"

export default function PaymentPage() {
  const { state, clearCart } = useCart()
  const [paymentMethod, setPaymentMethod] = useState("paypal")
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })
  const router = useRouter()

  const shipping = state.total > 200 ? 0 : 15
  const tax = state.total * 0.19
  const finalTotal = state.total + shipping + tax

  useEffect(() => {
    if (state.items.length === 0) {
      router.push("/cart")
    }
  }, [state.items, router])

  const handlePayment = async () => {
    setIsProcessing(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Clear cart and redirect to success
      clearCart()
      router.push("/payment/success?order=" + Math.random().toString(36).substr(2, 9))
    } catch (error) {
      console.error("Payment error:", error)
      router.push("/payment/error")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCardInputChange = (field: string, value: string) => {
    setCardData((prev) => ({ ...prev, [field]: value }))
  }

  if (state.items.length === 0) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/checkout" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al Checkout
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Procesar Pago</h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Payment Methods */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-green-600" />
                    Método de Pago
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    {/* PayPal */}
                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">PayPal</p>
                            <p className="text-sm text-gray-500">Pago seguro con tu cuenta PayPal</p>
                          </div>
                          <div className="w-16 h-10 bg-blue-600 rounded flex items-center justify-center">
                            <span className="text-white font-bold text-xs">PayPal</span>
                          </div>
                        </div>
                      </Label>
                    </div>

                    {/* Mercado Pago */}
                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="mercadopago" id="mercadopago" />
                      <Label htmlFor="mercadopago" className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Mercado Pago</p>
                            <p className="text-sm text-gray-500">Paga con Mercado Pago</p>
                          </div>
                          <div className="w-16 h-10 bg-blue-500 rounded flex items-center justify-center">
                            <span className="text-white font-bold text-xs">MP</span>
                          </div>
                        </div>
                      </Label>
                    </div>

                    {/* Credit Card */}
                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Tarjeta de Crédito/Débito</p>
                            <p className="text-sm text-gray-500">Visa, Mastercard, American Express</p>
                          </div>
                          <div className="flex space-x-1">
                            <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center">
                              V
                            </div>
                            <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center">
                              M
                            </div>
                            <div className="w-8 h-5 bg-green-600 rounded text-white text-xs flex items-center justify-center">
                              A
                            </div>
                          </div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>

                  {/* Card Form */}
                  {paymentMethod === "card" && (
                    <div className="mt-6 space-y-4 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <Label htmlFor="cardName">Nombre en la Tarjeta</Label>
                        <Input
                          id="cardName"
                          placeholder="Juan Pérez"
                          value={cardData.name}
                          onChange={(e) => handleCardInputChange("name", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardNumber">Número de Tarjeta</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardData.number}
                          onChange={(e) => handleCardInputChange("number", e.target.value)}
                          maxLength={19}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Vencimiento</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/AA"
                            value={cardData.expiry}
                            onChange={(e) => handleCardInputChange("expiry", e.target.value)}
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={cardData.cvv}
                            onChange={(e) => handleCardInputChange("cvv", e.target.value)}
                            maxLength={4}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Security Info */}
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  Tu información de pago está protegida con encriptación SSL de 256 bits. Nunca almacenamos datos de
                  tarjetas de crédito.
                </AlertDescription>
              </Alert>
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
                      <span>Total a Pagar</span>
                      <span>${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-orange-600 hover:bg-orange-700 text-lg py-6"
                    onClick={handlePayment}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Procesando Pago...
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-5 w-5 mr-2" />
                        Pagar ${finalTotal.toFixed(2)}
                      </>
                    )}
                  </Button>

                  <div className="text-xs text-gray-500 text-center">
                    Al completar el pago, aceptas nuestros términos y condiciones
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
