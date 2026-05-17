import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export const dynamic  = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const [{ count }] = await sql<{ count: number }>(
    `SELECT COUNT(*)::int AS count FROM "Waitlist"`
  );
  return NextResponse.json(
    { count },
    { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30" } },
  );
}
