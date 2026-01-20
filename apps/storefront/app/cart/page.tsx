export default function CartPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="bg-gray-50 rounded-lg p-12 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">
          Cart functionality will be available once the module system is integrated.
        </p>
        <a
          href="/shop"
          className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Continue Shopping
        </a>
      </div>

      <div className="mt-12 p-6 bg-yellow-50 rounded-lg">
        <p className="text-center text-yellow-900">
          <strong>Coming Soon:</strong> @storefuse/module-cart with local storage + WooCommerce sync
        </p>
      </div>
    </div>
  );
}
