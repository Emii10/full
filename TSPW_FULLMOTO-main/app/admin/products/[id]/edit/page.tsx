"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

type Product = {
  id: number
  name: string
  category: string
  price: number
  stock: number
  description?: string | null
  image_url?: string | null
}

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const id = params.id

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Protegemos por rol igual que en el dashboard
  useEffect(() => {
    const raw = localStorage.getItem("user")
    if (!raw) {
      router.push("/auth/login")
      return
    }
    const user = JSON.parse(raw)
    if (user.role !== "admin") {
      router.push("/auth/login")
    }
  }, [router])

  // Cargar datos del producto
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(`/api/products/${id}`)
        const data = await res.json()
        if (!res.ok) {
          throw new Error(data.error || "No se pudo cargar el producto")
        }
        setProduct(data.data)
      } catch (err: any) {
        console.error(err)
        setError(err.message || "Error al cargar el producto")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProduct()
    }
  }, [id])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (!product) return
    const { name, value } = e.target

    setProduct({
      ...product,
      [name]:
        name === "price" || name === "stock" ? Number(value) || 0 : value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!product) return

    try {
      setSaving(true)
      setError(null)

      const res = await fetch(`/api/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: product.name,
          category: product.category,
          price: product.price,
          stock: product.stock,
          description: product.description ?? "",
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || "No se pudo actualizar el producto")
      }

      // volver a la lista
      router.push("/admin/products")
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Error al guardar cambios")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="p-6">Cargando producto...</div>
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-600 mb-4">{error}</p>
        <Button asChild>
          <Link href="/admin/products">Volver a productos</Link>
        </Button>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="p-6">
        <p className="mb-4">Producto no encontrado.</p>
        <Button asChild>
          <Link href="/admin/products">Volver a productos</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="px-6 py-4 flex items-center justify-between">
          <Link
            href="/admin/products"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Volver a productos
          </Link>
          <h1 className="text-xl font-bold text-gray-900">
            Editar producto #{product.id}
          </h1>
          <div className="w-24" />
        </div>
      </header>

      <main className="p-6 flex justify-center">
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle>Información del producto</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Nombre *
                </label>
                <Input
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  Categoría *
                </label>
                <Input
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Precio (MXN) *
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Stock *
                  </label>
                  <Input
                    type="number"
                    name="stock"
                    value={product.stock}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  Descripción
                </label>
                <Textarea
                  name="description"
                  value={product.description ?? ""}
                  onChange={handleChange}
                  rows={4}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/admin/products")}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? "Guardando..." : "Guardar cambios"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
