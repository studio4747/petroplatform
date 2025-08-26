'use client';

import { BadgeCheck } from 'lucide-react';

type Props = {
  variant?: 'company' | 'product';
  verified?: boolean;
  className?: string;
};

export default function VerifiedBadge({ variant = 'product', verified, className }: Props) {
  if (!verified) return null;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 px-2.5 py-1 text-xs font-medium ring-1 ring-emerald-200 ${className || ''}`}
      dir="rtl"
      title={variant === 'company' ? 'شرکت تایید شده' : 'محصول تایید شده'}
    >
      <BadgeCheck className="h-4 w-4" />
      {variant === 'company' ? 'تایید شرکت' : 'تایید محصول'}
    </span>
  );
}
