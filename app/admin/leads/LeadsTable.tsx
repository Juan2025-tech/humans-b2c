"use client";

import { useState } from "react";

type Lead = {
  id:          string;
  nombre:      string;
  email:       string;
  telefono:    string | null;
  para_quien:  string;
  plan_interes: string | null;
  fuente:      string | null;
  utm_medium:  string | null;
  estado:      string;
  notas:       string | null;
  createdAt:   Date;
};

type Props = {
  leads: Lead[];
  paraQuienLabels: Record<string, string>;
};

const ESTADO_COLORS: Record<string, string> = {
  nuevo:      "bg-clinical-normal/20 text-clinical-normal",
  contactado: "bg-brand-secondary/20 text-brand-secondary",
  activo:     "bg-ai/20 text-ai",
  inactivo:   "bg-slate-700 text-slate-400",
};

export function LeadsTable({ leads, paraQuienLabels }: Props) {
  const [rows,        setRows]        = useState(leads);
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [noteText,    setNoteText]    = useState("");
  const [filter,      setFilter]      = useState("todos");

  const filtered = filter === "todos" ? rows : rows.filter((r) => r.estado === filter);

  async function updateLead(id: string, patch: { estado?: string; notas?: string }) {
    await fetch("/api/admin/leads", {
      method:  "PATCH",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ id, ...patch }),
    });
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...patch } : r)),
    );
  }

  return (
    <div className="bg-dark-card rounded-xl border border-dark-border overflow-hidden">
      {/* Filtros */}
      <div className="flex gap-2 p-4 border-b border-dark-border flex-wrap">
        {["todos", "nuevo", "contactado", "activo", "inactivo"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={[
              "text-xs font-semibold px-3 py-1.5 rounded-full capitalize transition-colors",
              filter === f
                ? "bg-brand-primary text-white"
                : "bg-dark-elevated text-slate-400 hover:text-white",
            ].join(" ")}
          >
            {f}
          </button>
        ))}
        <span className="ml-auto text-xs text-slate-500 self-center">
          {filtered.length} resultados
        </span>
      </div>

      {/* Tabla scroll horizontal */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-dark-border text-xs text-slate-500 uppercase tracking-wider">
              <th className="text-left px-4 py-3">Nombre</th>
              <th className="text-left px-4 py-3">Email</th>
              <th className="text-left px-4 py-3">Perfil</th>
              <th className="text-left px-4 py-3">Fuente</th>
              <th className="text-left px-4 py-3">Estado</th>
              <th className="text-left px-4 py-3">Fecha</th>
              <th className="text-left px-4 py-3">Notas</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((lead) => (
              <tr
                key={lead.id}
                className="border-b border-dark-border/50 hover:bg-dark-elevated/50 transition-colors"
              >
                <td className="px-4 py-3 font-medium text-white whitespace-nowrap">
                  {lead.nombre}
                </td>
                <td className="px-4 py-3 text-slate-400">
                  <a href={`mailto:${lead.email}`} className="hover:text-brand-link transition-colors">
                    {lead.email}
                  </a>
                </td>
                <td className="px-4 py-3 text-slate-300 whitespace-nowrap">
                  {paraQuienLabels[lead.para_quien] ?? lead.para_quien}
                </td>
                <td className="px-4 py-3 text-slate-400 whitespace-nowrap">
                  {lead.fuente ?? "—"}
                </td>
                <td className="px-4 py-3">
                  <select
                    value={lead.estado}
                    onChange={(e) => updateLead(lead.id, { estado: e.target.value })}
                    className={[
                      "text-xs font-semibold px-2 py-1 rounded-full border-0 cursor-pointer",
                      ESTADO_COLORS[lead.estado] ?? "bg-slate-700 text-slate-400",
                    ].join(" ")}
                  >
                    {["nuevo", "contactado", "activo", "inactivo"].map((s) => (
                      <option key={s} value={s} className="bg-dark-bg text-white capitalize">
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3 text-slate-400 whitespace-nowrap text-xs">
                  {new Date(lead.createdAt).toLocaleDateString("es-ES", {
                    day: "2-digit", month: "short", year: "numeric",
                  })}
                </td>
                <td className="px-4 py-3">
                  {editingNote === lead.id ? (
                    <div className="flex gap-1.5 items-center">
                      <input
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        className="bg-dark-bg border border-dark-border rounded px-2 py-1 text-xs text-white w-40 focus:outline-none focus:border-brand-primary"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            updateLead(lead.id, { notas: noteText });
                            setEditingNote(null);
                          }
                          if (e.key === "Escape") setEditingNote(null);
                        }}
                        autoFocus
                      />
                      <button
                        onClick={() => { updateLead(lead.id, { notas: noteText }); setEditingNote(null); }}
                        className="text-clinical-normal text-xs hover:underline"
                      >
                        ✓
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => { setEditingNote(lead.id); setNoteText(lead.notas ?? ""); }}
                      className="text-xs text-slate-500 hover:text-white transition-colors text-left max-w-[120px] truncate"
                    >
                      {lead.notas ? lead.notas : <span className="italic">+ añadir nota</span>}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className="text-center text-slate-500 py-10 text-sm">
            No hay leads con este filtro.
          </p>
        )}
      </div>
    </div>
  );
}
