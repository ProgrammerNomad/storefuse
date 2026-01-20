import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StoreFuse - WooCommerce + Next.js",
  description: "Modern storefront powered by StoreFuse framework",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <header className="border-b">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center justify-between">
              <div className="text-2xl font-bold">StoreFuse</div>
              <div className="flex gap-6">
                <a href="/" className="hover:text-gray-600">Home</a>
                <a href="/shop" className="hover:text-gray-600">Shop</a>
                <a href="/cart" className="hover:text-gray-600">Cart</a>
              </div>
            </nav>
          </div>
        </header>
        
        <main className="min-h-screen">
          {children}
        </main>
        
        <footer className="border-t mt-12">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center text-gray-600">
              <p>&copy; 2026 StoreFuse. Built with Next.js 16 + Tailwind v4</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
