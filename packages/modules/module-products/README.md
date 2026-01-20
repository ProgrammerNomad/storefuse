# @storefuse/module-products

Product display module for StoreFuse - provides components and pages for product listings, details, and categories.

## Features

- ✅ Product display components (ProductCard, ProductGrid, ProductList)
- ✅ Product image optimization with Next.js Image
- ✅ Price display with sale price support
- ✅ Page contributions (shop, product detail, category)
- ✅ Module system integration
- ✅ TypeScript support

## Installation

```bash
pnpm add @storefuse/module-products
```

## Usage

### Enable in Config

```typescript
// storefuse.config.ts
import { defineStoreFuseConfig } from "@storefuse/core";

export default defineStoreFuseConfig({
  // ...
  modules: ["products"],
});
```

### Use Components

```tsx
import { ProductGrid, ProductCard } from "@storefuse/module-products";

// In your page
<ProductGrid products={products} onAddToCart={handleAddToCart} columns={4} />

// Or individual cards
<ProductCard product={product} onAddToCart={handleAddToCart} />
```

### Module Definition

```typescript
import { ProductsModule } from "@storefuse/module-products";

// Module provides:
// - Pages: /shop, /product/[slug], /category/[slug]
// - Components: ProductCard, ProductGrid, ProductList, ProductImage, Price
// - Settings: productsPerPage, showOutOfStock, defaultSort
```

## Components

### ProductCard

Displays a single product with image, name, price, and add to cart button.

```tsx
<ProductCard product={product} onAddToCart={handleAddToCart} />
```

### ProductGrid

Responsive grid layout for products.

```tsx
<ProductGrid products={products} columns={4} />
```

### ProductList

Vertical list layout for products.

```tsx
<ProductList products={products} />
```

### ProductImage

Optimized product image using Next.js Image.

```tsx
<ProductImage product={product} width={300} height={400} />
```

### Price

Price display with sale price styling.

```tsx
<Price price={product.price} regularPrice={product.regularPrice} />
```

## Pages

The module contributes the following pages:

- `/shop` - Shop page with all products
- `/product/[slug]` - Product detail page
- `/category/[slug]` - Category page with filtered products

## Settings

```typescript
{
  productsPerPage: 12,
  showOutOfStock: true,
  defaultSort: "menu_order"
}
```

## License

MIT
