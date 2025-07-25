import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <>
      {/* login page */}
      <div className="container mx-auto">
        <div className="flex m-10 justify-center items-center">
          <div className="flex flex-col items-center">
            <img
              src="/login.svg"
              alt="Login"
              width={1000}
              height={1000}
              className="rounded-lg"
            />
          </div>
          <div className="flex flex-col items-center w-full ">
            {/* login form */}
            <form className="flex flex-col gap-8 w-full max-w-md p-10">
              <div className="flex flex-col gap-5">
                <h1 className="text-4xl text-gray-800 font-semibold">Login</h1>
                <p className="text-gray-600">
                  Enter your credentials to access your account.
                </p>
              </div>
              <input
                type="email"
                placeholder="Email"
                className="border-b-2 font-serif w-full border-neutral-300 p-3 focus:outline-none focus:border-[#DB4444]"
              />
              <input
                type="password"
                placeholder="Password"
                className="border-b-2 font-serif w-full border-neutral-300 p-3 focus:outline-none focus:border-[#DB4444]"
              />
              <div className="flex justify-between items-center gap-4">
                <Link
                  href="/login"
                  className="bg-[#DB4444] text-white px-13 py-3 rounded-sm font-semibold hover:bg-red-600 transition-colors duration-300"
                >
                  Login
                </Link>

                <Link
                  href="#"
                  className="text-[#DB4444] hover:underline text-sm"
                >
                  Forgot password?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
