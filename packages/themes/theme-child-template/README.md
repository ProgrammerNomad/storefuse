# @storefuse/theme-child-template

Child theme template for StoreFuse that allows safe overrides across core updates.

## Purpose

This package provides a template for creating custom child themes that override components from `@storefuse/theme-core` without modifying core files. Your customizations will persist even when you update StoreFuse core packages.

## How It Works

The child theme uses a **component registry pattern**:

1. Core theme exports a registry of all available components
2. Child theme exports a registry with only the components you want to override
3. StoreFuse resolves components: **child first, then fallback to core**

## Usage

### 1. Override a Component

Create a custom component in `src/components/`:

```tsx
// src/components/Header.tsx
export default function CustomHeader() {
  return (
    <header className="bg-purple-600 text-white">
      <h1>My Custom Header!</h1>
    </header>
  );
}
```

### 2. Register in Theme Registry

Add your component to the registry in `src/index.ts`:

```typescript
export const childThemeRegistry = {
  Header: () => import("./components/Header"),
  // Add more component overrides here
};
```

### 3. Configure in Your Storefront

Update `storefuse.config.ts`:

```typescript
export default defineStoreFuseConfig({
  theme: {
    core: "@storefuse/theme-core",
    child: "@storefuse/theme-child-template", // or your custom child theme
  },
  // ... rest of config
});
```

## Available Components to Override

You can override any component from `@storefuse/theme-core`:

- `Header`
- `Footer`
- `Navigation`
- `Logo`
- `ProductCard`
- `ProductImage`
- `ProductGrid`
- `ProductList`
- `ProductDetailPage`
- `CategoryPage`
- `AddToCartButton`
- `CartItem`
- `CartSummary`
- `CartPage`
- `Button`
- `Input`
- `Badge`
- `Price`
- `Container`
- `Grid`
- `Section`

## Styling

You can use:
- **Tailwind CSS** (recommended, same as core theme)
- **CSS Modules**
- **Plain CSS**
- **Any CSS-in-JS library**

## Best Practices

1. **Only override what you need** - Don't copy all components
2. **Keep component props compatible** - Match the core component's interface
3. **Use TypeScript** - Get type safety for component props
4. **Test after core updates** - Ensure your overrides still work

## Example: Full Component Override

```tsx
// src/components/ProductCard.tsx
import { Button, Price } from "@storefuse/theme-core";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: string;
    image?: string;
  };
}

export default function CustomProductCard({ product }: ProductCardProps) {
  return (
    <div className="border-4 border-pink-500 p-6 rounded-xl">
      {product.image && (
        <img src={product.image} alt={product.name} className="w-full rounded" />
      )}
      <h3 className="text-2xl font-bold mt-4">{product.name}</h3>
      <Price value={product.price} className="text-pink-600 text-xl" />
      <Button className="mt-4 bg-pink-500 hover:bg-pink-600">
        Add to Cart
      </Button>
    </div>
  );
}
```

## Benefits

✅ **Safe updates** - Core package updates won't break your customizations  
✅ **No merge conflicts** - Your files are separate from core  
✅ **Predictable overrides** - Simple registry-based resolution  
✅ **Works on Vercel** - No filesystem magic, just module imports  
✅ **Type-safe** - Full TypeScript support

## License

MIT
