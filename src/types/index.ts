// src/types/index.ts

export type Product = {
  id: string;
  name: string;
  tags: string[];
  image?: string;
};

export type RecordModel = {
  id: string
  name: string
  tags: string | string[] // this is the key!
  image?: string
  created: string
  updated: string
}