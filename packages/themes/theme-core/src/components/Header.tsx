import Link from "next/link";

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
            <Link href="/cart" className="hover:text-gray-600 transition">
              Cart
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
