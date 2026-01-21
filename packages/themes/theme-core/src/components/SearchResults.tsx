"use client";

import type { SearchResult } from "@storefuse/module-search";
import ProductCard from "./ProductCard";
import Grid from "./Grid";

export interface SearchResultsProps {
  results: SearchResult[];
  query: string;
  isLoading?: boolean;
  className?: string;
}

export function SearchResults({
  results,
  query,
  isLoading = false,
  className = "",
}: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <p className="text-gray-600">Searching...</p>
      </div>
    );
  }

  if (results.length === 0 && query) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <p className="text-gray-600">
          No results found for &quot;{query}&quot;
        </p>
      </div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <h2 className="text-2xl font-bold mb-6">
        Search Results for &quot;{query}&quot;
        <span className="text-gray-500 text-base ml-2">
          ({results.length} {results.length === 1 ? "result" : "results"})
        </span>
      </h2>
      <Grid>
        {results.map((result) => {
          // Convert SearchResult to Product format
          const product = {
            id: result.id.toString(),
            name: result.name,
            slug: result.slug,
            price: result.price.toString(),
            regularPrice: result.regularPrice.toString(),
            salePrice: result.salePrice?.toString() || undefined,
            images: result.image
              ? [{ id: "0", src: result.image, alt: result.name }]
              : [],
            categories: result.categories.map((name: string, i: number) => ({
              id: i.toString(),
              name,
              slug: name.toLowerCase().replace(/\s+/g, "-"),
            })),
            stockStatus: result.inStock ? ("instock" as const) : ("outofstock" as const),
            onSale: result.salePrice !== null,
          };

          return <ProductCard key={result.id} product={product} />;
        })}
      </Grid>
    </div>
  );
}
