"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

interface CompanyData {
  id: string;
  name: string;
  industry?: string;
  location?: string;
  description?: string;
}

export default function EditCompanyPage() {
  const router = useRouter();
  const { id } = useParams(); // Next.js app router param

  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [industries, setIndustries] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load schema + company
  useEffect(() => {
    if (!id) return;
    let mounted = true;

    async function loadAll() {
      try {
        // parallel fetch schema and company
        const [schemaRes, companyRes] = await Promise.all([
          fetch("/api/schema-companies"),
          fetch(`/api/company/${id}`),
        ]);

        if (!schemaRes.ok) {
          const err = await schemaRes.json();
          throw new Error(err.error || "خطا در بارگذاری schema.");
        }
        if (!companyRes.ok) {
          const err = await companyRes.json();
          throw new Error(err.error || "خطا در بارگذاری اطلاعات شرکت.");
        }

        const schemaJson = await schemaRes.json();
        const companyJson = await companyRes.json();

        // extract industry options
        const field =
          (schemaJson.schema || []).find(
            (f: any) => f.name === "industry" || f.id === "industry"
          ) || null;

        if (field && field.options && Array.isArray(field.options.values)) {
          if (!mounted) return;
          setIndustries(field.options.values);
        } else {
          setIndustries([]);
        }

        // populate company data
        const company: CompanyData = companyJson.company;
        if (!mounted) return;
        setName(company.name || "");
        setIndustry(
          company.industry ||
            (field?.options?.values?.[0] ?? "") ||
            ""
        );
        setLocation(company.location || "");
        setDescription(company.description || "");
      } catch (e: any) {
        console.error("load error:", e);
        if (!mounted) return;
        setError(e.message || "خطا در بارگذاری داده‌ها.");
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    }

    loadAll();
    return () => {
      mounted = false;
    };
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !location.trim() || !industry.trim()) {
      setError("نام، موقعیت و صنعت الزامی هستند.");
      return;
    }

    if (industries.length > 0 && !industries.includes(industry)) {
      setError("صنعت انتخاب‌شده معتبر نیست.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/company/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          industry: industry.trim(),
          location: location.trim(),
          description: description.trim(),
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "بروزرسانی با خطا مواجه شد.");
        return;
      }

      router.push("/dashboard/companies");
    } catch (e) {
      console.error("submit error:", e);
      setError("ارتباط با سرور برقرار نشد.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="p-6 max-w-lg mx-auto">در حال بارگذاری...</div>;
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">ویرایش شرکت</h1>

      {error && <div className="mb-4 text-red-600">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
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

        {/* Industry */}
        <div>
          <label className="block font-medium">صنعت</label>
          {industries.length > 0 ? (
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
              placeholder="صنعت"
            />
          )}
        </div>

        {/* Location */}
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

        {/* Description */}
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
          disabled={saving}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {saving ? "در حال ذخیره..." : "ذخیره تغییرات"}
        </button>
      </form>
    </div>
  );
}
