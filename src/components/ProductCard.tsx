'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { getImageUrl } from '@/lib/utils';
import {MessageModal} from './MessageModal';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const handleMessageClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }
    setIsMessageModalOpen(true);
  };

  const handleQuoteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add your quote request logic here
  };

  return (
    <>
      <Link
        href={`/products/${product.id}`}
        className="block border rounded-2xl p-4 hover:shadow-lg transition bg-white"
      >
        <div className="relative w-full h-40 rounded overflow-hidden mb-3">
          <Image
            src={getImageUrl(product)}
         alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <h2 className="text-lg font-bold mb-2">{product.name || product.substance}</h2>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3 text-sm text-white">
          {product.tags?.slice(0, 4).map((tag: string) => (
            <span key={tag} className="bg-gray-700 px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleQuoteClick}
            className="flex-1 bg-blue-600 text-white text-sm py-1.5 rounded hover:bg-blue-700 transition-colors"
          >
            درخواست قیمت
          </button>
          <button
            type="button"
            onClick={handleMessageClick}
            className="flex-1 border text-sm py-1.5 rounded hover:bg-gray-100 transition-colors"
          >
            پیام
          </button>
        </div>
      </Link>

   <MessageModal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        recipientId={product.user}
        relatedProduct={product.id}
      />
    </>
  );
}