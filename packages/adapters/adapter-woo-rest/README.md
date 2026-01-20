# @storefuse/adapter-woo-rest

WooCommerce REST API adapter for StoreFuse framework.

## Installation

```bash
pnpm add @storefuse/adapter-woo-rest
```

## Usage

### Basic Setup

```typescript
import { createWooRestAdapter } from "@storefuse/adapter-woo-rest";

const adapter = createWooRestAdapter({
  name: "woo-rest",
  endpoint: "https://your-store.com",
  keys: {
    consumerKey: "ck_your_consumer_key",
    consumerSecret: "cs_your_consumer_secret",
  },
  version: "wc/v3", // optional, defaults to wc/v3
});
```

### In StoreFuse Config

```typescript
// storefuse.config.ts
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
  // ... rest of config
});
```

## API

### Products

```typescript
// List products
const products = await adapter.products.list({
  page: 1,
  perPage: 10,
  category: "123",
  onSale: true,
});

// Get product by ID
const product = await adapter.products.getById("456");

// Get product by slug
const product = await adapter.products.getBySlug("my-product");
```

### Categories

```typescript
// List all categories
const categories = await adapter.categories.list();

// Get category by slug
const category = await adapter.categories.getBySlug("electronics");
```

### Search

```typescript
// Search products
const results = await adapter.search.query("laptop");
```

## Type Mapping

This adapter automatically maps WooCommerce REST API responses to StoreFuse types:

- `WC Product` → `StoreFuse Product`
- `WC Category` → `StoreFuse Category`
- Handles images, variations, attributes, etc.

## Error Handling

All methods throw descriptive errors:

```typescript
try {
  const product = await adapter.products.getById("123");
} catch (error) {
  console.error(error.message);
  // "Failed to get product 123: [404] Product not found"
}
```

## Requirements

- WooCommerce 3.0+
- REST API enabled
- Consumer Key and Secret (generated in WooCommerce → Settings → Advanced → REST API)

## Architecture

According to README.md:
- Implements `StoreFuseAdapter` interface
- Provides unified API for modules
- Maps WooCommerce data to StoreFuse types
- Handles authentication and errors
