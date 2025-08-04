// CompanyCard.tsx
interface CompanyCardProps {
  id: string;
  name: string;
  description?: string;
  logoUrl?: string;
  city?: string;
  category?: string; // industry/category
}

// English comments: Reusable card showing basic company info and link to detail.
export function CompanyCard({
  id,
  name,
  description,
  logoUrl,
  city,
  category,
}: CompanyCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-md bg-white flex flex-col">
      {logoUrl && (
        <img
          src={logoUrl}
          alt={name}
          className="w-full h-32 object-contain mb-2 rounded"
        />
      )}
      <h3 className="text-lg font-semibold">{name}</h3>
      {category && (
        <div className="text-sm text-indigo-600 mt-1">{category}</div>
      )}
      {city && <div className="text-sm text-gray-500">{city}</div>}
      {description && (
        <p className="text-sm mt-2 line-clamp-3 text-gray-700">{description}</p>
      )}
      <div className="mt-auto">
        <a
          href={`/companies/${id}`}
          className="inline-block mt-3 text-indigo-600 font-medium"
        >
          مشاهده پروفایل &rarr;
        </a>
      </div>
    </div>
  );
}
