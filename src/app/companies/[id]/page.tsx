// app/companies/[id]/page.tsx
import { getCompanyById } from "@/lib/actions";
import { ProductCard } from "@/components/ui/ProductCard";

interface Props {
  params: { id: string };
}

export default async function CompanyDetailPage({ params }: Props) {
  const company = await getCompanyById(params.id);

  if (!company) {
    return (
      <div className="p-6">
        <p className="text-red-600">شرکت پیدا نشد.</p>
      </div>
    );
  }

  const logoUrl = company.logo?.url
    ? `${process.env.NEXT_PUBLIC_POCKETBASE_URL?.replace(/\/$/, "")}${company.logo.url}`
    : undefined;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        {logoUrl && (
          <img
            src={logoUrl}
            alt={company.name}
            className="w-32 h-32 object-contain rounded"
          />
        )}
        <div>
          <h1 className="text-4xl font-bold">{company.name}</h1>
          <h1 className="text-4xl font-bold flex items-center gap-2">
  {company.name}
  {company.isApproved && (
    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
      تایید شده
    </span>
  )}
</h1>

          <div className="text-sm text-gray-500 mt-1">
            {company.industry || company.category} — {company.city}
          </div>
          {company.description && (
            <p className="mt-3 text-gray-700">{company.description}</p>
          )}
        </div>
      </div>

      {/* Products placeholder */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">محصولات</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ProductCard
            title="محصول نمونه ۱"
            description="توضیح کوتاه درباره محصول"
          />
          <ProductCard
            title="محصول نمونه ۲"
            description="توضیح کوتاه درباره محصول"
          />
        </div>
      </section>

      {/* Contact form (non-functional) */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">تماس با شرکت</h2>
        <form className="space-y-4 max-w-md">
          <div>
            <label className="block font-medium">نام شما</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              placeholder="نام"
              required
            />
          </div>
          <div>
            <label className="block font-medium">ایمیل</label>
            <input
              type="email"
              className="w-full border px-3 py-2 rounded"
              placeholder="ایمیل"
              required
            />
          </div>
          <div>
            <label className="block font-medium">پیام</label>
            <textarea
              className="w-full border px-3 py-2 rounded"
              rows={4}
              placeholder="پیام خود را بنویسید"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              disabled
              className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
            >
              ارسال (غیرفعال)
            </button>
            <p className="text-xs text-gray-500 mt-1">
              این فرم فعلاً غیرعملیاتی است.
            </p>
          </div>
        </form>
      </section>
    </div>
  );
}
