import ProductGrid from "./ProductGrid";
import { products } from "@/data/products";
import ViewAllLink from "./ViewAllLink";

export default function Card() {
  return (
    <div className="mt-5 min-w-0 sm:mt-6">
      <ProductGrid items={products.slice(0, 4)} showFavorite />
      <div className="container mx-auto mt-7 flex justify-center px-4 sm:hidden">
        <ViewAllLink
          href="/store"
          label="View all products"
          className="w-full dark:border-neutral-700 dark:text-white"
        />
      </div>
    </div>
  );
}
