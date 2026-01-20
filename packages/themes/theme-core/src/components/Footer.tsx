import Link from "next/link";

export interface FooterProps {
  siteName?: string;
  year?: number;
  className?: string;
}

/**
 * Footer Component - Core Theme
 * 
 * Main site footer.
 * Can be overridden by child themes.
 */
export default function Footer({
  siteName = "StoreFuse",
  year = new Date().getFullYear(),
  className = "",
}: FooterProps) {
  return (
    <footer className={`border-t mt-16 ${className}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold mb-4">{siteName}</h3>
            <p className="text-sm text-gray-600">
              Modern WooCommerce storefront powered by Next.js
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop" className="text-gray-600 hover:text-gray-900">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-gray-600 hover:text-gray-900">
                  Cart
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">About</h4>
            <p className="text-sm text-gray-600">
              Built with StoreFuse framework
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t text-center text-sm text-gray-600">
          © {year} {siteName}. Built with Next.js 16 + Tailwind v4
        </div>
      </div>
    </footer>
  );
}
