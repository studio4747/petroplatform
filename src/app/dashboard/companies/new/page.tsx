//app/dashboard/companies/new/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCompanyForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [industries, setIndustries] = useState<string[]>([]);
  const [loadingIndustries, setLoadingIndustries] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
  let mounted = true;

  async function fetchIndustryOptions() {
    try {
      const res = await fetch("/api/schema-companies");
      if (!mounted) return;

      if (!res.ok) {
        const txt = await res.text();
        console.error("schema endpoint returned non-OK:", res.status, txt);
        throw new Error("خطا در گرفتن schema");
      }

      const json = await res.json();
      console.log("schema-companies response:", json);

      const industryField =
        (json.schema || []).find(
          (f: any) => f.name === "industry" || f.id === "industry"
        ) || null;

      if (industryField && industryField.options && Array.isArray(industryField.options.values)) {
        setIndustries(industryField.options.values);
        setIndustry(industryField.options.values[0] || "");
      } else {
        console.warn("industry field has no select values, falling back to free input", industryField);
        setIndustries([]);
        setIndustry("");
      }
    } catch (e) {
      console.error("failed to load industry options:", e);
      if (!mounted) return;
      setError("بارگذاری لیست صنایع موفق نبود."); // user-facing
      setIndustries([]);
      setIndustry("");
    } finally {
      if (!mounted) return;
      setLoadingIndustries(false);
    }
  }

  fetchIndustryOptions();

  return () => {
    mounted = false;
  };
}, []);


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !location.trim() || !industry.trim()) {
      setError("نام، موقعیت و صنعت الزامی هستند.");
      return;
    }

    if (industries.length > 0 && !industries.includes(industry)) {
      setError("صنعت انتخاب‌شده معتبر نیست. لطفاً یکی از گزینه‌های لیست را انتخاب کنید.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/create-company", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          industry,
          location: location.trim(),
          description: description.trim(),
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error || "ثبت شرکت با خطا مواجه شد.");
        return;
      }

      router.push("/dashboard/companies");
    } catch (err) {
      console.error("Submit error:", err);
      setError("ارتباط با سرور برقرار نشد.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">افزودن شرکت جدید</h1>

      {error && <div className="mb-4 text-red-600">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">نام</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
            placeholder="نام شرکت"
          />
        </div>

        <div>
          <label className="block font-medium">صنعت</label>
          {loadingIndustries ? (
            <div className="text-sm text-gray-500">در حال بارگذاری صنایع...</div>
          ) : industries.length > 0 ? (
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded"
            >
              {industries.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          ) : (
            <input
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded"
              placeholder="صنعت را وارد کنید"
            />
          )}
        </div>

        <div>
          <label className="block font-medium">موقعیت</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
            placeholder="شهر یا مکان"
          />
        </div>

        <div>
          <label className="block font-medium">توضیحات</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            rows={4}
            placeholder="توضیح کوتاه درباره شرکت"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {submitting ? "در حال ثبت..." : "ثبت شرکت"}
        </button>
      </form>
    </div>
  );
}
