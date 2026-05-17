import { NextResponse } from "next/server";
import { prisma }        from "@/lib/prisma";
import { waitlistSchema } from "@/lib/validations";
import { rateLimit, ipKey } from "@/lib/rateLimit";
import { extractUTM }    from "@/lib/utm";
import { sendWaitlistConfirmation } from "@/lib/email";
import { notifyFounder } from "@/lib/notifications";

async function hashIP(ip: string): Promise<string> {
  const salt   = process.env.IP_HASH_SALT ?? "humans-salt";
  const data   = new TextEncoder().encode(salt + ip);
  const buffer = await crypto.subtle.digest("SHA-256", data);
  return Buffer.from(buffer).toString("hex").slice(0, 16);
}

export async function POST(req: Request) {
  // 1. Rate limit — 3 por IP en 10 minutos
  const ip     = ipKey(req);
  const { allowed } = await rateLimit(`waitlist:${ip}`, 3, 600);
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

  const parsed = waitlistSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos incorrectos", details: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const { nombre, email, telefono, para_quien, plan_interes } = parsed.data;
  const utm      = extractUTM(req);
  const ip_hash  = await hashIP(ip);

  // 3. Deduplicar — email ya existe
  const existing = await prisma.waitlist.findUnique({ where: { email } });
  if (existing) {
    const count = await prisma.waitlist.count();
    return NextResponse.json({ success: true, position: count, already: true });
  }

  // 4. Guardar en BD (el lead no se pierde aunque fallen las notificaciones)
  const lead = await prisma.waitlist.create({
    data: {
      nombre,
      email,
      telefono,
      para_quien,
      plan_interes,
      fuente:       utm.fuente,
      utm_medium:   utm.utm_medium,
      utm_campaign: utm.utm_campaign,
      referrer:     utm.referrer,
      ip_hash,
      rgpd: true,
    },
  });

  const position = await prisma.waitlist.count();

  // 5. Notificaciones en paralelo — no bloquean la respuesta
  void Promise.allSettled([
    sendWaitlistConfirmation({ to: email, nombre, position }),
    notifyFounder({ nombre, email, para_quien, fuente: utm.fuente, position }),
  ]);

  return NextResponse.json({ success: true, position, id: lead.id });
}
