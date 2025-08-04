// src/app/api/create-company/route.ts
import { NextResponse } from "next/server";
import PocketBase from "pocketbase";

const POCKETBASE_URL =
  process.env.NEXT_PUBLIC_POCKETBASE_URL || "http://127.0.0.1:8090";
const ADMIN_EMAIL = process.env.PB_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.PB_ADMIN_PASSWORD;

async function getAdminClient() {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error("Admin credentials (PB_ADMIN_EMAIL / PB_ADMIN_PASSWORD) are not set.");
  }
  const pb = new PocketBase(POCKETBASE_URL);
  await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
  return pb;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const nameRaw = body.name;
    const industryRaw = body.industry;
    const locationRaw = body.location ?? body.city; // accept either
    const descriptionRaw = body.description;

    // Basic validation
    if (!nameRaw || !industryRaw || !locationRaw) {
      return NextResponse.json(
        { error: "فیلدهای name، industry و location (یا city) الزامی هستند." },
        { status: 400 }
      );
    }
    if (typeof industryRaw !== "string") {
      return NextResponse.json(
        { error: "فیلد industry باید رشته باشد." },
        { status: 400 }
      );
    }

    const name = String(nameRaw).trim();
    const industry = String(industryRaw).trim();
    const location = String(locationRaw).trim();
    const description =
      typeof descriptionRaw === "string" ? descriptionRaw.trim() : "";

    if (!name || !industry || !location) {
      return NextResponse.json(
        { error: "نام، صنعت و موقعیت نمی‌توانند خالی باشند." },
        { status: 400 }
      );
    }

    const pb = await getAdminClient();

    // Fetch collection schema to validate industry (select)
    const collection = await pb.collections.getOne("companies");
    // Determine field definitions (PocketBase sometimes exposes under .fields or .schema)
    const rawFields: any[] = Array.isArray((collection as any).schema)
      ? (collection as any).schema
      : Array.isArray((collection as any).fields)
      ? (collection as any).fields
      : [];

    const industryField: any =
      rawFields.find((f: any) => f.name === "industry" || f.id === "industry") ||
      null;

    let canonicalIndustry = industry;
    if (
      industryField &&
      industryField.type === "select" &&
      Array.isArray(industryField.values) &&
      industryField.values.length > 0
    ) {
      const match = industryField.values.find(
        (v: string) => v.toLowerCase() === industry.toLowerCase()
      );
      if (!match) {
        return NextResponse.json(
          {
            error: `صنعت "${industry}" معتبر نیست. مقادیر مجاز: ${industryField.values.join(
              ", "
            )}.`,
          },
          { status: 400 }
        );
      }
      canonicalIndustry = match; // use canonical casing
    }

    const payload: any = {
      name,
      industry: canonicalIndustry,
      location,
      description,
    };

    const record = await pb.collection("companies").create(payload);
    return NextResponse.json({ company: record });
  } catch (error: any) {
    console.error("Create company error:", error);
    // Normalize error message from PocketBase
    const pbErr =
      error?.data?.message ||
      error?.message ||
      (typeof error === "string" ? error : "خطای ناشناخته هنگام ایجاد شرکت.");
    return NextResponse.json({ error: pbErr }, { status: 400 });
  }
}
