"use client";
import React, { useState } from "react";
import Image from "next/image";
import Card from "./HomePage/Card";
import Link from "next/link";

export default function ProductDetails() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("red");

  // Sample product data
  const product = {
    name: "Havic HV G-92 Gamepad",
    price: 192.0,
    originalPrice: 400.0,
    rating: 4,
    reviews: 150,
    inStock: true,
    description:
      "PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.",
    images: [
      "/product/G01.png",
      "/product/G02.png",
      "/product/G04.jpg",
      "/product/G03.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "red", value: "#FB7181" },
      { name: "blue", value: "#4F46E5" },
    ],
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <>
      <div className="container mx-auto px-5">
        {/* Breadcrumb */}
        <h2 className="flex items-center gap-2 text-gray-700 font-semibold mb-8 text-sm md:text-base py-10">
          <span className="text-neutral-400">
            <Link href="/">Home</Link>
          </span>
          <span className="text-neutral-400">/</span>
          <span className="text-neutral-400">Gaming</span>
          <span className="text-neutral-400">/</span>
          <span>{product.name}</span>
        </h2>

        {/* Product Details Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Small Images - Left Column */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`min-w-[80px] w-20 h-20 cursor-pointer border-2 rounded-lg overflow-hidden ${
                    selectedImage === index
                      ? "border-[#DB4444]"
                      : "border-gray-200"
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image}
                    alt={`Product ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Large Image - Middle Column */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-96 lg:h-[500px] object-contain"
              />
            </div>
          </div>

          {/* Product Details - Right Column */}
          <div className="lg:col-span-6 order-3">
            <div className="space-y-4">
              {/* Product Title */}
              <h1 className="text-xl lg:text-2xl font-semibold text-gray-900">
                {product.name}
              </h1>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < product.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  ({product.reviews} Reviews)
                </span>
                <span className="text-gray-400">|</span>
                <span
                  className={`text-sm ${
                    product.inStock ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="text-2xl font-medium text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed">
                {product.description}
              </p>

              <hr className="border-gray-200" />

              {/* Colors */}
              <div>
                <h3 className="text-base font-medium text-gray-900 mb-2">
                  Colours:
                </h3>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      className={`w-6 h-6 rounded-full border-2 ${
                        selectedColor === color.name
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => setSelectedColor(color.name)}
                    />
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h3 className="text-base font-medium text-gray-900 mb-2">
                  Size:
                </h3>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`w-10 h-10 border rounded-md text-sm font-medium ${
                        selectedSize === size
                          ? "border-[#DB4444] bg-[#DB4444] text-white"
                          : "border-gray-300 text-gray-700 hover:border-gray-400"
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity and Actions */}
              <div className="flex items-center gap-3">
                {/* Quantity Selector */}
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={decrementQuantity}
                    className="px-2 py-2 hover:bg-gray-100 transition-colors text-sm"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-3 py-2 border-x border-gray-300 min-w-[50px] text-center text-sm">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    className="px-2 py-2 hover:bg-gray-100 transition-colors text-sm"
                  >
                    +
                  </button>
                </div>

                {/* Buy Now Button */}
                <button className="flex-1 bg-[#DB4444] text-white py-2 px-4 rounded-md hover:bg-[#c93a3a] transition-colors font-medium text-sm">
                  Buy Now
                </button>

                {/* Wishlist Button */}
                <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
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
              </div>

              {/* Delivery Info */}
              <div className="border border-gray-200 rounded-lg p-3 space-y-3">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                  <div>
                    <h4 className="font-medium text-sm">Free Delivery</h4>
                    <p className="text-xs text-gray-600">
                      Enter your postal code for Delivery Availability
                    </p>
                  </div>
                </div>
                <hr className="border-gray-200" />
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  <div>
                    <h4 className="font-medium text-sm">Return Delivery</h4>
                    <p className="text-xs text-gray-600">
                      Free 30 Days Delivery Returns. Details
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 py-16">
          <div className="container mx-auto flex gap-4 ">
            <div className="bg-[#DB4444] px-2.5 rounded-sm"></div>
            <h2 className="font-bold text-xl text-[#DB4444] py-2">
              Related Products
            </h2>
          </div>
          <Card />
        </div>
      </div>
    </>
  );
}
