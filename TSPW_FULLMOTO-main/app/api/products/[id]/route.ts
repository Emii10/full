import { NextResponse } from "next/server"
import { pool } from "@/lib/db"

type RouteParams = {
  params: { id: string }
}

export async function GET(_req: Request, { params }: RouteParams) {
  const id = Number(params.id)
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 })
  }

  try {
    const result = await pool.query(
      "SELECT id, name, category, price, stock, description FROM products WHERE id = $1",
      [id],
    )

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 })
    }

    return NextResponse.json({ data: result.rows[0] })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: "Error al obtener producto" },
      { status: 500 },
    )
  }
}

export async function PUT(req: Request, { params }: RouteParams) {
  const id = Number(params.id)
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 })
  }

  try {
    const body = await req.json()
    const { name, category, price, stock, description } = body

    const result = await pool.query(
      `
      UPDATE products
      SET name = $1,
          category = $2,
          price = $3,
          stock = $4,
          description = $5
      WHERE id = $6
      RETURNING id, name, category, price, stock, description
    `,
      [name, category, price, stock ?? 0, description, id],
    )

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 })
    }

    return NextResponse.json({ data: result.rows[0] })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: "Error al actualizar producto" },
      { status: 500 },
    )
  }
}
