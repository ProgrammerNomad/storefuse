"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@storefuse/module-cart";

export interface HeaderProps {
  siteName?: string;
  className?: string;
}

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "New Arrivals", href: "/shop?sort=newest" },
  { label: "Best Sellers", href: "/shop?sort=popularity" },
  { label: "Sale", href: "/shop?on_sale=true" },
];

const CATEGORIES = [
  { label: "Festive Decor", href: "/category/festive-decor" },
  { label: "Diyas & Lamps", href: "/category/diyas" },
  { label: "Jewelry", href: "/category/jewelry" },
  { label: "Gifts", href: "/category/gifts" },
  { label: "Home Decor", href: "/category/home-decor" },
  { label: "Kitchen", href: "/category/kitchen" },
];

export default function Header({ siteName = "StoreFuse", className = "" }: HeaderProps) {
  const { itemCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <div className={`sticky top-0 z-50 ${className}`}>
      {/* Announcement Bar */}
      <div className="bg-brand-500 text-white text-center text-xs md:text-sm py-2 px-4">
        <div className="flex items-center justify-center gap-6">
          <span className="hidden md:inline">🚚 Free shipping on orders over ₹999</span>
          <span>↩ Easy 7-day returns</span>
          <span className="hidden md:inline">🔒 Secure checkout</span>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-warm-border shadow-sm">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center gap-4 h-16">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0 font-bold text-xl tracking-tight text-warm-text hover:text-brand-500 transition-colors">
              {siteName}
            </Link>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl hidden md:flex mx-8">
              <div className="relative w-full">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full h-10 pl-4 pr-12 border border-warm-border rounded-lg text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400 transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 h-10 px-3 rounded-r-lg text-warm-muted hover:text-brand-500 transition-colors"
                  aria-label="Search"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>

            {/* Right Icons */}
            <div className="flex items-center gap-1 ml-auto">
              {/* Search icon mobile */}
              <Link href="/search" className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Search">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </Link>

              {/* Wishlist */}
              <button className="hidden md:flex items-center gap-1.5 p-2 rounded-lg hover:bg-gray-100 transition-colors group text-warm-text" aria-label="Wishlist">
                <svg className="w-5 h-5 group-hover:text-brand-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-sm font-medium group-hover:text-brand-500 transition-colors">Wishlist</span>
              </button>

              {/* Account */}
              <button className="hidden md:flex items-center gap-1.5 p-2 rounded-lg hover:bg-gray-100 transition-colors group text-warm-text" aria-label="Account">
                <svg className="w-5 h-5 group-hover:text-brand-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-sm font-medium group-hover:text-brand-500 transition-colors">Profile</span>
              </button>

              {/* Cart Desktop */}
              <Link href="/cart" className="hidden md:flex items-center gap-1.5 p-2 rounded-lg hover:bg-gray-100 transition-colors group text-warm-text" aria-label={`Cart (${itemCount} items)`}>
                <div className="relative">
                  <svg className="w-5 h-5 group-hover:text-brand-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {itemCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-brand-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 leading-none shadow-sm">
                      {itemCount > 99 ? "99+" : itemCount}
                    </span>
                  )}
                </div>
                <span className="text-sm font-medium group-hover:text-brand-500 transition-colors">Cart</span>
              </Link>

              {/* Cart Mobile */}
              <Link href="/cart" className="md:hidden relative p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label={`Cart (${itemCount} items)`}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 leading-none">
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Category Nav Bar — Desktop */}
        <div className="hidden md:block border-t border-warm-border bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <nav className="flex items-center justify-center gap-2 h-10 overflow-x-auto scrollbar-hide">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className="flex-shrink-0 px-4 py-1.5 text-sm font-medium text-warm-muted hover:text-brand-500 hover:bg-brand-50 rounded-full transition-colors"
                >
                  {cat.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-warm-border shadow-lg">
          {/* Mobile Search */}
          <div className="px-4 pt-4 pb-2">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full h-10 pl-4 pr-12 border border-warm-border rounded-lg text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-300"
              />
              <button type="submit" className="absolute right-3 top-3 text-warm-muted" aria-label="Search">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>

          {/* Mobile Nav Links */}
          <nav className="px-4 pb-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center h-10 px-3 text-sm font-medium rounded-lg hover:bg-brand-50 hover:text-brand-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-warm-border">
              <p className="px-3 text-xs font-semibold text-warm-muted uppercase tracking-wider mb-2">Categories</p>
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center h-9 px-3 text-sm text-warm-muted hover:text-brand-500 hover:bg-brand-50 rounded-lg transition-colors"
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
