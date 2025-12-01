import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(req: NextRequest) {
  console.log("📧 [EMAIL] /api/send-verification llamado")

  const resendApiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.RESEND_FROM_EMAIL

  console.log("📧 [EMAIL] RESEND_API_KEY existe?", !!resendApiKey)
  console.log("📧 [EMAIL] FROM_EMAIL:", fromEmail)

  if (!resendApiKey) {
    console.error("❌ [EMAIL] Falta RESEND_API_KEY")
    return NextResponse.json({ error: "Falta RESEND_API_KEY" }, { status: 500 })
  }

  if (!fromEmail) {
    console.error("❌ [EMAIL] Falta RESEND_FROM_EMAIL")
    return NextResponse.json({ error: "Falta RESEND_FROM_EMAIL" }, { status: 500 })
  }

  const resend = new Resend(resendApiKey)

  try {
    const { email } = await req.json()
    console.log("📧 [EMAIL] email recibido:", email)

    if (!email || typeof email !== "string") {
      console.error("❌ [EMAIL] Email inválido:", email)
      return NextResponse.json({ error: "Email inválido" }, { status: 400 })
    }

    const verifyUrl = `http://localhost:3000/auth/verify-email?email=${encodeURIComponent(email)}`
    console.log("📧 [EMAIL] verifyUrl:", verifyUrl)

    const result = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "Verifica tu correo - Motofull",
      html: `
        <h2>¡Hola!</h2>
        <p>Gracias por registrarte en Motofull.</p>
        <p>Haz clic en el siguiente botón para verificar tu correo:</p>
        <p>
          <a href="${verifyUrl}" style="
            display:inline-block;
            padding:10px 16px;
            background:#ea580c;
            color:#fff;
            border-radius:6px;
            text-decoration:none;
            font-weight:bold;
          ">
            Verificar correo
          </a>
        </p>
        <p>Si tú no solicitaste esto, puedes ignorar este mensaje.</p>
      `,
    })

    console.log("📧 [EMAIL] Resultado Resend:", JSON.stringify(result, null, 2))

    if (result.error) {
      console.error("❌ [EMAIL] Error Resend:", result.error)
      return NextResponse.json(
        { error: "Error enviando correo", details: result.error },
        { status: 500 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    console.error("🔥 [EMAIL] Error en /api/send-verification:", err)
    return NextResponse.json(
      { error: "Error interno", details: String(err?.message ?? err) },
      { status: 500 },
    )
  }
}
