'use client';
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem('auth_token', data.access_token);
        localStorage.setItem('token_type', data.token_type);
        
        // Redirect to home page
        router.push('/');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
          <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full max-w-md mx-auto p-6 md:p-10">
            {/* Heading */}
            <div className="flex flex-col gap-3 text-center lg:text-left">
              <h1 className="text-3xl md:text-4xl text-gray-800 font-semibold">
                Login
              </h1>
              <p className="text-gray-600">
                Enter your credentials to access your account.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="border-b-2 font-serif w-full border-neutral-300 p-3 focus:outline-none focus:border-[#DB4444]"
            />

            {/* Password */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="border-b-2 font-serif w-full border-neutral-300 p-3 focus:outline-none focus:border-[#DB4444]"
            />

            {/* Actions */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-[#DB4444] text-white w-full md:w-auto text-center px-6 py-3 rounded-sm font-semibold hover:bg-red-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Logging in...' : 'Login'}
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