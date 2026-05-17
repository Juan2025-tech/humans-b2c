import { NextResponse } from "next/server";
import { prisma }        from "@/lib/prisma";

export const dynamic  = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const count = await prisma.waitlist.count();
  return NextResponse.json(
    { count },
    { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30" } },
  );
}
