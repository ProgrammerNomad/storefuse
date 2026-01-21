# Theme Customization Guide

## Overview

StoreFuse uses a **child theme system** that keeps your customizations safe across core updates. You can override any component from the core theme without modifying core files.

## How It Works

### The Registry Pattern

StoreFuse themes use a component registry pattern:

1. **Core Theme** (`@storefuse/theme-core`) exports a registry of all components
2. **Child Theme** (your custom theme) exports a registry with only the components you override
3. **Theme Engine** resolves components: **child first, then core fallback**

### Resolution Rule

```
If child theme has component → Use child version
Else → Use core version
```

This is implemented in [`@storefuse/core/theme-engine`](../packages/core/src/theme-engine/index.ts).

## Quick Start

### Option 1: Local Child Theme (Recommended for Learning)

Create a `theme-child` directory in your storefront app:

```bash
cd apps/storefront
mkdir -p theme-child/components
```

Create `theme-child/index.ts`:

```typescript
export const childThemeRegistry = {
  Header: () => import("./components/Header"),
};
```

Create `theme-child/components/Header.tsx`:

```tsx
export default function CustomHeader() {
  return (
    <header className="bg-purple-600 text-white py-4">
      <h1>My Custom Store</h1>
    </header>
  );
}
```

Update `storefuse.config.ts`:

```typescript
export default defineStoreFuseConfig({
  theme: {
    core: "@storefuse/theme-core",
    child: "./theme-child",
  },
  // ... rest of config
});
```

### Option 2: NPM Package (Recommended for Production)

Use `@storefuse/theme-child-template` as a starting point:

```bash
pnpm add @storefuse/theme-child-template
```

Or create your own package:

```bash
mkdir packages/themes/my-custom-theme
cd packages/themes/my-custom-theme
pnpm init
```

## Available Components

You can override any of these components from `@storefuse/theme-core`:

### Layout Components
- `Header` - Site header with logo and navigation
- `Footer` - Site footer
- `Navigation` - Main navigation menu
- `Logo` - Site logo
- `Container` - Content container wrapper
- `Grid` - CSS Grid layout component
- `Section` - Page section wrapper

### Product Components
- `ProductCard` - Product card in listings
- `ProductImage` - Product image with zoom/gallery
- `ProductGrid` - Grid of products
- `ProductList` - List view of products
- `ProductDetailPage` - Full product detail page

### Category Components
- `CategoryPage` - Category listing page

### Cart Components
- `AddToCartButton` - Add to cart button
- `CartItem` - Single cart item
- `CartSummary` - Cart totals and summary
- `CartPage` - Full cart page

### UI Components
- `Button` - Button component
- `Input` - Input field component
- `Badge` - Badge/label component
- `Price` - Price display with formatting

## Component Props

### Important: Keep Props Compatible

When overriding a component, maintain the same prop interface as the core component. This ensures compatibility with modules and other parts of the system.

Example - ProductCard props:

```typescript
interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: string;
    sale_price?: string;
    images: Array<{ src: string; alt: string }>;
    stock_status: string;
  };
}
```

## Styling Options

### Tailwind CSS (Recommended)

The core theme uses Tailwind CSS v3. You can:

1. Use Tailwind utilities directly in your components
2. Extend Tailwind config in `tailwind.config.js`
3. Override CSS variables in your global CSS

```tsx
export default function CustomHeader() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <h1 className="text-3xl font-bold">My Store</h1>
    </header>
  );
}
```

### CSS Modules

You can use CSS modules if you prefer:

```tsx
import styles from './Header.module.css';

export default function CustomHeader() {
  return (
    <header className={styles.header}>
      <h1>My Store</h1>
    </header>
  );
}
```

### Any CSS Solution

Child themes support any CSS approach:
- Styled Components
- Emotion
- Plain CSS
- CSS-in-JS

## Examples

### Example 1: Custom Header

```tsx
// theme-child/components/Header.tsx
import Link from "next/link";

export default function CustomHeader() {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">🛍️ My Store</h1>
          <nav className="flex gap-6">
            <Link href="/">Home</Link>
            <Link href="/shop">Shop</Link>
            <Link href="/cart">Cart</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
```

### Example 2: Custom ProductCard

```tsx
// theme-child/components/ProductCard.tsx
import Link from "next/link";
import { Price } from "@storefuse/theme-core"; // Reuse core components!

export default function CustomProductCard({ product }) {
  return (
    <Link href={`/product/${product.slug}`}>
      <div className="border-2 border-purple-200 rounded-2xl p-4 hover:border-purple-500">
        <img 
          src={product.images[0]?.src} 
          alt={product.name}
          className="w-full rounded-lg"
        />
        <h3 className="font-bold text-lg mt-4">{product.name}</h3>
        <Price value={product.price} className="text-purple-600 text-xl" />
      </div>
    </Link>
  );
}
```

### Example 3: Reusing Core Components

You can import and use core components in your child theme:

```tsx
import { Button, Price, Badge } from "@storefuse/theme-core";

export default function CustomProductCard({ product }) {
  return (
    <div className="custom-card">
      <Badge variant="sale">On Sale</Badge>
      <h3>{product.name}</h3>
      <Price value={product.price} />
      <Button>Add to Cart</Button>
    </div>
  );
}
```

## Registering Components

### Single Component

```typescript
// theme-child/index.ts
export const childThemeRegistry = {
  Header: () => import("./components/Header"),
};
```

### Multiple Components

```typescript
// theme-child/index.ts
export const childThemeRegistry = {
  Header: () => import("./components/Header"),
  Footer: () => import("./components/Footer"),
  ProductCard: () => import("./components/ProductCard"),
  AddToCartButton: () => import("./components/AddToCartButton"),
};
```

## Best Practices

### 1. Only Override What You Need

Don't copy all components. Only override the ones you want to customize. Everything else will use the core theme automatically.

❌ **Don't do this:**
```typescript
// Copying every single component
export const childThemeRegistry = {
  Header: () => import("./components/Header"),
  Footer: () => import("./components/Footer"),
  Navigation: () => import("./components/Navigation"),
  Logo: () => import("./components/Logo"),
  // ... 20 more components
};
```

✅ **Do this:**
```typescript
// Only override what you need
export const childThemeRegistry = {
  Header: () => import("./components/Header"),
  ProductCard: () => import("./components/ProductCard"),
};
```

### 2. Maintain Prop Compatibility

Keep the same prop interface as core components to ensure compatibility.

### 3. Use TypeScript

Get type safety by importing types from core:

```typescript
import type { Product } from "@storefuse/core";

interface ProductCardProps {
  product: Product;
}
```

### 4. Test After Updates

After updating `@storefuse/theme-core`, test your overridden components to ensure they still work.

### 5. Document Your Changes

Add comments explaining why you overrode a component:

```tsx
/**
 * Custom Header
 * 
 * Overrides core Header to:
 * - Add custom branding
 * - Include mega menu
 * - Add announcement bar
 */
export default function CustomHeader() {
  // ...
}
```

## Troubleshooting

### Component Not Updating

1. Check that the component is registered in `index.ts`
2. Restart your dev server
3. Clear Next.js cache: `rm -rf .next`

### Type Errors

Import types from core packages:

```typescript
import type { Product, Category } from "@storefuse/core";
```

### Component Not Found Error

Make sure you've registered the component in your child theme registry and the file exists.

## Architecture Benefits

✅ **Safe Updates** - Core package updates won't overwrite your customizations  
✅ **No Merge Conflicts** - Your files are separate from core  
✅ **Predictable Overrides** - Simple registry-based resolution  
✅ **Works on Vercel** - No filesystem magic, just module imports  
✅ **Type-Safe** - Full TypeScript support  
✅ **Flexible Styling** - Use Tailwind, CSS modules, or any CSS solution  

## Related Documentation

- [Main README](../README.md)
- [Core Theme Package](../packages/themes/theme-core/README.md)
- [Child Theme Template](../packages/themes/theme-child-template/README.md)
- [Theme Engine Source](../packages/core/src/theme-engine/index.ts)
