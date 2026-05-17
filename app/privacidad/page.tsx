import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Información sobre el tratamiento de tus datos personales en HUMANS.",
  robots: { index: true, follow: true },
};

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
        <Link href="/" className="text-sm text-brand-link hover:underline mb-8 block">
          ← Volver a inicio
        </Link>
        <h1 className="text-3xl font-extrabold mb-2">Política de Privacidad</h1>
        <p className="text-slate-400 text-sm mb-8">Última actualización: mayo de 2026</p>

        <div className="prose prose-invert prose-sm max-w-none text-slate-300 space-y-6">
          <section>
            <h2 className="text-white font-bold text-lg mb-2">1. Responsable del tratamiento</h2>
            <p>El responsable del tratamiento de los datos personales facilitados es el titular del proyecto HUMANS, contactable en <a href="mailto:privacy@humans-tech.com" className="text-brand-link hover:underline">privacy@humans-tech.com</a>.</p>
          </section>
          <section>
            <h2 className="text-white font-bold text-lg mb-2">2. Datos que tratamos</h2>
            <p>En esta fase, tratamos exclusivamente datos de contacto (nombre, email, teléfono opcional) y datos de navegación anónimos. <strong>No tratamos ningún dato de salud</strong>.</p>
          </section>
          <section>
            <h2 className="text-white font-bold text-lg mb-2">3. Finalidad y base legal</h2>
            <p>Los datos se tratan para gestionar tu inscripción en la lista de espera (Art. 6.1.a RGPD — consentimiento). Los datos de navegación se procesan con fines analíticos agregados y anónimos (Plausible, sin cookies).</p>
          </section>
          <section>
            <h2 className="text-white font-bold text-lg mb-2">4. Almacenamiento</h2>
            <p>Todos los datos se almacenan en servidores ubicados en la Unión Europea (Hetzner Cloud, Falkenstein). No se realizan transferencias internacionales de datos.</p>
          </section>
          <section>
            <h2 className="text-white font-bold text-lg mb-2">5. Retención</h2>
            <p>Los datos de la lista de espera se conservan durante 3 años o hasta que solicites su supresión. Los datos de IP (hasheados) se eliminan a los 90 días.</p>
          </section>
          <section>
            <h2 className="text-white font-bold text-lg mb-2">6. Tus derechos</h2>
            <p>Tienes derecho de acceso, rectificación, supresión, oposición y portabilidad. Para ejercerlos, escríbenos a <a href="mailto:privacy@humans-tech.com" className="text-brand-link hover:underline">privacy@humans-tech.com</a>. También puedes darte de baja de la lista de espera en cualquier momento desde el enlace incluido en el email de confirmación.</p>
          </section>
          <section>
            <h2 className="text-white font-bold text-lg mb-2">7. Seguridad</h2>
            <p>Aplicamos medidas técnicas y organizativas para proteger tus datos: cifrado TLS, hashing de IPs, acceso restringido y copias de seguridad cifradas.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
