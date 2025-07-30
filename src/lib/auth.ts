import { cookies } from "next/headers";
import PocketBase from "pocketbase";

export async function getCurrentUser() {
  const cookieStore = await cookies(); 

  const pbAuth = (cookieStore as any).get("pb_auth");

  if (!pbAuth) return null;

  const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL || "https://90c731db7d01.ngrok-free.app");

  try {
    pb.authStore.loadFromCookie(`pb_auth=${pbAuth.value}`);
    await pb.collection("users").authRefresh();
    return pb.authStore.model;
  } catch (error) {
    console.log("Auth refresh error:", error);
    return null;
  }
}

