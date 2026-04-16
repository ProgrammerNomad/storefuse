"use client";

import { useState } from "react";
import { useCart } from "@storefuse/module-cart";
import CartItem from "./CartItem";
import CheckoutButton from "./CheckoutButton";
import Link from "next/link";

export interface CartPageProps {
  className?: string;
}

const FREE_SHIPPING_THRESHOLD = 999;

export default function CartPage({ className = "" }: CartPageProps) {
  const { items, itemCount, subtotal } = useCart();
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const subtotalNum = parseFloat(subtotal?.replace(/[^0-9.]/g, "") || "0");
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotalNum);
  const progressPct = Math.min(100, (subtotalNum / FREE_SHIPPING_THRESHOLD) * 100);
  const shipping = subtotalNum >= FREE_SHIPPING_THRESHOLD ? 0 : 99;
  const discount = couponApplied ? Math.floor(subtotalNum * 0.1) : 0;
  const total = subtotalNum + shipping - discount;

  if (itemCount === 0) {
    return (
      <div className={`min-h-[60vh] flex items-center justify-center bg-warm-bg ${className}`}>
        <div className="text-center px-4">
          <div className="text-6xl mb-6">🛒</div>
          <h1 className="text-2xl font-bold text-warm-text mb-3">Your cart is empty</h1>
          <p className="text-warm-muted mb-8">Looks like you haven't added anything yet.</p>
          <Link href="/shop" className="btn-primary inline-flex items-center gap-2 px-8 py-3">
            Continue Shopping
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-warm-bg ${className}`}>
      {/* Page header */}
      <div className="bg-white border-b border-warm-border">
        <div className="container mx-auto px-4 md:px-6 py-6">
          <h1 className="text-2xl font-bold text-warm-text">Shopping Cart
            <span className="ml-2 text-lg font-normal text-warm-muted">({itemCount} {itemCount === 1 ? "item" : "items"})</span>
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8">
        {/* Shipping progress bar */}
        <div className={`mb-6 p-4 rounded-2xl border ${remaining === 0 ? "bg-green-50 border-green-200" : "bg-brand-50 border-brand-100"}`}>
          {remaining === 0 ? (
            <p className="text-sm font-semibold text-green-700">🎉 You've unlocked free shipping!</p>
          ) : (
            <>
              <p className="text-sm font-semibold text-warm-text mb-2">
                Add <strong className="text-brand-500">₹{remaining}</strong> more for free shipping
              </p>
              <div className="w-full bg-brand-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-brand-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Cart Items */}
          <div className="flex-1 min-w-0 space-y-4">
            <div className="card divide-y divide-warm-border">
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
            <Link href="/shop" className="inline-flex items-center gap-1.5 text-sm text-brand-500 hover:text-brand-600 font-medium">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-80 flex-shrink-0 lg:sticky lg:top-28 space-y-4">
            {/* Coupon */}
            <div className="card p-5">
              <h3 className="font-semibold text-sm text-warm-text mb-3">Have a coupon?</h3>
              {couponApplied ? (
                <div className="flex items-center justify-between bg-green-50 rounded-xl px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-green-700">SAVE10 applied!</p>
                    <p className="text-xs text-green-600">−₹{discount} discount</p>
                  </div>
                  <button onClick={() => setCouponApplied(false)} className="text-xs text-green-600 hover:text-red-500 font-medium underline">
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1 min-w-0 h-9 px-3 text-sm border border-warm-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400"
                  />
                  <button
                    onClick={() => { if (coupon.trim()) setCouponApplied(true); }}
                    className="flex-shrink-0 h-9 px-3 bg-warm-text text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="card p-5">
              <h3 className="font-bold text-warm-text mb-4">Order Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-warm-muted">Subtotal ({itemCount} items)</span>
                  <span className="font-medium">{subtotal}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (SAVE10)</span>
                    <span>−₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-warm-muted">Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-green-600 font-medium">FREE</span>
                  ) : (
                    <span className="font-medium">₹{shipping}</span>
                  )}
                </div>
                <div className="border-t border-warm-border pt-3 flex justify-between font-bold text-base">
                  <span>Total</span>
                  <span>₹{total.toFixed(0)}</span>
                </div>
              </div>

              <CheckoutButton className="w-full mt-5" />

              {/* Trust */}
              <div className="mt-4 flex items-center justify-center gap-4 text-xs text-warm-muted">
                <span className="flex items-center gap-1">🔒 Secure</span>
                <span className="flex items-center gap-1">↩ 7-day returns</span>
              </div>

              {/* Payment badges */}
              <div className="mt-4 flex items-center justify-center gap-2">
                {["Visa", "MC", "UPI", "RazorPay"].map((pm) => (
                  <span key={pm} className="text-[10px] font-semibold bg-gray-100 text-warm-muted px-2 py-1 rounded">
                    {pm}
                  </span>
                ))}
              </div>
            </div>

            {/* Delivery estimate */}
            <div className="text-center text-xs text-warm-muted bg-white border border-warm-border rounded-2xl p-3">
              📦 Estimated delivery: <strong className="text-warm-text">Thu, Apr 18</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

