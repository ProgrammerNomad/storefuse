"use client";

import type { Product } from "@storefuse/core";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AddToCartButton from "./AddToCartButton";

export interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({
  product,
  className = "",
}: ProductCardProps) {
  const image = product.images?.[0];
  const secondImage = product.images?.[1];
  const [wished, setWished] = useState(false);
  const isInStock = product.stockStatus === "instock";

  const rawPrice = parseFloat(product.price?.replace(/[^0-9.]/g, "") || "0");
  const rawRegular = parseFloat(product.regularPrice?.replace(/[^0-9.]/g, "") || "0");
  const hasDiscount = product.regularPrice && product.regularPrice !== product.price && rawRegular > rawPrice;
  const discountPct = hasDiscount ? Math.round((1 - rawPrice / rawRegular) * 100) : 0;

  return (
    <div className={`group card card-hover flex flex-col ${className}`}>
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-50 rounded-t-2xl">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          {image ? (
            <>
              <Image
                src={image.src}
                alt={image.alt || product.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className={`object-cover transition-all duration-500 ${secondImage ? "group-hover:opacity-0" : "group-hover:scale-105"}`}
              />
              {secondImage && (
                <Image
                  src={secondImage.src}
                  alt={secondImage.alt || product.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
              )}
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-brand-50 to-orange-100 flex items-center justify-center">
              <span className="text-5xl opacity-20">🪔</span>
            </div>
          )}
        </Link>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 pointer-events-none">
          {hasDiscount && discountPct > 0 && (
            <span className="badge bg-red-500 text-white shadow-sm">−{discountPct}%</span>
          )}
          {!isInStock && (
            <span className="badge bg-gray-900 text-white shadow-sm">Sold Out</span>
          )}
          {isInStock && product.stockQuantity !== undefined && product.stockQuantity <= 5 && (
            <span className="badge bg-amber-500 text-white shadow-sm">Only {product.stockQuantity} left</span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={() => setWished((w) => !w)}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        >
          <svg className={`w-4 h-4 transition-colors ${wished ? "fill-red-500 stroke-red-500" : "fill-none stroke-gray-500"}`} viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Quick add — visible on hover desktop */}
        {isInStock && (
          <div className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-3">
            <AddToCartButton product={product} size="sm" className="w-full bg-white/95 backdrop-blur-sm !text-warm-text !bg-white border border-warm-border hover:!bg-brand-500 hover:!text-white hover:!border-brand-500" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        {/* Rating placeholder */}
        <div className="flex items-center gap-1 mb-2">
          <span className="text-yellow-400 text-xs">★★★★★</span>
          <span className="text-xs text-warm-muted">(48)</span>
        </div>

        <Link href={`/product/${product.slug}`} className="flex-1">
          <h3 className="text-sm font-semibold text-warm-text line-clamp-2 group-hover:text-brand-500 transition-colors min-h-[2.5rem] leading-snug">
            {product.name}
          </h3>
        </Link>

        {/* Price row */}
        <div className="flex items-baseline gap-2 mt-3 mb-4">
          <span className="text-base font-bold text-warm-text">{product.price}</span>
          {hasDiscount && (
            <span className="text-xs text-warm-muted line-through">{product.regularPrice}</span>
          )}
          {hasDiscount && discountPct > 0 && (
            <span className="text-xs font-semibold text-green-600">Save {discountPct}%</span>
          )}
        </div>

        {/* Stock / delivery badge */}
        <p className="text-xs text-warm-muted mb-3">
          {isInStock ? "🚚 Ships in 1–2 days" : "⚠ Out of stock"}
        </p>

        <AddToCartButton product={product} size="md" className="w-full" />
      </div>
    </div>
  );
}
