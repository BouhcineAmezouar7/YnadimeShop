import ProductGrid from "./ProductGrid";
import { products } from "@/data/products";
import { montserrat } from "@/app/fonts";
import ViewAllLink from "./ViewAllLink";

export default function ThisMonth() {
  const accessories = products
    .filter((product) => product.category === "Accessories")
    .slice(0, 4);

  return (
    <section className="w-full py-12 lg:py-16">
      {/* Section header */}
      <div className="container mx-auto mb-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#DB4444]">
              This month
            </span>

            <h2
              className={`${montserrat.className} mt-3 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl`}
            >
              Best-selling accessories
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-neutral-500">
              Discover our most popular accessories.
            </p>
          </div>

          <ViewAllLink
            href="/store?category=Accessories"
          />
        </div>
      </div>

      {/* Products */}
      {accessories.length > 0 ? (
        <ProductGrid items={accessories} showFavorite />
      ) : (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-dashed border-neutral-200 py-12 text-center">
            <p className="text-sm text-neutral-500">
              No accessories available at the moment.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
