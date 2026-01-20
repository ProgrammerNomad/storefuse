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
export type { ButtonProps } from "./components/Button";
export type { InputProps } from "./components/Input";
export type { BadgeProps } from "./components/Badge";
export type { PriceProps } from "./components/Price";
export type { ContainerProps } from "./components/Container";
export type { GridProps } from "./components/Grid";
export type { SectionProps } from "./components/Section";
