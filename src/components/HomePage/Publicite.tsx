import React from "react";
import { Montserrat } from "next/font/google";
import Image from "next/image";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

const Publicite = React.memo(function Publicite() {
  return (
    <div
      className={`${montserrat.className} my-16 flex lg:flex-row flex-col container mx-auto bg-black rounded-lg`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-0">
        <div className="p-8 md:p-12 lg:p-16">
          <div className="max-w-2xl">
            <h2 className="text-lg font-semibold mb-4 text-green-400">
              Categories
            </h2>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-6 font-bold leading-tight">
              Enhance Your
            </h1>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-8 font-bold leading-tight">
              Music Experience
            </h1>

            {/* Countdown Timer */}
            <div className="flex gap-8 mb-9">
              <div className="flex flex-col items-center bg-white rounded-full w-16 h-16 sm:w-18 sm:h-18 justify-center text-gray-800">
                <span className="text-sm sm:text-base font-bold">23</span>
                <span className="text-xs font-light">Hours</span>
              </div>
              <div className="flex flex-col items-center bg-white rounded-full w-16 h-16 sm:w-18 sm:h-18 justify-center text-gray-800">
                <span className="text-sm sm:text-base font-bold">05</span>
                <span className="text-xs font-light">Days</span>
              </div>
              <div className="flex flex-col items-center bg-white rounded-full w-16 h-16 sm:w-18 sm:h-18 justify-center text-gray-800">
                <span className="text-sm sm:text-base font-bold">59</span>
                <span className="text-xs font-light">Minutes</span>
              </div>
              <div className="flex flex-col items-center bg-white rounded-full w-16 h-16 sm:w-18 sm:h-18 justify-center text-gray-800">
                <span className="text-sm sm:text-base font-bold">35</span>
                <span className="text-xs font-light">Seconds</span>
              </div>
            </div>

            <button className="bg-green-400 hover:bg-green-500 font-semibold text-white px-10 py-5 rounded-lg transition-colors duration-300">
              Buy Now!
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-0 ">
        <Image
          src="/MusicPub.png"
          alt="Publicite Image"
          width={710}
          height={720}
          className="mt-8"
        />
      </div>
    </div>
  );
});

export default Publicite;
