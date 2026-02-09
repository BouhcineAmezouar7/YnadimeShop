"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    email: "",
    address: "",
    country: "",
    city: "",
    phone_number: "",
    postal_code: "",
    password: "",
    password_confirmation: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    // Client-side validation
    if (formData.password !== formData.password_confirmation) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Account created successfully! Redirecting to login...");
        // Redirect to login page after successful signup
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        // Handle validation errors from Laravel
        if (data.errors) {
          const errorMessages = Object.values(data.errors).flat().join(", ");
          setError(errorMessages);
        } else {
          setError(data.message || "Signup failed");
        }
      }
    } catch (error) {
      setError("Network error. Please try again.");
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-5 py-5">
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
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-8 w-full max-w-3xl mx-auto p-6 md:p-10"
          >
            {/* Heading */}
            <div className="flex flex-col gap-3 text-center lg:text-left">
              <h1 className="text-3xl md:text-4xl text-gray-800 font-semibold">
                Create an Account
              </h1>
              <p className="text-gray-600">
                Enter your details below to create a new account.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                {success}
              </div>
            )}

            {/* Input Fields */}
            {/* name and last_name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="border-b-2 font-serif w-full border-neutral-300 p-3 focus:outline-none focus:border-[#DB4444]"
              />
              <input
                type="text"
                placeholder="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                required
                className="border-b-2 font-serif w-full border-neutral-300 p-3 focus:outline-none focus:border-[#DB4444]"
              />
            </div>
            {/* email */}
            <div>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="border-b-2 font-serif w-full border-neutral-300 p-3 focus:outline-none focus:border-[#DB4444]"
              />
            </div>
            {/* phone_number and postal_code  */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Phone Number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                required
                className="border-b-2 font-serif w-full border-neutral-300 p-3 focus:outline-none focus:border-[#DB4444]"
              />
              <input
                type="text"
                placeholder="Postal Code"
                name="postal_code"
                value={formData.postal_code}
                onChange={handleInputChange}
                required
                className="border-b-2 font-serif w-full border-neutral-300 p-3 focus:outline-none focus:border-[#DB4444]"
              />
            </div>
            {/* adress and city */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="border-b-2 font-serif w-full border-neutral-300 p-3 focus:outline-none focus:border-[#DB4444]"
              />
              <input
                type="text"
                placeholder="City"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                className="border-b-2 font-serif w-full border-neutral-300 p-3 focus:outline-none focus:border-[#DB4444]"
              />
            </div>
            {/*  */}
            {/* password and Confirm Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                minLength={8}
                className="border-b-2 font-serif w-full border-neutral-300 p-3 focus:outline-none focus:border-[#DB4444]"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleInputChange}
                required
                className="border-b-2 font-serif w-full border-neutral-300 p-3 focus:outline-none focus:border-[#DB4444]"
              />
            </div>

            {/* Create Account Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#DB4444] text-white text-center px-6 py-3 rounded-sm font-semibold hover:bg-red-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>

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
