"use client";

import { useCart } from "@storefuse/module-cart";
import Button from "./Button";

export interface CartSummaryProps {
  className?: string;
  showCheckout?: boolean;
  onCheckout?: () => void;
}

/**
 * CartSummary Component - Core Theme
 * 
 * Displays cart totals and checkout button.
 * Can be overridden in child themes.
 */
export default function CartSummary({
  className = "",
  showCheckout = true,
  onCheckout,
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

      <div className="border-t pt-4 mb-4">
        <div className="flex justify-between font-bold text-lg">
          <span>Subtotal</span>
          <span>{subtotal}</span>
        </div>
      </div>

      {showCheckout && (
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={onCheckout}
        >
          Proceed to Checkout
        </Button>
      )}

      <p className="text-xs text-gray-500 mt-4 text-center">
        Taxes and shipping calculated at checkout
      </p>
    </div>
  );
}
