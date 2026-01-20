import { getAdapter } from "@/lib/adapter";
import { notFound } from "next/navigation";
import ClientCategoryPage from "./ClientCategoryPage";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Category({ params }: CategoryPageProps) {
  const { slug } = await params;
  
  try {
    const adapter = getAdapter();
    
    // Get category details
    const category = await adapter.categories.getBySlug(slug);
    if (!category) {
      notFound();
    }

    // Get products in this category
    const products = await adapter.products.list({
      category: category.id,
      perPage: 50,
    });

    return <ClientCategoryPage category={category} products={products} />;
  } catch (error) {
    console.error("Category page error:", error);
    notFound();
  }
}

// Generate static params for all categories (optional, for build-time generation)
export async function generateStaticParams() {
  try {
    const adapter = getAdapter();
    const categories = await adapter.categories.list({ perPage: 100 });
    
    return categories.map((category) => ({
      slug: category.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}
