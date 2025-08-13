'use client';
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="container mx-auto px-5 py-10">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
        {/* Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <Image
            src="/signup.svg"
            alt="Signup Illustration"
            width={500}
            height={500}
            className="max-w-full h-auto"
          />
        </div>

        {/* Signup Form */}
        <div className="w-full lg:w-1/2">
          <form className="flex flex-col gap-8 w-full max-w-md mx-auto p-6 md:p-10">
            {/* Heading */}
            <div className="flex flex-col gap-3 text-center lg:text-left">
              <h1 className="text-3xl md:text-4xl text-gray-800 font-semibold">
                Create an Account
              </h1>
              <p className="text-gray-600">
                Enter your details below to create a new account.
              </p>
            </div>

            {/* Input Fields */}
            <input
              type="text"
              placeholder="Name"
              className="border-b-2 font-serif w-full border-neutral-300 p-3 focus:outline-none focus:border-[#DB4444]"
            />
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

            {/* Create Account Button */}
            <Link
              href="#"
              className="bg-[#DB4444] text-white text-center px-6 py-3 rounded-sm font-semibold hover:bg-red-600 transition-colors duration-300"
            >
              Create Account
            </Link>

            {/* Google Sign-In */}
            <Link
              href="#"
              className="bg-white text-gray-800 p-3 rounded-sm font-semibold border border-gray-300 hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
              Sign in with Google
            </Link>

            {/* Login Link */}
            <p className="text-gray-600 text-center lg:text-left">
              Already have an account?{" "}
              <Link href="/login" className="text-[#DB4444] underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
