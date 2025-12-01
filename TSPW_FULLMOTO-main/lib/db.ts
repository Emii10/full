// lib/db.ts
import { Pool } from "pg"

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error("Falta DATABASE_URL en .env.local")
}

export const pool = new Pool({
  connectionString,
})
