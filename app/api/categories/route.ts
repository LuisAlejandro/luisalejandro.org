import { NextResponse } from "next/server";

import { getAllCategories } from "@lib/api";

export async function GET() {
  try {
    const categories = await getAllCategories();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ response: [] }, { status: 500 });
  }
}
