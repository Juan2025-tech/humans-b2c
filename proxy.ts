import { auth } from "@/auth";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  return auth(request as never);
}

export const config = {
  matcher: ["/admin/:path*"],
};
