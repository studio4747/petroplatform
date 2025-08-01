// src/lib/actions.ts
import PocketBase from "pocketbase";
import { cookies } from "next/headers";

const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL || "http://127.0.0.1:8090");
pb.authStore.loadFromCookie(cookies().toString());

export async function getCompaniesList() {
  try {
    const result = await pb.collection("companies").getFullList({ sort: "-created" });
    return result;
  } catch (err) {
    console.error("Failed to fetch companies:", err);
    return [];
  }
}

// ✅ ADD THIS FUNCTION
export async function getCompanyById(id: string) {
  try {
    const result = await pb.collection("companies").getOne(id);
    return result;
  } catch (err) {
    console.error("Failed to fetch company by ID:", err);
    return null;
  }
}