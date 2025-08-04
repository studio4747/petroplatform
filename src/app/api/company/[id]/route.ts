// src/app/api/company/[id]/route.ts
import { NextResponse } from "next/server";
import PocketBase from "pocketbase";

const POCKETBASE_URL = (process.env.NEXT_PUBLIC_POCKETBASE_URL || "http://127.0.0.1:8090").replace(/\/+$/, "");
const ADMIN_EMAIL = process.env.PB_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.PB_ADMIN_PASSWORD;

async function getAdminClient() {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error("Admin credentials missing");
  }
  const pb = new PocketBase(POCKETBASE_URL);
  await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
  return pb;
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const pb = await getAdminClient();
    const record = await pb.collection("companies").getOne(id);
    return NextResponse.json({ company: record });
  } catch (err: any) {
    console.error("fetch company error:", err);
    const msg = err?.data?.message || err?.message || "خطا در دریافت شرکت.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { name, industry, location, description } = body;

    if (!name?.trim() || !industry?.trim() || !location?.trim()) {
      return NextResponse.json(
        { error: "نام، صنعت و موقعیت الزامی هستند." },
        { status: 400 }
      );
    }

    const pb = await getAdminClient();

    // Validate industry against schema select values if present
    const collection = await pb.collections.getOne("companies");
    const rawFields: any[] = Array.isArray(collection.schema)
      ? collection.schema
      : Array.isArray((collection as any).fields)
      ? (collection as any).fields
      : [];

    const industryField: any =
      rawFields.find((f: any) => f.name === "industry" || f.id === "industry") || null;

    let canonicalIndustry = industry.trim();
    if (
      industryField &&
      industryField.type === "select" &&
      Array.isArray(industryField.values) &&
      industryField.values.length > 0
    ) {
      const match = industryField.values.find(
        (v: string) => v.toLowerCase() === industry.trim().toLowerCase()
      );
      if (!match) {
        return NextResponse.json(
          {
            error: `صنعت "${industry}" معتبر نیست. یکی از: ${industryField.values.join(
              ", "
            )} را انتخاب کنید.`,
          },
          { status: 400 }
        );
      }
      canonicalIndustry = match;
    }

    const payload: any = {
      name: name.trim(),
      industry: canonicalIndustry,
      location: location.trim(),
      description: typeof description === "string" ? description.trim() : "",
    };

    const updated = await pb.collection("companies").update(id, payload);
    return NextResponse.json({ company: updated });
  } catch (err: any) {
    console.error("update company error:", err);
    const msg =
      err?.data?.message || err?.message || "خطای داخلی هنگام بروزرسانی شرکت.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
