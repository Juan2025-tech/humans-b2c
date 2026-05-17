"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router   = useRouter();
  const [email,  setEmail]  = useState("");
  const [pass,   setPass]   = useState("");
  const [error,  setError]  = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await signIn("credentials", {
      email, password: pass, redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError("Credenciales incorrectas");
    } else {
      router.push("/admin/leads");
    }
  }

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold text-white">
            <span className="text-brand-secondary">H</span>UMANS
          </h1>
          <p className="text-slate-400 text-sm mt-1">Panel del fundador</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-dark-card border border-dark-border rounded-2xl p-6 flex flex-col gap-4"
        >
          <div>
            <label className="block text-sm font-semibold text-white mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-white mb-1.5">Contraseña</label>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
              className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors"
            />
          </div>
          {error && <p className="text-clinical-critical text-xs text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-primary hover:bg-brand-hover disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            {loading ? "Entrando…" : "Acceder"}
          </button>
        </form>
      </div>
    </div>
  );
}
