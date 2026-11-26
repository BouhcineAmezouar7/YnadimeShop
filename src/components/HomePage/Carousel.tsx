"use client";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    src: "/product/Electronics/orion-air-laptop.png",
    text: "Orion Air 14 Laptop",
    tagline: "New in Electronics",
    description:
      "Slim performance, a vivid display and all-day battery life for work and creativity.",
    href: "/productDetails/orion-air-laptop",
  },
  {
    src: "/product/Electronics/sonic-hush-headphones.png",
    text: "Hear More. Carry Less.",
    tagline: "Sonic Hush ANC Headphones",
    description:
      "Adaptive noise cancellation and detailed wireless sound in a comfortable over-ear design.",
    href: "/productDetails/sonic-hush-headphones",
  },
  {
    src: "/product/Electronics/luma-mirrorless-camera.png",
    text: "Create Without Limits",
    tagline: "Luma M5 Mirrorless Camera",
    description:
      "Fast autofocus, detailed stills and stabilised 4K video for creators on the move.",
    href: "/productDetails/luma-mirrorless-camera",
  },
];

const categories = [
  {
    name: "Women's Fashion",
    href: "/store?category=Clothing",
    path: "M9 3h6l2 5-2 4 5 9H4l5-9-2-4z",
  },
  {
    name: "Men's Fashion",
    href: "/store?category=Clothing",
    path: "M8 4l4 2 4-2 5 3-3 5-2-1v9H8v-9l-2 1-3-5z",
  },
  {
    name: "Electronics",
    href: "/store?category=Electronics",
    path: "M8 2h8v20H8z M11 18h2",
  },
  {
    name: "Watches",
    href: "/store?category=Accessories",
    path: "M9 2h6l1 5 M9 22h6l1-5 M12 9v3l2 2 M12 6a6 6 0 1 0 0 12 6 6 0 1 0 0-12",
  },
  {
    name: "Headphones",
    href: "/store?search=headphones",
    path: "M3 14v-2a9 9 0 0 1 18 0v2 M3 13h4v7H3z M17 13h4v7h-4z",
  },
  {
    name: "Sneakers",
    href: "/store?category=Clothing",
    path: "M3 9l5 3 3-5 4 7 6 2v4H3z M12 13l3-1",
  },
  {
    name: "Cameras",
    href: "/store?search=camera",
    path: "M3 6h5l2-3h4l2 3h5v14H3z M12 9a4 4 0 1 0 0 8 4 4 0 1 0 0-8",
  },
  {
    name: "Computers",
    href: "/store?search=orion",
    path: "M3 3h18v13H3z M12 16v5 M8 21h8",
  },
  {
    name: "Audio",
    href: "/store?search=sonic",
    path: "M3 9h4l5-5v16l-5-5H3z M16 8a6 6 0 0 1 0 8 M19 5a10 10 0 0 1 0 14",
  },
];

function Glyph({
  path,
  className = "size-5",
}: {
  path: string;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={path} />
    </svg>
  );
}

export default function Carousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (!emblaApi) return;
    const select = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", select);
    emblaApi.on("reInit", select);
    select();
    return () => {
      emblaApi.off("select", select);
      emblaApi.off("reInit", select);
    };
  }, [emblaApi]);
  useEffect(() => {
    if (
      !emblaApi ||
      paused ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const timer = window.setInterval(() => emblaApi.scrollNext(), 6000);
    return () => window.clearInterval(timer);
  }, [emblaApi, paused]);

  return (
    <section
      aria-label="Featured products and categories"
      className="container mx-auto px-4 py-6 sm:px-6 lg:py-8"
    >
      <div className="grid gap-6 xl:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="hidden border-r border-neutral-200 pr-5 xl:block">
          <h2 className="mb-4 px-3 text-xs font-semibold uppercase tracking-widest text-neutral-500">
            Browse categories
          </h2>
          <nav aria-label="Product categories" className="space-y-1">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-[#DB4444]"
              >
                <Glyph path={category.path} />
                <span className="flex-1">{category.name}</span>
                <Glyph
                  path="M9 18l6-6-6-6"
                  className="size-4 text-neutral-400"
                />
              </Link>
            ))}
          </nav>
        </aside>
        <div
          className="relative min-w-0 overflow-hidden rounded-xl bg-[#f5f5f5] text-neutral-900"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
          }}
        >
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex touch-pan-y">
              {slides.map((slide, index) => (
                <div
                  key={slide.href}
                  className="grid min-w-0 flex-[0_0_100%] items-center gap-4 px-6 pb-20 pt-8 sm:px-10 md:min-h-[430px] md:grid-cols-[1fr_1fr] lg:px-12"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${slides.length}`}
                  inert={index !== selectedIndex}
                >
                  <div className="max-w-md">
                    <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#DB4444]">
                      <span className="h-px w-6 bg-[#DB4444]" />
                      {slide.tagline}
                    </p>
                    <h2 className="text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
                      {slide.text}
                    </h2>
                    <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-600 sm:text-base">
                      {slide.description}
                    </p>
                    <Link
                      href={slide.href}
                      className="mt-6 inline-flex items-center gap-5 rounded-md bg-[#DB4444] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#bd3535]"
                    >
                      Shop now{" "}
                      <Glyph path="M4 12h16m-6-6 6 6-6 6" className="size-4" />
                    </Link>
                  </div>
                  <div className="relative mx-auto h-56 w-full max-w-[420px] md:h-[310px]">
                    <Image
                      src={slide.src}
                      alt={slide.tagline}
                      fill
                      sizes="(max-width: 767px) 85vw, (max-width: 1280px) 45vw, 420px"
                      className="object-contain"
                      priority={index === 0}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-x-6 bottom-5 flex items-center justify-between border-t border-neutral-200 pt-4 sm:inset-x-10 lg:inset-x-12">
            <div className="flex items-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === selectedIndex ? "true" : undefined}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className="grid h-8 place-items-center px-1"
                >
                  <span
                    className={`h-1.5 rounded-full transition-all ${index === selectedIndex ? "w-7 bg-[#DB4444]" : "w-2 bg-neutral-300"}`}
                  />
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="mr-2 text-xs tabular-nums text-neutral-500">
                0{selectedIndex + 1} / 0{slides.length}
              </span>
              {[true, false].map((prev) => (
                <button
                  key={String(prev)}
                  type="button"
                  aria-label={prev ? "Previous slide" : "Next slide"}
                  onClick={() =>
                    prev ? emblaApi?.scrollPrev() : emblaApi?.scrollNext()
                  }
                  className="grid size-9 place-items-center rounded-full border border-neutral-300 bg-white hover:border-[#DB4444] hover:text-[#DB4444]"
                >
                  <Glyph
                    path={prev ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"}
                    className="size-4"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <nav
        aria-label="Mobile product categories"
        className="mt-4 flex gap-2 overflow-x-auto pb-2 xl:hidden"
      >
        {categories.map((category) => (
          <Link
            key={category.name}
            href={category.href}
            className="flex shrink-0 items-center gap-2 rounded-md border border-neutral-200 px-3 py-2 text-xs text-neutral-700 hover:text-[#DB4444]"
          >
            <Glyph path={category.path} className="size-4" />
            {category.name}
          </Link>
        ))}
      </nav>
    </section>
  );
}
