import React from "react";
import Image from "next/image";
import PlusServices from "@/components/HomePage/PlusServices";
import TeamSection from "@/components/About/TeamSection";
import StatusSection from "@/components/About/StatusSection";
import Link from "next/link";

export default function page() {
  return (
    <>
      <div className="container mx-auto px-5 ">
        {/* Breadcrumb */}
        <h2 className="flex items-center gap-2 text-gray-700 font-semibold mb-8 text-sm md:text-base py-10">
          <span className="text-neutral-400">
            <Link href="/">Home</Link>
          </span>
          <span className="text-neutral-400">/</span>
          <span>About</span>
        </h2>

        {/* About Content */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-12 lg:mx-24">
          <div className="flex-1 items-center justify-center">
            <h3 className="text-6xl font-semibold m-10 mx-0">Our Story</h3>
            <p className="text-lg font-mono">
              Launched in 2025, Exclusive is South Asia's premier online
              shopping marketplace with an active presence in Bangladesh.
              Supported by wide range of tailored marketing, data and service
              solutions, Exclusive has 10,500 sellers and 300 brands and serves
              3 millions customers across the region.
            </p>
            <p className="mt-9 text-lg font-mono">
              Our mission is to empower small businesses and entrepreneurs by
              providing them with the tools and resources they need to succeed
              in the digital marketplace.
            </p>
          </div>
          <div className="flex-1">
            <Image
              src="/about/b.jpg"
              alt="About Us"
              width={1200}
              height={300}
              className="w-full h-auto rounded-sm shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Status Section */}
      <StatusSection />
      {/* Team Section */}
      <TeamSection />
      {/* Plus Services Section */}
      <PlusServices />
    </>
  );
}
