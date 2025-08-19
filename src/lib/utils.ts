// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { RecordModel } from "pocketbase";

// Tailwind class merging
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// PocketBase image URL builder
export function getImageUrl(
  record: RecordModel | { id: string; image?: string; collectionId?: string }
) {
  // if no image, use placeholder
  if (!record.image) return "/placeholder.png";

  // use record.collectionId if exists, otherwise default to 'products'
  const collectionId = record.collectionId || "products";

  return `${
    process.env.NEXT_PUBLIC_PB_URL || "http://127.0.0.1:8090"
  }/api/files/${collectionId}/${record.id}/${record.image}`;
}