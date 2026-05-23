import Mailjet from "node-mailjet";

let _mj: ReturnType<typeof Mailjet.apiConnect> | null = null;
function getMJ() {
  if (!_mj) {
    _mj = Mailjet.apiConnect(
      process.env.MAILJET_API_KEY!,
      process.env.MAILJET_SECRET_KEY!,
    );
  }
  return _mj;
}

function FROM()    { return process.env.ALERT_EMAIL_FROM ?? "jperez@humans-tech.com"; }
function FOUNDER() { return process.env.EMAIL_FOUNDER   ?? "jperez@humans-tech.com"; }
function DOMAIN()  { return process.env.NEXTAUTH_URL    ?? "https://humans-tech.com"; }

export { FROM, FOUNDER };

interface MailParams {
  to:      string;
  toName?: string;
  subject: string;
  html:    string;
}

export async function sendMail(params: MailParams): Promise<void> {
  await getMJ()
    .post("send", { version: "v3.1" })
    .request({
      Messages: [
        {
          From: { Email: FROM(), Name: "HUMANS" },
          To: [{ Email: params.to, Name: params.toName ?? params.to }],
          Subject: params.subject,
          HTMLPart: params.html,
        },
      ],
    });
}

export async function sendWaitlistConfirmation(params: {
  to:       string;
  nombre:   string;
  position: number;
}): Promise<void> {
  await sendMail({
    to:      params.to,
    toName:  params.nombre,
    subject: "🎉 ¡Tu plaza en HUMANS está reservada!",
    html: `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F8FAFC;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8FAFC;padding:32px 16px">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%">

        <!-- Cabecera -->
        <tr>
          <td align="center" style="background:#1B4F8A;border-radius:12px 12px 0 0;padding:28px 32px">
            <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;letter-spacing:4px">HUMANS</h1>
          </td>
        </tr>

        <!-- Cuerpo -->
        <tr>
          <td style="background:#ffffff;padding:36px 40px;border:1px solid #E2E8F0;border-top:none;border-radius:0 0 12px 12px">

            <p style="margin:0 0 20px;font-size:18px;font-weight:600;color:#1E293B">¡Hola, ${params.nombre}!</p>

            <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#334155">
              Tu plaza está reservada. Eres la persona nº <strong style="color:#1B4F8A">#${params.position}</strong> en sumarte a nuestra comunidad de lanzamiento.
            </p>

            <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#334155">
              Sabemos que cuidar de tu familia es tu mayor prioridad, pero también un gran reto. Por eso estamos construyendo HUMANS: una plataforma diseñada para darte tranquilidad, conectarte con los mejores recursos y facilitar tu día a día. Todo con la calidez, el respeto y la humanidad que tu familia merece.
            </p>

            <!-- Bloque pasos siguientes -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px">
              <tr>
                <td style="background:#EFF6FF;border-left:4px solid #1B4F8A;border-radius:0 8px 8px 0;padding:16px 20px">
                  <p style="margin:0 0 8px;font-size:15px;font-weight:600;color:#1B4F8A">📅 ¿Cuáles son los siguientes pasos?</p>
                  <p style="margin:0;font-size:14px;line-height:1.7;color:#334155">
                    Queremos que todo sea claro desde el primer día. En los próximos días te enviaremos un correo exclusivo con la información detallada sobre nuestros planes, precios y condiciones de acceso. Nuestro objetivo es ofrecerte opciones flexibles que se adapten a lo que tu familia realmente necesita, con total transparencia y sin letras pequeñas.
                  </p>
                </td>
              </tr>
            </table>

            <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#334155">
              Mientras tanto, <strong>tú no tienes que hacer nada</strong>.<br>
              <span style="font-size:13px;color:#64748B">(Sin tarjeta de crédito por adelantado. Sin compromiso).</span>
            </p>

            <p style="margin:0 0 28px;font-size:15px;line-height:1.7;color:#334155">
              Un abrazo,<br>
              <strong>El equipo de HUMANS 💙</strong>
            </p>

            <!-- Bloque RGPD -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px">
              <tr>
                <td style="background:#F0F9FF;border-radius:8px;padding:14px 18px">
                  <p style="margin:0;font-size:13px;line-height:1.6;color:#0369A1">
                    🔒 <strong>Tu tranquilidad es nuestra prioridad.</strong> Tus datos se almacenan de forma segura en servidores de la UE y están estrictamente protegidos por el RGPD.
                  </p>
                </td>
              </tr>
            </table>

            <p style="margin:0;font-size:12px;color:#94A3B8;line-height:1.6">
              ¿No te apuntaste tú o fue un error?
              <a href="${DOMAIN()}/baja?email=${encodeURIComponent(params.to)}" style="color:#1B4F8A;text-decoration:underline">Cancela tu reserva aquí con un clic</a>.
            </p>

          </td>
        </tr>

        <!-- Pie -->
        <tr>
          <td align="center" style="padding:20px 0">
            <p style="margin:0;font-size:11px;color:#94A3B8">
              © 2026 HUMANS · humans-tech.com · Datos tratados conforme al RGPD
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
    `,
  });
}

export async function sendContactConfirmation(params: {
  to:     string;
  nombre: string;
}): Promise<void> {
  await sendMail({
    to:      params.to,
    toName:  params.nombre,
    subject: "Hemos recibido tu mensaje — HUMANS",
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:auto;color:#1E293B">
        <div style="background:#1B4F8A;padding:24px 32px;border-radius:8px 8px 0 0">
          <h1 style="color:#fff;margin:0;font-size:24px">HUMANS</h1>
        </div>
        <div style="padding:32px;border:1px solid #E2E8F0;border-top:none;border-radius:0 0 8px 8px">
          <h2 style="margin-top:0">Gracias, ${params.nombre}</h2>
          <p>Hemos recibido tu mensaje y te responderemos lo antes posible.</p>
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
