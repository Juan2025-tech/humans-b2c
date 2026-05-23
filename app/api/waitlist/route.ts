import { NextResponse } from "next/server";
import { sql, WaitlistRow } from "@/lib/db";
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

  try {
    const utm     = extractUTM(req);
    const ip_hash = await hashIP(ip);
    // 3. Deduplicar — email ya existe
    const existingRows = await sql<WaitlistRow>(
      `SELECT id FROM "Waitlist" WHERE email = $1 LIMIT 1`,
      [email]
    );
    if (existingRows[0]) {
      const [{ count }] = await sql<{ count: number }>(
        `SELECT COUNT(*)::int AS count FROM "Waitlist"`
      );
      return NextResponse.json({ success: true, position: count, already: true });
    }

    // 4. Guardar en BD (el lead no se pierde aunque fallen las notificaciones)
    const [lead] = await sql<WaitlistRow>(
      `INSERT INTO "Waitlist"
         (id, nombre, email, telefono, para_quien, plan_interes, fuente, utm_medium, utm_campaign, referrer, ip_hash, rgpd)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
       RETURNING *`,
      [
        crypto.randomUUID(),
        nombre,
        email,
        telefono ?? null,
        para_quien,
        plan_interes ?? null,
        utm.fuente,
        utm.utm_medium,
        utm.utm_campaign,
        utm.referrer,
        ip_hash,
        true,
      ]
    );

    const [{ count: position }] = await sql<{ count: number }>(
      `SELECT COUNT(*)::int AS count FROM "Waitlist"`
    );

    // 5. Notificaciones en paralelo — no bloquean la respuesta
    void Promise.allSettled([
      sendWaitlistConfirmation({ to: email, nombre, position }),
      notifyFounder({ nombre, email, para_quien, fuente: utm.fuente, position }),
    ]).then((results) => {
      results.forEach((r, i) => {
        if (r.status === "rejected") {
          console.error(`[waitlist] notificación ${i} falló:`, r.reason);
        }
      });
    });

    return NextResponse.json({ success: true, position, id: lead!.id });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[waitlist] error:", msg);
    return NextResponse.json(
      { error: "No se pudo completar el registro. Inténtalo de nuevo." },
      { status: 500 },
    );
  }
}
