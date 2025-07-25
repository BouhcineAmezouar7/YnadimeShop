import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <>
      <div className="container mx-auto p-16 px-5">
        <h2 className="gap-5 flex items-center font-semibold text-gray-700">
          <span className=" text-neutral-400">Home</span>
          <span className="text-neutral-400">/</span>
          <span className="">Not Found</span>
        </h2>
        <div className="flex flex-col items-center justify-center h-96 gap-8 m-15">
          <h1 className="text-8xl font-semibold">404 - Not Found</h1>
          <p className="text-lg text-neutral-500 mt-4">
            Your visited page not found. Please check the URL or return to the
            homepage.
          </p>
          <Link
            href="/"
            className="bg-[#DB4444] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#c33b3b] transition-colors mt-10"
          >
            Go back to homepage
          </Link>
        </div>
      </div>
    </>
  );
}
