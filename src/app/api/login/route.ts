//api/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import PocketBase from "pocketbase";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL || "http://127.0.0.1:8090");

  try {
    const authData = await pb.collection("users").authWithPassword(body.email, body.password);

    const res = NextResponse.json({ user: authData.record });

    // ست کردن کوکی (دقیقا همونطور که PocketBase خروجی میده)
    res.headers.append(
      "Set-Cookie",
      pb.authStore.exportToCookie({
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      })
    );

    return res;
  } catch (err) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
}
