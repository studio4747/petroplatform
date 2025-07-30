// app/dashboard/page.tsx
import pb from "@/lib/pocketbase";

export default async function DashboardPage() {
  const [companiesCount, buyersCount, productsCount] = await Promise.all([
    pb.collection("companies").getFullList({}).then(res => res.length).catch(() => 0),
    pb.collection("buyers").getFullList({}).then(res => res.length).catch(() => 0),
    pb.collection("products").getFullList({}).then(res => res.length).catch(() => 0),
  ]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">سلام 👋</h1>
      <p className="text-gray-600 mb-6">
        خوش اومدی به پنل مدیریت. از منوی کناری می‌تونی به بخش‌های مختلف دسترسی پیدا کنی.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="تعداد شرکت‌ها" value={companiesCount} />
        <Card title="تعداد خریداران" value={buyersCount} />
        <Card title="تعداد محصولات" value={productsCount} />
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-2xl border p-4 shadow-sm bg-white transition hover:shadow-md">
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      <p className="mt-3 text-3xl font-bold text-indigo-600">{value}</p>
    </div>
  );
}