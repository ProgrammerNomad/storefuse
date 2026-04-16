import Link from "next/link";

export interface FooterProps {
  siteName?: string;
  year?: number;
  className?: string;
}

export default function Footer({
  siteName = "StoreFuse",
  year = new Date().getFullYear(),
  className = "",
}: FooterProps) {
  return (
    <footer className={`bg-white border-t border-warm-border mt-20 ${className}`}>
      {/* Trust bar */}
      <div className="border-b border-warm-border bg-warm-bg">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "🚚", title: "Free Shipping", desc: "On orders over ₹999" },
              { icon: "↩", title: "Easy Returns", desc: "7-day hassle-free returns" },
              { icon: "🔒", title: "Secure Payment", desc: "100% protected checkout" },
              { icon: "🤝", title: "Handmade Quality", desc: "Authentic artisan products" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="font-semibold text-sm text-warm-text">{item.title}</p>
                  <p className="text-xs text-warm-muted mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-xl font-bold text-warm-text hover:text-brand-500 transition-colors">
              {siteName}
            </Link>
            <p className="mt-3 text-sm text-warm-muted leading-relaxed">
              Handcrafted festive decor and lifestyle products, delivered with care.
            </p>
            <div className="flex items-center gap-3 mt-4">
              {[
                { label: "Instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
                { label: "Facebook", path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
              ].map((social) => (
                <button key={social.label} aria-label={social.label} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-brand-50 hover:text-brand-500 transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d={social.path} />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold text-sm text-warm-text mb-4 uppercase tracking-wider">Shop</h4>
            <ul className="space-y-3">
              {[
                { label: "All Products", href: "/shop" },
                { label: "New Arrivals", href: "/shop?sort=newest" },
                { label: "Best Sellers", href: "/shop?sort=popularity" },
                { label: "Sale", href: "/shop?on_sale=true" },
                { label: "Festive Collection", href: "/category/festive-decor" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-warm-muted hover:text-brand-500 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-semibold text-sm text-warm-text mb-4 uppercase tracking-wider">Help</h4>
            <ul className="space-y-3">
              {[
                { label: "FAQ", href: "/faq" },
                { label: "Shipping Policy", href: "/shipping" },
                { label: "Returns & Refunds", href: "/returns" },
                { label: "Track Order", href: "/track" },
                { label: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-warm-muted hover:text-brand-500 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-sm text-warm-text mb-4 uppercase tracking-wider">Stay in touch</h4>
            <p className="text-sm text-warm-muted mb-3">Get exclusive offers and new arrivals straight to your inbox.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 min-w-0 h-9 px-3 text-sm border border-warm-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400 bg-warm-bg"
              />
              <button
                type="submit"
                className="flex-shrink-0 h-9 px-3 bg-brand-500 text-white text-sm font-medium rounded-lg hover:bg-brand-600 transition-colors"
              >
                Join
              </button>
            </form>
            <p className="text-xs text-warm-muted mt-2">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-warm-border">
        <div className="container mx-auto px-4 md:px-6 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-warm-muted">
              © {year} {siteName}. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms", href: "/terms" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="text-xs text-warm-muted hover:text-brand-500 transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
            {/* Payment badges */}
            <div className="flex items-center gap-2">
              {["Visa", "MC", "UPI", "RazorPay"].map((pm) => (
                <span key={pm} className="text-[10px] font-semibold bg-gray-100 text-warm-muted px-2 py-1 rounded">
                  {pm}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
