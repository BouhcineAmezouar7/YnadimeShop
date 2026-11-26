import { type Product } from "@/data/products";
import ProductCard from "./ProductCard";

export default function ProductGrid({
  items,
  showFavorite = false,
}: {
  items: Product[];
  showFavorite?: boolean;
}) {
  return (
    <div className="container mx-auto grid grid-cols-2 gap-x-3 gap-y-7 px-4 sm:gap-x-5 sm:px-6 lg:grid-cols-4 lg:gap-x-6 lg:px-8">
      {items.map((product) => {
        return (
          <ProductCard
            key={product.id}
            product={product}
            showFavorite={showFavorite}
          />
        );
      })}
    </div>
  );
}
