import { getAdapter } from "@/lib/adapter";
import type { Product } from "@storefuse/core";
import Image from "next/image";

export default async function ShopPage() {
  let products: Product[] = [];
  let error = null;

  try {
    const adapter = getAdapter();
    products = await adapter.products.list({});
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load products";
    console.error("Shop page error:", err);
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Shop</h1>

      {error && (
        <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-900">
            <strong>Error loading products:</strong> {error}
          </p>
          <p className="text-sm text-red-700 mt-2">
            Make sure your .env.local file is configured with valid WooCommerce
            credentials.
          </p>
        </div>
      )}

      {!error && products.length === 0 && (
        <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-900">
            No products found. Add some products to your WooCommerce store.
          </p>
        </div>
      )}

      {products.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              {product.images && product.images[0] && (
                <Image
                  src={product.images[0].src}
                  alt={product.images[0].alt || product.name}
                  width={300}
                  height={400}
                  className="w-full h-64 object-cover"
                />
              )}
              {(!product.images || !product.images[0]) && (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
              <div className="p-4">
                <h3 className="font-bold mb-2">{product.name}</h3>
                {product.shortDescription && (
                  <div
                    className="text-sm text-gray-600 mb-2 line-clamp-2"
                    dangerouslySetInnerHTML={{
                      __html: product.shortDescription,
                    }}
                  />
                )}
                <p className="text-lg font-semibold mb-4">{product.price}</p>
                {product.stockStatus === "instock" ? (
                  <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
                    Add to Cart
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full bg-gray-300 text-gray-500 py-2 rounded cursor-not-allowed"
                  >
                    Out of Stock
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-12 p-6 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-center text-green-900">
          <strong>✓ Live WooCommerce Integration:</strong> Products are loaded
          from your WooCommerce store via REST API with 10-minute cache.
        </p>
      </div>
    </div>
  );
}
