# Custom Child Theme

This is your custom child theme directory. Use it to override components from `@storefuse/theme-core`.

## How to Override a Component

### 1. Create your custom component

Create a new file in `components/`, for example `components/Header.tsx`:

```tsx
export default function MyCustomHeader() {
  return (
    <header className="bg-blue-600 text-white py-4">
      <div className="container mx-auto">
        <h1>My Custom Store</h1>
      </div>
    </header>
  );
}
```

### 2. Register it in `index.ts`

```typescript
export const childThemeRegistry = {
  Header: () => import("./components/Header"),
};
```

### 3. Update `storefuse.config.ts`

Make sure your config points to this child theme:

```typescript
theme: {
  core: "@storefuse/theme-core",
  child: "./theme-child", // ← this directory
}
```

## Available Components to Override

- Header
- Footer
- Navigation
- Logo
- ProductCard
- ProductImage
- ProductGrid
- ProductList
- ProductDetailPage
- CategoryPage
- AddToCartButton
- CartItem
- CartSummary
- CartPage
- Button
- Input
- Badge
- Price
- Container
- Grid
- Section

## Benefits

✅ Your changes are safe - core updates won't overwrite them  
✅ Only override what you need - everything else uses core theme  
✅ Full TypeScript support  
✅ Works with Tailwind CSS (or any styling solution)
