import Link from "next/link";
import React from "react";

const ProductsData = [
  {
    id: 1,
    name: "Nike Air MX Super 2500",
    color: "Red",
    price: "$449",
    originalPrice: "$699",
    discount: "39%",
    rating: 5.0,
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
    imageUrl:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg",
  },
];
export default function ThisMonth() {
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
  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-0 py-10">
        <div className=" flex gap-4">
          <div className="bg-[#DB4444] px-2.5 rounded-sm"></div>
          <h2 className="font-bold text-lg text-[#DB4444] py-2">
            {" "}
            This month{" "}
          </h2>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="lg:text-3xl text-xl font-bold text-black  pt-9">
            Best selling products
          </h1>
          <div>
            {/* view all */}
            <Link href="#" className="text-[#DB4444] text-sm font-bold mt-4 flex items-center gap-1">
              View All
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4 text-[#DB4444] hover:text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto sm:grid lg:grid flex flex-col grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6  items-center">
        {ProductsData.map((product) => (
          <div
            key={product.id}
            className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg p-3"
          >
            <div className="relative flex h-full flex-col justify-between rounded-lg bg-gray-50 p-4">
              <Link href="#" className="relative mx-3 mt-3 flex h-60">
                <img
                  className="absolute inset-0 h-full w-full object-cover"
                  src={product.imageUrl}
                  alt={product.name}
                />
              </Link>
              <span className="absolute top-0 left-0 m-3 rounded-sm bg-[#DB4444] px-4 py-1 text-center text-sm font-medium text-white">
                {product.discount}
              </span>
            </div>
            <div className="mt-4 px-5 pb-2">
              <Link href="#">
                <h5 className="text-sm font-bold tracking-tight text-slate-900">
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
    </>
  );
}
