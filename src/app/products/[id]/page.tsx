import { getProductById } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductById(params.id);

  if (!product) return notFound();

  const {
    name,
    description,
    technical_specs,
    msds_file,
    datasheet_file,
    expand,
  } = product;

  const company = expand?.company_id;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Title */}
      <h1 className="text-3xl font-bold">{name}</h1>

      {/* Supplier preview */}
      {company && (
        <div className="flex items-center gap-4">
          {company.logo && (
            <Image
              src={company.logo}
              alt={company.name}
              width={50}
              height={50}
              className="rounded-full object-cover"
            />
          )}
          <Link
            href={`/companies/${company.id}`}
            className="text-blue-600 hover:underline"
          >
            {company.name}
          </Link>
        </div>
      )}

      {/* Description */}
      {description && (
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {description}
        </p>
      )}

      {/* Technical Specs Table */}
      {technical_specs && technical_specs.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mt-6 mb-2">مشخصات فنی</h2>
          <table className="w-full border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">ویژگی</th>
                <th className="border p-2">مقدار</th>
              </tr>
            </thead>
            <tbody>
              {technical_specs.map((spec: any, index: number) => (
                <tr key={index}>
                  <td className="border p-2">{spec.key}</td>
                  <td className="border p-2">{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Files */}
      <div className="flex flex-wrap gap-4 mt-6">
        {msds_file && (
          <a
            href={msds_file}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
          >
            دریافت MSDS
          </a>
        )}
        {datasheet_file && (
          <a
            href={datasheet_file}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white bg-green-500 px-4 py-2 rounded hover:bg-green-600"
          >
            دریافت دیتاشیت
          </a>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
          درخواست خرید
        </button>
        <button className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded">
          پیام به تامین‌کننده
        </button>
      </div>
    </div>
  );
}
