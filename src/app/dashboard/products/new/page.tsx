"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductForm() {
  const router = useRouter();

  // form states
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [description, setDescription] = useState("");

  // loading & errors
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function fetchCategoryOptions() {
      try {
        const res = await fetch("/api/schema-products");
        if (!mounted) return;

        if (!res.ok) {
          const txt = await res.text();
          console.error("schema-products endpoint returned non-OK:", res.status, txt);
          throw new Error("خطا در گرفتن schema محصولات");
        }

        const json = await res.json();
        console.log("schema-products response:", json);

        // Find the "category" field options (like industries)
        const categoryField =
          (json.schema || []).find(
            (f: any) => f.name === "category" || f.id === "category"
          ) || null;

        if (categoryField && categoryField.options && Array.isArray(categoryField.options.values)) {
          setCategories(categoryField.options.values);
          setCategory(categoryField.options.values[0] || "");
        } else {
          console.warn("category field has no select values, falling back to free input", categoryField);
          setCategories([]);
          setCategory("");
        }
      } catch (e) {
        console.error("failed to load category options:", e);
        if (!mounted) return;
        setError("بارگذاری لیست دسته‌بندی‌ها موفق نبود.");
        setCategories([]);
        setCategory("");
      } finally {
        if (!mounted) return;
        setLoadingCategories(false);
      }
    }

    fetchCategoryOptions();

    return () => {
      mounted = false;
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !category.trim()) {
      setError("نام و دسته‌بندی محصول الزامی هستند.");
      return;
    }

    if (categories.length > 0 && !categories.includes(category)) {
      setError("دسته‌بندی انتخاب‌شده معتبر نیست. لطفاً یکی از گزینه‌های لیست را انتخاب کنید.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/create-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          category,
          description: description.trim(),
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error || "ثبت محصول با خطا مواجه شد.");
        return;
      }

      router.push("/dashboard/products");
    } catch (err) {
      console.error("Submit error:", err);
      setError("ارتباط با سرور برقرار نشد.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">افزودن محصول جدید</h1>

      {error && <div className="mb-4 text-red-600">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">نام محصول</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
            placeholder="نام محصول"
          />
        </div>

        <div>
          <label className="block font-medium">دسته‌بندی</label>
          {loadingCategories ? (
            <div className="text-sm text-gray-500">در حال بارگذاری دسته‌بندی‌ها...</div>
          ) : categories.length > 0 ? (
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          ) : (
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded"
              placeholder="دسته‌بندی را وارد کنید"
            />
          )}
        </div>

        <div>
          <label className="block font-medium">توضیحات</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            rows={4}
            placeholder="توضیح کوتاه درباره محصول"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {submitting ? "در حال ثبت..." : "ثبت محصول"}
        </button>
      </form>
    </div>
  );
}
