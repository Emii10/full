"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, Zap } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/contexts/CartContext"

const specialOffers = [
  {
    id: 1,
    name: "Kit de Frenos Brembo Racing",
    price: 299.99,
    originalPrice: 449.99,
    image: "/brembo-brake-kit-motorcycle-racing-red-calipers.jpg",
    category: "Frenos",
    rating: 4.8,
    reviews: 124,
    inStock: true,
    description: "Kit completo de frenos Brembo para competición",
    brand: "Brembo",
    discount: 33,
    timeLeft: "2 días",
    isFlashSale: true,
  },
  {
    id: 2,
    name: "Escape Akrapovic Titanio",
    price: 799.99,
    originalPrice: 1199.99,
    image: "/akrapovic-titanium-exhaust-motorcycle-carbon-fiber.jpg",
    category: "Escapes",
    rating: 4.9,
    reviews: 89,
    inStock: true,
    description: "Escape deportivo de titanio con fibra de carbono",
    brand: "Akrapovic",
    discount: 33,
    timeLeft: "5 días",
    isFlashSale: false,
  },
  {
    id: 3,
    name: "Amortiguador Öhlins TTX",
    price: 999.99,
    originalPrice: 1499.99,
    image: "/ohlins-ttx-shock-absorber-motorcycle-yellow-gold.jpg",
    category: "Suspensión",
    rating: 4.9,
    reviews: 67,
    inStock: true,
    description: "Amortiguador trasero de competición",
    brand: "Öhlins",
    discount: 33,
    timeLeft: "1 día",
    isFlashSale: true,
  },
]

const bundleOffers = [
  {
    id: "bundle1",
    name: "Kit Completo de Mantenimiento",
    items: ["Aceite Motul 300V", "Filtro K&N", "Bujías NGK", "Pastillas EBC"],
    price: 199.99,
    originalPrice: 279.99,
    savings: 80,
    image: "/motul-300v-motorcycle-oil-bottle-10w40-racing.jpg",
    category: "Paquetes",
    inStock: true,
  },
  {
    id: "bundle2",
    name: "Pack Performance Racing",
    items: ["Escape Akrapovic", "Filtro K&N", "Kit Frenos Brembo"],
    price: 1599.99,
    originalPrice: 2199.99,
    savings: 600,
    image: "/akrapovic-titanium-exhaust-motorcycle-carbon-fiber.jpg",
    category: "Paquetes",
    inStock: true,
  },
]

export default function OffersPage() {
  const { addToCart } = useCart()

  const handleAddToCart = (product: any) => {
    if (product.inStock) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        inStock: product.inStock,
      })
    }
  }

  const handleAddBundleToCart = (bundle: any) => {
    if (bundle.inStock) {
      addToCart({
        id: bundle.id,
        name: bundle.name,
        price: bundle.price,
        image: bundle.image,
        category: bundle.category,
        inStock: bundle.inStock,
      })
    }
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
              <Link href="/help" className="text-gray-700 hover:text-gray-900">
                Ayuda
              </Link>
              <Link href="/cart" className="text-gray-700 hover:text-gray-900">
                Carrito
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">🔥 Ofertas Especiales</h1>
          <p className="text-xl mb-8">Descuentos increíbles en las mejores marcas de motopartes</p>
          <Badge className="bg-yellow-500 text-black text-lg px-4 py-2">Hasta 50% de descuento</Badge>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Flash Sales */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <Zap className="h-6 w-6 text-yellow-500 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">Ofertas Flash</h2>
            <Badge className="ml-3 bg-red-600 text-white animate-pulse">¡Tiempo Limitado!</Badge>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialOffers
              .filter((offer) => offer.isFlashSale)
              .map((offer) => (
                <Card
                  key={offer.id}
                  className="group hover:shadow-xl transition-all duration-300 border-2 border-red-200"
                >
                  <CardHeader className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={offer.image || "/placeholder.svg"}
                        alt={offer.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-3 left-3 bg-red-600 text-white text-lg">-{offer.discount}%</Badge>
                      <div className="absolute top-3 right-3 bg-black/80 text-white px-2 py-1 rounded flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span className="text-xs">{offer.timeLeft}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{offer.category}</Badge>
                      <Badge variant="outline">{offer.brand}</Badge>
                    </div>
                    <CardTitle className="text-lg mb-2">{offer.name}</CardTitle>
                    <p className="text-sm text-gray-600 mb-3">{offer.description}</p>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(offer.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">({offer.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-red-600">${offer.price}</span>
                        <span className="text-lg text-gray-500 line-through ml-2">${offer.originalPrice}</span>
                      </div>
                      <Badge className="bg-green-600 text-white">
                        Ahorras ${(offer.originalPrice - offer.price).toFixed(2)}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full bg-red-600 hover:bg-red-700" onClick={() => handleAddToCart(offer)}>
                      ¡Comprar Ahora!
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </section>

        {/* Regular Offers */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Ofertas Especiales</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialOffers
              .filter((offer) => !offer.isFlashSale)
              .map((offer) => (
                <Card key={offer.id} className="group hover:shadow-lg transition-shadow">
                  <CardHeader className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={offer.image || "/placeholder.svg"}
                        alt={offer.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-3 left-3 bg-green-600 text-white">-{offer.discount}%</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{offer.category}</Badge>
                      <Badge variant="outline">{offer.brand}</Badge>
                    </div>
                    <CardTitle className="text-lg mb-2">{offer.name}</CardTitle>
                    <p className="text-sm text-gray-600 mb-3">{offer.description}</p>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(offer.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">({offer.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xl font-bold text-orange-600">${offer.price}</span>
                        <span className="text-sm text-gray-500 line-through ml-2">${offer.originalPrice}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full" onClick={() => handleAddToCart(offer)}>
                      Agregar al Carrito
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </section>

        {/* Bundle Offers */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Paquetes Especiales</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {bundleOffers.map((bundle) => (
              <Card key={bundle.id} className="group hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={bundle.image || "/placeholder.svg"}
                      alt={bundle.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 left-3 bg-purple-600 text-white">Paquete</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-xl mb-3">{bundle.name}</CardTitle>
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Incluye:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {bundle.items.map((item, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-purple-600">${bundle.price}</span>
                      <span className="text-lg text-gray-500 line-through ml-2">${bundle.originalPrice}</span>
                    </div>
                    <Badge className="bg-green-600 text-white">Ahorras ${bundle.savings}</Badge>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    onClick={() => handleAddBundleToCart(bundle)}
                  >
                    Agregar Paquete al Carrito
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
