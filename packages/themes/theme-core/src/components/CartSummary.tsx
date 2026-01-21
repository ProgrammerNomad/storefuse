"use client";

import { useCart } from "@storefuse/module-cart";

export interface CartSummaryProps {
  className?: string;
}

/**
 * CartSummary Component - Core Theme
 * 
 * Displays cart totals.
 * Can be overridden in child themes.
 */
export default function CartSummary({
  className = "",
}: CartSummaryProps) {
  const { subtotal, itemCount } = useCart();

  return (
    <div className={`bg-gray-50 p-6 rounded-lg ${className}`}>
      <h3 className="text-lg font-bold mb-4">Cart Summary</h3>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span>Items ({itemCount})</span>
          <span>{subtotal}</span>
        </div>
        
        <div className="flex justify-between text-sm text-gray-600">
          <span>Shipping</span>
          <span>Calculated at checkout</span>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between font-bold text-lg">
          <span>Subtotal</span>
          <span>{subtotal}</span>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Taxes and shipping calculated at checkout
      </p>
    </div>
  );
}
