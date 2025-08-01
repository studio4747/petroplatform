// app/dashboard/companies/page.tsx
import Link from "next/link";
import { getCompaniesList } from "@/lib/actions"; // شما قبلاً این رو ساختی
import { Card } from "@/components/ui/card"; // اگر اینو نداری، ساده بنویس

export default async function CompaniesPage() {
  const companies = await getCompaniesList();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">شرکت‌ها</h1>
        <Link
          href="/dashboard/companies/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          افزودن شرکت جدید
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {companies?.map((company: any) => (
          <Link key={company.id} href={`/dashboard/companies/${company.id}`}>
            <Card className="p-4 hover:shadow-lg transition-all">
              <h2 className="font-semibold text-lg">{company.name}</h2>
              <p className="text-gray-600">{company.industry}</p>
              <p className="text-sm text-gray-400 mt-2">
                {company.location || "بدون موقعیت"}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}