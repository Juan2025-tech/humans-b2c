/**
 * Prueba el envío de email vía Mailjet sin arrancar el servidor.
 * Uso: node scripts/test-email.mjs
 * Requiere variables MAILJET_API_KEY, MAILJET_SECRET_KEY, ALERT_EMAIL_FROM en .env.local
 */
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Carga .env.local manualmente
function loadEnv() {
  const envPath = resolve(__dirname, "../.env.local");
  try {
    const lines = readFileSync(envPath, "utf-8").split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const idx = trimmed.indexOf("=");
      if (idx === -1) continue;
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
      process.env[key] = val;
    }
  } catch {
    console.error("❌  No se encontró .env.local — créalo con tus credenciales.");
    process.exit(1);
  }
}

loadEnv();

const API_KEY    = process.env.MAILJET_API_KEY;
const SECRET_KEY = process.env.MAILJET_SECRET_KEY;
const FROM_EMAIL = process.env.ALERT_EMAIL_FROM ?? "jperez@humans-tech.com";
const TO_EMAIL   = process.argv[2] ?? process.env.EMAIL_FOUNDER ?? FROM_EMAIL;

if (!API_KEY || !SECRET_KEY) {
  console.error("❌  Faltan MAILJET_API_KEY o MAILJET_SECRET_KEY en .env.local");
  process.exit(1);
}

// Importa node-mailjet de forma dinámica
const { default: Mailjet } = await import("node-mailjet");
const mj = Mailjet.apiConnect(API_KEY, SECRET_KEY);

console.log(`\n📧  Enviando email de prueba...`);
console.log(`    De:  ${FROM_EMAIL}`);
console.log(`    A:   ${TO_EMAIL}\n`);

try {
  const result = await mj.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: { Email: FROM_EMAIL, Name: "HUMANS" },
        To:   [{ Email: TO_EMAIL,   Name: "Fundador" }],
        Subject: "🧪 Test Mailjet — HUMANS",
        HTMLPart: `
          <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:32px;border:1px solid #E2E8F0;border-radius:8px">
            <h2 style="color:#1B4F8A;margin-top:0">✅ Mailjet funciona correctamente</h2>
            <p style="color:#334155">Este es un email de prueba enviado desde el script <code>scripts/test-email.mjs</code>.</p>
            <p style="color:#334155"><strong>Remitente:</strong> ${FROM_EMAIL}</p>
            <p style="color:#334155"><strong>Fecha:</strong> ${new Date().toLocaleString("es-ES")}</p>
            <hr style="border:none;border-top:1px solid #E2E8F0;margin:24px 0">
            <p style="font-size:12px;color:#94A3B8">HUMANS · humans-tech.com</p>
          </div>
        `,
      },
    ],
  });

  const status = result.response.status;
  if (status === 200) {
    console.log("✅  Email enviado correctamente.");
    console.log(`    MessageID: ${JSON.stringify(result.body?.Messages?.[0]?.To?.[0]?.MessageID ?? "–")}`);
  } else {
    console.error(`❌  Respuesta inesperada: HTTP ${status}`);
    console.error(JSON.stringify(result.body, null, 2));
  }
} catch (err) {
  console.error("❌  Error al enviar:");
  console.error(err?.response?.data ?? err?.message ?? err);
  process.exit(1);
}
