"use client";

import { useState } from "react";
import { useThemeComponent } from "@storefuse/core";
import type { SearchResult } from "@storefuse/module-search";

export default function SearchPage() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Resolved through the theme engine - child theme can override any of these
  const Container = useThemeComponent("Container");
  const SearchBar = useThemeComponent("SearchBar");
  const SearchResults = useThemeComponent("SearchResults");

  const handleSearch = async (searchQuery: string) => {
    setIsLoading(true);
    setQuery(searchQuery);

    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!Container || !SearchBar || !SearchResults) return null;

  return (
    <Container>
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-8">Search Products</h1>
        <SearchBar onSearch={handleSearch} className="mb-12" />
        <SearchResults
          results={results}
          query={query}
          isLoading={isLoading}
        />
      </div>
    </Container>
  );
}
