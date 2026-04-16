"use client";

import { useThemeComponent } from "@storefuse/core";
import type { Product } from "@storefuse/core";
import { useState, useMemo } from "react";

interface ClientShopPageProps {
  products: Product[];
  error?: string;
}

const SORT_OPTIONS = [
  { value: "default", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A–Z" },
  { value: "newest", label: "Newest First" },
];

const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under ₹499", min: 0, max: 499 },
  { label: "₹500 – ₹999", min: 500, max: 999 },
  { label: "₹1000 – ₹2499", min: 1000, max: 2499 },
  { label: "₹2500+", min: 2500, max: Infinity },
];

export default function ClientShopPage({ products, error }: ClientShopPageProps) {
  const ProductGrid = useThemeComponent("ProductGrid");
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  // Derive unique categories from products
  const allCategories = useMemo(() => {
    const cats = new Set<string>();
    products.forEach((p) => p.categories?.forEach((c) => cats.add(c.name)));
    return Array.from(cats).slice(0, 10);
  }, [products]);

  const [selectedCats, setSelectedCats] = useState<Set<string>>(new Set());

  const toggleCat = (name: string) => {
    setSelectedCats((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  const filtered = useMemo(() => {
    let list = [...products];

    // Category filter
    if (selectedCats.size > 0) {
      list = list.filter((p) => p.categories?.some((c) => selectedCats.has(c.name)));
    }

    // Price filter
    const range = PRICE_RANGES[priceRange];
    if (range && (range.max !== Infinity || range.min > 0)) {
      list = list.filter((p) => {
        const price = parseFloat(p.price?.replace(/[^0-9.]/g, "") || "0");
        return price >= range.min && price <= range.max;
      });
    }

    // In stock filter
    if (inStockOnly) {
      list = list.filter((p) => p.stockStatus === "instock");
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        list.sort((a, b) => parseFloat(a.price?.replace(/[^0-9.]/g, "") || "0") - parseFloat(b.price?.replace(/[^0-9.]/g, "") || "0"));
        break;
      case "price-desc":
        list.sort((a, b) => parseFloat(b.price?.replace(/[^0-9.]/g, "") || "0") - parseFloat(a.price?.replace(/[^0-9.]/g, "") || "0"));
        break;
      case "name-asc":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return list;
  }, [products, selectedCats, priceRange, inStockOnly, sortBy]);

  const activeFilterCount = selectedCats.size + (priceRange > 0 ? 1 : 0) + (inStockOnly ? 1 : 0);

  const FiltersPanel = (
    <div className="space-y-6">
      {/* Categories */}
      {allCategories.length > 0 && (
        <div>
          <h3 className="font-semibold text-sm text-warm-text mb-3 uppercase tracking-wider">Category</h3>
          <div className="space-y-2">
            {allCategories.map((cat) => (
              <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedCats.has(cat)}
                  onChange={() => toggleCat(cat)}
                  className="w-4 h-4 rounded border-warm-border text-brand-500 focus:ring-brand-400 cursor-pointer"
                />
                <span className="text-sm text-warm-muted group-hover:text-warm-text transition-colors">{cat}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Price */}
      <div>
        <h3 className="font-semibold text-sm text-warm-text mb-3 uppercase tracking-wider">Price Range</h3>
        <div className="space-y-2">
          {PRICE_RANGES.map((range, i) => (
            <label key={range.label} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="price"
                checked={priceRange === i}
                onChange={() => setPriceRange(i)}
                className="w-4 h-4 text-brand-500 border-warm-border focus:ring-brand-400 cursor-pointer"
              />
              <span className="text-sm text-warm-muted group-hover:text-warm-text transition-colors">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="font-semibold text-sm text-warm-text mb-3 uppercase tracking-wider">Availability</h3>
        <label className="flex items-center gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="w-4 h-4 rounded border-warm-border text-brand-500 focus:ring-brand-400 cursor-pointer"
          />
          <span className="text-sm text-warm-muted group-hover:text-warm-text transition-colors">In Stock Only</span>
        </label>
      </div>

      {/* Clear */}
      {activeFilterCount > 0 && (
        <button
          onClick={() => { setSelectedCats(new Set()); setPriceRange(0); setInStockOnly(false); }}
          className="text-sm text-brand-500 hover:text-brand-600 font-medium underline underline-offset-2"
        >
          Clear all filters ({activeFilterCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-warm-bg">
      {/* Page Header */}
      <div className="bg-white border-b border-warm-border">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <nav className="text-xs text-warm-muted mb-2">
            <a href="/" className="hover:text-brand-500">Home</a>
            <span className="mx-2">›</span>
            <span className="text-warm-text font-medium">Shop</span>
          </nav>
          <h1 className="text-3xl font-bold text-warm-text">All Products</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8">
        {error && (
          <div className="mb-6 p-5 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-800 font-medium">Error loading products</p>
            <p className="text-sm text-red-600 mt-1">{error}. Check your .env.local WooCommerce credentials.</p>
          </div>
        )}

        {/* Mobile filter/sort bar */}
        <div className="flex items-center gap-3 mb-6 md:hidden">
          <button
            onClick={() => setFilterOpen(true)}
            className="flex items-center gap-2 px-4 h-10 border border-warm-border rounded-lg text-sm font-medium bg-white hover:border-brand-400 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
            </svg>
            Filters {activeFilterCount > 0 && <span className="badge bg-brand-500 text-white !py-0.5">{activeFilterCount}</span>}
          </button>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="flex-1 h-10 px-3 border border-warm-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-300"
          >
            {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        <div className="flex gap-8">
          {/* Desktop filter sidebar */}
          <aside className="hidden md:block w-56 flex-shrink-0">
            <div className="card p-5 sticky top-28">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-warm-text">Filters</h2>
                {activeFilterCount > 0 && (
                  <span className="badge bg-brand-100 text-brand-600">{activeFilterCount}</span>
                )}
              </div>
              {FiltersPanel}
            </div>
          </aside>

          {/* Product area */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 gap-4">
              <p className="text-sm text-warm-muted">
                <span className="font-medium text-warm-text">{filtered.length}</span> products
              </p>
              <div className="hidden md:flex items-center gap-2">
                <label className="text-sm text-warm-muted">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-9 px-3 border border-warm-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-300"
                >
                  {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>

            {/* Active filter chips */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {Array.from(selectedCats).map((cat) => (
                  <button key={cat} onClick={() => toggleCat(cat)} className="badge bg-brand-50 text-brand-600 border border-brand-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors gap-1.5">
                    {cat}
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                ))}
                {priceRange > 0 && (
                  <button onClick={() => setPriceRange(0)} className="badge bg-brand-50 text-brand-600 border border-brand-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors gap-1.5">
                    {PRICE_RANGES[priceRange]?.label}
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                )}
                {inStockOnly && (
                  <button onClick={() => setInStockOnly(false)} className="badge bg-brand-50 text-brand-600 border border-brand-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors gap-1.5">
                    In Stock Only
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                )}
              </div>
            )}

            {!error && filtered.length === 0 && (
              <div className="card p-12 text-center">
                <p className="text-4xl mb-4">🔍</p>
                <p className="font-semibold text-warm-text mb-2">No products match your filters</p>
                <p className="text-sm text-warm-muted mb-4">Try adjusting or clearing your filters.</p>
                <button onClick={() => { setSelectedCats(new Set()); setPriceRange(0); setInStockOnly(false); }} className="btn-secondary text-sm px-4 py-2">
                  Clear Filters
                </button>
              </div>
            )}

            {ProductGrid && filtered.length > 0 && (
              <ProductGrid products={filtered} columns={3} />
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {filterOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setFilterOpen(false)} />
          <div className="relative ml-auto w-72 h-full bg-white shadow-xl overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-warm-border px-5 py-4 flex items-center justify-between">
              <h2 className="font-bold text-warm-text">Filters</h2>
              <button onClick={() => setFilterOpen(false)} className="p-1 rounded hover:bg-gray-100">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-5">
              {FiltersPanel}
            </div>
            <div className="sticky bottom-0 bg-white border-t border-warm-border p-4">
              <button onClick={() => setFilterOpen(false)} className="btn-primary w-full text-center">
                Show {filtered.length} products
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
