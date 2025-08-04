// app/companies/page.tsx
import { getCompaniesList } from "@/lib/actions";
import { CompanyCard } from "@/components/ui/CompanyCard";

export default async function CompaniesPage() {
  const companies = await getCompaniesList();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">شرکت‌ها</h1>

      {companies.length === 0 ? (
        <p className="text-gray-500">هیچ شرکتی هنوز ثبت نشده.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((c: any) => {
            const logoUrl = c.logo?.url
              ? `${process.env.NEXT_PUBLIC_POCKETBASE_URL?.replace(/\/$/, "")}${c.logo.url}`
              : undefined;

            return (
              <CompanyCard
                key={c.id}
                id={c.id}
                name={c.name}
                description={c.description}
                logoUrl={logoUrl}
                city={c.city}
                category={c.industry || c.category}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
