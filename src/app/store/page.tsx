import PlusServices from "@/components/HomePage/PlusServices";
import Sponsors from "@/components/Store/Sponsors";
import StoreProducts from "@/components/Store/StoreProducts";
import StoreSidebar from "@/components/Store/StoreSidebar";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <>
      <div className="container mx-auto px-5 py-10">
        {/* Breadcrumb */}
        <h2 className="flex items-center gap-2 text-gray-700 font-semibold mb-8 text-sm md:text-base">
          <span className="text-neutral-400">
            <Link href="/">Home</Link>
          </span>
          <span className="text-neutral-400">/</span>
          <span>Store</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div className="md:col-span-1 bg-[#fcf8f873] p-3">
            <StoreSidebar />
          </div>
          <div className="md:col-span-4">
            <StoreProducts />
          </div>
          {/* sponsors */}
          <div className="md:col-span-5 mt-5">
            <Sponsors />
          </div>
          {/* Plus Services */}
          <div className="md:col-span-6 mt-10">
            <PlusServices />
          </div>
        </div>
      </div>
    </>
  );
}
