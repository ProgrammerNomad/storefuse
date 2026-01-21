"use client";

import type { Product } from "@storefuse/core";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

export interface ProductCardProps {
  product: Product;
  className?: string;
}

/**
 * ProductCard Component - Core Theme
 * 
 * Product card with image, name, price, and add to cart button.
 */
export default function ProductCard({
  product,
  className = "",
}: ProductCardProps) {
  const image = product.images?.[0];

  return (
    <div className={`group border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 bg-white ${className}`}>
      <Link href={`/product/${product.slug}`} className="block relative overflow-hidden">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt || product.name}
            width={400}
            height={400}
            className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-80 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-lg">No image</span>
          </div>
        )}
      </Link>

      <div className="p-5">
        <Link href={`/product/${product.slug}`} className="block">
          <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors min-h-[3.5rem]">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-baseline gap-2 mb-4">
          <p className="text-2xl font-bold text-gray-900">{product.price}</p>
          {product.regularPrice && product.regularPrice !== product.price && (
            <p className="text-sm text-gray-500 line-through">{product.regularPrice}</p>
          )}
        </div>

        <AddToCartButton product={product} size="md" className="w-full" />
      </div>
    </div>
  );
}
