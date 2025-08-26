// src/app/api/create-product/route.ts
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
      price: body.price,
      stock: body.stock,
      category: body.category, // select field in products schema
      image: body.image,
      approved: false,
      user: userId, // link to user
    };

    console.log("📦 Final payload:", payload);

    const record = await pb.collection("products").create(payload);

    console.log("✅ Product created:", record);

    return NextResponse.json({ product: record });
  } catch (error) {
    console.error("❌ Create product error:", error);
    return NextResponse.json(
      { message: "Failed to create product", error },
      { status: 400 }
    );
  }
}
