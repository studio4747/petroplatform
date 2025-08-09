// app/dashboard/products/page.tsx
import Link from "next/link";
import {getProductsListClient } from "@/lib/clientActions";
import { Card } from "@/components/ui/card"; 

export default async function ProductsPage() {
  const products = await getProductsListClient();

  if (!products) {
    return (
      <div className="p-6">
        <p className="text-red-500">ابتدا وارد حساب کاربری شوید.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">محصولات من</h1>
        <Link
          href="/dashboard/products/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          افزودن محصول جدید
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product: any) => (
          <Card key={product.id} className="p-4 hover:shadow-md transition-all">
            <h2 className="font-semibold text-lg">{product.name}</h2>
            <p className="text-gray-600">{product.category}</p>
            <p className="text-sm text-gray-400 mt-2">
              {product.description?.slice(0, 80) || "بدون توضیح"}
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button className="text-blue-600 hover:underline">ویرایش</button>
              <button className="text-red-600 hover:underline">حذف</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}