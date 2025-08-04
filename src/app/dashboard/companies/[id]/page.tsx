// app/dashboard/companies/[id]/page.tsx
import { getCompanyById } from "@/lib/actions";
import Link from "next/link";

export default async function CompanyDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const company = await getCompanyById(params.id);

  if (!company) return <div>شرکت پیدا نشد.</div>;

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">{company.name}</h1>
      <p>
        <span className="font-medium">صنعت:</span> {company.industry}
      </p>
      <p>
        <span className="font-medium">موقعیت:</span> {company.location || "نامشخص"}
      </p>
      <p className="mt-4">
        <span className="font-medium">توضیحات:</span> {company.description}
      </p>

      <div className="mt-6 flex gap-4">
        <Link
          href={`/dashboard/companies/${company.id}/edit`}
          className="text-blue-600 underline"
        >
          ویرایش
        </Link>
        <Link href="/dashboard/companies" className="text-gray-600 underline">
          بازگشت
        </Link>
      </div>
    </div>
  );
}
