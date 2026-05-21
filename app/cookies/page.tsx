import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Cookies",
  robots: { index: true, follow: true },
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
        <Link href="/" className="text-sm text-brand-link hover:underline mb-8 block">
          ← Volver a inicio
        </Link>
        <h1 className="text-3xl font-extrabold mb-2">Política de Cookies</h1>
        <p className="text-slate-400 text-sm mb-8">Última actualización: mayo de 2026</p>

        <div className="text-slate-300 space-y-6 text-sm leading-relaxed">

          <section>
            <h2 className="text-white font-bold text-lg mb-2">1. Marco normativo</h2>
            <p>
              La presente Política de Cookies se establece en cumplimiento de la Directiva
              2002/58/CE (Directiva ePrivacy), transpuesta en España mediante el artículo 22.2
              de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información
              y Comercio Electrónico (LSSI-CE), así como el Reglamento (UE) 2016/679 (RGPD).
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-2">2. ¿Usamos cookies de seguimiento?</h2>
            <p>
              <strong>No.</strong> HUMANS no utiliza cookies de seguimiento, publicidad ni
              perfilado. Utilizamos <strong>Plausible Analytics</strong>, una herramienta de
              analítica web respetuosa con la privacidad que opera sin cookies y no genera
              identificadores individuales. Plausible es plenamente compatible con el RGPD,
              la LSSI y las guías de la AEPD, y no requiere banner de consentimiento.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-2">3. Cookies utilizadas en este sitio</h2>
            <p className="mb-4">
              El único cookie activo en humans-tech.com es de carácter estrictamente técnico:
            </p>

            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="text-left px-3 py-2 text-slate-400 font-semibold">Nombre</th>
                    <th className="text-left px-3 py-2 text-slate-400 font-semibold">Tipo</th>
                    <th className="text-left px-3 py-2 text-slate-400 font-semibold">Finalidad</th>
                    <th className="text-left px-3 py-2 text-slate-400 font-semibold">Duración</th>
                    <th className="text-left px-3 py-2 text-slate-400 font-semibold">Titular</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="px-3 py-2 font-mono text-slate-300">session</td>
                    <td className="px-3 py-2">Técnica / sesión</td>
                    <td className="px-3 py-2">
                      Mantener la autenticación del administrador en el panel interno (/admin).
                      No contiene datos personales ni se comparte con terceros.
                    </td>
                    <td className="px-3 py-2">Sesión (se elimina al cerrar el navegador o cerrar sesión)</td>
                    <td className="px-3 py-2">HUMANS (propia)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-slate-400">
              Esta cookie es estrictamente necesaria para el funcionamiento del panel de
              administración y está exenta del requisito de consentimiento previo conforme
              al considerando 25 de la Directiva ePrivacy y la guía de la AEPD.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-2">4. Cookies de terceros</h2>
            <p>
              HUMANS no integra cookies de terceros (Google Analytics, Meta Pixel, redes
              publicitarias u otros rastreadores). Si en el futuro se añadiese alguna herramienta
              que utilice cookies no estrictamente necesarias, esta política será actualizada y se
              implementará un mecanismo de consentimiento previo conforme a la normativa vigente.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-2">5. Cómo gestionar las cookies</h2>
            <p>
              Puedes configurar tu navegador para bloquear o eliminar cookies en cualquier momento.
              Ten en cuenta que el bloqueo de la cookie de sesión impedirá el acceso al panel de
              administración. La navegación general por el sitio público no se ve afectada.
            </p>
            <ul className="mt-2 space-y-1 list-disc pl-5">
              <li>Chrome: Configuración → Privacidad y seguridad → Cookies</li>
              <li>Firefox: Opciones → Privacidad y seguridad → Cookies</li>
              <li>Safari: Preferencias → Privacidad → Cookies</li>
              <li>Edge: Configuración → Privacidad, búsqueda y servicios → Cookies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-2">6. Contacto</h2>
            <p>
              Para cualquier consulta sobre el uso de cookies o la presente política, puedes
              contactarnos en{" "}
              <a href="mailto:privacy@humans-tech.com" className="text-brand-link hover:underline">
                privacy@humans-tech.com
              </a>.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
