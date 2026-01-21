/**
 * Example: Custom Header Component
 * 
 * This demonstrates how to create a custom header that overrides
 * the core theme header.
 * 
 * To activate this:
 * 1. Rename this file to Header.tsx (remove .example)
 * 2. Update ../index.ts to include: Header: () => import("./components/Header")
 * 3. Restart your dev server
 */

import Link from "next/link";

export default function CustomHeader() {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">🛍️ My Custom Store</h1>
            <p className="text-indigo-200 text-sm mt-1">Powered by StoreFuse</p>
          </div>
          
          <nav className="flex gap-6">
            <Link href="/" className="hover:text-indigo-200 transition-colors font-medium">
              Home
            </Link>
            <Link href="/shop" className="hover:text-indigo-200 transition-colors font-medium">
              Shop
            </Link>
            <Link href="/cart" className="hover:text-indigo-200 transition-colors font-medium">
              Cart
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
