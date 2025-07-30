// app/companies/page.tsx
import { getCompaniesList } from "@/lib/actions";
import Link from "next/link";

export default async function CompaniesPage() {
  const companies = await getCompaniesList();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">لیست شرکت‌ها</h1>
      <p className="text-gray-600 mb-6">
        در این بخش می‌تونی تمام شرکت‌های ثبت‌شده رو ببینی.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.length === 0 ? (
          <p className="text-gray-500">هیچ شرکتی ثبت نشده.</p>
        ) : (
          companies.map((company: any) => (
            <Link
              key={company.id}
              href={`/companies/${company.id}`}
              className="block rounded-xl border p-4 shadow-sm bg-white hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold text-indigo-700">{company.name}</h2>
              <p className="text-gray-500 mt-2">{company.city}</p>
              <p className="text-sm text-gray-400 mt-1">{company.category}</p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}