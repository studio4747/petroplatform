'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { getFilteredProductsClient } from '@/lib/clientActions';
import type { Product } from '@/types';
import { useAuth } from '@/context/AuthContext';

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const query = {
          substance: searchParams.get('substance') || undefined,
          quantity: searchParams.get('quantity') || undefined,
          industry: searchParams.get('industry') || undefined,
        };

        const rawProducts = await getFilteredProductsClient(query);

        const normalizedProducts: Product[] = rawProducts.map((record: any) => {
          // Determine actual image (PocketBase file array)
          const imageField = Array.isArray(record.image) ? record.image[0] : record.image;

          return {
            id: record.id,
            name: record.name ?? '',
            substance: record.substance ?? '',
            quantity: record.quantity ?? '',
            industry: record.industry ?? '',
            description: record.description ?? '',
            price: record.price ?? 0,
            user: record.user || record.expand?.user?.id || '',
            company: record.company || record.expand?.company?.id || undefined,
            tags:
              Array.isArray(record.tags) ?
              record.tags :
              typeof record.tags === 'string' ?
              record.tags.split(',').map((t: string) => t.trim()) :
              [],
            image: imageField || null,
            created: record.created ?? new Date().toISOString(),
            updated: record.updated ?? new Date().toISOString(),
          };
        });

        setProducts(normalizedProducts);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  const updateSearchParams = (key: string, value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (value) current.set(key, value);
    else current.delete(key);

    const search = current.toString();
    router.push(search ? `/products?${search}` : '/products');
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateSearchParams(name, value);
  };

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">محصولات</h1>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow p-4 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input
          name="substance"
          defaultValue={searchParams.get('substance') || ''}
          onChange={handleFilterChange}
          placeholder="ماده شیمیایی"
          className="border rounded px-3 py-2 text-sm"
        />
        <input
          name="quantity"
          defaultValue={searchParams.get('quantity') || ''}
          onChange={handleFilterChange}
          placeholder="مقدار"
          className="border rounded px-3 py-2 text-sm"
        />
        <input
          name="industry"
          defaultValue={searchParams.get('industry') || ''}
          onChange={handleFilterChange}
          placeholder="صنعت"
          className="border rounded px-3 py-2 text-sm"
        />
      </div>

      {products.length === 0 ? (
        <p className="text-gray-600">هیچ محصولی یافت نشد.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}