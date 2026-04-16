import { getAdapter } from "@/lib/adapter";
import type { Product } from "@storefuse/core";
import ClientShopPage from "./ClientShopPage";

export default async function ShopPage() {
  let products: Product[] = [];
  let error: string | undefined;

  try {
    const adapter = getAdapter();
    products = await adapter.products.list({});
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load products";
    console.error("Shop page error:", err);
  }

  return <ClientShopPage products={products} error={error} />;
}
