// src/types/index.ts
export interface Company {
  id: string;
  name: string;
  // Add other company fields
}
export type Product ={
  id: string;
  name: string;
  image?: string; // Make optional
  description?: string;
  price?: number;
  substance?: string;
  quantity?: string;
  industry?: string;
  tags?: string[]; // Make optional
  company?: string | { id: string; name: string }; // Flexible type
  user: string; 
  
}
export type RecordModel = {
  id: string
  name: string
  tags: string | string[] // this is the key!
  image?: string
  created: string
  updated: string
}