// app/page.tsx
import RecentProducts from "@/components/RecentProducts";

export default function HomePage() {
  return (
    <section className="bg-white text-gray-900">
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
          بازار آنلاین مواد پتروشیمی
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-xl">
          اتصال مستقیم خریداران و تامین‌کنندگان
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <a
            href="/products"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition"
          >
            مشاهده محصولات
          </a>
          <a
            href="/signup"
            className="border border-orange-500 text-orange-500 hover:bg-orange-50 font-semibold py-3 px-6 rounded-xl transition"
          >
            ثبت‌نام تامین‌کننده
          </a>
        </div>
      </div>

      {/* How it works */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-12">
            چگونه کار می‌کند؟
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition">
              <div className="text-5xl mb-4 text-orange-500">1</div>
              <h3 className="text-lg font-semibold mb-2">ثبت‌نام تامین‌کننده یا خریدار</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                برای شروع، حساب کاربری خود را به عنوان تامین‌کننده یا خریدار ایجاد کنید.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition">
              <div className="text-5xl mb-4 text-orange-500">2</div>
              <h3 className="text-lg font-semibold mb-2">جستجو و درخواست</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                محصولات پتروشیمی را جستجو کرده و درخواست خود را ثبت کنید.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition">
              <div className="text-5xl mb-4 text-orange-500">3</div>
              <h3 className="text-lg font-semibold mb-2">ارتباط مستقیم</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                با تامین‌کننده یا خریدار مستقیماً وارد مذاکره و ارتباط شوید.
              </p>
            </div>
          </div>
        </div>
      </div>
        <RecentProducts />
    </section>

  );
}