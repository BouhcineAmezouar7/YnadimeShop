// components/MenuModal.tsx
import React from "react";
import Link from "next/link";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

interface MenuModalProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export default function MenuModal({ isOpen, toggleMenu }: MenuModalProps) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
      />

      {/* Right-Side Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-4/5 max-w-sm bg-white shadow-xl transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={toggleMenu} aria-label="Close menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M6.293 5.293a1 1 0 011.414 0L12 9.586l4.293-4.293a1 1 0 111.414 1.414L13.414 11l4.293 4.293a1 1 0 01-1.414 1.414L12 12.414l-4.293 4.293a1 1 0 01-1.414-1.414L10.586 11l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-4 p-6 text-gray-800">
          <Link
            href="/"
            onClick={toggleMenu}
            className="text-base hover:text-blue-600 "
          >
            Home
          </Link>
          {["About", "Contact", "Signup"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              onClick={toggleMenu}
              className="text-base hover:text-blue-600"
            >
              {item}
            </Link>
          ))}

          {/* Search */}
          <div className="mt-6">
            <div className="flex items-center border rounded-md overflow-hidden">
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 px-3 py-2 outline-none"
              />
              <button className="p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="inline-block w-5 h-5 ml-2"
                >
                  <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748ZM12.1779 7.17624C11.4834 7.48982 11 8.18846 11 9C11 10.1046 11.8954 11 13 11C13.8115 11 14.5102 10.5166 14.8238 9.82212C14.9383 10.1945 15 10.59 15 11C15 13.2091 13.2091 15 11 15C8.79086 15 7 13.2091 7 11C7 8.79086 8.79086 7 11 7C11.41 7 11.8055 7.06167 12.1779 7.17624Z"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <button className="flex items-center gap-2 w-full px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="inline-block w-5 h-5 ml-2"
              >
                <path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853ZM18.827 6.1701C17.3279 4.66794 14.9076 4.60701 13.337 6.01687L12.0019 7.21524L10.6661 6.01781C9.09098 4.60597 6.67506 4.66808 5.17157 6.17157C3.68183 7.66131 3.60704 10.0473 4.97993 11.6232L11.9999 18.6543L19.0201 11.6232C20.3935 10.0467 20.319 7.66525 18.827 6.1701Z"></path>
              </svg>
              Favorites
            </button>
            <button className="flex items-center gap-2 w-full px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="inline-block w-5 h-5 ml-2"
              >
                <path d="M4.00488 16V4H2.00488V2H5.00488C5.55717 2 6.00488 2.44772 6.00488 3V15H18.4433L20.4433 7H8.00488V5H21.7241C22.2764 5 22.7241 5.44772 22.7241 6C22.7241 6.08176 22.7141 6.16322 22.6942 6.24254L20.1942 16.2425C20.083 16.6877 19.683 17 19.2241 17H5.00488C4.4526 17 4.00488 16.5523 4.00488 16ZM6.00488 23C4.90031 23 4.00488 22.1046 4.00488 21C4.00488 19.8954 4.90031 19 6.00488 19C7.10945 19 8.00488 19.8954 8.00488 21C8.00488 22.1046 7.10945 23 6.00488 23ZM18.0049 23C16.9003 23 16.0049 22.1046 16.0049 21C16.0049 19.8954 16.9003 19 18.0049 19C19.1095 19 20.0049 19.8954 20.0049 21C20.0049 22.1046 19.1095 23 18.0049 23Z"></path>
              </svg>
              Store
            </button>
          </div>
          <div className="flex items-center justify-center w-full mt-5">
            {/* card */}
            <Link
              href="/card"
              onClick={toggleMenu}
              className="flex items-center w-full px-4 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              <button className="flex items-center gap-2 w-full px-30 py-2 bg-gray-100 rounded-md hover:bg-gray-200">
                <ShoppingBagIcon className="w-5 h-5" />
                Cart
              </button>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
