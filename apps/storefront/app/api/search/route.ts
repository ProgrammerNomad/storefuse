import { NextRequest, NextResponse } from "next/server";
import { searchProducts } from "@storefuse/module-search";
import { getAdapter } from "@/lib/adapter";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q") || "";
  const limit = parseInt(searchParams.get("limit") || "10");
  const category = searchParams.get("category") || undefined;
  const minPrice = searchParams.get("minPrice")
    ? parseFloat(searchParams.get("minPrice")!)
    : undefined;
  const maxPrice = searchParams.get("maxPrice")
    ? parseFloat(searchParams.get("maxPrice")!)
    : undefined;
  const inStock = searchParams.get("inStock") === "true";

  try {
    const adapter = getAdapter();
    const results = await searchProducts(adapter, {
      query,
      limit,
      category,
      minPrice,
      maxPrice,
      inStock,
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Failed to search products" },
      { status: 500 }
    );
  }
}
