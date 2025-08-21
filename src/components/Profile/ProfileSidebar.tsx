import React from "react";
import Link from "next/link";

export default function ProfileSidebar() {
  return (
    <>
      <div className="w-full lg:w-1/4 space-y-8">
        <div className="space-y-4 ">
          <h2 className="font-semibold ">Manage My Account</h2>
          <div className="flex flex-col space-y-2 px-10">
            <Link
              rel="stylesheet"
              href=""
              className="text-gray-400 text-sm hover:text-[#DB4444]"
            >
              My Profile
            </Link>
            <Link
              rel="stylesheet"
              href=""
              className="text-gray-400 text-sm hover:text-[#DB4444]"
            >
              Adress Book
            </Link>
            <Link
              rel="stylesheet"
              href=""
              className="text-gray-400 text-sm hover:text-[#DB4444]"
            >
              My Payment Options
            </Link>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="font-semibold ">My Orders</h2>
          <div className="flex flex-col space-y-2 px-10">
            <Link
              rel="stylesheet"
              href=""
              className="text-gray-400 text-sm hover:text-[#DB4444]"
            >
              My Returns
            </Link>
            <Link
              rel="stylesheet"
              href=""
              className="text-gray-400 text-sm hover:text-[#DB4444]"
            >
              My Cancellations
            </Link>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="font-semibold ">My Wishlist</h2>
          <div className="flex flex-col space-y-2 px-10">
            <Link
              rel="stylesheet"
              href=""
              className="text-gray-400 text-sm hover:text-[#DB4444]"
            >
              My Wishlist
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
