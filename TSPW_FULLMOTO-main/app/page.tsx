// app/page.tsx
"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import type React from "react"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, ShoppingCart, User, Menu, Star, Grid, List } from "lucide-react"
import Link from "next/link"
// app/page.tsx
import { useCart } from "./contexts/CartContext"

import { ProductCarousel } from "@/components/ProductCarousel"

const allProducts = [
  {
    id: 1,
    name: "Kit de Frenos Brembo Racing",
    price: 299.99,
    originalPrice: 349.99,
    image: "/brembo-brake-kit-motorcycle-racing-red-calipers.jpg",
    category: "Frenos",
    rating: 4.8,
    reviews: 124,
    inStock: true,
    description: "Kit completo de frenos Brembo para competición",
    brand: "Brembo",
    tags: ["racing", "frenos", "brembo", "kit"],
  },
  {
    id: 2,
    name: "Escape Akrapovic Titanio",
    price: 899.99,
    originalPrice: 1099.99,
    image: "/akrapovic-titanium-exhaust-motorcycle-carbon-fiber.jpg",
    category: "Escapes",
    rating: 4.9,
    reviews: 89,
    inStock: true,
    description: "Escape deportivo de titanio con fibra de carbono",
    brand: "Akrapovic",
    tags: ["escape", "titanio", "akrapovic", "deportivo"],
  },
  {
    id: 3,
    name: "Filtro de Aire K&N Performance",
    price: 79.99,
    originalPrice: 99.99,
    image: "/letter-k-typography.png",
    category: "Filtros",
    rating: 4.7,
    reviews: 203,
    inStock: false,
    description: "Filtro de aire de alto rendimiento lavable",
    brand: "K&N",
    tags: ["filtro", "aire", "k&n", "performance"],
  },
  {
    id: 4,
    name: "Cadena DID 520 O-Ring",
    price: 149.99,
    originalPrice: 179.99,
    image: "/did-motorcycle-chain-520-o-ring-gold-black.jpg",
    category: "Transmisión",
    rating: 4.6,
    reviews: 156,
    inStock: true,
    description: "Cadena de transmisión con sellos O-Ring",
    brand: "DID",
    tags: ["cadena", "transmision", "did", "o-ring"],
  },
  {
    id: 5,
    name: "Amortiguador Öhlins TTX",
    price: 1299.99,
    originalPrice: 1499.99,
    image: "/ohlins-ttx-shock-absorber-motorcycle-yellow-gold.jpg",
    category: "Suspensión",
    rating: 4.9,
    reviews: 67,
    inStock: true,
    description: "Amortiguador trasero de competición",
    brand: "Öhlins",
    tags: ["amortiguador", "suspension", "ohlins", "ttx"],
  },
  {
    id: 6,
    name: "Llantas Marchesini Forged",
    price: 2199.99,
    originalPrice: 2499.99,
    image: "/marchesini-forged-wheels-motorcycle-black-carbon.jpg",
    category: "Llantas",
    rating: 4.8,
    reviews: 45,
    inStock: true,
    description: "Llantas forjadas de magnesio ultraligeras",
    brand: "Marchesini",
    tags: ["llantas", "forjadas", "marchesini", "magnesio"],
  },
  {
    id: 7,
    name: "Pastillas de Freno EBC HH",
    price: 89.99,
    originalPrice: 109.99,
    image: "/ebc-brake-pads-motorcycle-hh-sintered-metal.jpg",
    category: "Frenos",
    rating: 4.5,
    reviews: 89,
    inStock: true,
    description: "Pastillas de freno sinterizadas de alto rendimiento",
    brand: "EBC",
    tags: ["pastillas", "frenos", "ebc", "sinterizadas"],
  },
  {
    id: 8,
    name: "Aceite Motul 300V 10W40",
    price: 45.99,
    originalPrice: 55.99,
    image: "/motul-300v-motorcycle-oil-bottle-10w40-racing.jpg",
    category: "Lubricantes",
    rating: 4.7,
    reviews: 234,
    inStock: true,
    description: "Aceite sintético de competición",
    brand: "Motul",
    tags: ["aceite", "motul", "300v", "sintetico"],
  },
  {
    id: 9,
    name: "Bujías NGK Iridium",
    price: 24.99,
    originalPrice: 29.99,
    image: "/ngk-iridium-spark-plugs-motorcycle-set.jpg",
    category: "Encendido",
    rating: 4.6,
    reviews: 156,
    inStock: true,
    description: "Bujías de iridio de larga duración",
    brand: "NGK",
    tags: ["bujias", "ngk", "iridium", "encendido"],
  },
]

const categories = [
  { name: "Frenos", icon: "🛑", count: 156 },
  { name: "Escapes", icon: "🔥", count: 89 },
  { name: "Filtros", icon: "🌪️", count: 234 },
  { name: "Transmisión", icon: "⚙️", count: 178 },
  { name: "Suspensión", icon: "🏍️", count: 123 },
  { name: "Llantas", icon: "⭕", count: 67 },
  { name: "Lubricantes", icon: "🛢️", count: 89 },
  { name: "Encendido", icon: "⚡", count: 45 },
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("featured")

  const { state, addToCart } = useCart()

  // ✅ calcular cantidad total de productos en el carrito
  const itemCount = state.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts]

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    // Filter by category
    if (selectedCategory !== "Todos") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
      // Keep original order for "featured"
    }

    return filtered
  }, [searchQuery, selectedCategory, sortBy])

  // ✅ tipo más correcto: cualquier elemento del array allProducts
  const handleAddToCart = (product: (typeof allProducts)[number]) => {
    if (product.inStock) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        inStock: product.inStock,
        brand: product.brand,
      })
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is handled by the useMemo hook
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50 shadow-sm" role="banner">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2" aria-label="Motofull - Inicio">
              <div className="w-10 h-10 bg-white border-2 border-orange-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-orange-700 font-bold text-xl" aria-hidden="true">
                  M
                </span>
              </div>
              <span className="text-2xl font-bold text-gray-900">Motofull</span>
            </Link>

            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <form onSubmit={handleSearch} className="relative w-full">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
                  aria-hidden="true"
                />
                <Input
                  type="text"
                  placeholder="Buscar repuestos, marcas, modelos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full"
                  aria-label="Buscar productos"
                />
              </form>
            </div>

            <div className="hidden lg:flex items-center space-x-2 mr-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-sm border border-gray-300 rounded px-2 py-1 bg-white text-gray-900"
              >
                <option value="Todos">Todas las categorías</option>
                {categories.map((cat) => (
                  <option key={cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-gray-300 rounded px-2 py-1 bg-white text-gray-900"
              >
                <option value="featured">Destacados</option>
                <option value="price-low">Precio: Menor a Mayor</option>
                <option value="price-high">Precio: Mayor a Menor</option>
                <option value="rating">Mejor Calificados</option>
                <option value="name">Nombre A-Z</option>
              </select>

              <div className="flex border border-gray-300 rounded bg-white">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex items-center space-x-4" role="navigation" aria-label="Navegación principal">
              <Button variant="ghost" size="sm" className="hidden md:flex text-gray-700 hover:text-gray-900" asChild>
                <Link href="/auth/login">
                  <User className="h-4 w-4 mr-2" aria-hidden="true" />
                  Cuenta
                </Link>
              </Button>

              {/* ✅ aquí usamos itemCount en lugar de state.itemCount */}
              <Button variant="ghost" size="sm" className="relative text-gray-700 hover:text-gray-900" asChild>
                <Link href="/cart" aria-label={`Carrito de compras - ${itemCount} productos`}>
                  <ShoppingCart className="h-4 w-4" aria-hidden="true" />
                  {itemCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-orange-600 text-white">
                      <span className="sr-only">Productos en carrito: </span>
                      {itemCount}
                    </Badge>
                  )}
                </Link>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-gray-700 hover:text-gray-900"
                aria-label="Abrir menú"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Banner Section */}
      <section
        className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-orange-900 text-white py-20 overflow-hidden"
        aria-labelledby="hero-heading"
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 id="hero-heading" className="text-5xl font-bold mb-6 text-balance">
                Repuestos de <span className="text-orange-400">Calidad</span> para tu Moto
              </h1>
              <p className="text-xl mb-8 text-gray-100 text-pretty">
                Encuentra las mejores marcas en repuestos y accesorios para motocicletas. Calidad garantizada, envío
                rápido y precios competitivos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-orange-800 hover:bg-orange-900 text-white" asChild>
                  <Link href="/catalog">Ver Catálogo</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-gray-900 bg-transparent"
                  asChild
                >
                  <Link href="/offers">Ofertas Especiales</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="/motorcycle-rider-biker-on-sport-bike-sunset-road-b.jpg"
                alt="Motociclista en carretera con puesta de sol"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
      {/* FIN DEL HERO BANNER */}

      <ProductCarousel
        products={allProducts} // Le pasamos el array de todos tus productos
        title="Acceso Rápido a Nuestro Catálogo Completo"
      />

      {/* Sección de Productos Destacados/Filtrados */}
      <section className="py-16 bg-gray-50" aria-labelledby="products-heading">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 id="products-heading" className="text-3xl font-bold text-gray-900">
                {searchQuery ? `Resultados para "${searchQuery}"` : "Productos Destacados"}
              </h2>
              <p className="text-gray-600 mt-2">
                {filteredProducts.length} producto{filteredProducts.length !== 1 ? "s" : ""} encontrado
                {filteredProducts.length !== 1 ? "s" : ""}
              </p>
            </div>
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent" asChild>
              <Link href="/catalog">Ver Todos</Link>
            </Button>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No se encontraron productos que coincidan con tu búsqueda.</p>
              <Button
                variant="outline"
                className="mt-4 border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                onClick={() => setSearchQuery("")}
              >
                Ver todos los productos
              </Button>
            </div>
          ) : (
            <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-4"}>
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className={`group hover:shadow-xl transition-all duration-300 bg-white ${
                    viewMode === "list" ? "flex flex-row" : ""
                  }`}
                >
                  <CardHeader className={`p-0 ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}>
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={`${product.name} - ${product.category}`}
                        className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                          viewMode === "list" ? "w-full h-32" : "w-full h-64"
                        }`}
                      />
                      {!product.inStock && (
                        <Badge className="absolute top-3 left-3 bg-red-600 text-white">Agotado</Badge>
                      )}
                      {product.originalPrice > product.price && (
                        <Badge className="absolute top-3 right-3 bg-green-600 text-white">
                          -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <div className={viewMode === "list" ? "flex flex-col flex-1" : ""}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                          {product.category}
                        </Badge>
                        <Badge variant="outline" className="border-gray-300 text-gray-700">
                          {product.brand}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg mb-2 line-clamp-2 text-gray-900">{product.name}</CardTitle>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                      <div className="flex items-center mb-3">
                        <div
                          className="flex items-center"
                          role="img"
                          aria-label={`Calificación: ${product.rating} de 5 estrellas`}
                        >
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 ml-2">({product.reviews} reseñas)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-orange-900">${product.price}</span>
                          {product.originalPrice > product.price && (
                            <span className="text-sm text-gray-500 line-through ml-2">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                      <Button
                        className="w-full"
                        disabled={!product.inStock}
                        variant={product.inStock ? "default" : "secondary"}
                        onClick={() => handleAddToCart(product)}
                        aria-label={
                          product.inStock ? `Agregar ${product.name} al carrito` : `${product.name} no disponible`
                        }
                      >
                        {product.inStock ? "Agregar al Carrito" : "Notificar Disponibilidad"}
                      </Button>
                    </CardFooter>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gray-900 text-white" aria-labelledby="newsletter-heading">
        <div className="container mx-auto px-4 text-center">
          <h2 id="newsletter-heading" className="text-3xl font-bold mb-4">
            Mantente Informado
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Suscríbete a nuestro newsletter y recibe ofertas exclusivas, nuevos productos y consejos de mantenimiento.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Tu correo electrónico"
              className="bg-white text-gray-900"
              aria-label="Correo electrónico para newsletter"
              required
            />
            <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
              Suscribirse
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12" role="contentinfo">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-orange-600 border border-orange-500 rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-white font-bold" aria-hidden="true">
                    M
                  </span>
                </div>
                <span className="text-xl font-bold">Motofull</span>
              </div>
              <p className="text-gray-400 text-sm">
                Tu tienda especializada en repuestos y accesorios para motocicletas. Calidad y confianza desde 2020.
              </p>
            </div>
            <div>
              <h2 className="font-semibold mb-4">Categorías</h2>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/catalog?category=Frenos" className="hover:text-white">
                    Frenos
                  </Link>
                </li>
                <li>
                  <Link href="/catalog?category=Escapes" className="hover:text-white">
                    Escapes
                  </Link>
                </li>
                <li>
                  <Link href="/catalog?category=Filtros" className="hover:text-white">
                    Filtros
                  </Link>
                </li>
                <li>
                  <Link href="/catalog?category=Transmisión" className="hover:text-white">
                    Transmisión
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Ayuda</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-white">
                    Envíos
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-white">
                    Devoluciones
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>📞 +52 55 3718 76</p>
                <p>📧 info@motofull.com</p>
                <p>📍 Ciudad de México, México</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Motofull. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
