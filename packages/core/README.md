# @storefuse/core

StoreFuse framework core - Runtime framework with config, types, and utilities.

## Installation

```bash
pnpm add @storefuse/core
```

## Usage

### Define Config

```typescript
import { defineStoreFuseConfig } from "@storefuse/core";

export default defineStoreFuseConfig({
  adapter: {
    name: "woo-rest",
    endpoint: process.env.WOO_URL!,
    keys: {
      consumerKey: process.env.WOO_KEY!,
      consumerSecret: process.env.WOO_SECRET!,
    },
  },
  modules: ["products", "cart", "checkout-redirect"],
  theme: {
    core: "@storefuse/theme-core",
    child: "./theme-child",
  },
  cache: {
    strategy: "next-fetch",
    revalidate: {
      product: 600,
      category: 1800,
      home: 300,
    },
  },
});
```

### Use Types

```typescript
import type { Product, StoreFuseAdapter } from "@storefuse/core";
```

## Exports

- **Types**: All TypeScript interfaces (Product, Category, Cart, etc.)
- **Adapter**: `StoreFuseAdapter` interface
- **Config**: `defineStoreFuseConfig()`, config validation
- **Theme**: `resolveThemeComponent()`
- **Cache**: Caching utilities
- **Events**: Event bus system

## Architecture

According to README.md Architecture Spec:
- Layer B component (Framework Core)
- Provides: Config loading, module loading, theme engine, unified API, caching, events
