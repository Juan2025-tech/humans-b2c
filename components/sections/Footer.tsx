import Link from "next/link";

const PRODUCT_LINKS = [
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Para quién",    href: "#para-quien"    },
  { label: "El producto",   href: "#el-producto"   },
  { label: "Precios",       href: "#precios"       },
];

const LEGAL_LINKS = [
  { label: "Aviso Legal",            href: "/legal"      },
  { label: "Política de Privacidad", href: "/privacidad" },
  { label: "Política de Cookies",    href: "/cookies"    },
];

export function Footer() {
  return (
    <footer className="bg-footer py-12 sm:py-16 border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <p className="font-extrabold text-xl text-brand-primary tracking-tight mb-2">
              HUMANS
            </p>
            <p className="text-slate-500 text-sm leading-relaxed">
              Cuidado inteligente para quienes más quieres.
            </p>
            <a
              href="mailto:hola@humans-tech.com"
              className="inline-block mt-3 text-sm text-brand-primary hover:underline"
            >
              hola@humans-tech.com
            </a>
          </div>

          {/* Producto */}
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Producto
            </p>
            <ul className="flex flex-col gap-2">
              {PRODUCT_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-slate-600 hover:text-brand-primary transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Legal
            </p>
            <ul className="flex flex-col gap-2">
              {LEGAL_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-slate-600 hover:text-brand-primary transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-slate-400">
            © 2026 HUMANS. Todos los derechos reservados.
          </p>
          <p className="text-xs text-slate-400">
            Datos tratados conforme al RGPD · Servidores en la UE
          </p>
        </div>
      </div>
    </footer>
  );
}
