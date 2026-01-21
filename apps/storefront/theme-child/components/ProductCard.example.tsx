/**
 * Example: Custom Product Card Component
 * 
 * This demonstrates how to override the ProductCard component
 * with your own custom styling and layout.
 * 
 * To activate this:
 * 1. Rename this file to ProductCard.tsx (remove .example)
 * 2. Update ../index.ts to include: ProductCard: () => import("./components/ProductCard")
 * 3. Restart your dev server
 */

import Link from "next/link";
import { Price } from "@storefuse/theme-core";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: string;
  sale_price?: string;
  images: Array<{ src: string; alt: string }>;
  stock_status: string;
}

interface CustomProductCardProps {
  product: Product;
}

export default function CustomProductCard({ product }: CustomProductCardProps) {
  const imageUrl = product.images?.[0]?.src || "/placeholder.jpg";
  const inStock = product.stock_status === "instock";

  return (
    <Link href={`/product/${product.slug}`}>
      <div className="group border-2 border-purple-200 rounded-2xl overflow-hidden hover:border-purple-500 transition-all hover:shadow-xl">
        {/* Custom Image Container with Overlay */}
        <div className="relative aspect-square overflow-hidden bg-purple-50">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {!inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          )}
          {product.sale_price && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              SALE!
            </div>
          )}
        </div>

        {/* Custom Product Info */}
        <div className="p-4 bg-white">
          <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center justify-between">
            <Price 
              price={product.price}
              regularPrice={product.sale_price}
              className="text-2xl font-bold text-purple-600"
            />
            
            {inStock && (
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                View Details
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
