import Link from "next/link";
import ProductGrid from "./ProductGrid";
import { products } from "@/data/products";
import { montserrat } from "@/app/fonts";
import ViewAllLink from "./ViewAllLink";

export default function OurProducts() {
  const featuredProducts = [
    ...products
      .filter((product) => product.category === "Clothing")
      .slice(0, 2),

    ...products
      .filter((product) => product.category === "Accessories")
      .slice(0, 2),

    ...products
      .filter((product) => product.category === "Electronics")
      .slice(0, 4),
  ];

  return (
    <section className="w-full py-12 lg:py-16">
      {/* Section header */}
      <div className="container mx-auto mb-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#DB4444]">
              Our collection
            </span>

            <h2
              className={`${montserrat.className} mt-3 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl`}
            >
              Explore our products
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-neutral-500">
              Discover everyday essentials, modern technology, and timeless
              accessories.
            </p>
          </div>

          <ViewAllLink
            href="/store"
          />
        </div>
      </div>

      {/* Product collection */}
      {featuredProducts.length > 0 ? (
        <ProductGrid items={featuredProducts} showFavorite />
      ) : (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-dashed border-neutral-200 py-12 text-center">
            <p className="text-sm text-neutral-500">
              No products available at the moment.
            </p>
          </div>
        </div>
      )}

      {/* Explore collection */}
      <div className="mt-10 flex justify-center px-4 lg:mt-12">
        <Link
          href="/store"
          className="group inline-flex min-h-12 items-center justify-center gap-4 rounded-lg bg-[#DB4444] px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#c33b3b]"
        >
          Explore all products
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4 transition-transform group-hover:translate-x-1"
          >
            <path d="M4 12h16m-6-6 6 6-6 6" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
