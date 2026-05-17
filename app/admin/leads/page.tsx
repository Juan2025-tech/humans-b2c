import { auth }    from "@/auth";
import { prisma }  from "@/lib/prisma";
import { redirect } from "next/navigation";
import { LeadsTable } from "./LeadsTable";

export const metadata = { title: "CRM Leads | Admin HUMANS" };
export const dynamic  = "force-dynamic";

const PARA_QUIEN_LABELS: Record<string, string> = {
  padre_madre:   "Padre/Madre",
  conyugue:      "Pareja",
  hijo_enfermo:  "Hijo/a",
  otro_familiar: "Familiar",
  soy_cuidador:  "Cuidador pro",
};

export default async function LeadsPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const [leads, total] = await Promise.all([
    prisma.waitlist.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.waitlist.count(),
  ]);

  const bySource = Object.entries(
    leads.reduce<Record<string, number>>((acc, l) => {
      const key = l.fuente ?? "directo";
      acc[key]  = (acc[key] ?? 0) + 1;
      return acc;
    }, {}),
  ).sort((a, b) => b[1] - a[1]);

  const byProfile = Object.entries(
    leads.reduce<Record<string, number>>((acc, l) => {
      const key = PARA_QUIEN_LABELS[l.para_quien] ?? l.para_quien;
      acc[key]  = (acc[key] ?? 0) + 1;
      return acc;
    }, {}),
  ).sort((a, b) => b[1] - a[1]);

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      {/* Header */}
      <div className="bg-dark-card border-b border-dark-border px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">
            <span className="text-brand-secondary">H</span>UMANS · CRM Leads
          </h1>
          <p className="text-slate-400 text-sm mt-0.5">
            {total} personas en lista de espera
          </p>
        </div>
        <a
          href="/api/admin/leads?format=csv"
          className="bg-brand-primary hover:bg-brand-hover text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          Exportar CSV
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total lista espera" value={total.toString()} color="text-brand-secondary" />
          {bySource.slice(0, 2).map(([key, count]) => (
            <StatCard key={key} label={`Fuente: ${key}`} value={count.toString()} color="text-clinical-normal" />
          ))}
          {byProfile.slice(0, 1).map(([key, count]) => (
            <StatCard key={key} label={`Perfil: ${key}`} value={count.toString()} color="text-ai" />
          ))}
        </div>

        {/* Breakdown */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-dark-card rounded-xl border border-dark-border p-5">
            <h3 className="text-sm font-semibold text-white mb-3">Por fuente</h3>
            {bySource.map(([key, count]) => (
              <div key={key} className="flex justify-between text-sm py-1.5 border-b border-dark-border/50 last:border-0">
                <span className="text-slate-300">{key}</span>
                <span className="font-semibold text-white">{count}</span>
              </div>
            ))}
          </div>
          <div className="bg-dark-card rounded-xl border border-dark-border p-5">
            <h3 className="text-sm font-semibold text-white mb-3">Por perfil</h3>
            {byProfile.map(([key, count]) => (
              <div key={key} className="flex justify-between text-sm py-1.5 border-b border-dark-border/50 last:border-0">
                <span className="text-slate-300">{key}</span>
                <span className="font-semibold text-white">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Table */}
        <LeadsTable leads={leads} paraQuienLabels={PARA_QUIEN_LABELS} />
      </div>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="bg-dark-card rounded-xl border border-dark-border p-5">
      <p className={`text-3xl font-extrabold ${color}`}>{value}</p>
      <p className="text-slate-400 text-sm mt-1">{label}</p>
    </div>
  );
}
