import { Resend } from "resend";

// Lazy singleton — no se instancia en build time
let _resend: Resend | null = null;
function getResend(): Resend {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY!);
  return _resend;
}
export { getResend as resend };

function FROM()    { return process.env.EMAIL_FROM    ?? "noreply@humans-tech.com"; }
function FOUNDER() { return process.env.EMAIL_FOUNDER ?? "jperez@humans-tech.com"; }
function DOMAIN()  { return process.env.NEXTAUTH_URL  ?? "https://humans-tech.com"; }

export { FROM, FOUNDER };

export async function sendWaitlistConfirmation(params: {
  to:        string;
  nombre:    string;
  position:  number;
}): Promise<void> {
  await getResend().emails.send({
    from:    FROM(),
    to:      params.to,
    subject: "✓ Tu plaza en HUMANS está reservada",
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:auto;color:#1E293B">
        <div style="background:#1B4F8A;padding:24px 32px;border-radius:8px 8px 0 0">
          <h1 style="color:#fff;margin:0;font-size:24px">HUMANS</h1>
        </div>
        <div style="padding:32px;border:1px solid #E2E8F0;border-top:none;border-radius:0 0 8px 8px">
          <h2 style="margin-top:0">¡Reserva confirmada, ${params.nombre}!</h2>
          <p>Eres el número <strong>#${params.position}</strong> en nuestra lista de espera.</p>
          <p>Te escribiremos en cuanto tu acceso esté listo. Sin tarjeta de crédito, sin compromiso.</p>
          <div style="background:#F0F9FF;border-radius:8px;padding:16px 20px;margin:24px 0">
            <p style="margin:0;font-size:14px;color:#0369A1">
              🔒 Tus datos se almacenan en servidores de la UE y están protegidos por el RGPD.
            </p>
          </div>
          <p style="font-size:13px;color:#64748B">
            ¿No te apuntaste tú?
            <a href="${DOMAIN()}/baja?email=${encodeURIComponent(params.to)}" style="color:#1B4F8A">
              Cancela aquí con un clic
            </a>.
          </p>
        </div>
        <p style="text-align:center;font-size:12px;color:#94A3B8;margin-top:16px">
          © 2026 HUMANS · humans-tech.com · Datos tratados conforme al RGPD
        </p>
      </div>
    `,
  });
}

export async function sendContactConfirmation(params: {
  to:     string;
  nombre: string;
}): Promise<void> {
  await getResend().emails.send({
    from:    FROM(),
    to:      params.to,
    subject: "Hemos recibido tu mensaje — HUMANS",
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:auto;color:#1E293B">
        <div style="background:#1B4F8A;padding:24px 32px;border-radius:8px 8px 0 0">
          <h1 style="color:#fff;margin:0;font-size:24px">HUMANS</h1>
        </div>
        <div style="padding:32px;border:1px solid #E2E8F0;border-top:none;border-radius:0 0 8px 8px">
          <h2 style="margin-top:0">Gracias, ${params.nombre}</h2>
          <p>Hemos recibido tu mensaje y te responderemos en menos de 24 horas.</p>
          <p>Si tienes más preguntas, escríbenos a
            <a href="mailto:${FOUNDER()}" style="color:#1B4F8A">${FOUNDER()}</a>.
          </p>
        </div>
        <p style="text-align:center;font-size:12px;color:#94A3B8;margin-top:16px">
          © 2026 HUMANS · humans-tech.com
        </p>
      </div>
    `,
  });
}
