// src/app/api/schema-companies/route.ts
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

    // Get collection; ensure name/id is correct
    let collection;
    try {
      collection = await pb.collections.getOne("companies");
    } catch (colErr: any) {
      return NextResponse.json(
        { error: "دسترسی به collection با نام 'companies' ناموفق بود. آیا نام آن صحیح است؟" },
        { status: 500 }
      );
    }

    // PocketBase returns fields under `.fields`
    const rawFields: any[] = Array.isArray(collection.schema)
      ? collection.schema // fallback if shape differs in future
      : Array.isArray((collection as any).fields)
      ? (collection as any).fields
      : [];

    if (!Array.isArray(rawFields)) {
      return NextResponse.json(
        { error: "دریافت schema collection شرکت‌ها ناموفق بود. ساختار برگشتی ناخواسته است." },
        { status: 500 }
      );
    }

    // Normalize so that select fields expose options.values like frontend expects
    const normalizedSchema = rawFields.map((f: any) => {
      if (f.type === "select") {
        return {
          ...f,
          options: {
            values: Array.isArray(f.values) ? f.values : [],
          },
        };
      }
      // keep existing `options` if any, else leave as-is
      return f;
    });

    return NextResponse.json({ schema: normalizedSchema });
  } catch (err: any) {
    const msg = err?.message || "خطای داخلی نامشخص";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
