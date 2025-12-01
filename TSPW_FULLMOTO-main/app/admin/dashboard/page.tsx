// app/admin/dashboard/page.tsx
"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

import {
  Package,
  Users,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Eye,
  AlertTriangle,
} from "lucide-react"

// 👇 import correcto del contexto
import { useAuth } from "../../contexts/AuthContext"

// ================== DATOS MOCK ==================
const salesData = [
  { month: "Ene", sales: 12000, orders: 45 },
  { month: "Feb", sales: 15000, orders: 52 },
  { month: "Mar", sales: 18000, orders: 61 },
  { month: "Abr", sales: 22000, orders: 73 },
  { month: "May", sales: 25000, orders: 84 },
  { month: "Jun", sales: 28000, orders: 92 },
]

const categoryData = [
  { name: "Frenos", value: 35, color: "#ff6b35" },
  { name: "Escapes", value: 25, color: "#f7931e" },
  { name: "Filtros", value: 20, color: "#ffd23f" },
  { name: "Transmisión", value: 12, color: "#06d6a0" },
  { name: "Otros", value: 8, color: "#118ab2" },
]

const recentOrders = [
  { id: "#1234", customer: "Juan Pérez", total: 299.99, status: "Completado", date: "2024-01-15" },
  { id: "#1235", customer: "María García", total: 899.99, status: "Enviado", date: "2024-01-15" },
  { id: "#1236", customer: "Carlos López", total: 149.99, status: "Procesando", date: "2024-01-14" },
  { id: "#1237", customer: "Ana Martínez", total: 1299.99, status: "Pendiente", date: "2024-01-14" },
  { id: "#1238", customer: "Luis Rodríguez", total: 79.99, status: "Completado", date: "2024-01-13" },
]

const lowStockProducts = [
  { name: "Kit de Frenos Brembo", stock: 3, category: "Frenos" },
  { name: "Filtro K&N Performance", stock: 1, category: "Filtros" },
  { name: "Cadena DID 520", stock: 5, category: "Transmisión" },
  { name: "Escape Akrapovic", stock: 2, category: "Escapes" },
]

// ================== COMPONENTE ==================
// ================== COMPONENTE ==================
export default function AdminDashboard() {
  const router = useRouter()
  const { user } = useAuth()   // 👈 solo user

  // Proteger ruta: solo admin
  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
    } else if (user.role !== "admin") {
      router.push("/")
    }
  }, [user, router])

  // Mientras redirige / valida
  if (!user || user.role !== "admin") {
    return <div className="p-6">Cargando...</div>
  }


  // Mientras revisa / redirige
  // Mientras revisa / redirige
if (!user || user.role !== "admin") {
  return <div className="p-6">Cargando...</div>
}


  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completado":
        return "bg-green-500"
      case "Enviado":
        return "bg-blue-500"
      case "Procesando":
        return "bg-yellow-500"
      case "Pendiente":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Dashboard Administrativo
              </h1>
              {/* usamos email por si user no tiene name */}
              <p className="text-gray-600">
                Bienvenido, {user.name ?? user.email}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link href="/">Ver Tienda</Link>
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  // si luego tienes logout en el contexto, úsalo aquí
                  localStorage.removeItem("user")
                  router.push("/auth/login")
                }}
              >
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Tarjetas de stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Ventas Totales
                  </p>
                  <p className="text-3xl font-bold text-gray-900">$28,450</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +12.5% vs mes anterior
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Órdenes</p>
                  <p className="text-3xl font-bold text-gray-900">92</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +8.2% vs mes anterior
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Productos
                  </p>
                  <p className="text-3xl font-bold text-gray-900">1,247</p>
                  <p className="text-sm text-orange-600 flex items-center mt-1">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    4 con stock bajo
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Package className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Clientes
                  </p>
                  <p className="text-3xl font-bold text-gray-900">2,847</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +15.3% vs mes anterior
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gráficas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Ventas Mensuales</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#ff6b35" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Distribución por Categoría</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Órdenes + stock bajo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Órdenes Recientes</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/orders">Ver Todas</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                      <p className="text-xs text-gray-500">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${order.total}</p>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-orange-600" />
                Stock Bajo
              </CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/products">Gestionar</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lowStockProducts.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg bg-orange-50"
                  >
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <Badge variant="secondary">{product.category}</Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-orange-600">
                        {product.stock} unidades
                      </p>
                      <Button size="sm" variant="outline">
                        Reabastecer
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Acciones rápidas */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Acciones Rápidas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col" asChild>
              <Link href="/admin/products/new">
                <Package className="h-6 w-6 mb-2" />
                Nuevo Producto
              </Link>
            </Button>
            <Button
              className="h-20 flex flex-col bg-transparent"
              variant="outline"
              asChild
            >
              <Link href="/admin/products">
                <Eye className="h-6 w-6 mb-2" />
                Ver Productos
              </Link>
            </Button>
            <Button
              className="h-20 flex flex-col bg-transparent"
              variant="outline"
              asChild
            >
              <Link href="/admin/orders">
                <ShoppingCart className="h-6 w-6 mb-2" />
                Gestionar Órdenes
              </Link>
            </Button>
            <Button
              className="h-20 flex flex-col bg-transparent"
              variant="outline"
              asChild
            >
              <Link href="/admin/users">
                <Users className="h-6 w-6 mb-2" />
                Ver Usuarios
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
