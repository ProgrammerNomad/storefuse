import { getAdapter } from "@/lib/adapter";
import { notFound } from "next/navigation";
import ClientProductDetail from "./ClientProductDetail";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  
  try {
    const adapter = getAdapter();
    const product = await adapter.products.getBySlug(slug);

    if (!product) {
      notFound();
    }

    return <ClientProductDetail product={product} />;
  } catch (error) {
    console.error("Product page error:", error);
    notFound();
  }
}

// Generate static params for all products (optional, for build-time generation)
export async function generateStaticParams() {
  try {
    const adapter = getAdapter();
    const products = await adapter.products.list({ perPage: 100 });
    
    return products.map((product) => ({
      slug: product.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}
