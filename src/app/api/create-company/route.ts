// src/app/api/create-company/route.ts

import { NextResponse } from "next/server";
import PocketBase from "pocketbase";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const body = await req.json();
  const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

  pb.authStore.loadFromCookie(cookies().toString());

  try {
    const authData = await pb.collection("users").authRefresh();
    const userId = authData?.record?.id;

    const payload = {
      name: body.name,
      description: body.description,
      email: body.email,
      phone: body.phone,
      website: body.website,
      address: body.address,
      logo: body.logo,
      categories: body.categories,
      industry: body.industry, // ✅ FIXED: add industry
      location: body.location, // ✅ FIXED: add location
      approved: false,
      user: userId, // already fixed previously
    };

    console.log("📦 Final payload:", payload);

    const record = await pb.collection("companies").create(payload);

    console.log("✅ Record created:", record);

    return NextResponse.json({ company: record });
  } catch (error) {
    console.error("❌ Create company error:", error);
    return NextResponse.json(
      { message: "Failed to create company", error },
      { status: 400 }
    );
  }
}