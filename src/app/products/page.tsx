'use client';

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getFilteredProductsClient } from "@/lib/clientActions";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types";

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [substance, setSubstance] = useState(searchParams.get("substance") || "");
  const [quantity, setQuantity] = useState(searchParams.get("quantity") || "");
  const [industry, setIndustry] = useState(searchParams.get("industry") || "");

  useEffect(() => {
    const fetchProducts = async () => {
      const query = {
        substance: searchParams.get("substance") || undefined,
        quantity: searchParams.get("quantity") || undefined,
        industry: searchParams.get("industry") || undefined,
      };

      const rawProducts = await getFilteredProductsClient(query);

      const products = rawProducts.map((record: any) => ({
        ...record,
        name: record.name ?? "",
        tags: Array.isArray(record.tags)
          ? record.tags
          : typeof record.tags === "string"
          ? record.tags.split(",").map((tag: string) => tag.trim())
          : [],
      }));

      setProducts(products);
    };

    fetchProducts();
  }, [searchParams.toString()]);

  const updateSearchParams = (key: string, value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (value) {
      current.set(key, value);
    } else {
      current.delete(key);
    }

    router.push(`/products?${current.toString()}`);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "substance") setSubstance(value);
    else if (name === "quantity") setQuantity(value);
    else if (name === "industry") setIndustry(value);

    updateSearchParams(name, value);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">محصولات</h1>

      <div className="bg-white rounded-xl shadow p-4 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input
          name="substance"
          value={substance}
          onChange={handleFilterChange}
          placeholder="ماده شیمیایی"
          className="border rounded px-3 py-2 text-sm"
        />
        <input
          name="quantity"
          value={quantity}
          onChange={handleFilterChange}
          placeholder="مقدار"
          className="border rounded px-3 py-2 text-sm"
        />
        <input
          name="industry"
          value={industry}
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
