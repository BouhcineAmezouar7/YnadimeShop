"use client";

import Image from "next/image";
import { montserrat } from "@/app/fonts";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addProductToCart } from "@/utils/cart";
import { isFavoriteProduct, toggleFavorite } from "@/utils/favorites";
import { formatPrice, getDiscount, type Product } from "@/data/products";

export default function ProductDetails({
  product,
  relatedProducts,
}: {
  product: Product;
  relatedProducts: Product[];
}) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const onSale =
    product.originalPrice > product.price && getDiscount(product) > 0;
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsWishlisted(isFavoriteProduct(product.id));
    setQuantity(1);
    setSelectedSize(product.sizes[0]);
    setSelectedColor(product.colors[0].name);
    setAdded(false);
  }, [product]);

  const cartProduct = {
    id: `${product.id}-${selectedSize}-${selectedColor}`,
    name: `${product.name} (${selectedSize}, ${selectedColor})`,
    price: product.price,
    image: product.image,
    color: selectedColor,
  };

  const buyNow = () => {
    if (!product.inStock) return;
    addProductToCart(cartProduct, quantity);
    router.push("/card");
  };

  const addToCart = () => {
    if (!product.inStock) return;
    addProductToCart(cartProduct, quantity);
    setAdded(true);
  };

  useEffect(() => {
    if (!added) return;
    const timer = window.setTimeout(() => setAdded(false), 2000);
    return () => window.clearTimeout(timer);
  }, [added]);

  const handleWishlist = () => {
    setIsWishlisted(
      toggleFavorite({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        color: selectedColor,
      }),
    );
  };

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8">
      <nav
        className="flex flex-wrap items-center gap-2 py-7 text-sm font-medium text-neutral-600"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="text-neutral-400 hover:text-[#DB4444]">
          Home
        </Link>
        <span className="text-neutral-300">/</span>
        <Link
          href={`/store?category=${encodeURIComponent(product.category)}`}
          className="text-neutral-400 hover:text-[#DB4444]"
        >
          {product.category}
        </Link>
        <span className="text-neutral-300">/</span>
        <span>{product.name}</span>
      </nav>

      <section className="mb-14 grid items-start gap-8 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7 lg:sticky lg:top-6">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#F5F5F5]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover object-center"
            />
            {onSale && (
              <span className="absolute left-4 top-4 rounded-md bg-[#DB4444] px-3 py-1.5 text-xs font-semibold text-white">
                -{getDiscount(product)}%
              </span>
            )}
          </div>
          <p className="mt-3 text-xs leading-6 text-neutral-500">
            Product shown in its original {product.color.toLowerCase()} finish.
            Selected colors may differ from the image.
          </p>
        </div>

        <div className="min-w-0 lg:col-span-5 lg:py-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#DB4444]">
            {product.brand} · {product.category}
          </p>
          <h1
            className={`${montserrat.className} mt-3 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl`}
          >
            {product.name}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <div
              className="flex items-center"
              aria-label={`${product.rating} out of 5 stars`}
            >
              {Array.from({ length: 5 }, (_, index) => (
                <svg
                  key={index}
                  aria-hidden="true"
                  className={`h-4 w-4 ${index < Math.round(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {product.rating.toFixed(1)} ({product.reviews} reviews)
            </span>
            <span className="text-gray-300">|</span>
            <span
              className={`text-sm font-medium ${product.inStock ? "text-green-700" : "text-neutral-500"}`}
            >
              {product.inStock ? "In stock" : "Out of stock"}
            </span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-semibold text-gray-950">
              {formatPrice(product.price)}
            </span>
            {onSale && (
              <span className="text-base text-neutral-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <p className="mt-6 text-sm leading-7 text-gray-600">
            {product.description}
          </p>

          <div className="my-7 border-t border-gray-200" />

          <fieldset>
            <legend className="mb-3 text-sm font-semibold text-gray-950">
              Colour:{" "}
              <span className="font-normal text-gray-500">{selectedColor}</span>
            </legend>
            <div className="flex gap-3">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setSelectedColor(color.name)}
                  aria-label={`Select ${color.name}`}
                  aria-pressed={selectedColor === color.name}
                  className={`h-8 w-8 rounded-full border-2 ring-offset-2 ${selectedColor === color.name ? "border-white ring-2 ring-gray-900" : "border-gray-300"}`}
                  style={{ backgroundColor: color.value }}
                />
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-7">
            <legend className="mb-3 text-sm font-semibold text-gray-950">
              {product.sizeLabel}
            </legend>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  aria-pressed={selectedSize === size}
                  className={`min-w-12 rounded-md border px-3 py-2 text-sm font-medium ${selectedSize === size ? "border-[#DB4444] bg-[#DB4444]/5 text-[#DB4444]" : "border-gray-300 text-gray-700 hover:border-gray-500"}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-8 grid grid-cols-[auto_1fr_auto] gap-3">
            <div className="flex items-center rounded-lg border border-neutral-200">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                disabled={quantity === 1 || !product.inStock}
                className="px-3 py-3 hover:bg-gray-50 disabled:opacity-40"
              >
                −
              </button>
              <span className="min-w-9 border-x border-neutral-200 px-2 py-3 text-center text-sm">
                {quantity}
              </span>
              <button
                type="button"
                aria-label="Increase quantity"
                disabled={!product.inStock}
                onClick={() => setQuantity((value) => value + 1)}
                className="px-3 py-3 hover:bg-gray-50"
              >
                +
              </button>
            </div>
            <button
              type="button"
              onClick={addToCart}
              disabled={!product.inStock}
              className="min-h-12 rounded-lg bg-[#DB4444] px-3 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#c33b3b] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {!product.inStock
                ? "Out of stock"
                : added
                  ? "Added to cart ✓"
                  : "Add to cart"}
            </button>
            <button
              type="button"
              onClick={buyNow}
              disabled={!product.inStock}
              className="col-span-3 row-start-2 min-h-12 rounded-lg border border-neutral-900 px-5 py-3 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Buy now
            </button>
            <button
              type="button"
              onClick={handleWishlist}
              aria-label={
                isWishlisted ? "Remove from wishlist" : "Add to wishlist"
              }
              aria-pressed={isWishlisted}
              className={`rounded-lg border border-neutral-200 p-3 ${isWishlisted ? "bg-red-50 text-[#DB4444]" : "text-gray-600 hover:bg-gray-50"}`}
            >
              <svg
                className="h-5 w-5"
                fill={isWishlisted ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 0 0 0 6.364L12 20.364l7.682-7.682a4.5 4.5 0 0 0-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 0 0-6.364 0z"
                />
              </svg>
            </button>
          </div>

          <div className="mt-7 rounded-xl bg-[#F5F5F5] p-5">
            <div className="flex gap-3">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="size-6 shrink-0"
              >
                <path d="M1 4h15v12H1zM16 8h4l3 4v4h-7" />
                <circle cx="5" cy="18" r="2" />
                <circle cx="19" cy="18" r="2" />
              </svg>
              <div>
                <h2 className="text-sm font-semibold">Free delivery</h2>
                <p className="mt-1 text-xs text-gray-500">
                  Complimentary standard delivery on orders over $100.
                </p>
              </div>
            </div>
            <div className="my-4 border-t border-gray-200" />
            <div className="flex gap-3">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="size-6 shrink-0"
              >
                <path d="M3 12a9 9 0 1 1 3 7M3 5v7h7" />
              </svg>
              <div>
                <h2 className="text-sm font-semibold">30-day returns</h2>
                <p className="mt-1 text-xs text-gray-500">
                  Return unworn items in their original packaging within 30
                  days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-10 border-y border-neutral-200 py-12 md:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            Product highlights
          </h2>
          <ul className="mt-5 space-y-3 text-sm text-gray-600">
            {product.features.map((feature) => (
              <li key={feature} className="flex gap-3">
                <span className="text-[#DB4444]">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            Specifications
          </h2>
          <dl className="mt-5 divide-y divide-gray-100 text-sm">
            {product.specifications.map((spec) => (
              <div key={spec.label} className="grid grid-cols-2 gap-4 py-3">
                <dt className="text-gray-500">{spec.label}</dt>
                <dd className="font-medium text-gray-900">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#DB4444]">
              Discover more
            </p>
            <h2
              className={`${montserrat.className} mt-3 text-2xl font-semibold tracking-tight sm:text-3xl`}
            >
              You may also like
            </h2>
          </div>
          <Link
            href={`/store?category=${encodeURIComponent(product.category)}`}
            className="rounded-lg px-5 py-2.5 text-sm font-medium hover:text-[#DB4444]"
          >
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {relatedProducts.map((item) => (
            <Link
              key={item.id}
              href={`/productDetails/${item.id}`}
              className="group"
            >
              <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-50">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 1023px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <p className="mt-4 text-xs font-medium uppercase tracking-wide text-neutral-500">
                {item.brand}
              </p>
              <h3 className="mt-1 font-semibold group-hover:text-[#DB4444]">
                {item.name}
              </h3>
              <p className="mt-2 text-sm font-bold text-[#DB4444]">
                {formatPrice(item.price)}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
