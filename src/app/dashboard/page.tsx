// app/dashboard/page.tsx

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">سلام 👋</h1>
      <p className="text-gray-600 mb-6">
        خوش اومدی به پنل مدیریت. از منوی کناری می‌تونی به بخش‌های مختلف مثل شرکت‌ها و پیام‌ها دسترسی پیدا کنی.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="rounded-xl border p-4 shadow-sm bg-white">
          <h2 className="text-lg font-semibold">تعداد شرکت‌ها</h2>
          <p className="mt-2 text-2xl font-bold text-indigo-600">0</p>
        </div>

        <div className="rounded-xl border p-4 shadow-sm bg-white">
          <h2 className="text-lg font-semibold">پیام‌های دریافتی</h2>
          <p className="mt-2 text-2xl font-bold text-indigo-600">0</p>
        </div>

        <div className="rounded-xl border p-4 shadow-sm bg-white">
          <h2 className="text-lg font-semibold">وضعیت سیستم</h2>
          <p className="mt-2 text-green-600">فعال و بدون خطا</p>
        </div>
      </div>
    </div>
  );
}