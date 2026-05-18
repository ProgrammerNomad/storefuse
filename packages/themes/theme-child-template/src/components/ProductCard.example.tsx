/**
 * Example: Custom ProductCard Component
 *
 * Override the ProductCard to change how every product is displayed across
 * the shop, category, search, and home pages.
 *
 * To activate:
 * 1. Rename this file to ProductCard.tsx (remove .example)
 * 2. Add to src/index.ts:
 *      ProductCard: () => import("./components/ProductCard"),
 * 3. Restart your dev server — all product grids will use your version
 */

import Link from "next/link";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: string;
    regularPrice?: string;
    images: Array<{ src: string; alt: string }>;
    stockStatus: string;
  };
}

export default function CustomProductCard({ product }: ProductCardProps) {
  const image = product.images?.[0];
  const inStock = product.stockStatus === "instock";
  const onSale = product.regularPrice && product.regularPrice !== product.price;

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="border-2 border-purple-200 rounded-2xl overflow-hidden hover:border-purple-500 transition-all hover:shadow-xl">
        <div className="relative aspect-square overflow-hidden bg-purple-50">
          {image ? (
            <img
              src={image.src}
              alt={image.alt || product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-purple-100">
              <span className="text-4xl opacity-30">🛍️</span>
            </div>
          )}
          {!inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-bold">Out of Stock</span>
            </div>
          )}
          {onSale && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              SALE
            </span>
          )}
        </div>
        <div className="p-4 bg-white">
          <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-purple-600 transition-colors mb-2">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-purple-600">{product.price}</span>
            {onSale && (
              <span className="text-sm text-gray-400 line-through">{product.regularPrice}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
