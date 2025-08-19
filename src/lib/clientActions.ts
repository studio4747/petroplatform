// src/lib/clientActions.ts
import PocketBase from "pocketbase";
import pb from './clientPocketbase';


const POCKETBASE_URL =
  process.env.NEXT_PUBLIC_POCKETBASE_URL || "http://127.0.0.1:8090";

let pbClient: PocketBase | null = null;


export async function getProductsListClient() {
  try {
    const result = await pb.collection('products').getFullList({
      sort: '-created',
    });
    return result;
  } catch (error) {
    console.error('Failed to fetch products (client):', error);
    return [];
  }
}


export function getPocketBaseClient() {
  if (!pbClient) {
    pbClient = new PocketBase(POCKETBASE_URL);
  }
  return pbClient;
}

export async function getFilteredProductsClient(query: {
  substance?: string;
  quantity?: string;
  industry?: string;
  search?: string;
}) {
  const pb = getPocketBaseClient();

  const filters: string[] = [];

  if (query.substance) {
    filters.push(`substance ~ "${query.substance}"`);
  }
  if (query.quantity) {
    filters.push(`quantity = "${query.quantity}"`);
  }
  if (query.industry) {
    filters.push(`industry ~ "${query.industry}"`);
  }
  if (query.search) {
    filters.push(`name ~ "${query.search}"`);
  }

  const filterString = filters.length > 0 ? filters.join(" && ") : "";

  const result = await pb.collection("products").getFullList({
    sort: "-created",
    expand: "company",
    filter: filterString,
  });

  return result;
}
