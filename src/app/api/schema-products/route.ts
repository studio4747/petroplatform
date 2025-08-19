import { NextResponse } from "next/server";
import PocketBase from "pocketbase";

const POCKETBASE_URL = (process.env.NEXT_PUBLIC_POCKETBASE_URL || "http://127.0.0.1:8090").replace(/\/+$/, "");
const ADMIN_EMAIL = process.env.PB_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.PB_ADMIN_PASSWORD;

export async function GET() {
  try {
    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
      console.error("Missing admin credentials:", {
        hasEmail: !!ADMIN_EMAIL,
        hasPassword: !!ADMIN_PASSWORD,
      });
      return NextResponse.json(
        { error: "متغیرهای محیطی PB_ADMIN_EMAIL یا PB_ADMIN_PASSWORD تنظیم نشده‌اند." },
        { status: 500 }
      );
    }

    const pb = new PocketBase(POCKETBASE_URL);

    // Admin auth
    try {
      await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
    } catch (authErr: any) {
      return NextResponse.json(
        { error: "احراز هویت ادمین با خطا مواجه شد. اعتبارنامه‌ها را بررسی کنید." },
        { status: 500 }
      );
    }

    // Get collection for products
    let collection;
    try {
      collection = await pb.collections.getOne("products");
    } catch (colErr: any) {
      return NextResponse.json(
        { error: "دسترسی به collection با نام 'products' ناموفق بود. آیا نام آن صحیح است؟" },
        { status: 500 }
      );
    }

    const rawFields: any[] = Array.isArray(collection.schema)
      ? collection.schema
      : Array.isArray((collection as any).fields)
      ? (collection as any).fields
      : [];

    if (!Array.isArray(rawFields)) {
      return NextResponse.json(
        { error: "دریافت schema collection محصولات ناموفق بود. ساختار برگشتی ناخواسته است." },
        { status: 500 }
      );
    }

    const normalizedSchema = rawFields.map((f: any) => {
      if (f.type === "select") {
        return {
          ...f,
          options: {
            values: Array.isArray(f.values) ? f.values : [],
          },
        };
      }
      return f;
    });

    return NextResponse.json({ schema: normalizedSchema });
  } catch (err: any) {
    const msg = err?.message || "خطای داخلی نامشخص";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
