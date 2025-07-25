// filepath: /media/bamezoua/PMG7/my/my-app/src/components/Carousel.tsx
"use client";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export default function Carousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const slides = [
    {
      src: "/iphone.png",
      text: "Professional Printing Services",
      tagline: "Maximum quality for your work",
      description:
        "We print on all types of media, from paper to vinyl with premium quality.",
    },
    {
      src: "/iphone.png",
      text: "Custom Design Solutions",
      tagline: "Creative solutions for businesses",
      description:
        "From business cards to large format printing, we've got you covered.",
    },
    {
      src: "/iphone.png",
      text: "Fast Turnaround Times",
      tagline: "Efficient service when you need it",
      description:
        "Rush orders and same-day printing options available for urgent needs.",
    },
  ];

  const categories = [
    { name: "Woman's Fashion", icon: "👗", hasSubmenu: true },
    { name: "Men's Fashion", icon: "👔", hasSubmenu: true },
    { name: "Electronics", icon: "📱", hasSubmenu: false },
    { name: "Home & Lifestyle", icon: "🏠", hasSubmenu: false },
    { name: "Medicine", icon: "💊", hasSubmenu: false },
    { name: "Sports & Outdoor", icon: "⚽", hasSubmenu: false },
    { name: "Baby's & Toys", icon: "🧸", hasSubmenu: false },
    { name: "Groceries & Pets", icon: "🛒", hasSubmenu: false },
    { name: "Health & Beauty", icon: "💄", hasSubmenu: false },
  ];

  // Track the current slide index
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect(); // Initial call to set the initial index

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <>
      {/* <div className="container mx-auto px-4 sm:px-6 lg:px-0"> */}
      <div className="w-full max-w-screen-2xl mx-auto overflow-hidden">
        <div className="xl:flex container mx-auto px-2 sm:px-4 md:px-6 lg:px-4 xl:px-6 gap-3 sm:gap-4 md:gap-6">
          {/* Sidebar Categories */}
          <div className="hidden xl:block w-64 flex-shrink-0">
            <div className="bg-white border-r-1 border-gray-400">
              <ul className="py-2 pt-10">
                {categories.map((category, index) => (
                  <li
                    key={index}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{category.icon}</span>
                        <span className="text-sm font-medium text-gray-700">
                          {category.name}
                        </span>
                      </div>
                      {category.hasSubmenu && (
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Carousel Section */}
          <div className="flex-1  overflow-hidden py-10">
            <div className="relative  h-[500px] md:h-[500px]">
              <div
                ref={emblaRef}
                className="embla overflow-hidden bg-gray-50 dark:bg-black px-4 py-6 md:px-8 md:py-5"
              >
                <div className="embla__container h-[500px] md:h-[500px] flex">
                  {slides.map((slide, index) => (
                    <div
                      key={index}
                      className="embla__slide relative flex-[0_0_100%]"
                    >
                      <div className="flex flex-col-reverse md:flex-row justify-between items-center h-full gap-4 md:gap-12 px-4 md:px-10">
                        <div className="text-center md:text-left max-w-xl md:px-8">
                          <p className="text-base lg:text-lg mb-2 text-gray-700 dark:text-neutral-400">
                            {slide.tagline}
                          </p>
                          <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                            {slide.text}
                          </h1>
                          <p className="text-base lg:text-xl text-gray-600 dark:text-neutral-400 mb-6">
                            {slide.description}
                          </p>
                          <button className=" text-white underline underline-offset-6 flex py-3 ">
                            Shop Now
                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6 ml-3"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                                />
                              </svg>
                            </span>
                          </button>
                        </div>

                        {/* Image Block - Handle missing images gracefully */}
                        <div className="h-[300px] md:h-[600px] w-full md:w-1/2 flex items-center justify-center">
                          <Image
                            src={slide.src}
                            alt={`${slide.text}`}
                            width={500}
                            height={400}
                            className="rounded-xl object-contain max-h-full"
                            priority={index === 0}
                            quality={90}
                            onError={(e) => {
                              // Fallback if image fails to load
                              const target = e.target as HTMLImageElement;
                              target.src = "/placeholder.png";
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation buttons positioned outside the carousel for better UI */}
              <button
                onClick={scrollPrev}
                aria-label="Previous slide"
                className="absolute grid place-items-center cursor-pointer left-4 top-1/2 -translate-y-1/2 rounded-full size-10 bg-gray-400/80 hover:bg-gray-500 text-white transition-colors z-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </button>

              <button
                onClick={scrollNext}
                aria-label="Next slide"
                className="absolute grid place-items-center  cursor-pointer right-4 top-1/2 -translate-y-1/2 rounded-full size-10 bg-gray-400/80 hover:bg-gray-500 text-white transition-colors z-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>

              {/* Dots indicator */}
              <div className="flex justify-center gap-2 mt-4">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === selectedIndex ? "bg-[#FF0000]" : "bg-gray-300"
                    }`}
                    onClick={() => emblaApi?.scrollTo(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Category Menu - Show on smaller screens */}
      <div className="xl:hidden container mx-auto items-center flex justify-center px-4 py-4">
        <div className="overflow-x-auto">
          <div className="flex space-x-4 pb-2">
            {categories.slice(0, 6).map((category, index) => (
              <div
                key={index}
                className="flex-shrink-0 bg-white rounded-lg px-3 py-2 border border-gray-200 cursor-pointer hover:bg-gray-50"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-sm">{category.icon}</span>
                  <span className="text-xs font-medium text-gray-700 whitespace-nowrap">
                    {category.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
