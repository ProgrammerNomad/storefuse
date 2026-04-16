"use client";

import { ThemeProvider, useThemeComponent } from "@storefuse/core";
import { CartProvider } from "@storefuse/module-cart";
import { coreThemeRegistry } from "@storefuse/theme-core";
import { childThemeRegistry } from "../theme-child";
import type { ReactNode } from "react";

interface StoreFuseShellProps {
  children: ReactNode;
  siteName?: string;
}

/**
 * Inner layout that resolves Header and Footer through the theme engine.
 * Child theme overrides core — all without touching core files.
 */
function InnerShell({ children, siteName = "StoreFuse" }: StoreFuseShellProps) {
  const Header = useThemeComponent("Header");
  const Footer = useThemeComponent("Footer");

  return (
    <>
      {Header && <Header siteName={siteName} />}
      <main className="min-h-screen">{children}</main>
      {Footer && <Footer siteName={siteName} />}
    </>
  );
}

/**
 * StoreFuseShell
 *
 * Client component that mounts ThemeProvider + CartProvider and renders
 * the resolved Header/Footer/children. Add this to app/layout.tsx instead
 * of importing Header/Footer directly.
 *
 * To activate a child theme component, add it to theme-child/index.ts:
 *   export const childThemeRegistry = {
 *     Header: () => import("./components/Header"),
 *   };
 */
export function StoreFuseShell({ children, siteName }: StoreFuseShellProps) {
  return (
    <ThemeProvider core={coreThemeRegistry} child={childThemeRegistry}>
      <CartProvider>
        <InnerShell siteName={siteName}>{children}</InnerShell>
      </CartProvider>
    </ThemeProvider>
  );
}
