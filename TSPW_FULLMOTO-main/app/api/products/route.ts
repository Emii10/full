// app/api/products/route.ts
import { NextResponse } from "next/server"
import { pool } from "@/lib/db"

// GET /api/products  -> lista productos
export async function GET() {
  try {
    const result = await pool.query(
      `SELECT id, name, category, price, stock, description
       FROM products
       ORDER BY id DESC`
    )

    return NextResponse.json(
      { data: result.rows },
      { status: 200 },
    )
  } catch (err) {
    console.error("[API] Error en GET /api/products:", err)
    return NextResponse.json(
      { error: "Error obteniendo productos" },
      { status: 500 },
    )
  }
}

// POST /api/products  -> crea producto nuevo
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, category, price, stock, description } = body

    if (!name || !category || price == null) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios (name, category, price)" },
        { status: 400 },
      )
    }

    const result = await pool.query(
      `INSERT INTO products (name, category, price, stock, description)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, category, price, stock, description`,
      [name, category, price, stock ?? 0, description ?? null],
    )

    return NextResponse.json(
      { data: result.rows[0] },
      { status: 201 },
    )
  } catch (err) {
    console.error("[API] Error en POST /api/products:", err)
    return NextResponse.json(
      { error: "Error creando producto" },
      { status: 500 },
    )
  }
}
