/**
 * StoreFuse Core Theme
 * 
 * Provides base theme components that can be overridden by child themes.
 * Follows README Theme Engine specification.
 */

// Theme registry
export const coreThemeRegistry = {
  Header: () => import("./components/Header"),
  Footer: () => import("./components/Footer"),
  Navigation: () => import("./components/Navigation"),
  Logo: () => import("./components/Logo"),
  ProductCard: () => import("./components/ProductCard"),
  ProductImage: () => import("./components/ProductImage"),
  ProductGrid: () => import("./components/ProductGrid"),
  ProductList: () => import("./components/ProductList"),
  ProductDetailPage: () => import("./components/ProductDetailPage"),
  CategoryPage: () => import("./components/CategoryPage"),
  AddToCartButton: () => import("./components/AddToCartButton"),
  CartItem: () => import("./components/CartItem"),
  CartSummary: () => import("./components/CartSummary"),
  CartPage: () => import("./components/CartPage"),
  Button: () => import("./components/Button"),
  Input: () => import("./components/Input"),
  Badge: () => import("./components/Badge"),
  Price: () => import("./components/Price"),
  Container: () => import("./components/Container"),
  Grid: () => import("./components/Grid"),
  Section: () => import("./components/Section"),
};

export type ThemeRegistry = typeof coreThemeRegistry;
export type ThemeKey = keyof ThemeRegistry;

// Export all components
export { default as Header } from "./components/Header";
export { default as Footer } from "./components/Footer";
export { default as Navigation } from "./components/Navigation";
export { default as Logo } from "./components/Logo";
export { default as ProductCard } from "./components/ProductCard";
export { default as ProductImage } from "./components/ProductImage";
export { default as ProductGrid } from "./components/ProductGrid";
export { default as ProductList } from "./components/ProductList";
export { default as ProductDetailPage } from "./components/ProductDetailPage";
export { default as CategoryPage } from "./components/CategoryPage";
export { default as AddToCartButton } from "./components/AddToCartButton";
export { default as CartItem } from "./components/CartItem";
export { default as CartSummary } from "./components/CartSummary";
export { default as CartPage } from "./components/CartPage";
export { default as Button } from "./components/Button";
export { default as Input } from "./components/Input";
export { default as Badge } from "./components/Badge";
export { default as Price } from "./components/Price";
export { default as Container } from "./components/Container";
export { default as Grid } from "./components/Grid";
export { default as Section } from "./components/Section";

// Export types
export type { HeaderProps } from "./components/Header";
export type { FooterProps } from "./components/Footer";
export type { NavigationProps } from "./components/Navigation";
export type { LogoProps } from "./components/Logo";
export type { ProductCardProps } from "./components/ProductCard";
export type { ProductImageProps } from "./components/ProductImage";
export type { ProductGridProps } from "./components/ProductGrid";
export type { ProductListProps } from "./components/ProductList";
export type { ProductDetailPageProps } from "./components/ProductDetailPage";
export type { CategoryPageProps } from "./components/CategoryPage";
export type { AddToCartButtonProps } from "./components/AddToCartButton";
export type { CartItemProps } from "./components/CartItem";
export type { CartSummaryProps } from "./components/CartSummary";
export type { CartPageProps } from "./components/CartPage";
export type { ButtonProps } from "./components/Button";
export type { InputProps } from "./components/Input";
export type { BadgeProps } from "./components/Badge";
export type { PriceProps } from "./components/Price";
export type { ContainerProps } from "./components/Container";
export type { GridProps } from "./components/Grid";
export type { SectionProps } from "./components/Section";
