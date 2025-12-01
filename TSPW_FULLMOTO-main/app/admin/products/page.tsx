"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, Filter, Plus, Edit, RefreshCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

type Product = {
  id: number
  name: string
  category: string
  price: number
  stock: number
  description?: string | null
  image_url?: string | null
}

export default function AdminProductsPage() {
  const router = useRouter()

  const [userLoaded, setUserLoaded] = useState(false)
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos")
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 🔐 Protección por rol (igual que en tu dashboard)
  useEffect(() => {
    const raw = localStorage.getItem("user")
    if (!raw) {
      router.push("/auth/login")
      return
    }
    const parsed = JSON.parse(raw)
    if (parsed.role !== "admin") {
      router.push("/auth/login")
      return
    }
    setUserLoaded(true)
  }, [router])

  // 🗄 Cargar productos desde la API
  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch("/api/products")
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Error al obtener productos")
      setProducts(data.data || [])
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Error al cargar productos")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (userLoaded) {
      fetchProducts()
    }
  }, [userLoaded])

  // 📂 Categorías dinámicas
  const categories = useMemo(() => {
    const set = new Set<string>()
    products.forEach((p) => {
      if (p.category) set.add(p.category)
    })
    return Array.from(set)
  }, [products])

  // 🔍 Filtro por búsqueda + categoría
  const filteredProducts = useMemo(() => {
    const query = search.toLowerCase()

    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(query) ||
        (p.description || "").toLowerCase().includes(query) ||
        (p.category || "").toLowerCase().includes(query)

      const matchesCategory =
        selectedCategory === "Todos" || p.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [products, search, selectedCategory])

  const formatPrice = (value: number) =>
    value.toLocaleString("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 2,
    })

  const getStockLabel = (stock: number) => {
    if (stock === 0) return { text: "Sin stock", color: "text-red-600" }
    if (stock <= 3) return { text: "Stock muy bajo", color: "text-red-500" }
    if (stock <= 5) return { text: "Stock bajo", color: "text-yellow-600" }
    return { text: "Stock OK", color: "text-green-600" }
  }

  if (!userLoaded) {
    return <div className="p-6">Cargando...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white border-b">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              href="/admin/dashboard"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              ← Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">
              Gestión de Productos
            </h1>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchProducts}
              className="flex items-center gap-2"
            >
              <RefreshCcw className="h-4 w-4" />
              Actualizar
            </Button>

            <Button
              className="bg-orange-600 hover:bg-orange-700"
              asChild
            >
              <Link href="/admin/products/new">
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Producto
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* CONTENIDO */}
      <main className="p-6">
        {/* Buscador + Filtros */}
        <Card className="mb-6">
          <CardContent className="p-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Buscador */}
            <div className="w-full md:max-w-md relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por nombre, categoría o descripción..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Categorías */}
            <div className="flex flex-wrap gap-2 items-center">
              <Filter className="h-4 w-4 text-gray-400" />
              <Button
                size="sm"
                variant={selectedCategory === "Todos" ? "default" : "outline"}
                onClick={() => setSelectedCategory("Todos")}
              >
                Todas
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat}
                  size="sm"
                  variant={selectedCategory === cat ? "default" : "outline"}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mensajes */}
        {error && (
          <p className="text-red-600 mb-4 text-sm">
            {error}
          </p>
        )}
        {loading && <p>Cargando productos...</p>}

        {/* LISTA DE PRODUCTOS */}
        {!loading && (
          <>
            {filteredProducts.length === 0 ? (
              <p className="text-gray-500">
                No se encontraron productos con esos filtros.
              </p>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredProducts.map((product) => {
                  const stockInfo = getStockLabel(product.stock ?? 0)

                  return (
                    <Card
                      key={product.id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-5">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm text-gray-500">
                              ID: {product.id}
                            </p>
                            <h2 className="text-lg font-semibold text-gray-900">
                              {product.name}
                            </h2>
                            <p className="text-xs text-gray-500 mt-1">
                              {product.description || "Sin descripción"}
                            </p>
                          </div>
                          <Badge variant="secondary">
                            {product.category || "Sin categoría"}
                          </Badge>
                        </div>

                        <div className="mt-4 flex justify-between items-center">
                          <div>
                            <p className="text-xl font-bold text-gray-900">
                              {formatPrice(product.price)}
                            </p>
                            <p
                              className={`text-sm font-medium ${stockInfo.color}`}
                            >
                              {product.stock} unidades · {stockInfo.text}
                            </p>
                          </div>

                          {/* 🔘 BOTÓN EDITAR AQUÍ */}
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              asChild
                            >
                              <Link
                                href={`/admin/products/${product.id}/edit`}
                                className="flex items-center gap-1"
                              >
                                <Edit className="h-4 w-4" />
                                Editar
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
