"use client";

import Link from "next/link";
import { useCart } from "@storefuse/module-cart";

export interface HeaderProps {
  siteName?: string;
  className?: string;
}

/**
 * Header Component - Core Theme
 * 
 * Main site header with navigation.
 * Can be overridden by child themes.
 */
export default function Header({ siteName = "StoreFuse", className = "" }: HeaderProps) {
  const { itemCount } = useCart();

  return (
    <header className={`border-b ${className}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold hover:text-gray-700">
            {siteName}
          </Link>
          
          <nav className="flex items-center gap-6">
            <Link href="/" className="hover:text-gray-600 transition">
              Home
            </Link>
            <Link href="/shop" className="hover:text-gray-600 transition">
              Shop
            </Link>
            <Link href="/cart" className="hover:text-gray-600 transition relative">
              Cart
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
