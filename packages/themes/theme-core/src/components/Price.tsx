export interface PriceProps {
  price: string;
  regularPrice?: string;
  className?: string;
}

/**
 * Price Component - Core Theme
 * 
 * Displays product price with optional sale price.
 */
export default function Price({
  price,
  regularPrice,
  className = "",
}: PriceProps) {
  const isOnSale = regularPrice && regularPrice !== price;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-lg font-semibold">{price}</span>
      {isOnSale && (
        <span className="text-sm text-gray-500 line-through">{regularPrice}</span>
      )}
    </div>
  );
}
