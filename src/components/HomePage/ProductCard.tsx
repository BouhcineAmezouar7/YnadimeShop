import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "@/components/FavoriteButton";
import { formatPrice, getDiscount, type Product } from "@/data/products";
import AddToCartButton from "./AddToCartButton";

type ProductCardProps = {
  product: Product;
  showFavorite?: boolean;
  imageSizes?: string;
};

export default function ProductCard({
  product,
  showFavorite = false,
  imageSizes = "(max-width: 1023px) 50vw, 25vw",
}: ProductCardProps) {
  const discount = getDiscount(product);
  const onSale = discount > 0 && product.originalPrice > product.price;
  const href = `/productDetails/${product.id}`;

  return (
    <article className="group/card flex min-w-0 flex-col">
      <div className="group relative isolate overflow-hidden rounded-md border border-neutral-100 bg-[#f5f5f5]">
        <Link
          href={href}
          className="relative block aspect-square w-full focus-visible:outline-2 focus-visible:outline-[#DB4444]"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes={imageSizes}
            className="object-contain transition-transform duration-300 motion-safe:group-hover/card:scale-[1.04]"
          />
        </Link>
        {onSale && (
          <span className="pointer-events-none absolute left-2 top-2 rounded-sm bg-[#DB4444] px-2 py-1 text-[10px] font-semibold leading-none text-white sm:left-3 sm:top-3 sm:text-xs">
            -{discount}%
          </span>
        )}
        {showFavorite && (
          <FavoriteButton
            product={{
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              color: product.color,
            }}
          />
        )}
        <AddToCartButton
          product={{
            id: product.id,
            name: product.name,
            price: formatPrice(product.price),
            imageUrl: product.image,
            color: product.color,
          }}
        />
      </div>

      <div className="flex flex-1 flex-col gap-1.5 pt-3 sm:pt-4">
        <p className="truncate text-[10px] font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          {product.brand} · {product.category}
        </p>
        <Link
          href={href}
          className="focus-visible:outline-2 focus-visible:outline-[#DB4444]"
        >
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-neutral-900 transition-colors hover:text-[#DB4444] dark:text-neutral-900 sm:text-base">
            {product.name}
          </h3>
        </Link>
        {product.color && (
          <p className="truncate text-xs text-neutral-500 dark:text-neutral-400">
            {product.color}
          </p>
        )}
        <div className="mt-auto flex flex-wrap items-baseline gap-x-2 gap-y-1 pt-1">
          <span
            className={`text-sm font-semibold tabular-nums sm:text-base ${onSale ? "text-[#DB4444]" : "text-neutral-900 dark:text-white"}`}
          >
            {formatPrice(product.price)}
          </span>
          {onSale && (
            <span className="text-xs tabular-nums text-neutral-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        <div
          className="flex items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-400"
          aria-label={`${product.rating} out of 5 stars`}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-3.5 text-amber-500"
          >
            <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.9-6.2-3.3-6.2 3.3L7 14.2l-5-4.9 6.9-1L12 2Z" />
          </svg>
          <span className="font-medium tabular-nums">
            {product.rating.toFixed(1)}
          </span>
          <span className="text-neutral-500">/ 5</span>
        </div>
      </div>
    </article>
  );
}
