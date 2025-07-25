"use client";

import { use, useState } from "react";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import TopNav from "./TopNav";
import MenuModal from "./HomePage/MenuModal";
import { usePathname } from "next/navigation";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const pathname = usePathname();

  return (
    <div>
      <TopNav />
      <nav className="container mx-auto flex items-center bg-white justify-between px-5 p-2 pt-10 relative ">
        <Link href="/" className="flex items-center gap-x-2">
          <span className={`${montserrat.className} text-2xl `}>
            YnadimeShop
          </span>
        </Link>
        <div className="flex items-center gap-x-18">
          <div className="hidden xl:flex gap-x-12 font-mono">
            {/* Desktop Navigation underline in active link */}
            <Link href="/" className={pathname === "/" ? "underline underline-offset-3" : ""}>
              Home
            </Link>
            <Link
              href="/contact"
              className={pathname === "/contact" ? "underline underline-offset-3" : ""}
            >
              Contact
            </Link>
            <Link
              href="/about"
              className={pathname === "/about" ? "underline underline-offset-3" : ""}
            >
              About
            </Link>
            <Link
              href="/signup"
              className={pathname === "/signup" ? "underline underline-offset-3" : ""}
            >
              Sign Up
            </Link>
          </div>
          <div className="xl:hidden">
            <button onClick={toggleMenu} className="p-1">
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-7 h-7 text-black"
                >
                  <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-7 h-7 text-black"
                >
                  <path d="M3 6h18v2H3V6zM3 12h18v2H3v-2zM3 18h18v2H3v-2z"></path>
                </svg>
              )}
            </button>
            <MenuModal isOpen={isOpen} toggleMenu={toggleMenu} />
          </div>
        </div>

        <div className="hidden xl:flex text-lg">
          {/* search input */}
          <input
            type="text"
            placeholder="What are you looking for?"
            className="bg-neutral-100 rounded-l-lg p-3 px-5 text-sm w-50 focus:outline-none"
          />
          <button className="bg-neutral-100 rounded-r-lg px-1 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-black font-bold bg-neutral-100"
            >
              <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748ZM12.1779 7.17624C11.4834 7.48982 11 8.18846 11 9C11 10.1046 11.8954 11 13 11C13.8115 11 14.5102 10.5166 14.8238 9.82212C14.9383 10.1945 15 10.59 15 11C15 13.2091 13.2091 15 11 15C8.79086 15 7 13.2091 7 11C7 8.79086 8.79086 7 11 7C11.41 7 11.8055 7.06167 12.1779 7.17624Z"></path>
            </svg>
          </button>
          <div className="flex items-center gap-x-5 ml-6">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-7 h-7 text-black"
              >
                <path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853ZM18.827 6.1701C17.3279 4.66794 14.9076 4.60701 13.337 6.01687L12.0019 7.21524L10.6661 6.01781C9.09098 4.60597 6.67506 4.66808 5.17157 6.17157C3.68183 7.66131 3.60704 10.0473 4.97993 11.6232L11.9999 18.6543L19.0201 11.6232C20.3935 10.0467 20.319 7.66525 18.827 6.1701Z"></path>
              </svg>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-7 h-7 text-black"
              >
                <path d="M4.00488 16V4H2.00488V2H5.00488C5.55717 2 6.00488 2.44772 6.00488 3V15H18.4433L20.4433 7H8.00488V5H21.7241C22.2764 5 22.7241 5.44772 22.7241 6C22.7241 6.08176 22.7141 6.16322 22.6942 6.24254L20.1942 16.2425C20.083 16.6877 19.683 17 19.2241 17H5.00488C4.4526 17 4.00488 16.5523 4.00488 16ZM6.00488 23C4.90031 23 4.00488 22.1046 4.00488 21C4.00488 19.8954 4.90031 19 6.00488 19C7.10945 19 8.00488 19.8954 8.00488 21C8.00488 22.1046 7.10945 23 6.00488 23ZM18.0049 23C16.9003 23 16.0049 22.1046 16.0049 21C16.0049 19.8954 16.9003 19 18.0049 19C19.1095 19 20.0049 19.8954 20.0049 21C20.0049 22.1046 19.1095 23 18.0049 23Z"></path>
              </svg>
            </div>
          </div>
        </div>
      </nav>
      <div className="border-b border-gray-300"></div>
    </div>
  );
}
