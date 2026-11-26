import Image from "next/image";
import Link from "next/link";
import { montserrat } from "@/app/fonts";
import ViewAllLink from "./ViewAllLink";

const featuredItems = [
  {
    title: "MacBook Pro",
    category: "Technology",
    description: "Performance meets possibility.",
    image: "/mac.jpg",
    href: "/store?category=Electronics",
    className: "lg:col-span-2 lg:row-span-2",
    sizes: "(max-width: 1023px) 100vw, 50vw",
    large: true,
  },
  {
    title: "Women's Collection",
    category: "Clothing",
    description: "Discover your everyday style.",
    image: "/women.png",
    href: "/store?category=Clothing",
    className: "sm:col-span-2",
    sizes: "(max-width: 1023px) 100vw, 50vw",
    large: false,
  },
  {
    title: "PS5 Controller",
    category: "Gaming",
    description: "Elevate your gaming experience.",
    image: "/controller.jpg",
    href: "/store?category=Electronics",
    className: "",
    sizes: "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw",
    large: false,
  },
  {
    title: "Outdoor Cycling",
    category: "Lifestyle",
    description: "Ready for your next adventure.",
    image: "/bike.jpg",
    href: "/store",
    className: "",
    sizes: "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw",
    large: false,
  },
];

export default function Featured() {
  return (
    <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      {/* Section header */}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#DB4444]">
            Featured
          </span>

          <h2
            className={`${montserrat.className} mt-3 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl`}
          >
            New arrivals
          </h2>

          <p className="mt-2 text-sm text-neutral-500">
            Discover something new for your everyday life.
          </p>
        </div>

        <ViewAllLink
          href="/store"
        />
      </div>

      {/* Featured collection */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[270px] lg:grid-cols-4">
        {featuredItems.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={`group relative isolate flex min-h-[280px] flex-col justify-end overflow-hidden rounded-xl bg-neutral-950 sm:min-h-[300px] lg:min-h-0 ${item.className}`}
          >
            {/* Full-size product image */}
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes={item.sizes}
              className="object-cover object-center transition-transform duration-700 motion-safe:group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

            {/* Content */}
            <div
              className={`relative z-10 ${
                item.large ? "p-6 sm:p-8 lg:p-10" : "p-5 sm:p-6"
              }`}
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-300">
                {item.category}
              </span>

              <h3
                className={`${montserrat.className} mt-2 font-semibold tracking-tight text-white ${
                  item.large ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl"
                }`}
              >
                {item.title}
              </h3>

              <p className="mt-2 max-w-xs text-xs leading-relaxed text-neutral-300 sm:text-sm">
                {item.description}
              </p>

              <div className="mt-5 flex items-center gap-3 text-sm font-medium text-white">
                <span>Shop now</span>

                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M4 12h16m-6-6 6 6-6 6" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
