// src/lib/actions.ts
import PocketBase from "pocketbase";
import { cookies } from "next/headers";

export async function getCompaniesList() {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL || "http://127.0.0.1:8090");

  // Load auth token from cookies (server-side)
  pb.authStore.loadFromCookie(cookies().toString());

  try {
    const result = await pb.collection("companies").getFullList({
      sort: "-created",
    });

    return result;
  } catch (err) {
    console.error("Failed to fetch companies:", err);
    return [];
  }
}