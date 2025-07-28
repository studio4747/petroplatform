// lib/auth.ts
import { cookies } from "next/headers";
import PocketBase from "pocketbase";

export async function getCurrentUser() {
  const cookieStore = cookies();
  const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL || "http://127.0.0.1:8090");

  const pbAuth = cookieStore.get("pb_auth");
  if (!pbAuth) {
    return null;
  }

  try {
    pb.authStore.loadFromCookie(`pb_auth=${pbAuth.value}`);
    // Refresh user to validate token and get fresh user data
    await pb.collection("users").authRefresh();
    return pb.authStore.model; // logged-in user info
  } catch (error) {
    console.log("Auth refresh error:", error);
    return null;
  }
}