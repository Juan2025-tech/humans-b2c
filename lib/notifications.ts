import { sendMail, FOUNDER } from "@/lib/email";

interface LeadNotification {
  nombre:    string;
  email:     string;
  para_quien: string;
  fuente:    string | null;
  position:  number;
}

// Notifica al fundador por email + webhook (Slack/Telegram/n8n).
// Se ejecuta en paralelo — si falla no bloquea la respuesta al usuario.
export async function notifyFounder(lead: LeadNotification): Promise<void> {
  const label = lead.fuente ?? "directo";
  await Promise.allSettled([
    sendFounderEmail(lead, label),
    sendWebhook(lead, label),
  ]);
}

async function sendFounderEmail(
  lead: LeadNotification,
  label: string,
): Promise<void> {
  await sendMail({
    to:      FOUNDER(),
    subject: `🔔 Nuevo lead #${lead.position}: ${lead.nombre} (${label})`,
    html: `
      <div style="font-family:monospace;font-size:14px;line-height:1.6">
        <p><strong>Nombre:</strong>     ${lead.nombre}</p>
        <p><strong>Email:</strong>      ${lead.email}</p>
        <p><strong>Para quién:</strong> ${lead.para_quien}</p>
        <p><strong>Fuente:</strong>     ${label}</p>
        <p><strong>Posición:</strong>   #${lead.position}</p>
        <hr>
        <a href="https://humans-tech.com/admin/leads">Ver en el CRM →</a>
      </div>
    `,
  });
}

async function sendWebhook(
  lead: LeadNotification,
  label: string,
): Promise<void> {
  const url = process.env.LEADS_WEBHOOK_URL;
  if (!url) return;

  const body = JSON.stringify({
    text: `🔔 Nuevo lead #${lead.position}: *${lead.nombre}* (${label}) — ${lead.para_quien}`,
    // Slack block-kit compatible; Telegram ignores extra keys
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Nuevo lead #${lead.position}*\n*Nombre:* ${lead.nombre}\n*Email:* ${lead.email}\n*Para quién:* ${lead.para_quien}\n*Fuente:* ${label}`,
        },
      },
    ],
  });

  await fetch(url, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
}
