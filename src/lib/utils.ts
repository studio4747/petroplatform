import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { RecordModel } from "pocketbase";

// Tailwind class merging
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// PocketBase image URL builder
export function getImageUrl(
  record: RecordModel | { id: string; collectionId?: string; image?: string }
) {
  if (!record.image || !record.collectionId) return "/placeholder.png";
  return `${process.env.NEXT_PUBLIC_PB_URL || "http://127.0.0.1:8090"}/api/files/${record.collectionId}/${record.id}/${record.image}`;
}