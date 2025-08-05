'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types'
import { getImageUrl } from '@/lib/utils'

type Props = {
  product: Product
}

export default function ProductCard({ product }: Props) {
  return (
    <Link href={`/products/${product.id}`} className="block border rounded-2xl p-4 hover:shadow-lg transition bg-white">
      <div className="relative w-full h-40 rounded overflow-hidden mb-3">
        <Image
          src={getImageUrl(product)}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      <h2 className="text-lg font-bold mb-2">{product.name}</h2>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3 text-sm text-white">
        {product.tags?.slice(0, 4).map((tag: string) => (
          <span
            key={tag}
            className="bg-gray-700 px-2 py-0.5 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          type="button"
          className="flex-1 bg-blue-600 text-white text-sm py-1.5 rounded hover:bg-blue-700"
        >
          درخواست قیمت
        </button>
        <button
          type="button"
          className="flex-1 border text-sm py-1.5 rounded hover:bg-gray-100"
        >
          پیام
        </button>
      </div>
    </Link>
  )
}