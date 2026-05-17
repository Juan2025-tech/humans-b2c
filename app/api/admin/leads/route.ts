import { NextResponse } from "next/server";
import { auth }         from "@/auth";
import { prisma }       from "@/lib/prisma";
import { z }            from "zod";

async function requireAdmin() {
  const session = await auth();
  if (!session) return null;
  return session;
}

// PATCH /api/admin/leads — actualizar estado o notas de un lead
const patchSchema = z.object({
  id:     z.string(),
  estado: z.enum(["nuevo", "contactado", "activo", "inactivo"]).optional(),
  notas:  z.string().optional(),
});

export async function PATCH(req: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const body   = await req.json() as unknown;
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos incorrectos" }, { status: 422 });
  }
  const { id, estado, notas } = parsed.data;
  const lead = await prisma.waitlist.update({
    where: { id },
    data:  { ...(estado && { estado }), ...(notas !== undefined && { notas }) },
  });
  return NextResponse.json({ success: true, lead });
}

// GET /api/admin/leads?format=csv — exportar CSV
export async function GET(req: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const format           = searchParams.get("format");

  const leads = await prisma.waitlist.findMany({
    orderBy: { createdAt: "desc" },
  });

  if (format === "csv") {
    const header = "id,nombre,email,telefono,para_quien,plan_interes,fuente,utm_medium,estado,notas,createdAt\n";
    const rows   = leads.map((l) =>
      [
        l.id, l.nombre, l.email,
        l.telefono ?? "",
        l.para_quien,
        l.plan_interes ?? "",
        l.fuente ?? "",
        l.utm_medium ?? "",
        l.estado,
        (l.notas ?? "").replace(/,/g, ";"),
        l.createdAt.toISOString(),
      ].join(","),
    );
    const csv = header + rows.join("\n");
    return new Response(csv, {
      headers: {
        "Content-Type":        "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="humans-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  }

  return NextResponse.json({ leads });
}
