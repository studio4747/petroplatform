// src/components/ProductSpecs.tsx
"use client";

import { Package, Tag } from "lucide-react";

interface ProductSpecsProps {
  title: string;
  category: string;
}

export default function ProductSpecs({ title, category }: ProductSpecsProps) {
  return (
    <div className="space-y-3">
      <h2 className="font-semibold text-lg">مشخصات محصول</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* عنوان محصول */}
        <div className="flex items-center gap-3 p-3 border rounded-xl bg-gray-50">
          <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm text-gray-600">عنوان</p>
            <p className="font-medium">{title}</p>
          </div>
        </div>

        {/* دسته‌بندی محصول */}
        <div className="flex items-center gap-3 p-3 border rounded-xl bg-gray-50">
          <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-600">
            <Tag className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm text-gray-600">دسته‌بندی</p>
            <p className="font-medium">{category}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
