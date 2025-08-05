// src/types/index.ts

export type Product = {
  id: string;
  name: string;
  tags: string[];
  image?: string;
};

export interface RecordModel {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  name?: string;
  tags?: string[];
  image?: string;
}