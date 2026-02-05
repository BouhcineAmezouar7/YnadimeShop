"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import TopNav from "./TopNav";
import MenuModal from "./HomePage/MenuModal";
import { usePathname } from "next/navigation";
import { auth } from "@/utils/auth";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(auth.isAuthenticated());
  }, []);

  const toggleMenu = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

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
            <Link
              href="/"
              className={pathname === "/" ? "underline underline-offset-3" : ""}
            >
              Home
            </Link>

            <Link
              href="/store"
              className={
                pathname === "/products" ? "underline underline-offset-3" : ""
              }
            >
              Products
            </Link>
            <Link
              href="/contact"
              className={
                pathname === "/contact" ? "underline underline-offset-3" : ""
              }
            >
              Contact
            </Link>
            <Link
              href="/about"
              className={
                pathname === "/about" ? "underline underline-offset-3" : ""
              }
            >
              About
            </Link>
            {/* signup */}
            {!isLoggedIn && (
              <Link
                href="/signup"
                className={
                  pathname === "/signup" ? "underline underline-offset-3" : ""
                }
              >
                Sign Up
              </Link>
            )}
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
            {/* favorite */}
            <div
              className={
                pathname === "/favorite"
                  ? "bg-[#DB4444] rounded-full p-1.5 text-white"
                  : ""
              }
            >
              <Link href="/favorite">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z"></path>
                </svg>
              </Link>
            </div>
            {/* card  */}
            <div
              className={
                pathname === "/card"
                  ? "bg-[#DB4444] rounded-full p-1.5 text-white"
                  : ""
              }
            >
              <Link href="/card">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M104,216a16,16,0,1,1-16-16A16,16,0,0,1,104,216Zm88-16a16,16,0,1,0,16,16A16,16,0,0,0,192,200ZM239.71,74.14l-25.64,92.28A24.06,24.06,0,0,1,191,184H92.16A24.06,24.06,0,0,1,69,166.42L33.92,40H16a8,8,0,0,1,0-16H40a8,8,0,0,1,7.71,5.86L57.19,64H232a8,8,0,0,1,7.71,10.14ZM221.47,80H61.64l22.81,82.14A8,8,0,0,0,92.16,168H191a8,8,0,0,0,7.71-5.86Z"></path>
                </svg>
              </Link>
            </div>
            {/* profile */}
            {/* affiche is user auth */}
            <div>
              {isLoggedIn && (
                <Link
                  href="/profile"
                  className={
                    pathname === "/profile"
                      ? "flex items-center gap-x-2 bg-[#DB4444] rounded-full p-1 text-white"
                      : "flex items-center gap-x-2"
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className="border-b border-gray-300"></div>
    </div>
  );
}
