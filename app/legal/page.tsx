import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aviso Legal",
  robots: { index: true, follow: true },
};

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
        <Link href="/" className="text-sm text-brand-link hover:underline mb-8 block">
          ← Volver a inicio
        </Link>
        <h1 className="text-3xl font-extrabold mb-2">Aviso Legal</h1>
        <p className="text-slate-400 text-sm mb-8">Última actualización: mayo de 2026</p>

        <div className="text-slate-300 space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-white font-bold text-lg mb-2">1. Titular del sitio web</h2>
            <p>El presente sitio web <strong>humans-tech.com</strong> es operado por el proyecto HUMANS. Contacto: <a href="mailto:hola@humans-tech.com" className="text-brand-link hover:underline">hola@humans-tech.com</a>.</p>
          </section>
          <section>
            <h2 className="text-white font-bold text-lg mb-2">2. Objeto</h2>
            <p>El presente Aviso Legal regula el uso del sitio web y la información que en él se proporciona sobre el sistema de monitorización HUMANS, actualmente en fase de lista de espera.</p>
          </section>
          <section>
            <h2 className="text-white font-bold text-lg mb-2">3. Propiedad intelectual</h2>
            <p>Los contenidos, textos, imágenes, logotipos y código fuente de este sitio son propiedad exclusiva de HUMANS. Queda prohibida su reproducción total o parcial sin autorización expresa.</p>
          </section>
          <section>
            <h2 className="text-white font-bold text-lg mb-2">4. Limitación de responsabilidad</h2>
            <p>HUMANS no se responsabiliza de los daños derivados del uso del sitio web o de la interrupción del servicio. El contenido tiene carácter meramente informativo y no constituye consejo médico.</p>
          </section>
          <section>
            <h2 className="text-white font-bold text-lg mb-2">5. Ley aplicable</h2>
            <p>Este Aviso Legal se rige por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales competentes según la normativa vigente.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
