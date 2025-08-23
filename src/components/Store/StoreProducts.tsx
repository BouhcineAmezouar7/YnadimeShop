"use client";
import React, { useState } from "react";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Nike Air MX Super 2500",
    color: "Red",
    price: "$449",
    originalPrice: "$699",
    discount: "39%",
    rating: 5.0,
    numericPrice: 449,
    imageUrl:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg",
  },
  {
    id: 2,
    name: "Adidas Running Shoes",
    color: "Aspen White",
    price: "$299",
    originalPrice: "$399",
    discount: "25%",
    rating: 4.8,
    numericPrice: 299,
    imageUrl:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg",
  },
  {
    id: 3,
    name: "Classic Sneakers",
    color: "Charcoal",
    price: "$189",
    originalPrice: "$250",
    discount: "24%",
    rating: 4.6,
    numericPrice: 189,
    imageUrl:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg",
  },
  {
    id: 4,
    name: "Sport Shoes",
    color: "Black",
    price: "$329",
    originalPrice: "$450",
    discount: "27%",
    rating: 4.9,
    numericPrice: 329,
    imageUrl:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg",
  },
  {
    id: 5,
    name: "Nike Air MX Super 2500",
    color: "Red",
    price: "$449",
    originalPrice: "$699",
    discount: "39%",
    rating: 5.0,
    numericPrice: 449,
    imageUrl:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg",
  },
  {
    id: 6,
    name: "Adidas Running Shoes",
    color: "Aspen White",
    price: "$299",
    originalPrice: "$399",
    discount: "25%",
    rating: 4.8,
    numericPrice: 299,
    imageUrl:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg",
  },
  {
    id: 7,
    name: "Classic Sneakers",
    color: "Charcoal",
    price: "$189",
    originalPrice: "$250",
    discount: "24%",
    rating: 4.6,
    numericPrice: 189,
    imageUrl:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg",
  },
  {
    id: 8,
    name: "Sport Shoes",
    color: "Black",
    price: "$329",
    originalPrice: "$450",
    discount: "27%",
    rating: 4.9,
    numericPrice: 329,
    imageUrl:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg",
  },
  {
    id: 9,
    name: "Nike Air MX Super 2500",
    color: "Red",
    price: "$449",
    originalPrice: "$699",
    discount: "39%",
    rating: 5.0,
    numericPrice: 449,
    imageUrl:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg",
  },
  {
    id: 10,
    name: "Adidas Running Shoes",
    color: "Aspen White",
    price: "$299",
    originalPrice: "$399",
    discount: "25%",
    rating: 4.8,
    numericPrice: 299,
    imageUrl:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg",
  },
  {
    id: 11,
    name: "Classic Sneakers",
    color: "Charcoal",
    price: "$189",
    originalPrice: "$250",
    discount: "24%",
    rating: 4.6,
    numericPrice: 189,
    imageUrl:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg",
  },
  {
    id: 12,
    name: "Sport Shoes",
    color: "Black",
    price: "$329",
    originalPrice: "$450",
    discount: "27%",
    rating: 4.9,
    numericPrice: 329,
    imageUrl:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg",
  },
];

export default function StoreProducts() {
  const [sortBy, setSortBy] = useState("default");
  const [sortedProducts, setSortedProducts] = useState(products);

  const StarIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
      className="h-4 w-4 text-yellow-500"
    >
      <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
    </svg>
  );

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortBy(value);

    let sorted = [...products];

    switch (value) {
      case "price-low-high":
        sorted.sort((a, b) => a.numericPrice - b.numericPrice);
        break;
      case "price-high-low":
        sorted.sort((a, b) => b.numericPrice - a.numericPrice);
        break;
      case "name-a-z":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-z-a":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        sorted = products; // Default order
        break;
    }

    setSortedProducts(sorted);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mt-3">
        {/* Display count */}
        <h1 className="text-neutral-400 text-sm">
          Showing {Math.min(8, sortedProducts.length)} of{" "}
          {sortedProducts.length} Products
        </h1>

        {/* Sort dropdown */}
        <div className="border border-gray-300 rounded px-2 py-1">
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="px-2 py-1 text-sm focus:outline-none bg-white"
          >
            <option value="default">Sort By: Default</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="name-a-z">Name: A to Z</option>
            <option value="name-z-a">Name: Z to A</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        {sortedProducts.slice(0, 12).map((product) => (
          <div
            key={product.id}
            className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg p-3"
          >
            <div className="relative flex h-full flex-col justify-between rounded-lg bg-gray-50 p-4">
              <Link
                href={`/product/${product.id}`}
                className="relative mx-3 mt-3 flex h-60"
              >
                <img
                  className="absolute inset-0 h-full w-full object-cover rounded-lg"
                  src={product.imageUrl}
                  alt={product.name}
                />
              </Link>
              <span className="absolute top-0 left-0 m-3 rounded-sm bg-[#DB4444] px-4 py-1 text-center text-sm font-medium text-white">
                {product.discount}
              </span>
            </div>

            <div className="mt-4 px-5 pb-2">
              <Link href={`/product/${product.id}`}>
                <h5 className="text-sm font-bold tracking-tight text-slate-900 hover:text-[#DB4444] transition-colors">
                  {product.name} - {product.color}
                </h5>
              </Link>

              <div className="mt-2 mb-2 flex items-center justify-between">
                <p>
                  <span className="text-sm font-bold text-red-500">
                    {product.price}
                  </span>
                  <span className="text-sm text-gray-500 line-through ml-4">
                    {product.originalPrice}
                  </span>
                </p>
              </div>

              <div className="flex items-center pb-2">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} />
                ))}
                <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                  {product.rating}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-10">
        <div className="flex items-center space-x-5">
          <button
            type="button"
            className="px-2 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-full hover:bg-[#DB4444] hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button
            type="button"
            className="px-3.5 py-1.5 text-sm font-medium text-gray-900 bg-white border rounded-full border-gray-200 hover:bg-[#DB4444] hover:text-white"
          >
            1
          </button>
          <button
            type="button"
            className="px-3.5 py-1.5 text-sm font-medium text-gray-900 bg-white border rounded-full border-gray-200 hover:bg-[#DB4444] hover:text-white"
          >
            2
          </button>
          <button
            type="button"
            className="px-3.5 py-1.5 text-sm font-medium text-gray-900 bg-white border rounded-full border-gray-200 hover:bg-[#DB4444] hover:text-white"
          >
            3
          </button>
          <span>...</span>
          <button
            type="button"
            className="px-3.5 py-1.5 text-sm font-medium text-gray-900 bg-white border rounded-full border-gray-200 hover:bg-[#DB4444] hover:text-white"
          >
            11
          </button>
          <button
            type="button"
            className="px-2 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-full hover:bg-[#DB4444] hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
