import { NextRequest, NextResponse } from "next/server"

type HistoryTurn = {
  role: "user" | "assistant"
  content: string
}

// 🔹 marcas conocidas para detectar la moto en el historial
const KNOWN_BRANDS = [
  "honda",
  "yamaha",
  "kawasaki",
  "suzuki",
  "ducati",
  "bmw",
  "ktm",
  "italika",
  "bajaj",
  "pulsar",
  "vento",
  "harley",
  "harley-davidson",
]

function detectMotoFromHistory(history: HistoryTurn[] | undefined, currentMessage: string): string | null {
  const texts: string[] = []

  if (Array.isArray(history)) {
    for (const h of history) {
      if (h.role === "user" && h.content) {
        texts.push(h.content)
      }
    }
  }

  texts.push(currentMessage)

  // Recorremos desde el último mensaje hacia atrás
  for (let i = texts.length - 1; i >= 0; i--) {
    const t = texts[i]
    const lower = t.toLowerCase()

    const hasBrand = KNOWN_BRANDS.some((b) => lower.includes(b))
    const hasYear = /\b(19[8-9]\d|20[0-3]\d)\b/.test(lower) // años 1980–2039 aprox

    if (hasBrand && hasYear) {
      return t // usamos el mensaje completo como descripción de la moto
    }
  }

  return null
}

export async function POST(req: NextRequest) {
  try {
    console.log("➡️ [API] /api/motofull-chat llamada")

    const { message, history } = (await req.json()) as {
      message: string
      history?: HistoryTurn[]
    }

    console.log("📩 [API] Mensaje recibido:", message)
    console.log("🧠 [API] Historial recibido:", history?.length ?? 0, "mensajes")

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Mensaje inválido" }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY
    console.log("🔑 [API] GEMINI_API_KEY presente?", !!apiKey)

    if (!apiKey) {
      console.error("❌ Falta GEMINI_API_KEY en el servidor")
      return NextResponse.json({ error: "Falta configuración de IA (Gemini)" }, { status: 500 })
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`

    // Prompt de sistema mejorado
    const systemPrompt = `
Eres el asistente virtual de Motofull, una tienda especializada en repuestos premium para motocicletas en México.

Tu misión es ayudar al usuario a elegir repuestos premium (frenos, escapes, suspensión, transmisión, filtros, etc.) con explicaciones claras y fáciles de entender.

REGLAS IMPORTANTES (OBLIGATORIAS):
1. Siempre responde en ESPAÑOL neutro.
2. Si ya conoces la moto actual del usuario (por ejemplo porque el sistema te lo indica, o porque el usuario mencionó marca, modelo y año en la conversación), **ESTÁ PROHIBIDO** volver a pedir marca, modelo o año. Solo puedes pedirlos otra vez si el usuario dice claramente que está hablando de OTRA moto diferente.
3. Si todavía NO tienes marca, modelo o año en toda la conversación, pídeselos de forma breve.
4. Cuando tengas la información suficiente, responde siempre de forma estructurada:
   - 1 frase de resumen.
   - 2 o 3 opciones recomendadas en viñetas, indicando:
     • Marca y tipo de pieza.
     • Tipo de uso (calle, pista, mixto, touring).
     • Ventajas principales.
   - 1 recomendación de instalación en taller certificado.
   - 1 recordatorio de que precios y stock se confirman en la tienda o por WhatsApp.
5. Nunca inventes precios exactos ni stock; puedes hablar de rangos generales.
6. No repitas toda la conversación; solo usa el contexto para dar una respuesta concreta.
`.trim()

    // 🔹 Detectar la moto actual en el historial
    const motoActual = detectMotoFromHistory(history, message)
    console.log("🏍️ [API] Moto detectada:", motoActual ?? "ninguna")

    const contents: any[] = []

    // Instrucción de sistema
    contents.push({
      role: "user",
      parts: [{ text: systemPrompt }],
    })

    // Si detectamos moto, se la decimos explícitamente al modelo
    if (motoActual) {
      contents.push({
        role: "user",
        parts: [
          {
            text:
              "NOTA DEL SISTEMA (no del usuario): la moto actual del usuario es: " +
              motoActual +
              ". No vuelvas a pedir marca, modelo ni año; úsala como contexto mientras el usuario no indique otra moto distinta.",
          },
        ],
      })
    }

    // Historial (últimos 8 turnos)
    if (Array.isArray(history)) {
      for (const turn of history.slice(-8)) {
        contents.push({
          role: turn.role === "assistant" ? "model" : "user",
          parts: [{ text: turn.content }],
        })
      }
    }

    // Mensaje actual
    contents.push({
      role: "user",
      parts: [{ text: message }],
    })

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contents }),
    })

    console.log("📡 [API] Respuesta Gemini status:", response.status)

    if (!response.ok) {
      let errorDetail: any
      try {
        errorDetail = await response.json()
      } catch {
        const txt = await response.text()
        errorDetail = { message: txt }
      }

      console.error("❌ [API] Error al llamar a Gemini:", errorDetail)

      return NextResponse.json(
        {
          error: "Error llamando al modelo de IA (Gemini)",
          details: errorDetail,
        },
        { status: 500 },
      )
    }

    const data = await response.json()

    const text =
      data?.candidates?.[0]?.content?.parts
        ?.map((p: { text?: string }) => p.text ?? "")
        .join("\n")
        .trim() ??
      "Lo siento, tuve un problema al generar la respuesta. ¿Puedes intentar de nuevo?"

    console.log("✅ [API] Texto generado por Gemini:", text)

    return NextResponse.json({ text })
  } catch (error) {
    console.error("🔥 [API] Error en /api/motofull-chat (Gemini):", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
