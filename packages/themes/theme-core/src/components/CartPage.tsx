"use client";

import { useCart } from "@storefuse/module-cart";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import CheckoutButton from "./CheckoutButton";
import Link from "next/link";

export interface CartPageProps {
  className?: string;
}

/**
 * CartPage Component - Core Theme
 * 
 * Full cart page with items list and summary.
 * Can be overridden in child themes.
 */
export default function CartPage({ className = "" }: CartPageProps) {
  const { items, itemCount } = useCart();

  if (itemCount === 0) {
    return (
      <div className={`container mx-auto px-4 py-12 ${className}`}>
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
        
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
          <Link
            href="/shop"
            className="inline-block bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`container mx-auto px-4 py-12 ${className}`}>
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">
              Cart Items ({itemCount})
            </h2>
            
            <div className="divide-y">
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>

            <div className="mt-6">
              <Link
                href="/shop"
                className="text-sm text-blue-600 hover:underline"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border rounded-lg p-6 sticky top-4">
            <CartSummary />
            <CheckoutButton className="w-full mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
