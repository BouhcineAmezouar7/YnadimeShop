import React, { useState } from "react";

export default function TopNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="bg-white dark:bg-black text-black dark:text-white flex items-center lg:justify-center justify-around p-4 relative">
        <p className="text-gray-600 dark:text-gray-100 lg:text-sm font-light text-center text-sm">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          <span className="text-white font-bold underline pl-3">ShopNow</span>
        </p>

        <div className="lg:absolute lg:right-35 flex items-center gap-1 text-sm ">
          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex justify-center items-center gap-x-1.5 bg-white dark:bg-black px-3 py-1 text-sm font-semibold text-gray-900 dark:text-white shadow-sm "
              >
                English
                <svg
                  className="-mr-1 h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.25 8.29a.75.75 0 01-.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {isOpen && (
              <div
                className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white  shadow-lg ring-1 ring-black/5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
              >
                <div className="py-1" role="none">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 dark:black hover:bg-gray-100 dark:hover:bg-gray-100"
                    role="menuitem"
                    onClick={() => setIsOpen(false)}
                  >
                    English
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 dark:black hover:bg-gray-100 dark:hover:bg-gray-100"
                    role="menuitem"
                    onClick={() => setIsOpen(false)}
                  >
                    French
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 dark:black hover:bg-gray-100 dark:hover:bg-gray-100"
                    role="menuitem"
                    onClick={() => setIsOpen(false)}
                  >
                    Spanish
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
