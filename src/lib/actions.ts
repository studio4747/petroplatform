import PocketBase from "pocketbase";
import { cookies } from "next/headers";

const POCKETBASE_URL =
  process.env.NEXT_PUBLIC_POCKETBASE_URL ||
  process.env.NEXT_PUBLIC_PB_URL ||
  "http://127.0.0.1:8090";

async function createClientFromRequest() {
  const pb = new PocketBase(POCKETBASE_URL);
  try {
    const cookieStore = await cookies();
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

export async function getProductsList() {
  try {
    const pb = await createClientFromRequest();
    const result = await pb.collection("products").getFullList({
      sort: "-created",
      expand: "company",
    });
    return result;
  } catch (err) {
    console.error("Failed to fetch products:", err);
    return [];
  }
}

import client from '@/lib/pocketbase';

export async function getFilteredProducts(query: {
  substance?: string;
  quantity?: string;
  industry?: string;
}) {
  try {
    const filters: string[] = [];

    if (query.substance) {
      filters.push(`substance ~ "${query.substance}"`);
    }

    if (query.quantity) {
      filters.push(`quantity = ${query.quantity}`);
    }

    if (query.industry) {
      filters.push(`industry = "${query.industry}"`);
    }

    const filterString = filters.length > 0 ? filters.join(" && ") : "";

    const result = await client.collection("products").getFullList({
      sort: "-created",
      expand: "company",
      filter: filterString,
    });

    return result;
  } catch (err) {
    console.error("Failed to fetch filtered products:", err);
    return [];
  }
}

export async function getUniqueIndustries() {
  try {
    const allProducts = await client.collection('products').getFullList({
      fields: 'industry',
    });

    const industriesSet = new Set<string>();
    allProducts.forEach((product) => {
      if (product.industry) industriesSet.add(product.industry);
    });

    return Array.from(industriesSet);
  } catch (error) {
    console.error('Failed to fetch industries:', error);
    return [];
  }
}