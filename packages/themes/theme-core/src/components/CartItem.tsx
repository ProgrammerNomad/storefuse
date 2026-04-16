"use client";

import type { CartItem as CartItemType } from "@storefuse/module-cart";
import { useCart } from "@storefuse/module-cart";
import ProductImage from "./ProductImage";

export interface CartItemProps {
  item: CartItemType;
  className?: string;
}

export default function CartItem({ item, className = "" }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  const handleIncrease = () => updateQuantity(product.id, quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) updateQuantity(product.id, quantity - 1);
    else removeFromCart(product.id);
  };
  const handleRemove = () => removeFromCart(product.id);

  const rawPrice = parseFloat(product.price?.replace(/[^0-9.]/g, "") || "0");
  const rawRegular = parseFloat(product.regularPrice?.replace(/[^0-9.]/g, "") || "0");
  const lineTotal = (rawPrice * quantity).toFixed(0);
  const hasDiscount = product.regularPrice && product.regularPrice !== product.price && rawRegular > rawPrice;
  const savings = hasDiscount ? ((rawRegular - rawPrice) * quantity).toFixed(0) : null;

  return (
    <div className={`flex gap-4 p-5 ${className}`}>
      <a href={`/product/${product.slug}`} className="flex-shrink-0">
        <div className="w-20 h-20 rounded-xl overflow-hidden border border-warm-border bg-gray-50">
          <ProductImage product={product} width={80} height={80} className="w-full h-full object-cover" />
        </div>
      </a>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <a href={`/product/${product.slug}`} className="text-sm font-semibold text-warm-text hover:text-brand-500 transition-colors line-clamp-2 leading-snug">
            {product.name}
          </a>
          <button
            onClick={handleRemove}
            className="flex-shrink-0 w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center text-warm-muted hover:text-red-500 transition-colors"
            aria-label="Remove item"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex items-center justify-between mt-3">
          {/* Quantity controls */}
          <div className="flex items-center border border-warm-border rounded-xl overflow-hidden">
            <button
              onClick={handleDecrease}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-sm font-medium transition-colors"
              aria-label="Decrease"
            >
              −
            </button>
            <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
            <button
              onClick={handleIncrease}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-sm font-medium transition-colors"
              aria-label="Increase"
            >
              +
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="text-sm font-bold text-warm-text">₹{lineTotal}</p>
            {savings && (
              <p className="text-xs text-green-600">Save ₹{savings}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}



