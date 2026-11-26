"use client";

import { useEffect, useState } from "react";
import { addProductToCart } from "@/utils/cart";

type AddToCartButtonProps = {
  variant?: "overlay" | "inline";
  product: {
    id: string;
    name: string;
    price: string;
    imageUrl: string;
    color: string;
  };
};

export default function AddToCartButton({
  product,
  variant = "overlay",
}: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const timer = window.setTimeout(() => setAdded(false), 1400);
    return () => window.clearTimeout(timer);
  }, [added]);

  const handleAdd = () => {
    addProductToCart({
      id: product.id,
      name: product.name,
      price: Number(product.price.replace(/[^0-9.]/g, "")),
      image: product.imageUrl,
      color: product.color,
    });
    setAdded(true);
  };

  return (
    <button
      type="button"
      onClick={handleAdd}
      className={
        variant === "inline"
          ? "flex min-h-10 w-full items-center justify-center gap-2 rounded-md border border-neutral-200 px-2 py-2.5 text-xs font-semibold text-neutral-900 transition-colors hover:border-[#DB4444] hover:bg-[#DB4444] hover:text-white focus-visible:outline-2 focus-visible:outline-[#DB4444] dark:border-neutral-700 dark:text-white sm:text-sm"
          : "absolute bottom-0 left-0 z-10 w-full translate-y-0 bg-neutral-950 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#DB4444] sm:translate-y-full sm:group-hover:translate-y-0 sm:group-focus-within:translate-y-0"
      }
      aria-label={`Add ${product.name} to cart`}
    >
      {variant === "inline" && (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4 shrink-0"
        >
          <path
            d={
              added
                ? "m5 12 4 4L19 6"
                : "M3 3h2l3 12h11l3-9H6 M9 20h.01 M18 20h.01"
            }
          />
        </svg>
      )}
      <span aria-live="polite">
        {added ? "Added to cart ✓" : "Add to cart"}
      </span>
    </button>
  );
}
