import { notFound } from "next/navigation";
import Image from "next/image";
import { getProductById, getCompanyById } from "@/lib/actions";
import { getImageUrl } from "@/lib/utils";

type ProductPageProps = {
  params: {
    id: string;
  };
};

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductById(params.id);

  if (!product) return notFound();

  const company = product.company ? await getCompanyById(product.company) : null;

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-6 bg-white rounded-xl shadow">
      {/* Title */}
      <h1 className="text-2xl font-bold">{product.name}</h1>

      {/* Image */}
      {product.image && (
        <div className="relative w-full h-64 rounded overflow-hidden">
          <Image
            src={getImageUrl(product)}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Description */}
      {product.description && (
        <div>
          <h2 className="font-semibold mb-2">توضیحات</h2>
          <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
        </div>
      )}

      {/* Technical Specs */}
      {product.specs && product.specs.length > 0 && (
        <div>
          <h2 className="font-semibold mb-2">مشخصات فنی</h2>
          <table className="w-full text-sm border rounded overflow-hidden rtl text-right">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">مشخصه</th>
                <th className="p-2 border">مقدار</th>
              </tr>
            </thead>
            <tbody>
              {product.specs.map((spec: { key: string; value: string }, index: number) => (
                <tr key={index}>
                  <td className="p-2 border">{spec.key}</td>
                  <td className="p-2 border">{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Files */}
      {product.files && product.files.length > 0 && (
        <div>
          <h2 className="font-semibold mb-2">فایل‌ها</h2>
          <ul className="list-disc list-inside text-sm">
            {product.files.map((file: string, index: number) => (
              <li key={index}>
                <a
                  href={file}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  دانلود فایل {index + 1}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Supplier Info */}
      {company && (
        <div className="flex items-center gap-4 mt-6 border-t pt-4">
          {company.logo && (
            <Image
              src={company.logo}
              alt={company.name}
              width={50}
              height={50}
              className="rounded-full object-cover"
            />
          )}
          <div>
            <p className="font-semibold">{company.name}</p>
            <a
              href={`/companies/${company.id}`}
              className="text-blue-600 text-sm hover:underline"
            >
              مشاهده پروفایل تامین‌کننده
            </a>
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-4 pt-4 border-t">
        <button className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          درخواست قیمت
        </button>
        <button className="flex-1 border py-2 rounded hover:bg-gray-100">
          پیام
        </button>
      </div>
    </div>
  );
}
