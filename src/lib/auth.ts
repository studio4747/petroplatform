// src/lib/auth.ts
import { cookies } from "next/headers";
import PocketBase from "pocketbase";

export async function getCurrentUser() {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL || "http://127.0.0.1:8090");

  // Load the cookies into the PocketBase auth store
  pb.authStore.loadFromCookie(cookies().toString());

  // Optional: validate session
  try {
    const authUser = await pb.collection("users").authRefresh();
    return authUser?.record || null;
  } catch (err) {
    return null;
  }
}