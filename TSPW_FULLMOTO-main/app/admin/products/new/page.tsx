"use client"

import { useState, useEffect, FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function NewProductPage() {
  const router = useRouter()
  const [userChecked, setUserChecked] = useState(false)

  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("0")
  const [description, setDescription] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null) // aún no se usa
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Proteger por rol admin
  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/auth/login")
      return
    }
    const parsed = JSON.parse(userData)
    if (parsed.role !== "admin") {
      router.push("/auth/login")
      return
    }
    setUserChecked(true)
  }, [router])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      setLoading(true)

      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          category,
          price: Number(price),
          stock: Number(stock),
          description,
          // imageFile se puede usar más adelante cuando tengas endpoint para subir archivos
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || "Error al crear producto")
      }

      // limpiar formulario
      setName("")
      setCategory("")
      setPrice("")
      setStock("0")
      setDescription("")
      setImageFile(null)

      // volver a la lista de productos
      router.push("/admin/products")
    } catch (e: any) {
      console.error(e)
      setError(e.message || "Error al guardar producto")
    } finally {
      setLoading(false)
    }
  }

  if (!userChecked) return <div className="p-6">Cargando...</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="px-6 py-4 flex items-center justify-between">
          <Link
            href="/admin/products"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            ← Volver a productos
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Nuevo Producto</h1>
          <div />{/* espacio para centrar el título */}
        </div>
      </header>

      <div className="p-6 flex justify-center">
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle>Información del producto</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <p className="text-red-600 text-sm border border-red-200 rounded-md px-3 py-2 bg-red-50">
                  {error}
                </p>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">Nombre *</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Pastillas Brembo Oro"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Categoría *</label>
                <Input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  placeholder="frenos, escapes, filtros..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Precio (MXN) *</label>
                  <Input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    min={0}
                    step="0.01"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Stock</label>
                  <Input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    min={0}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Imagen del producto (opcional)</label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                />
                <p className="text-xs text-gray-500">
                  Por ahora la imagen no se sube al servidor, pero ya puedes seleccionar el archivo.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Descripción</label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descripción del producto..."
                  rows={4}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" asChild>
                  <Link href="/admin/products">Cancelar</Link>
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Guardando..." : "Guardar producto"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
