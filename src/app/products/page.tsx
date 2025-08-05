import { getProductsList } from '@/lib/actions';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/types';
import type { RecordModel } from '@/types';

export default async function ProductsPage() {
  const rawRecordModels = await getProductsList();

  const recordModels: RecordModel[] = rawRecordModels.map((record: any) => ({
    ...record,
    created: record.created ?? '',
    updated: record.updated ?? '',
  }));

  const products: Product[] = recordModels.map((record) => ({
    ...record,
    name: record.name ?? '',
    tags: Array.isArray(record.tags)
      ? record.tags
      : typeof record.tags === 'string'
      ? record.tags.split(',').map((tag: string) => tag.trim())
      : [],
  }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">محصولات</h1>

      {products.length === 0 ? (
        <p className="text-gray-600">هیچ محصولی یافت نشد.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}