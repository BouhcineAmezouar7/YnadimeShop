"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { montserrat } from "@/app/fonts";
import ProductCard from "@/components/HomePage/ProductCard";
import { products, type Product } from "@/data/products";
import {
  FAVORITES_UPDATED_EVENT,
  getStoredFavorites,
  type FavoriteProduct,
} from "@/utils/favorites";

export default function FavoritePage() {
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const favoriteProducts = favorites
    .map((favorite) => products.find((product) => product.id === favorite.id))
    .filter((product): product is Product => product !== undefined);

  useEffect(() => {
    function updateFavorites() {
      setFavorites(getStoredFavorites() || []);
      setIsLoading(false);
    }

    updateFavorites();

    window.addEventListener(FAVORITES_UPDATED_EVENT, updateFavorites);

    window.addEventListener("storage", updateFavorites);

    return () => {
      window.removeEventListener(FAVORITES_UPDATED_EVENT, updateFavorites);

      window.removeEventListener("storage", updateFavorites);
    };
  }, []);

  return (
    <main className="container mx-auto min-h-[65vh] px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pb-24">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
        <Link
          href="/"
          className="text-neutral-500 transition-colors hover:text-[#DB4444]"
        >
          Home
        </Link>

        <span className="text-neutral-300">/</span>

        <span aria-current="page" className="font-medium text-neutral-900">
          Favorites
        </span>
      </nav>

      {/* Page header */}
      <header className="flex flex-wrap items-end justify-between gap-6 border-b border-neutral-200 py-10 lg:py-14">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#DB4444]">
            Your collection
          </span>

          <h1
            className={`${montserrat.className} mt-4 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl`}
          >
            My favorites.
          </h1>

          <p className="mt-3 max-w-md text-sm leading-6 text-neutral-500">
            Keep everything you love in one place and come back whenever
            you&apos;re ready.
          </p>
        </div>

        <Link
          href="/store"
          className="group inline-flex items-center justify-center gap-3 rounded-lg px-5 py-3 text-sm font-medium text-neutral-900 transition-colors hover:border-[#DB4444] hover:text-[#DB4444]"
        >
          Continue shopping
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
      </header>

      {/* Collection header */}
      <div className="flex items-center justify-between gap-4 py-7">
        <h2
          className={`${montserrat.className} text-lg font-semibold tracking-tight text-neutral-900`}
        >
          Saved products
        </h2>

        {!isLoading && (
          <span aria-live="polite" className="text-sm text-neutral-500">
            {favoriteProducts.length}{" "}
            {favoriteProducts.length === 1 ? "product" : "products"}
          </span>
        )}
      </div>

      {/* Loading skeleton */}
      {isLoading ? (
        <div
          role="status"
          aria-label="Loading favorites"
          className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4"
        >
          {Array.from({ length: 4 }, (_, index) => (
            <div
              key={index}
              className="animate-pulse overflow-hidden rounded-xl border border-neutral-200"
            >
              <div className="aspect-square bg-neutral-100" />

              <div className="space-y-3 p-4">
                <div className="h-3 w-1/3 rounded bg-neutral-100" />
                <div className="h-4 w-3/4 rounded bg-neutral-100" />
                <div className="h-4 w-1/4 rounded bg-neutral-100" />
                <div className="h-10 rounded-lg bg-neutral-100" />
              </div>
            </div>
          ))}
        </div>
      ) : favoriteProducts.length > 0 ? (
        /* Saved product grid */
        <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 lg:grid-cols-3 lg:gap-x-6 xl:grid-cols-4">
          {favoriteProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showFavorite
              imageSizes="(max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
            />
          ))}
        </div>
      ) : (
        /* Empty favorites */
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-200 bg-neutral-50/50 px-6 py-16 text-center sm:py-24">
          {/* Empty state icon */}
          <div className="flex size-20 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-800">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-9"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" />
            </svg>
          </div>

          <h2
            className={`${montserrat.className} mt-7 text-2xl font-semibold tracking-tight text-neutral-950`}
          >
            Nothing saved yet.
          </h2>

          <p className="mt-3 max-w-sm text-sm leading-7 text-neutral-500">
            Found something you love? Tap the heart icon on any product to save
            it to your favorites.
          </p>

          <Link
            href="/store"
            className="group mt-7 inline-flex min-h-12 items-center justify-center gap-4 rounded-lg bg-[#DB4444] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#c33b3b]"
          >
            Explore products
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
      )}
    </main>
  );
}
