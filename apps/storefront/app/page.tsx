import Link from "next/link";
import { getAdapter } from "@/lib/adapter";
import type { Product } from "@storefuse/core";

const CATEGORIES = [
  { label: "Festive Decor", icon: "🪔", href: "/category/festive-decor", color: "bg-orange-50 hover:bg-orange-100" },
  { label: "Diyas & Lamps", icon: "✨", href: "/category/diyas", color: "bg-yellow-50 hover:bg-yellow-100" },
  { label: "Jewelry", icon: "💎", href: "/category/jewelry", color: "bg-pink-50 hover:bg-pink-100" },
  { label: "Gifts", icon: "🎁", href: "/category/gifts", color: "bg-purple-50 hover:bg-purple-100" },
  { label: "Home Decor", icon: "🏺", href: "/category/home-decor", color: "bg-teal-50 hover:bg-teal-100" },
  { label: "Kitchen", icon: "🥘", href: "/category/kitchen", color: "bg-green-50 hover:bg-green-100" },
];

const TRUST_ITEMS = [
  { icon: "🤝", title: "Handmade Quality", desc: "Every piece crafted by skilled artisans" },
  { icon: "🚚", title: "Fast Shipping", desc: "Delivered in 3–5 business days" },
  { icon: "🔒", title: "Secure Payments", desc: "SSL encrypted, 100% safe" },
  { icon: "↩", title: "Easy Returns", desc: "7-day no-questions-asked policy" },
];

async function getBestSellers(): Promise<Product[]> {
  try {
    const adapter = getAdapter();
    return await adapter.products.list({ orderby: "popularity", per_page: 4 } as any);
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const bestSellers = await getBestSellers();

  return (
    <div className="min-h-screen bg-warm-bg">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-brand-50 via-orange-50 to-warm-bg overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <span className="inline-block badge bg-brand-100 text-brand-600 mb-4">
              🪔 New Festive Collection 2026
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-warm-text leading-tight mb-6">
              Handcrafted decor for{" "}
              <span className="text-brand-500">modern homes</span>
            </h1>
            <p className="text-lg text-warm-muted mb-8 leading-relaxed max-w-xl">
              Discover artisan-made festive pieces, diyas, jewelry and home accents — 
              each one telling a story of craft and tradition.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/shop" className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-base">
                Shop Now
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/shop?sort=newest" className="btn-secondary inline-flex items-center gap-2 px-8 py-4 text-base">
                New Arrivals
              </Link>
            </div>
            <div className="flex items-center gap-6 mt-10 text-sm text-warm-muted">
              <span className="flex items-center gap-1.5">
                <span className="text-yellow-400">★★★★★</span>
                4.8/5 from 2,400+ reviews
              </span>
              <span>·</span>
              <span>Free shipping over ₹999</span>
            </div>
          </div>
        </div>
        {/* Decorative circles */}
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-brand-100 rounded-full opacity-40 blur-3xl pointer-events-none" />
        <div className="absolute right-32 bottom-10 w-48 h-48 bg-orange-200 rounded-full opacity-30 blur-2xl pointer-events-none" />
      </section>

      {/* ── Shop by Category ─────────────────────────────────────── */}
      <section className="container mx-auto px-4 md:px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-title">Shop by Category</h2>
          <Link href="/shop" className="text-sm font-medium text-brand-500 hover:text-brand-600 flex items-center gap-1">
            View all <span aria-hidden>→</span>
          </Link>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border border-transparent ${cat.color} transition-all duration-200 hover:border-warm-border hover:-translate-y-0.5`}
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className="text-xs font-semibold text-center text-warm-text leading-tight">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Best Sellers ─────────────────────────────────────────── */}
      {bestSellers.length > 0 && (
        <section className="container mx-auto px-4 md:px-6 py-4 pb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-title">Best Sellers</h2>
              <p className="text-warm-muted text-sm mt-1">Loved by thousands of customers</p>
            </div>
            <Link href="/shop?sort=popularity" className="text-sm font-medium text-brand-500 hover:text-brand-600 flex items-center gap-1">
              View all <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bestSellers.map((product) => {
              const image = product.images?.[0];
              const hasDiscount = product.regularPrice && product.regularPrice !== product.price;
              const discountPct = hasDiscount
                ? Math.round((1 - parseFloat(product.price.replace(/[^0-9.]/g, "")) / parseFloat(product.regularPrice!.replace(/[^0-9.]/g, ""))) * 100)
                : 0;
              return (
                <Link key={product.id} href={`/product/${product.slug}`} className="group card card-hover block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
                    {image ? (
                      <img
                        src={image.src}
                        alt={image.alt || product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-brand-50 to-orange-100 flex items-center justify-center">
                        <span className="text-4xl opacity-30">🪔</span>
                      </div>
                    )}
                    {hasDiscount && discountPct > 0 && (
                      <span className="absolute top-2.5 left-2.5 badge bg-red-500 text-white">
                        −{discountPct}%
                      </span>
                    )}
                    {product.stockStatus !== "instock" && (
                      <span className="absolute top-2.5 right-2.5 badge bg-gray-900 text-white">
                        Sold Out
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-warm-muted mb-1">⭐ 4.8 (120)</p>
                    <h3 className="text-sm font-semibold text-warm-text line-clamp-2 group-hover:text-brand-500 transition-colors min-h-[2.5rem]">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-bold text-warm-text">{product.price}</span>
                      {hasDiscount && (
                        <span className="text-xs text-warm-muted line-through">{product.regularPrice}</span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Trust Row ────────────────────────────────────────────── */}
      <section className="bg-white border-y border-warm-border py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {TRUST_ITEMS.map((item) => (
              <div key={item.title} className="text-center">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-sm text-warm-text mb-1">{item.title}</h3>
                <p className="text-xs text-warm-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews / Social Proof ───────────────────────────────── */}
      <section className="container mx-auto px-4 md:px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="section-title">What our customers say</h2>
          <p className="text-warm-muted mt-2">Trusted by 10,000+ happy customers</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Priya M.", rating: 5, text: "The karwa chauth set is absolutely beautiful. Quality is amazing and delivery was super fast!", product: "Karwa Chauth Set" },
            { name: "Anjali R.", rating: 5, text: "Gorgeous diyas, perfect for gifting. My family loved them. Will definitely order again.", product: "Handcrafted Diyas" },
            { name: "Sunita K.", rating: 4, text: "Lovely packaging and authentic quality. The festive decor pieces add such warmth to our home.", product: "Festive Decor Pack" },
          ].map((review) => (
            <div key={review.name} className="card p-6">
              <div className="flex items-center gap-1 mb-3 text-yellow-400 text-sm">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>
              <p className="text-sm text-warm-text leading-relaxed mb-4">"{review.text}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-warm-text">{review.name}</p>
                  <p className="text-xs text-warm-muted">Verified buyer</p>
                </div>
                <span className="text-xs text-warm-muted text-right">{review.product}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Newsletter ───────────────────────────────────────────── */}
      <section className="bg-brand-500 text-white">
        <div className="container mx-auto px-4 md:px-6 py-16 text-center">
          <h2 className="text-3xl font-bold mb-3">Get ₹100 off your first order</h2>
          <p className="text-brand-100 mb-8 max-w-md mx-auto">
            Subscribe to our newsletter for exclusive deals, new arrivals and festive offers.
          </p>
          <form className="flex gap-3 max-w-sm mx-auto" action="#">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-11 px-4 rounded-lg text-sm text-warm-text bg-white focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              type="submit"
              className="flex-shrink-0 h-11 px-5 bg-white text-brand-600 font-semibold text-sm rounded-lg hover:bg-brand-50 transition-colors"
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs text-brand-200 mt-4">No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  );
}
