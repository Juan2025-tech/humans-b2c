"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Para quién",    href: "#para-quien"    },
  { label: "El producto",   href: "#el-producto"   },
  // { label: "Precios",       href: "#precios"       },
];

function scrollTo(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white border-b border-gray-200 shadow-lg"
          : "bg-white",
      ].join(" ")}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-extrabold text-xl tracking-tight"
          aria-label="HUMANS Home — ir al inicio"
        >
          <span className="text-brand-primary">
            HUMANS
          </span>
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => scrollTo(link.href)}
                className="text-sm text-brand-primary hover:text-brand-hover transition-colors"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <button
          onClick={() => scrollTo("#lista-espera")}
          className="hidden md:inline-flex items-center gap-1.5 bg-brand-primary hover:bg-brand-hover text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          Únete a la lista →
        </button>

        {/* Mobile: CTA + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => scrollTo("#lista-espera")}
            className="bg-brand-primary hover:bg-brand-hover text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
          >
            Únete
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menú"
            className="text-white p-1"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-brand-secondary border-t border-brand-secondary/60 px-4 pb-4">
          <ul className="flex flex-col gap-1 pt-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => { scrollTo(link.href); setOpen(false); }}
                  className="w-full text-left text-sm text-brand-primary hover:text-brand-hover py-2.5 border-b border-brand-primary/20 transition-colors"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
