import type { Metadata } from "next";
import "./globals.css";
import { StoreFuseShell } from "./StoreFuseShell";

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
        <StoreFuseShell siteName="StoreFuse">
          {children}
        </StoreFuseShell>
      </body>
    </html>
  );
}
