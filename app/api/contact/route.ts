import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { contactSchema } from "@/lib/validations";
import { rateLimit, ipKey } from "@/lib/rateLimit";
import { sendContactConfirmation } from "@/lib/email";
import { resend, FOUNDER } from "@/lib/email";

async function hashIP(ip: string): Promise<string> {
  const salt   = process.env.IP_HASH_SALT ?? "humans-salt";
  const data   = new TextEncoder().encode(salt + ip);
  const buffer = await crypto.subtle.digest("SHA-256", data);
  return Buffer.from(buffer).toString("hex").slice(0, 16);
}

export async function POST(req: Request) {
  // 1. Rate limit — 5 mensajes por IP en 10 minutos
  const ip = ipKey(req);
  const { allowed } = await rateLimit(`contact:${ip}`, 5, 600);
  if (!allowed) {
    return NextResponse.json(
      { error: "Demasiados intentos. Inténtalo en unos minutos." },
      { status: 429 },
    );
  }

  // 2. Validar body
  let body: unknown;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "Petición inválida" }, { status: 400 }); }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos incorrectos", details: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const { nombre, email, mensaje } = parsed.data;
  const ip_hash = await hashIP(ip);

  // 3. Guardar en BD
  await sql(
    `INSERT INTO "ContactMessage" (id, nombre, email, mensaje, ip_hash, rgpd)
     VALUES ($1,$2,$3,$4,$5,$6)`,
    [crypto.randomUUID(), nombre, email, mensaje, ip_hash, true]
  );

  // 4. Notificaciones en paralelo
  void Promise.allSettled([
    sendContactConfirmation({ to: email, nombre }),
    resend().emails.send({
      from:    `HUMANS Contacto <${FOUNDER()}>`,
      to:      FOUNDER(),
      subject: `Pregunta de contacto: ${nombre}`,
      html: `
        <p><strong>De:</strong> ${nombre} &lt;${email}&gt;</p>
        <p><strong>Mensaje:</strong></p>
        <blockquote style="border-left:3px solid #1B4F8A;padding-left:12px;color:#253555">
          ${mensaje.replace(/\n/g, "<br>")}
        </blockquote>
      `,
    }),
  ]);

  return NextResponse.json({ success: true });
}
