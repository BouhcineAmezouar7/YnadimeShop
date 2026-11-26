import { notFound } from "next/navigation";
import ProductDetails from "@/components/ProductDetails";
import { getProduct, getRelatedProducts, products } from "@/data/products";

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.id,
  }));
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) notFound();

  return (
    <ProductDetails
      key={product.id}
      product={product}
      relatedProducts={getRelatedProducts(product)}
    />
  );
}
