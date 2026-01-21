# StoreFuse Demo Storefront

Demo storefront application built with Next.js 16 and Tailwind v3.

## Tech Stack

- **Next.js 16** - React framework with App Router
- **Tailwind CSS v3** - Utility-first CSS framework
- **TypeScript** - Type safety
- **React 19** - UI library

## Getting Started

1. Install dependencies:
```bash
pnpm install
```

2. Copy environment variables:
```bash
cp .env.example .env.local
```

3. Configure your WooCommerce credentials in `.env.local`

4. Run development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
storefront/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── shop/              # Shop pages
│   ├── cart/              # Cart page
│   └── globals.css        # Global styles
├── components/            # React components (coming soon)
├── lib/                   # Utilities (coming soon)
├── public/                # Static assets
└── package.json
```

## Current Status

This is a demo storefront with:
- ✅ Next.js 16 setup
- ✅ Tailwind v3 configuration
- ✅ Basic routing (home, shop, cart)
- ✅ Responsive layout
- ⏳ WooCommerce integration (coming in Phase 1)
- ⏳ Module system integration (coming in Phase 1)

## Next Steps

1. Integrate `@storefuse/core`
2. Add `@storefuse/adapter-woo-rest`
3. Implement `@storefuse/module-products`
4. Add `@storefuse/theme-core` components
