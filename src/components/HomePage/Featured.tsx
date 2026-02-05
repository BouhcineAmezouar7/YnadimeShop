import React from "react";
import Image from "next/image";

const Featured = React.memo(function Featured() {
  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-0 mt-10 mb-10 py-10">
        <div className="flex gap-4">
          <div className="bg-[#DB4444] px-2.5 rounded-sm"></div>
          <h2 className="font-bold text-lg text-[#DB4444] py-2"> Featured </h2>
        </div>
        <h1 className="lg:text-3xl text-xl font-bold text-black pt-9">
          New Arrivals
        </h1>
        
        {/* Mobile: Stack vertically, Desktop: Side by side */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-[2%] pt-9">
          {/* PS5 Section */}
          <div className="w-full lg:w-5/6 bg-black flex justify-center items-center relative group overflow-hidden rounded-lg h-[300px] sm:h-[400px] lg:h-[500px]">
            <Image
              src="/mac.jpg"
              alt="macbook pro"
              width={5000}
              height={1000}
              className="transition-transform duration-300 group-hover:scale-105 w-full h-full object-contain"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white">
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-2">
                  Mac Book Pro
                </h3>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg mb-4 opacity-90 font-light">
                  The latest MacBook Pro with M2 chip
                  <br />
                  <span>for ultimate performance.</span>
                </p>
                <button className="underline underline-offset-4 py-2 text-sm sm:text-base">
                  Shop Now
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:grow flex flex-col gap-4">
            {/* Women's Section */}
            <div className="bg-black rounded-lg overflow-hidden relative group h-[250px] sm:h-[300px] lg:h-[240px]">
              <div className="w-full h-full flex justify-end items-center">
                <Image
                  src="/women.png"
                  alt="women's fashion"
                  width={400}
                  height={400}
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white">
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-2">
                    Women's Collection
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg mb-4 opacity-90 font-light">
                    Featured woman collections that
                    <br />
                    <span>give you another vibe.</span>
                  </p>
                  <button className="underline underline-offset-4 py-2 text-sm sm:text-base">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Row - Gucci and Amazon */}
            <div className="flex flex-col sm:flex-row gap-4 sm:justify-between">
              {/* Gucci Section */}
              <div className="bg-black relative group overflow-hidden rounded-lg h-[200px] sm:h-[220px] lg:h-[240px] w-full sm:w-[48%] flex items-center justify-center p-4">
                <Image
                  src="/controller.jpg"
                  alt="ps5 controller"
                  width={900}
                  height={900}
                  className="transition-transform duration-300 group-hover:scale-105 w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-3 left-3 text-white">
                    <h3 className="text-sm md:text-base font-bold mb-1">
                      Ps5 Controller
                    </h3>
                    <p className="text-xs opacity-90 mb-2">
                      The latest controller for PS5
                      <br />
                      <span>with new features</span>
                    </p>
                    <button className="underline underline-offset-3 text-white text-xs md:text-sm">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Amazon Section */}
              <div className="bg-black relative group overflow-hidden rounded-lg h-[200px] sm:h-[220px] lg:h-[240px] w-full sm:w-[48%] flex items-center justify-center ">
                <Image
                  src="/bike.jpg"
                  alt="bike"
                  width={6000}
                  height={6000}
                  className="transition-transform duration-300 group-hover:scale-105  object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-3 left-3 text-white">
                    <h3 className="text-sm md:text-base font-bold mb-1">
                      Amazon Bike
                    </h3>
                    <p className="text-xs opacity-90 mb-2">
                      The latest bike from Amazon
                      <br />
                      <span>for your adventures.</span>
                    </p>
                    <button className="underline underline-offset-3 text-white text-xs md:text-sm">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Featured;