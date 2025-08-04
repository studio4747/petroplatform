// ProductCard.tsx
interface ProductCardProps {
  title: string;
  description?: string;
  imageUrl?: string;
}

// English comments: Simple placeholder card for a product/service.
export function ProductCard({
  title,
  description,
  imageUrl,
}: ProductCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-sm flex flex-col">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-40 object-cover mb-2 rounded"
        />
      )}
      <h4 className="font-semibold">{title}</h4>
      {description && (
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      )}
    </div>
  );
}
