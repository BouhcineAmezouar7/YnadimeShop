"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="h-screen pr-10 pl-9 bg-white shadow-md">
      <ul className="flex flex-col justify-between h-full ">
        <div className="m-6">
          <h2 className="text-2xl font-bold text-neutral-700 mb-4">
            Dash<span className="text-[#DB4444]">Ynadime.</span>
          </h2>
          {/* line */}
          <hr className="border-gray-300 mb-10 w-full" />
          {/* Navigation Links */}
          <div className="flex flex-col gap-8">
            {/* dashboard */}
            <li className="flex items-center gap-3">
              <div
                className={
                  pathname === "/dashboard"
                    ? "w-2 h-2 rounded-full bg-[#DB4444]"
                    : "w-2 h-2 rounded-full bg-gray-300"
                }
              ></div>
              <Link
                href="/dashboard"
                className={
                  pathname === "/dashboard"
                    ? "font-semibold flex items-center gap-3 text-[#DB4444]"
                    : "flex items-center gap-3"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className={
                    pathname === "/dashboard" ? "text-[#DB4444]" : "text-black"
                  }
                  viewBox="0 0 256 256"
                >
                  <path d="M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V160h32v56a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V120A15.87,15.87,0,0,0,219.31,108.68ZM208,208H160V152a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v56H48V120l80-80,80,80Z"></path>
                </svg>
                Dashboard
              </Link>
            </li>
            {/* Products */}
            <li className="flex items-center gap-3">
              <div
                className={
                  pathname === "/dashboard/products"
                    ? "w-2 h-2 rounded-full bg-[#DB4444]"
                    : "w-2 h-2 rounded-full bg-gray-300"
                }
              ></div>

              <Link
                href="/dashboard/products"
                className={
                  pathname === "/dashboard/products"
                    ? "font-semibold flex items-center gap-3 text-[#DB4444]"
                    : "font-semibold flex items-center gap-3"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className={
                    pathname === "/dashboard/products"
                      ? "text-[#DB4444]"
                      : "text-black"
                  }
                  viewBox="0 0 256 256"
                >
                  <path d="M104,216a16,16,0,1,1-16-16A16,16,0,0,1,104,216Zm88-16a16,16,0,1,0,16,16A16,16,0,0,0,192,200ZM239.71,74.14l-25.64,92.28A24.06,24.06,0,0,1,191,184H92.16A24.06,24.06,0,0,1,69,166.42L33.92,40H16a8,8,0,0,1,0-16H40a8,8,0,0,1,7.71,5.86L57.19,64H232a8,8,0,0,1,7.71,10.14ZM221.47,80H61.64l22.81,82.14A8,8,0,0,0,92.16,168H191a8,8,0,0,0,7.71-5.86Z"></path>
                </svg>
                Products
              </Link>
            </li>
            {/* category */}
            <li className="flex items-center gap-3">
              <div
                className={
                  pathname === "/dashboard/category"
                    ? "w-2 h-2 rounded-full bg-[#DB4444]"
                    : "w-2 h-2 rounded-full bg-gray-300"
                }
              ></div>
              <Link
                href="/dashboard/category"
                className={
                  pathname === "/dashboard/category"
                    ? "font-semibold flex items-center gap-3 text-[#DB4444]"
                    : "font-semibold flex items-center gap-3"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className={
                    pathname === "/dashboard/category"
                      ? "text-[#DB4444]"
                      : "text-black"
                  }
                  viewBox="0 0 256 256"
                >
                  <path d="M200,40H56A16,16,0,0,0,40,56V200a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm-64,80h64v16H136Zm0-16V88h64v16Zm0,48h64v16H136Zm64-80H136V56h64ZM56,56h64V200H56ZM200,200H136V184h64v16Z"></path>
                </svg>
                Category
              </Link>
            </li>
            {/* orders */}
            <li className="flex items-center gap-3">
              <div
                className={
                  pathname === "/dashboard/orders"
                    ? "w-2 h-2 rounded-full bg-[#DB4444]"
                    : "w-2 h-2 rounded-full bg-gray-300"
                }
              ></div>
              <Link
                href="/dashboard/orders"
                className={
                  pathname === "/dashboard/orders"
                    ? "font-semibold flex items-center gap-3 text-[#DB4444]"
                    : "font-semibold flex items-center gap-3"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className={
                    pathname === "/dashboard/orders"
                      ? "text-[#DB4444]"
                      : "text-black"
                  }
                  viewBox="0 0 256 256"
                >
                  <path d="M200,40H56A16,16,0,0,0,40,56V200a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,16v64H56V56Zm0,144H56V136H200v64Z"></path>
                </svg>
                Orders
              </Link>
            </li>
            {/* Pages */}
            <li>
              <h2 className="text-xl font-semibold text-black mb-5">Pages</h2>
              <div className="flex items-center gap-3">
                <div
                  className={
                    pathname === "/dashboard/carousel"
                      ? "w-2 h-2 rounded-full bg-[#DB4444]"
                      : "w-2 h-2 rounded-full bg-gray-300"
                  }
                ></div>
                <Link
                  href="/dashboard/carousel"
                  className={
                    pathname === "/dashboard/carousel"
                      ? "font-semibold flex items-center gap-3 text-[#DB4444]"
                      : "font-semibold flex items-center gap-3"
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className={
                      pathname === "/dashboard/carousel"
                        ? "text-[#DB4444]"
                        : "text-black"
                    }
                    viewBox="0 0 256 256"
                  >
                    <path d="M192,48H64A16,16,0,0,0,48,64V192a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64A16,16,0,0,0,192,48Zm0,144H64V64H192V192ZM240,56V200a8,8,0,0,1-16,0V56a8,8,0,0,1,16,0ZM32,56V200a8,8,0,0,1-16,0V56a8,8,0,0,1,16,0Z"></path>
                  </svg>
                  Carousel
                </Link>
              </div>
            </li>
          </div>
        </div>
        <div className="flex flex-col gap-5 m-7">
          <li>
            <Link
              href="/dashboard/settings"
              className={
                pathname === "/dashboard/settings"
                  ? "font-semibold flex items-center gap-3 text-[#DB4444]"
                  : "font-semibold flex items-center gap-3"
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className={
                  pathname === "/dashboard/settings"
                    ? "text-[#DB4444]"
                    : "text-black"
                }
                viewBox="0 0 256 256"
              >
                <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm109.94-52.79a8,8,0,0,0-3.89-5.4l-29.83-17-.12-33.62a8,8,0,0,0-2.83-6.08,111.91,111.91,0,0,0-36.72-20.67,8,8,0,0,0-6.46.59L128,41.85,97.88,25a8,8,0,0,0-6.47-.6A112.1,112.1,0,0,0,54.73,45.15a8,8,0,0,0-2.83,6.07l-.15,33.65-29.83,17a8,8,0,0,0-3.89,5.4,106.47,106.47,0,0,0,0,41.56,8,8,0,0,0,3.89,5.4l29.83,17,.12,33.62a8,8,0,0,0,2.83,6.08,111.91,111.91,0,0,0,36.72,20.67,8,8,0,0,0,6.46-.59L128,214.15,158.12,231a7.91,7.91,0,0,0,3.9,1,8.09,8.09,0,0,0,2.57-.42,112.1,112.1,0,0,0,36.68-20.73,8,8,0,0,0,2.83-6.07l.15-33.65,29.83-17a8,8,0,0,0,3.89-5.4A106.47,106.47,0,0,0,237.94,107.21Zm-15,34.91-28.57,16.25a8,8,0,0,0-3,3c-.58,1-1.19,2.06-1.81,3.06a7.94,7.94,0,0,0-1.22,4.21l-.15,32.25a95.89,95.89,0,0,1-25.37,14.3L134,199.13a8,8,0,0,0-3.91-1h-.19c-1.21,0-2.43,0-3.64,0a8.08,8.08,0,0,0-4.1,1l-28.84,16.1A96,96,0,0,1,67.88,201l-.11-32.2a8,8,0,0,0-1.22-4.22c-.62-1-1.23-2-1.8-3.06a8.09,8.09,0,0,0-3-3.06l-28.6-16.29a90.49,90.49,0,0,1,0-28.26L61.67,97.63a8,8,0,0,0,3-3c.58-1,1.19-2.06,1.81-3.06a7.94,7.94,0,0,0,1.22-4.21l.15-32.25a95.89,95.89,0,0,1,25.37-14.3L122,56.87a8,8,0,0,0,4.1,1c1.21,0,2.43,0,3.64,0a8.08,8.08,0,0,0,4.1-1l28.84-16.1A96,96,0,0,1,188.12,55l.11,32.2a8,8,0,0,0,1.22,4.22c.62,1,1.23,2,1.8,3.06a8.09,8.09,0,0,0,3,3.06l28.6,16.29A90.49,90.49,0,0,1,222.9,142.12Z"></path>
              </svg>
              Settings
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/account"
              className={
                pathname === "/dashboard/account"
                  ? "font-semibold flex items-center gap-3 text-[#DB4444]"
                  : "font-semibold flex items-center gap-3"
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className={
                  pathname === "/dashboard/account"
                    ? "text-[#DB4444]"
                    : "text-black"
                }
                viewBox="0 0 256 256"
              >
                <path d="M228.25,63.07l-4.66-2.69a23.6,23.6,0,0,0,0-8.76l4.66-2.69a8,8,0,0,0-8-13.86l-4.67,2.7A23.92,23.92,0,0,0,208,33.38V28a8,8,0,0,0-16,0v5.38a23.92,23.92,0,0,0-7.58,4.39l-4.67-2.7a8,8,0,1,0-8,13.86l4.66,2.69a23.6,23.6,0,0,0,0,8.76l-4.66,2.69a8,8,0,0,0,4,14.93,7.92,7.92,0,0,0,4-1.07l4.67-2.7A23.92,23.92,0,0,0,192,78.62V84a8,8,0,0,0,16,0V78.62a23.92,23.92,0,0,0,7.58-4.39l4.67,2.7a7.92,7.92,0,0,0,4,1.07,8,8,0,0,0,4-14.93ZM192,56a8,8,0,1,1,8,8A8,8,0,0,1,192,56Zm29.35,48.11a8,8,0,0,0-6.57,9.21A88.85,88.85,0,0,1,216,128a87.62,87.62,0,0,1-22.24,58.41,79.66,79.66,0,0,0-36.06-28.75,48,48,0,1,0-59.4,0,79.66,79.66,0,0,0-36.06,28.75A88,88,0,0,1,128,40a88.76,88.76,0,0,1,14.68,1.22,8,8,0,0,0,2.64-15.78,103.92,103.92,0,1,0,85.24,85.24A8,8,0,0,0,221.35,104.11ZM96,120a32,32,0,1,1,32,32A32,32,0,0,1,96,120ZM74.08,197.5a64,64,0,0,1,107.84,0,87.83,87.83,0,0,1-107.84,0Z"></path>
              </svg>
              Account
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/logout"
              className={
                pathname === "/dashboard/logout"
                  ? "font-semibold flex items-center gap-3 text-[#DB4444]"
                  : "font-semibold flex items-center gap-3"
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className={
                  pathname === "/dashboard/logout"
                    ? "text-[#DB4444]"
                    : "text-black"
                }
                viewBox="0 0 256 256"
              >
                <path d="M120,216a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H56V208h56A8,8,0,0,1,120,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L204.69,120H112a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,229.66,122.34Z"></path>
              </svg>
              Logout
            </Link>
          </li>
        </div>
      </ul>
    </div>
  );
}
