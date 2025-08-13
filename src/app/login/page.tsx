'use client';
import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function LoginPage() {
  return (
    <div className="container mx-auto px-5 py-10">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <Image
            src="/login.svg"
            alt="Login Illustration"
            width={500}
            height={500}
            className="max-w-full h-auto rounded-lg"
          />
        </div>

        {/* Login Form Section */}
        <div className="w-full lg:w-1/2">
          <form className="flex flex-col gap-8 w-full max-w-md mx-auto p-6 md:p-10">
            {/* Heading */}
            <div className="flex flex-col gap-3 text-center lg:text-left">
              <h1 className="text-3xl md:text-4xl text-gray-800 font-semibold">
                Login
              </h1>
              <p className="text-gray-600">
                Enter your credentials to access your account.
              </p>
            </div>

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              className="border-b-2 font-serif w-full border-neutral-300 p-3 focus:outline-none focus:border-[#DB4444]"
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              className="border-b-2 font-serif w-full border-neutral-300 p-3 focus:outline-none focus:border-[#DB4444]"
            />

            {/* Actions */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <button
                type="submit"
                className="bg-[#DB4444] text-white w-full md:w-auto text-center px-6 py-3 rounded-sm font-semibold hover:bg-red-600 transition-colors duration-300"
              >
                Login
              </button>

              <Link
                href="#"
                className="text-[#DB4444] hover:underline text-sm text-center md:text-left"
              >
                Forgot password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
