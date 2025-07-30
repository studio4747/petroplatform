import { NextRequest, NextResponse } from "next/server";
import PocketBase from "pocketbase";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const pb = new PocketBase("http://127.0.0.1:8090");

  try {
    const authData = await pb.collection("users").authWithPassword(body.email, body.password);

    const response = NextResponse.json({ user: authData.record });

    response.headers.set(
      "Set-Cookie",
      pb.authStore.exportToCookie({
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secure: false, // change to true if running in production over HTTPS
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
    );

    return response;
  } catch (err) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
}