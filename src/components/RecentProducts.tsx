'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import pb from '@/lib/clientPocketbase';

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
}

export default function RecentProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await pb.collection('products').getList(1, 8, {
          sort: '-created',
        });

        const mapped = result.items.map((item: any) => ({
          id: item.id,
          name: item.name,
          category: item.category,
          price: item.price,
          image: item.image
            ? `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/products/${item.id}/${item.image}`
            : '/placeholder.png',
        }));

        setProducts(mapped);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-center py-8">در حال بارگذاری...</p>;
  }

  if (products.length === 0) {
    return <p className="text-center py-8 text-gray-500">محصولی هنوز ثبت نشده است</p>;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">محصولات تازه اضافه شده</h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition p-4 flex flex-col justify-between"
          >
            <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden bg-gray-50">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
            <p className="text-sm text-gray-600 mb-2">دسته‌بندی: {product.category}</p>
            <p className="text-sm font-bold text-orange-500">{product.price} تومان</p>
          </div>
        ))}
      </div>
    </section>
  );
}