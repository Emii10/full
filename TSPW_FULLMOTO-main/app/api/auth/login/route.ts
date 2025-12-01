// app/api/auth/login/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // 🔹 POR AHORA: si el correo y la contraseña son estos, entra;
    // cámbialos luego por tu lógica real (BD, etc.)
    const isValidUser =
      email === "admin@motofull.com" && password === "admin123";

    if (!isValidUser) {
      return NextResponse.json(
        { error: "Correo o contraseña incorrectos" },
        { status: 401 }
      );
    }

    const user = {
      id: "1",
      email,
      role: "admin" as const,
    };

    return NextResponse.json(
      { user },          // 👈 aquí va EXACTAMENTE "user"
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en /api/auth/login:", error);
    return NextResponse.json(
      { error: "Error interno en el servidor" },
      { status: 500 }
    );
  }
}
