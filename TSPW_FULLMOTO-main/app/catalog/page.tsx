// app/catalog/page.tsx
"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Star, Grid, List, Filter } from "lucide-react"
import { useCart } from "../contexts/CartContext";


type Product = {
  id: number
  name: string
  category: string
  price: number
  stock: number
  description: string
  image: string | null
  inStock: boolean
  rating: number
  reviews: number
  brand: string
}

type CategoryInfo = {
  name: string
  count: number
}

const getCategoryIcon = (name: string) => {
  const n = name.toLowerCase()
  if (n.includes("freno")) return "🛑"
  if (n.includes("escape")) return "🔥"
  if (n.includes("filtro")) return "🌪️"
  if (n.includes("transmis")) return "⚙️"
  if (n.includes("susp")) return "🏍️"
  return "•"
}

export default function CatalogPage() {
  const { addToCart } = useCart()

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("featured")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000])

  // 🔹 AQUÍ ES EL “PASO 3”: CARGAR DESDE /api/products Y MAPEAR imageUrl
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch("/api/products")
        const json = await res.json()

        if (!res.ok) {
          throw new Error(json.error || "Error obteniendo productos")
        }

        const rows = json.data as any[]

        const mapped: Product[] = rows.map((p) => {
          const priceNum = Number(p.price) || 0
          const stockNum = Number(p.stock) || 0

          return {
            id: p.id,
            name: p.name,
            category: p.category,
            price: priceNum,
            stock: stockNum,
            description: p.description || "Sin descripción",
            image: p.imageUrl || null,          // 👈 usamos la URL de la BD
            inStock: stockNum > 0,
            rating: 4.5,                        // decorativo
            reviews: 20,
            brand: "Motofull",
          }
        })

        setProducts(mapped)

        const maxPrice = mapped.reduce((max, p) => (p.price > max ? p.price : max), 0)
        setPriceRange([0, maxPrice || 100000])
      } catch (err: any) {
        console.error(err)
        setError(err.message || "Error al cargar productos")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // 🔹 Categorías dinámicas según lo que venga de la BD
  const categories: CategoryInfo[] = useMemo(() => {
    const map = new Map<string, number>()
    for (const p of products) {
      const cat = p.category || "Sin categoría"
      map.set(cat, (map.get(cat) ?? 0) + 1)
    }
    return Array.from(map.entries()).map(([name, count]) => ({ name, count }))
  }, [products])

  // 🔹 Aplicar filtros / orden
  const filteredProducts = useMemo(() => {
    let filtered = [...products]

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q) ||
          product.brand.toLowerCase().includes(q),
      )
    }

    if (selectedCategory !== "Todos") {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

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
    }

    return filtered
  }, [products, searchQuery, selectedCategory, sortBy, priceRange])

  // 🔹 Agregar al carrito
  const handleAddToCart = (product: Product) => {
    if (!product.inStock) return

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || "/placeholder.svg", // 👈 siempre string
      category: product.category,
      inStock: product.inStock,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header con logo y menú */}
      <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
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
            <Link href="/offers" className="text-gray-700 hover:text-gray-900">
              Ofertas
            </Link>
            <Link href="/help" className="text-gray-700 hover:text-gray-900">
              Ayuda
            </Link>
            <Link href="/cart" className="text-gray-700 hover:text-gray-900">
              Carrito
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar: filtros */}
          <aside className="lg:w-64 space-y-6">
            <div>
              <h3 className="font-semibold mb-4 flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </h3>

              {/* Buscar */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Categorías dinámicas */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Categorías</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory("Todos")}
                    className={`w-full text-left px-3 py-2 rounded text-sm ${
                      selectedCategory === "Todos" ? "bg-orange-100 text-orange-700" : "hover:bg-gray-100"
                    }`}
                  >
                    Todas las categorías ({products.length})
                  </button>

                  {categories.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`w-full text-left px-3 py-2 rounded text-sm flex items-center justify-between ${
                        selectedCategory === cat.name ? "bg-orange-100 text-orange-700" : "hover:bg-gray-100"
                      }`}
                    >
                      <span>
                        {getCategoryIcon(cat.name)} {cat.name}
                      </span>
                      <span className="text-xs text-gray-500">({cat.count})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Rango de precio */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Rango de Precio</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value) || 0, priceRange[1]])}
                      className="w-20 text-sm"
                    />
                    <span>-</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], Number(e.target.value) || priceRange[1]])
                      }
                      className="w-20 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main: listado */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Catálogo de Productos</h1>
                <p className="text-gray-600 mt-1">{filteredProducts.length} productos encontrados</p>
              </div>

              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border border-gray-300 rounded px-3 py-2 bg-white"
                >
                  <option value="featured">Destacados</option>
                  <option value="price-low">Precio: Menor a Mayor</option>
                  <option value="price-high">Precio: Mayor a Menor</option>
                  <option value="rating">Mejor calificados</option>
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
            </div>

            {loading && <p>Cargando productos...</p>}
            {error && <p className="text-red-600 mb-4">{error}</p>}

            {!loading && filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No se encontraron productos.</p>
                <Button
                  variant="outline"
                  className="mt-4 bg-transparent"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("Todos")
                  }}
                >
                  Limpiar filtros
                </Button>
              </div>
            ) : (
              <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                    <CardHeader className="p-0">
                      <div className="relative overflow-hidden rounded-t-lg bg-gray-100">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {!product.inStock && (
                          <Badge className="absolute top-3 left-3 bg-red-600 text-white">Agotado</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{product.category}</Badge>
                        <Badge variant="outline">{product.brand}</Badge>
                      </div>
                      <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
                      <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                      <div className="flex items-center mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 ml-2">
                          ({product.reviews})
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xl font-bold text-orange-600">${product.price}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button
                        className="w-full"
                        disabled={!product.inStock}
                        onClick={() => handleAddToCart(product)}
                      >
                        {product.inStock ? "Agregar al Carrito" : "Notificar Disponibilidad"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
