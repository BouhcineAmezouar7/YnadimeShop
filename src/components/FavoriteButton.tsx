"use client";

import { useEffect, useState } from "react";
import {
  FAVORITES_UPDATED_EVENT,
  isFavoriteProduct,
  toggleFavorite,
  type FavoriteProduct,
} from "@/utils/favorites";

export default function FavoriteButton({
  product,
}: {
  product: FavoriteProduct;
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const updateState = () => setIsFavorite(isFavoriteProduct(product.id));
    updateState();
    window.addEventListener(FAVORITES_UPDATED_EVENT, updateState);
    return () => window.removeEventListener(FAVORITES_UPDATED_EVENT, updateState);
  }, [product.id]);

  return (
    <button
      type="button"
      onClick={() => setIsFavorite(toggleFavorite(product))}
      aria-label={isFavorite ? `Remove ${product.name} from favorites` : `Add ${product.name} to favorites`}
      aria-pressed={isFavorite}
      className="absolute right-3 top-3 z-20 rounded-full bg-white p-2 text-black shadow-sm transition-transform hover:scale-105"
    >
      <svg
        aria-hidden="true"
        className={`h-5 w-5 ${isFavorite ? "text-[#DB4444]" : "text-black"}`}
        fill={isFavorite ? "currentColor" : "none"}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
}
