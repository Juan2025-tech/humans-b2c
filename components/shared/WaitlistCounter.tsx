"use client";

import { useEffect, useState } from "react";

interface Props {
  className?: string;
  prefix?: string;
}

export function WaitlistCounter({
  className = "",
  prefix = "+",
}: Props) {
  const [count, setCount] = useState<number | null>(null);

  async function fetchCount() {
    try {
      const res  = await fetch("/api/waitlist/count", { cache: "no-store" });
      const data = (await res.json()) as { count: number };
      setCount(data.count);
    } catch {
      // fallo silencioso — no mostrar nada si la red falla
    }
  }

  useEffect(() => {
    void fetchCount();
    const id = setInterval(() => void fetchCount(), 30_000);
    return () => clearInterval(id);
  }, []);

  if (count === null) return null;

  return (
    <span className={className}>
      {prefix}
      {count.toLocaleString("es-ES")} personas ya en lista de espera
    </span>
  );
}
