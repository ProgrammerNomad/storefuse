"use client";

import type { Product } from "@storefuse/core";
import { useState } from "react";
import AddToCartButton from "./AddToCartButton";

export interface ProductDetailPageProps {
  product: Product;
}

export default function ProductDetailPage({ product }: ProductDetailPageProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [wished, setWished] = useState(false);

  const isInStock = product.stockStatus === "instock";
  const images = product.images ?? [];
  const currentImage = images[selectedImage];

  const rawPrice = parseFloat(product.price?.replace(/[^0-9.]/g, "") || "0");
  const rawRegular = parseFloat(product.regularPrice?.replace(/[^0-9.]/g, "") || "0");
  const hasDiscount = product.regularPrice && product.regularPrice !== product.price && rawRegular > rawPrice;
  const discountPct = hasDiscount ? Math.round((1 - rawPrice / rawRegular) * 100) : 0;

  const TABS = [
    { id: "description", label: "Description" },
    { id: "specs", label: "Specifications" },
    { id: "shipping", label: "Shipping & Returns" },
  ];

  return (
    <div className="min-h-screen bg-warm-bg">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-warm-border">
        <div className="container mx-auto px-4 md:px-6 py-3">
          <nav className="text-xs text-warm-muted flex items-center gap-1.5 flex-wrap">
            <a href="/" className="hover:text-brand-500">Home</a>
            <span>›</span>
            <a href="/shop" className="hover:text-brand-500">Shop</a>
            {product.categories?.[0] && (
              <>
                <span>›</span>
                <a href={`/category/${product.categories[0].slug}`} className="hover:text-brand-500">{product.categories[0].name}</a>
              </>
            )}
            <span>›</span>
            <span className="text-warm-text font-medium line-clamp-1 max-w-[200px]">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8 pb-32 md:pb-12">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {/* ── Gallery ─────────────────────────────────────────── */}
          <div className="space-y-3">
            {/* Main image */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-50 border border-warm-border">
              {currentImage ? (
                <img
                  src={currentImage.src}
                  alt={currentImage.alt || product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-brand-50 to-orange-100 flex items-center justify-center">
                  <span className="text-6xl opacity-20">🪔</span>
                </div>
              )}
              {hasDiscount && discountPct > 0 && (
                <span className="absolute top-4 left-4 badge bg-red-500 text-white text-sm">−{discountPct}% OFF</span>
              )}
              {!isInStock && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">Sold Out</span>
                </div>
              )}
            </div>
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      i === selectedImage ? "border-brand-500 shadow-md" : "border-warm-border hover:border-brand-300"
                    }`}
                  >
                    <img src={img.src} alt={img.alt || `View ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product Info ─────────────────────────────────────── */}
          <div className="space-y-6">
            {/* Title + wishlist */}
            <div className="flex items-start gap-3">
              <h1 className="flex-1 text-2xl md:text-3xl font-bold text-warm-text leading-tight">{product.name}</h1>
              <button
                onClick={() => setWished((w) => !w)}
                className="flex-shrink-0 w-10 h-10 rounded-xl border border-warm-border flex items-center justify-center hover:border-red-300 hover:bg-red-50 transition-colors"
                aria-label="Wishlist"
              >
                <svg className={`w-5 h-5 transition-colors ${wished ? "fill-red-500 stroke-red-500" : "fill-none stroke-gray-400"}`} viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            {/* Ratings */}
            <div className="flex items-center gap-2">
              <span className="text-yellow-400 text-sm">★★★★★</span>
              <span className="text-sm text-warm-muted">4.8 (128 reviews)</span>
              <span className="text-warm-muted">·</span>
              <span className="text-sm text-green-600 font-medium">2,400+ sold</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 py-4 border-y border-warm-border">
              <span className="text-3xl font-bold text-warm-text">{product.price}</span>
              {hasDiscount && (
                <>
                  <span className="text-lg text-warm-muted line-through">{product.regularPrice}</span>
                  <span className="badge bg-green-100 text-green-700">Save {discountPct}%</span>
                </>
              )}
            </div>

            {/* Short description */}
            {product.shortDescription && (
              <div
                className="text-sm text-warm-muted leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: product.shortDescription }}
              />
            )}

            {/* Stock status */}
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isInStock ? "bg-green-500" : "bg-red-500"}`} />
              <span className={`text-sm font-medium ${isInStock ? "text-green-600" : "text-red-600"}`}>
                {isInStock ? "In Stock — Ready to ship" : "Out of Stock"}
              </span>
              {isInStock && product.stockQuantity !== undefined && product.stockQuantity <= 10 && (
                <span className="text-sm text-amber-600">· Only {product.stockQuantity} left</span>
              )}
            </div>

            {/* Quantity + Add to Cart — desktop */}
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center border border-warm-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-12 flex items-center justify-center hover:bg-gray-50 text-lg font-medium transition-colors"
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span className="w-10 text-center text-sm font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-12 flex items-center justify-center hover:bg-gray-50 text-lg font-medium transition-colors"
                >
                  +
                </button>
              </div>
              <div className="flex-1">
                <AddToCartButton product={product} quantity={quantity} size="lg" className="w-full" />
              </div>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                { icon: "🚚", label: "Ships in 1–2 days" },
                { icon: "↩", label: "7-day returns" },
                { icon: "🔒", label: "Secure checkout" },
                { icon: "🤝", label: "Handmade quality" },
              ].map((badge) => (
                <div key={badge.label} className="flex items-center gap-2 text-xs text-warm-muted bg-warm-bg rounded-xl p-3 border border-warm-border">
                  <span>{badge.icon}</span>
                  <span>{badge.label}</span>
                </div>
              ))}
            </div>

            {/* Delivery estimate */}
            <div className="bg-brand-50 border border-brand-100 rounded-xl p-4 text-sm">
              <p className="font-semibold text-warm-text mb-1">📦 Delivery Estimate</p>
              <p className="text-warm-muted">Order today → arrives by <strong className="text-warm-text">Thu, Apr 18</strong></p>
              <p className="text-xs text-warm-muted mt-1">Free shipping on this order (over ₹999)</p>
            </div>

            {/* Categories */}
            {product.categories && product.categories.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold text-warm-muted uppercase tracking-wider">In:</span>
                {product.categories.map((cat) => (
                  <a key={cat.id} href={`/category/${cat.slug}`} className="badge bg-gray-100 text-warm-muted hover:bg-brand-50 hover:text-brand-600 transition-colors">
                    {cat.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Tabs ──────────────────────────────────────────────── */}
        <div className="mt-14">
          <div className="border-b border-warm-border flex gap-1 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-brand-500 text-brand-600"
                    : "border-transparent text-warm-muted hover:text-warm-text"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="py-8">
            {activeTab === "description" && product.description && (
              <div className="prose max-w-3xl text-sm text-warm-muted" dangerouslySetInnerHTML={{ __html: product.description }} />
            )}
            {activeTab === "description" && !product.description && (
              <p className="text-warm-muted text-sm">No description available.</p>
            )}
            {activeTab === "specs" && (
              <div className="max-w-md space-y-3">
                {[
                  { label: "SKU", value: product.sku || "—" },
                  { label: "Status", value: isInStock ? "In Stock" : "Out of Stock" },
                  { label: "Category", value: product.categories?.map((c) => c.name).join(", ") || "—" },
                ].map((row) => (
                  <div key={row.label} className="flex gap-4 py-2 border-b border-warm-border text-sm">
                    <span className="w-32 text-warm-muted font-medium">{row.label}</span>
                    <span className="text-warm-text">{row.value}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "shipping" && (
              <div className="prose prose-sm max-w-2xl text-warm-muted">
                <p><strong>Shipping:</strong> Free on orders over ₹999. Standard delivery in 3–5 days.</p>
                <p><strong>Returns:</strong> Easy 7-day returns. Contact support with your order number.</p>
                <p><strong>Exchanges:</strong> We offer free exchanges on size/defect issues.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Sticky Buy Bar (mobile) ──────────────────────────────── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-warm-border shadow-lg px-4 py-3 safe-area-pb">
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-warm-border rounded-xl overflow-hidden">
            <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="w-9 h-10 flex items-center justify-center hover:bg-gray-50">−</button>
            <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
            <button onClick={() => setQuantity((q) => q + 1)} className="w-9 h-10 flex items-center justify-center hover:bg-gray-50">+</button>
          </div>
          <div className="flex-1">
            <AddToCartButton product={product} quantity={quantity} size="md" className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

