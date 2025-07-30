import { cookies } from "next/headers";
import PocketBase from "pocketbase";

export async function getCurrentUser() {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL || "http://127.0.0.1:8090");

  const cookieStore = await cookies(); // await here

  const pbAuthCookie = cookieStore.get("pb_auth");
  if (!pbAuthCookie) {
    return null; // no auth cookie, no user
  }

  pb.authStore.loadFromCookie(`pb_auth=${pbAuthCookie.value}`);

  try {
    await pb.collection("users").authRefresh();
    return pb.authStore.model || null;
  } catch (err) {
    return null;
  }
}