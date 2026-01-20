export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">
          Welcome to StoreFuse
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Modern WooCommerce storefront powered by Next.js 16 + Tailwind v4
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/shop"
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Shop Now
          </a>
          <a
            href="https://github.com/ProgrammerNomad/storefuse"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-black px-6 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            View on GitHub
          </a>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-bold mb-2">Modular</h3>
            <p className="text-gray-600">
              Add or remove features like plugins. Cart, search, blog - install only what you need.
            </p>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-bold mb-2">Updatable Core</h3>
            <p className="text-gray-600">
              Update StoreFuse without breaking your customizations. Child themes keep your changes safe.
            </p>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-bold mb-2">Modern Stack</h3>
            <p className="text-gray-600">
              Next.js 16 App Router, Tailwind v4, TypeScript. Fast, SEO-friendly, developer-focused.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
        <p className="text-gray-600 mb-4">
          This is a demo storefront. Real products, cart, and checkout will be integrated soon.
        </p>
        <p className="text-sm text-gray-500">
          Currently in development - Phase 1
        </p>
      </section>
    </div>
  );
}
