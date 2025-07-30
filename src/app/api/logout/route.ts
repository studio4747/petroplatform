// app/api/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });

  // Clear PocketBase auth cookie with matching attributes
  response.headers.set(
    "Set-Cookie",
    "pb_auth=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax"
  );

  return response;
}