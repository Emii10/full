// app/api/admin/products/route.ts
import { NextRequest, NextResponse } from "next/server"
import { pool } from "@/lib/db"
import path from "path"
import { promises as fs } from "fs"

export async function POST(req: NextRequest) {
  try {
    // 1. Leer form-data (texto + archivo)
    const formData = await req.formData()

    const name = String(formData.get("name") ?? "").trim()
    const category = String(formData.get("category") ?? "").trim()
    const price = Number(formData.get("price") ?? 0)
    const stock = Number(formData.get("stock") ?? 0)
    const description = (formData.get("description") as string | null) ?? null
    const file = formData.get("image") as File | null

    if (!name || !category || !price) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 },
      )
    }

    // 2. Guardar la imagen (si viene)
    let imageUrl: string | null = null

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const uploadsDir = path.join(process.cwd(), "public", "uploads")
      await fs.mkdir(uploadsDir, { recursive: true })

      const safeName = file.name.replace(/\s+/g, "_")
      const filename = `${Date.now()}-${safeName}`
      const filepath = path.join(uploadsDir, filename)

      await fs.writeFile(filepath, buffer)

      // Esta ruta es la que usarás en <img src={...} />
      imageUrl = `/uploads/${filename}`
    }

    // 3. Guardar en la BD
    const result = await pool.query(
      `
      INSERT INTO products (name, category, price, stock, description, image_url)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `,
      [name, category, price, stock, description, imageUrl],
    )

    return NextResponse.json({ data: result.rows[0] }, { status: 201 })
  } catch (err) {
    console.error("Error creando producto con imagen:", err)
    return NextResponse.json(
      { error: "Error interno al crear el producto" },
      { status: 500 },
    )
  }
}

// Opcional: GET para debug si luego quieres usarlo
export async function GET() {
  const result = await pool.query("SELECT * FROM products ORDER BY id DESC")
  return NextResponse.json({ data: result.rows })
}
