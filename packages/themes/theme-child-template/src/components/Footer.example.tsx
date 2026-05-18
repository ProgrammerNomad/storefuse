/**
 * Example: Custom Footer Component
 *
 * Override the Footer to change the bottom section of every page.
 *
 * To activate:
 * 1. Rename this file to Footer.tsx (remove .example)
 * 2. Add to src/index.ts:
 *      Footer: () => import("./components/Footer"),
 * 3. Restart your dev server
 */

import Link from "next/link";

interface FooterProps {
  siteName?: string;
}

export default function CustomFooter({ siteName = "My Store" }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-3">{siteName}</h3>
            <p className="text-sm leading-relaxed">
              Handcrafted goods made with love. Quality you can feel.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link href="/shop?sort=newest" className="hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link href="/shop?on_sale=true" className="hover:text-white transition-colors">Sale</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Help</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/cart" className="hover:text-white transition-colors">Cart</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} {siteName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
