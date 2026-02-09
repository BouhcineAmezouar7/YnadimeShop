"use client";
import React, { useState } from "react";

const categories = [
  { name: "All", count: 120 },
  { name: "Electronics", count: 40 },
  { name: "Fashion", count: 25 },
  { name: "Gaming", count: 15 },
  { name: "Home & Kitchen", count: 20 },
  { name: "Sports", count: 10 },
];

const brands = [
  { name: "Brand A", count: 30 },
  { name: "Brand B", count: 20 },
  { name: "Brand C", count: 25 },
  { name: "Brand D", count: 15 },
];

const prices = [
  { range: "$0 - $50", count: 50 },
  { range: "$51 - $100", count: 30 },
  { range: "$101 - $200", count: 20 },
  { range: "$201 - $500", count: 15 },
  { range: "$501+", count: 5 },
];

export default function StoreSidebar() {
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isBrandOpen, setIsBrandOpen] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [selectedPrice, setSelectedPrice] = useState("All");

  const toggleCategory = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  const clearFilters = () => {
    setSelectedCategory("All");
  };

  const toggleBrand = () => {
    setIsBrandOpen(!isBrandOpen);
  };
  const handleBrandSelect = (brandName: string) => {
    setSelectedBrand(brandName);
  };

  const _togglePrice = () => {
    setIsPriceOpen(!isPriceOpen);
  };
  const handlePriceSelect = (priceRange: string) => {
    setSelectedPrice(priceRange);
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <h3 className="text-center font-bold">Filters</h3>
        <button
          onClick={clearFilters}
          className="px-16 py-1.5 border border-gray-400 text-neutral-500 rounded-2xl mt-2 text-sm hover:bg-gray-50 transition-colors"
        >
          Clear Filters
        </button>
      </div>
      <div className="border-b border-gray-300 my-4"></div>
      {/* search */}
      <div className="px-2 flex items-center gap-2 border border-gray-300 rounded">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full py-1.5 outline-none px-1"
        />
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </div>
      {/* Category */}
      <div className="mt-8 px-2">
        <div
          className="flex justify-between items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
          onClick={toggleCategory}
        >
          <h3 className="font-bold">
            {isCategoryOpen ? " - " : " + "}
            Category
          </h3>
        </div>

        {/* Collapsible Category List */}
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isCategoryOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="px-3 mt-2">
            {categories.map((category) => (
              <li
                key={category.name}
                onClick={() => handleCategorySelect(category.name)}
                className={`cursor-pointer flex justify-between items-center text-sm p-2 rounded hover:bg-gray-100 transition-colors ${
                  selectedCategory === category.name ? "" : "text-neutral-500"
                }`}
              >
                {category.name}
                <span>
                  <sup
                    className={`ml-1 text-xs rounded-full px-1.5 py-0.5 ${
                      selectedCategory === category.name
                        ? "bg-white text-[#DB4444]"
                        : "bg-gray-300 text-white"
                    }`}
                  >
                    {category.count}
                  </sup>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Brands */}
      <div className="mt-1 px-2">
        <div
          className="flex justify-between items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
          onClick={toggleBrand}
        >
          <h3 className="font-bold">
            {" "}
            {isCategoryOpen ? " - " : " + "} Brandes
          </h3>
        </div>

        {/* Collapsible Category List */}
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isBrandOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="px-3 mt-1.5">
            {brands.map((brand) => (
              <li
                key={brand.name}
                onClick={() => handleBrandSelect(brand.name)}
                className={`cursor-pointer flex justify-between items-center text-sm p-2 rounded hover:bg-gray-100 transition-colors ${
                  selectedBrand === brand.name ? "" : "text-neutral-500"
                }`}
              >
                {brand.name}
                <span>
                  <sup
                    className={`ml-1 text-xs rounded-full px-1.5 py-0.5 ${
                      selectedBrand === brand.name
                        ? "bg-white text-[#DB4444]"
                        : "bg-gray-300 text-white"
                    }`}
                  >
                    {brand.count}
                  </sup>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Prices */}
      <div className="mt-1 px-2">
        <div className="items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
          <h3 className="font-bold">Price</h3>
          <div>
            <ul className="px-3 mt-1.5">
              {prices.map((price) => (
                <li key={price.range} className="text-sm p-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedPrice === price.range}
                      onChange={() => handlePriceSelect(price.range)}
                      className="accent-[#DB4444]"
                    />
                    <span
                      className={`${
                        selectedPrice === price.range ? "" : "text-neutral-500"
                      }`}
                    >
                      {price.range}
                    </span>
                    <sup
                      className={`ml-1 text-xs rounded-full px-1.5 py-0.5 ${
                        selectedPrice === price.range
                          ? "bg-white text-[#DB4444]"
                          : "bg-gray-300 text-white"
                      }`}
                    >
                      {price.count}
                    </sup>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
