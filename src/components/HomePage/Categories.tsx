import Link from "next/link";
import { montserrat } from "@/app/fonts";
import ViewAllLink from "./ViewAllLink";

const categories = [
  {
    name: "Clothing",
    description: "Everyday style & footwear",
    count: 10,
    icon: (
      <path d="m16 3 5 3 2 5-4 2-2-3v11H7V10l-2 3-4-2 2-5 5-3a4 4 0 0 0 8 0Z" />
    ),
  },
  {
    name: "Accessories",
    description: "Complete your everyday look",
    count: 10,
    icon: (
      <>
        <rect x="7" y="5" width="10" height="14" rx="3" />
        <path d="M9 5V2h6v3M9 19v3h6v-3M12 9v3l2 1" />
      </>
    ),
  },
  {
    name: "Electronics",
    description: "Technology & everyday essentials",
    count: 10,
    icon: (
      <>
        <rect x="3" y="4" width="18" height="13" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </>
    ),
  },
];

export default function Categories() {
  return (
    <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      {/* Section header */}
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#DB4444]">
            Categories
          </span>

          <h2
            className={`${montserrat.className} mt-3 text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl`}
          >
            Shop by category
          </h2>

          <p className="mt-2 text-sm text-neutral-500">
            Explore our collection of everyday essentials.
          </p>
        </div>

        <ViewAllLink
          href="/store"
          className="hidden sm:inline-flex"
        />
      </div>

      {/* Category cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-5">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={`/store?category=${encodeURIComponent(category.name)}`}
            className="group relative flex flex-col justify-between gap-8 rounded-xl border border-neutral-200 bg-white p-5 transition-colors duration-300 hover:border-[#DB4444] sm:p-6 lg:p-7"
          >
            {/* Icon and arrow */}
            <div className="flex items-start justify-between">
              <div className="flex size-14 items-center justify-center rounded-lg bg-neutral-100 text-neutral-900 transition-colors duration-300 group-hover:bg-[#DB4444]/10 group-hover:text-[#DB4444]">
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-7"
                >
                  {category.icon}
                </svg>
              </div>

              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5 text-neutral-400 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#DB4444]"
              >
                <path d="M7 17 17 7M7 7h10v10" />
              </svg>
            </div>

            {/* Category information */}
            <div>
              <h3
                className={`${montserrat.className} text-lg font-semibold tracking-tight text-neutral-900`}
              >
                {category.name}
              </h3>

              <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">
                {category.description}
              </p>

              <span className="mt-4 inline-block text-xs font-medium text-[#DB4444]">
                {category.count} products
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile link */}
      <ViewAllLink
        href="/store"
        label="View all categories"
        className="mt-6 flex w-full sm:hidden"
      />
    </section>
  );
}
