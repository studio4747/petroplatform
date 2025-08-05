// src/lib/actions.ts
import PocketBase from "pocketbase";
import { cookies } from "next/headers";

const POCKETBASE_URL =
  process.env.NEXT_PUBLIC_POCKETBASE_URL || process.env.NEXT_PUBLIC_PB_URL || "http://127.0.0.1:8090";

async function createClientFromRequest() {
  const pb = new PocketBase(POCKETBASE_URL);
  try {
    const cookieStore = await cookies(); // await because in your setup it's a Promise
    const pbAuth = cookieStore.get("pb_auth");
    if (pbAuth) {
      pb.authStore.loadFromCookie(`pb_auth=${pbAuth.value}`);
    }
  } catch (e) {
    console.warn("could not load auth from cookies:", e);
  }
  return pb;
}

export async function getCompaniesList() {
  try {
    const pb = await createClientFromRequest();
    const result = await pb
      .collection("companies")
      .getFullList({ sort: "-created" });
    return result;
  } catch (err) {
    console.error("Failed to fetch companies:", err);
    return [];
  }
}

export async function getCompanyById(id: string) {
  try {
    const pb = await createClientFromRequest();
    const result = await pb.collection("companies").getOne(id);
    return result;
  } catch (err) {
    console.error("Failed to fetch company by ID:", err);
    return null;
  }
}

// ✅ اینو اضافه کن:
export async function getProductById(id: string) {
  try {
    const pb = await createClientFromRequest();
    const product = await pb.collection("products").getOne(id, {
      expand: "company_id",
    });
    return product;
  } catch (err) {
    console.error("Failed to fetch product by ID:", err);
    return null;
  }
}
