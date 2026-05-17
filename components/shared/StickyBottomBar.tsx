"use client";

import { useEffect, useRef, useState } from "react";

// Aparece cuando el hero sale del viewport (arriba) y desaparece
// cuando el WaitlistForm entra en el viewport (abajo).
// Solo visible en móvil (hidden md:hidden en tailwind — el Navbar cubre desktop).
export function StickyBottomBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const heroEl     = document.getElementById("hero-form");
    const waitlistEl = document.getElementById("lista-espera");

    if (!heroEl && !waitlistEl) return;

    const observer = new IntersectionObserver(
      () => {
        const heroVisible     = heroEl
          ? heroEl.getBoundingClientRect().bottom > 0
          : false;
        const waitlistVisible = waitlistEl
          ? waitlistEl.getBoundingClientRect().top < window.innerHeight
          : false;

        setVisible(!heroVisible && !waitlistVisible);
      },
      { threshold: 0 },
    );

    if (heroEl)     observer.observe(heroEl);
    if (waitlistEl) observer.observe(waitlistEl);

    return () => observer.disconnect();
  }, []);

  function scrollToWaitlist() {
    document.getElementById("lista-espera")?.scrollIntoView({ behavior: "smooth" });
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden animate-in slide-in-from-bottom duration-300">
      <div className="bg-brand-primary border-t border-white/10 px-4 py-3 flex items-center justify-between gap-3 shadow-lg">
        <span className="text-white text-sm font-medium leading-tight">
          💙 Plazas limitadas — únete ahora
        </span>
        <button
          onClick={scrollToWaitlist}
          className="shrink-0 bg-white text-brand-primary text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
        >
          Únete →
        </button>
      </div>
    </div>
  );
}
