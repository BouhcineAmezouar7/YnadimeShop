"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { montserrat } from "@/app/fonts";
import { formatPrice } from "@/data/products";
import {
  getStoredCart,
  saveStoredCart,
  type StoredCartItem,
} from "@/utils/cart";
import { toggleFavorite, isFavoriteProduct } from "@/utils/favorites";

const paymentMethods = [
  { name: "Mastercard", image: "/card/mastercard.png" },
  { name: "Visa", image: "/card/visa.png" },
  {
    name: "American Express",
    image: "/card/american-express.png",
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<StoredCartItem[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    function syncCart() {
      const items = getStoredCart();

      setCartItems(items);
      setFavoriteIds(
        items
          .filter((item) => isFavoriteProduct(item.id))
          .map((item) => item.id),
      );
      setIsLoading(false);
    }

    syncCart();

    window.addEventListener("storage", syncCart);

    return () => window.removeEventListener("storage", syncCart);
  }, []);

  function updateCartItems(
    update: (items: StoredCartItem[]) => StoredCartItem[],
  ) {
    const nextItems = update(getStoredCart());

    saveStoredCart(nextItems);
    setCartItems(nextItems);
  }

  function incrementQuantity(id: string) {
    updateCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }

  function decrementQuantity(id: string) {
    updateCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity - 1),
            }
          : item,
      ),
    );
  }

  function removeItem(id: string) {
    updateCartItems((items) => items.filter((item) => item.id !== id));
  }

  function handleFavorite(item: StoredCartItem) {
    const isFavorite = toggleFavorite(item);

    setFavoriteIds((previous) =>
      isFavorite
        ? [...previous.filter((id) => id !== item.id), item.id]
        : previous.filter((id) => id !== item.id),
    );
  }

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const shipping = cartItems.length > 0 ? 2 : 0;
  const tax = Math.round(subtotal * 0.02 * 100) / 100;
  const total = subtotal + shipping + tax;

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
          Cart
        </span>
      </nav>

      {/* Page header */}
      <header className="flex flex-wrap items-end justify-between gap-5 border-b border-neutral-200 py-10 lg:py-14">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#DB4444]">
            Your shopping bag
          </span>

          <h1
            className={`${montserrat.className} mt-4 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl`}
          >
            Shopping cart.
          </h1>

          <p className="mt-3 text-sm leading-6 text-neutral-500">
            Review your selected products before checkout.
          </p>
        </div>

        {!isLoading && (
          <span className="rounded-lg bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-600">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </span>
        )}
      </header>

      {/* Loading state */}
      {isLoading ? (
        <div
          role="status"
          aria-label="Loading shopping cart"
          className="mt-10 grid animate-pulse gap-8 lg:grid-cols-[1fr_360px]"
        >
          <div className="space-y-4">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="flex gap-5 rounded-xl border border-neutral-200 p-4"
              >
                <div className="size-28 shrink-0 rounded-lg bg-neutral-100" />

                <div className="flex-1 space-y-4 py-3">
                  <div className="h-4 w-2/3 rounded bg-neutral-100" />
                  <div className="h-3 w-1/3 rounded bg-neutral-100" />
                  <div className="h-8 w-24 rounded bg-neutral-100" />
                </div>
              </div>
            ))}
          </div>

          <div className="h-80 rounded-xl bg-neutral-100" />
        </div>
      ) : cartItems.length > 0 ? (
        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_400px] xl:gap-12">
          {/* Cart products */}
          <section className="min-w-0">
            <div className="mb-5 flex items-center justify-between">
              <h2
                className={`${montserrat.className} text-lg font-semibold tracking-tight text-neutral-900`}
              >
                Your items
              </h2>

              <span className="text-sm text-neutral-500">
                {cartItems.length}{" "}
                {cartItems.length === 1 ? "product" : "products"}
              </span>
            </div>

            <div className="space-y-4">
              {cartItems.map((item) => {
                const isFavorite = favoriteIds.includes(item.id);

                return (
                  <article
                    key={item.id}
                    className="flex gap-4 rounded-xl border border-neutral-200 bg-white p-3 transition-colors hover:border-neutral-300 sm:gap-5 sm:p-5"
                  >
                    {/* Product image */}
                    <div className="relative size-24 shrink-0 overflow-hidden rounded-lg bg-[#F5F5F5] sm:size-36">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 639px) 96px, 144px"
                        className="object-cover object-center"
                      />
                    </div>

                    {/* Product details */}
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="text-sm font-semibold leading-6 text-neutral-900 sm:text-base">
                            {item.name}
                          </h3>

                          <p className="mt-1 text-xs text-neutral-500 sm:text-sm">
                            Color: {item.color}
                          </p>

                          <p className="mt-2 text-sm font-medium text-neutral-500">
                            {formatPrice(item.price)} / unit
                          </p>
                        </div>

                        {/* Remove button */}
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove ${item.name} from cart`}
                          title="Remove item"
                          className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-red-50 hover:text-[#DB4444]"
                        >
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="size-5"
                          >
                            <path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 10v7M14 10v7" />
                          </svg>
                        </button>
                      </div>

                      {/* Quantity and total */}
                      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
                        <div className="flex items-center gap-2 sm:gap-3">
                          {/* Quantity selector */}
                          <div className="flex h-10 items-center overflow-hidden rounded-lg border border-neutral-200">
                            <button
                              type="button"
                              onClick={() => decrementQuantity(item.id)}
                              disabled={item.quantity <= 1}
                              aria-label={`Decrease quantity of ${item.name}`}
                              className="flex size-9 cursor-pointer items-center justify-center text-lg text-neutral-700 transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-30"
                            >
                              −
                            </button>

                            <span
                              aria-live="polite"
                              className="min-w-8 text-center text-sm font-medium tabular-nums"
                            >
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() => incrementQuantity(item.id)}
                              aria-label={`Increase quantity of ${item.name}`}
                              className="flex size-9 cursor-pointer items-center justify-center text-lg text-neutral-700 transition-colors hover:bg-neutral-100"
                            >
                              +
                            </button>
                          </div>

                          {/* Favorite button */}
                          <button
                            type="button"
                            onClick={() => handleFavorite(item)}
                            aria-pressed={isFavorite}
                            aria-label={
                              isFavorite
                                ? `Remove ${item.name} from favorites`
                                : `Add ${item.name} to favorites`
                            }
                            className={`flex size-10 cursor-pointer items-center justify-center rounded-lg border transition-colors ${
                              isFavorite
                                ? "border-[#DB4444]/20 bg-red-50 text-[#DB4444]"
                                : "border-neutral-200 text-neutral-500 hover:text-[#DB4444]"
                            }`}
                          >
                            <svg
                              aria-hidden="true"
                              viewBox="0 0 24 24"
                              fill={isFavorite ? "currentColor" : "none"}
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="size-5"
                            >
                              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" />
                            </svg>
                          </button>
                        </div>

                        <span className="text-base font-semibold tabular-nums text-neutral-950 sm:text-lg">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Continue shopping */}
            <Link
              href="/store"
              className="group mt-7 inline-flex items-center gap-3 text-sm font-medium text-neutral-600 transition-colors hover:text-[#DB4444]"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5 transition-transform group-hover:-translate-x-1"
              >
                <path d="M20 12H4m6-6-6 6 6 6" />
              </svg>
              Continue shopping
            </Link>
          </section>

          {/* Order summary */}
          <aside className="rounded-xl bg-[#F5F5F5] p-6 sm:p-8 lg:sticky lg:top-28">
            <h2
              className={`${montserrat.className} text-xl font-semibold tracking-tight text-neutral-950`}
            >
              Order summary
            </h2>

            <p className="mt-2 text-sm text-neutral-500">
              Review your order details.
            </p>

            {/* Price breakdown */}
            <dl className="mt-7 space-y-5 border-t border-neutral-200 pt-6">
              <div className="flex items-center justify-between gap-4 text-sm">
                <dt className="text-neutral-500">Subtotal</dt>

                <dd className="font-medium tabular-nums text-neutral-900">
                  {formatPrice(subtotal)}
                </dd>
              </div>

              <div className="flex items-center justify-between gap-4 text-sm">
                <dt className="text-neutral-500">Shipping</dt>

                <dd className="font-medium tabular-nums text-neutral-900">
                  {formatPrice(shipping)}
                </dd>
              </div>

              <div className="flex items-center justify-between gap-4 text-sm">
                <dt className="text-neutral-500">Tax (2%)</dt>

                <dd className="font-medium tabular-nums text-neutral-900">
                  {formatPrice(tax)}
                </dd>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between gap-4 border-t border-neutral-200 pt-6">
                <dt className="font-semibold text-neutral-900">Total</dt>

                <dd className="text-2xl font-semibold tracking-tight tabular-nums text-neutral-950">
                  {formatPrice(total)}
                </dd>
              </div>
            </dl>

            {/* Checkout button */}
            <Link
              href="/checkout"
              className="group mt-8 flex min-h-12 w-full items-center justify-center gap-3 rounded-lg bg-[#DB4444] px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#c33b3b]"
            >
              Proceed to checkout
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5 transition-transform group-hover:translate-x-1"
              >
                <path d="M4 12h16m-6-6 6 6-6 6" />
              </svg>
            </Link>

            {/* Payment methods */}
            <div className="mt-7 border-t border-neutral-200 pt-6">
              <p className="text-center text-xs font-medium text-neutral-500">
                Payment methods
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                {paymentMethods.map((method) => (
                  <div
                    key={method.name}
                    className="flex h-10 w-16 items-center justify-center rounded-md border border-neutral-200 bg-white"
                  >
                    <Image
                      src={method.image}
                      alt={method.name}
                      width={40}
                      height={28}
                      className="h-auto max-h-7 w-10 object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      ) : (
        /* Empty cart */
        <section className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-200 bg-neutral-50/50 px-6 py-20 text-center lg:py-28">
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
              <path d="M6 7h12l2 14H4L6 7Z" />
              <path d="M9 9V5a3 3 0 0 1 6 0v4" />
            </svg>
          </div>

          <h2
            className={`${montserrat.className} mt-7 text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl`}
          >
            Your cart is empty.
          </h2>

          <p className="mt-3 max-w-sm text-sm leading-7 text-neutral-500">
            Discover our collections and find something you love. Your next
            favorite product is waiting.
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
        </section>
      )}
    </main>
  );
}
