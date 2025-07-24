import React from "react";

export default function DayOffer() {
  return (
    <>
      {/* Today's Offer Section */}
      <div className="p-1 pt-15 flex  md:flex-row lg:flex-row justify-center md:justify-between lg:justify-between container mx-auto">
        <div>
          <div className="container mx-auto flex gap-4 ">
            <div className="bg-[#DB4444] px-2.5 rounded-sm"></div>
            <h2 className="font-bold text-xl text-[#DB4444] py-2">Today's</h2>
          </div>
          <div className="container mx-auto flex items-end gap-20">
            <h1 className="lg:text-3xl text-xl font-bold text-black  pt-9">
              Flash Sales
            </h1>
            <div>
              <div className="flex lg:gap-10 gap-3.5 text-gray-800 font-bold text-xs lg:text-sm">
                <h2>Days</h2>
                <h2>Hours</h2>
                <h2>Minutes</h2>
                <h2>Seconds</h2>
              </div>
              <div className="flex lg:gap-5 gap-2 pt-2 text-2xl lg:text-3xl text-gray-800 font-bold">
                <h2>12</h2>
                <h2>:</h2>
                <h2>24</h2>
                <h2>:</h2>
                <h2>36</h2>
                <h2>:</h2>
                <h2>48</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden items-center gap-2 pt-7 md:flex lg:flex">
          {/* <a href="/products" className="flex gap-3 items-center">
            <h2>Show more</h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 text-gray-800 hover:text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </a> */}
          <div>
            {/* view all */}
            <button className="text-[#DB4444] text-sm font-bold mt-4 flex items-center gap-1">
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
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
