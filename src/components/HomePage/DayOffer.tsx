"use client";
import Link from "next/link";
import React from "react";
import { useState,  useEffect} from "react";

const DayOffer = React.memo(function DayOffer() {
  // count days, hours, minutes, seconds
  const [time, setTime] = useState({
    days: 19,
    hours: 23,
    minutes: 44,
    seconds: 11,
  });

  // useEffect to update the countdown every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds -= 1;
        } else if (minutes > 0) {
          minutes -= 1;
          seconds = 59;
        } else if (hours > 0) {
          hours -= 1;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days -= 1;
          hours = 23;
          minutes = 59;
          seconds = 59;
        } else {
          clearInterval(interval);
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  

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
              <div className="flex lg:gap-10 gap-3.5 font-semibold text-xs lg:text-sm">
                <h2>Days</h2>
                <h2>Hours</h2>
                <h2>Minutes</h2>
                <h2>Seconds</h2>
              </div>
              <div className="flex lg:gap-5 gap-2 pt-2 text-2xl lg:text-4xl font-bold">
                <h2>{time.days}</h2>:
                <h2>{time.hours}</h2>:
                <h2>{time.minutes}</h2>:
                <h2>{time.seconds}</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden items-center gap-2 pt-7 md:flex lg:flex">
          <div>
            {/* view all */}
            <Link href="/productDetails" className="text-[#DB4444] text-sm font-bold mt-4 flex items-center gap-1">
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
      <div className="py-10">
        <h2 className="text-3xl font-bold">Enhance Your Music Experience</h2>
      </div>
    </>
  );
});

export default DayOffer;
