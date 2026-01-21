import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer } from "@storefuse/theme-core";
import { CartProvider } from "@storefuse/module-cart";

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
        <CartProvider>
          <Header siteName="StoreFuse" />
          
          <main className="min-h-screen">
            {children}
          </main>
          
          <Footer siteName="StoreFuse" />
        </CartProvider>
      </body>
    </html>
  );
}
