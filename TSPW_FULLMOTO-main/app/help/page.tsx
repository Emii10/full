"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Truck,
  Shield,
  CreditCard,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import Link from "next/link"

const faqs = [
  {
    id: 1,
    question: "¿Cuáles son los tiempos de envío?",
    answer:
      "Los envíos dentro de la Ciudad de México se realizan en 24-48 horas. Para el interior de la República Mexicana, el tiempo de entrega es de 3-5 días hábiles. Ofrecemos envío express en 24 horas para CDMX con costo adicional.",
    category: "Envíos",
  },
  {
    id: 2,
    question: "¿Qué garantía tienen los productos?",
    answer:
      "Todos nuestros productos cuentan con garantía del fabricante. Los frenos y pastillas tienen 12 meses, los escapes hasta 24 meses, la suspensión 12 meses con servicio técnico incluido, y los filtros K&N tienen garantía de por vida.",
    category: "Garantía",
  },
  {
    id: 3,
    question: "¿Puedo devolver un producto?",
    answer:
      "Sí, aceptamos devoluciones dentro de los primeros 30 días posteriores a la compra, siempre que el producto esté en su empaque original y sin usar. Los gastos de envío de devolución corren por cuenta del cliente, excepto en casos de productos defectuosos.",
    category: "Devoluciones",
  },
  {
    id: 4,
    question: "¿Cómo sé si un repuesto es compatible con mi moto?",
    answer:
      "En cada producto encontrarás una lista de modelos compatibles. También puedes contactar a nuestro equipo técnico con el modelo exacto de tu motocicleta y te ayudaremos a encontrar los repuestos correctos. Ofrecemos asesoría técnica gratuita.",
    category: "Compatibilidad",
  },
  {
    id: 5,
    question: "¿Ofrecen instalación de los productos?",
    answer:
      "Sí, contamos con talleres afiliados en la Ciudad de México donde puedes instalar tus repuestos. El costo de instalación varía según el producto. También proporcionamos manuales de instalación detallados para quienes prefieren hacerlo ellos mismos.",
    category: "Instalación",
  },
  {
    id: 6,
    question: "¿Qué métodos de pago aceptan?",
    answer:
      "Aceptamos tarjetas de crédito y débito (Visa, MasterCard, American Express), PayPal, Mercado Pago, transferencias bancarias y pagos en efectivo en tiendas OXXO. También ofrecemos pagos a meses sin intereses con tarjetas participantes.",
    category: "Pagos",
  },
]

const contactMethods = [
  {
    icon: Phone,
    title: "Teléfono",
    info: "+52 55 3718 76",
    description: "Lunes a Viernes 9:00 - 18:00",
    action: "Llamar ahora",
  },
  {
    icon: Mail,
    title: "Email",
    info: "info@motofull.com",
    description: "Respuesta en 24 horas",
    action: "Enviar email",
  },
  {
    icon: MessageCircle,
    title: "Chat en vivo",
    info: "Disponible ahora",
    description: "Respuesta inmediata",
    action: "Iniciar chat",
  },
  {
    icon: MapPin,
    title: "Ubicación",
    info: "Ciudad de México",
    description: "Visita nuestro showroom",
    action: "Ver mapa",
  },
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todas")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const categories = ["Todas", "Envíos", "Garantía", "Devoluciones", "Compatibilidad", "Instalación", "Pagos"]

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "Todas" || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar el formulario
    alert("Mensaje enviado correctamente. Te contactaremos pronto.")
    setContactForm({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white border-2 border-orange-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-orange-700 font-bold text-xl">M</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">Motofull</span>
            </Link>
            <nav className="flex items-center space-x-4">
              <Link href="/" className="text-gray-700 hover:text-gray-900">
                Inicio
              </Link>
              <Link href="/catalog" className="text-gray-700 hover:text-gray-900">
                Catálogo
              </Link>
              <Link href="/offers" className="text-gray-700 hover:text-gray-900">
                Ofertas
              </Link>
              <Link href="/cart" className="text-gray-700 hover:text-gray-900">
                Carrito
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Centro de Ayuda</h1>
          <p className="text-xl mb-8">¿En qué podemos ayudarte hoy?</p>

          {/* Search */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Buscar en preguntas frecuentes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 text-lg bg-white text-gray-900"
            />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Help Cards */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Ayuda Rápida</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/help/track-order">
              <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <Truck className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Rastrear Pedido</h3>
                  <p className="text-sm text-gray-600">Consulta el estado de tu envío</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/help/warranties">
              <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Garantías</h3>
                  <p className="text-sm text-gray-600">Información sobre garantías</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/help/payments">
              <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <CreditCard className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Pagos</h3>
                  <p className="text-sm text-gray-600">Métodos de pago disponibles</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/help/technical-support">
              <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <MessageCircle className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Soporte Técnico</h3>
                  <p className="text-sm text-gray-600">Asesoría especializada</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Preguntas Frecuentes</h2>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 bg-white text-sm"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              {filteredFaqs.map((faq) => (
                <Card key={faq.id} className="overflow-hidden">
                  <CardHeader
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline" className="text-xs">
                          {faq.category}
                        </Badge>
                        <CardTitle className="text-lg">{faq.question}</CardTitle>
                      </div>
                      {expandedFaq === faq.id ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                  </CardHeader>
                  {expandedFaq === faq.id && (
                    <CardContent className="pt-0">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>

            {filteredFaqs.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No se encontraron preguntas que coincidan con tu búsqueda.</p>
                <Button
                  variant="outline"
                  className="mt-4 bg-transparent"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("Todas")
                  }}
                >
                  Ver todas las preguntas
                </Button>
              </div>
            )}
          </div>

          {/* Contact Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Contacto Directo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactMethods.map((method, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <method.icon className="h-5 w-5 text-orange-600 mt-1" />
                    <div className="flex-1">
                      <h4 className="font-medium">{method.title}</h4>
                      <p className="text-sm text-gray-600">{method.info}</p>
                      <p className="text-xs text-gray-500">{method.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Envíanos un Mensaje</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <Input
                    placeholder="Tu nombre"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Tu email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="Asunto"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    required
                  />
                  <Textarea
                    placeholder="Tu mensaje"
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    required
                  />
                  <Button type="submit" className="w-full">
                    Enviar Mensaje
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Horarios de Atención
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Lunes - Viernes</span>
                    <span className="font-medium">9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sábados</span>
                    <span className="font-medium">9:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Domingos</span>
                    <span className="text-gray-500">Cerrado</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
