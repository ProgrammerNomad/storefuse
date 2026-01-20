export default function ShopPage() {
  // Mock products for now
  const products = [
    {
      id: 1,
      name: "Premium T-Shirt",
      price: "$29.99",
      image: "https://via.placeholder.com/300x400/000000/FFFFFF?text=Product+1",
    },
    {
      id: 2,
      name: "Classic Hoodie",
      price: "$49.99",
      image: "https://via.placeholder.com/300x400/333333/FFFFFF?text=Product+2",
    },
    {
      id: 3,
      name: "Sport Sneakers",
      price: "$79.99",
      image: "https://via.placeholder.com/300x400/666666/FFFFFF?text=Product+3",
    },
    {
      id: 4,
      name: "Denim Jeans",
      price: "$59.99",
      image: "https://via.placeholder.com/300x400/999999/FFFFFF?text=Product+4",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Shop</h1>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.price}</p>
              <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-blue-50 rounded-lg">
        <p className="text-center text-blue-900">
          <strong>Note:</strong> These are placeholder products. Real WooCommerce integration coming in Phase 1.
        </p>
      </div>
    </div>
  );
}
