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
            <h2 className="text-white font-bold text-lg mb-2">¿Usamos cookies?</h2>
            <p><strong>HUMANS no utiliza cookies de seguimiento ni publicidad.</strong> Utilizamos Plausible Analytics, una herramienta de analítica respetuosa con la privacidad que <strong>no usa cookies</strong> y no genera datos de identificación personal.</p>
          </section>
          <section>
            <h2 className="text-white font-bold text-lg mb-2">Cookies de sesión (autenticación)</h2>
            <p>El panel de administración (/admin) utiliza una cookie de sesión estrictamente necesaria para mantener la autenticación del administrador. Esta cookie no contiene datos personales, no se comparte con terceros y se elimina al cerrar sesión.</p>
          </section>
          <section>
            <h2 className="text-white font-bold text-lg mb-2">Tus opciones</h2>
            <p>Puedes configurar tu navegador para rechazar o eliminar cookies. Ten en cuenta que el rechazo de cookies de sesión impedirá el acceso al panel de administración.</p>
          </section>
          <section>
            <h2 className="text-white font-bold text-lg mb-2">Más información</h2>
            <p>Para cualquier consulta sobre el uso de cookies, escríbenos a <a href="mailto:privacy@humans-tech.com" className="text-brand-link hover:underline">privacy@humans-tech.com</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
