// src/lib/clientActions.ts
import pb from './clientPocketbase';

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