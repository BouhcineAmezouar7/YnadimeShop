"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, type FormEvent, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { montserrat } from "@/app/fonts";
import { auth } from "@/utils/auth";

const inputClass =
  "min-h-12 w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-[#DB4444] focus:ring-2 focus:ring-[#DB4444]/10";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDemoLoading, setIsDemoLoading] = useState(false);
  const [error, setError] = useState("");

  const isBusy = isLoading || isDemoLoading;

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) setError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isBusy) return;

    setIsLoading(true);
    setError("");

    try {
      await auth.login(formData.email, formData.password);
      router.push("/profile");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to sign in. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDemoLogin() {
    if (isBusy) return;

    setIsDemoLoading(true);
    setError("");

    try {
      await auth.loginAsDemo();
      router.push("/profile");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to access the demo account.",
      );
    } finally {
      setIsDemoLoading(false);
    }
  }

  return (
    <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="grid min-h-[680px] overflow-hidden rounded-2xl border border-neutral-200 lg:grid-cols-2">
        {/* Illustration panel */}
        <aside className="relative hidden flex-col justify-between overflow-hidden bg-[#F5F5F5] p-10 lg:flex xl:p-14">
          <Link
            href="/"
            className={`${montserrat.className} relative z-10 w-fit text-2xl font-bold tracking-tight text-neutral-950`}
          >
            YnadimeShop
            <span className="text-[#DB4444]">.</span>
          </Link>

          <div className="relative mx-auto flex w-full max-w-lg flex-1 items-center justify-center py-8">
            <Image
              src="/login.svg"
              alt="YnadimeShop shopping illustration"
              width={500}
              height={500}
              priority
              className="h-auto w-full object-contain"
            />
          </div>

          <div className="relative z-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#DB4444]">
              Discover more
            </span>

            <h2
              className={`${montserrat.className} mt-4 max-w-md text-3xl font-semibold leading-tight tracking-tight text-neutral-950 xl:text-4xl`}
            >
              Your next favorite thing.
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-7 text-neutral-500">
              Explore clothing, accessories and technology designed for your
              everyday life.
            </p>
          </div>
        </aside>

        {/* Login panel */}
        <section className="flex items-center justify-center px-6 py-12 sm:px-12 lg:px-10 xl:px-16">
          <div className="w-full max-w-md">
            {/* Mobile brand */}
            <Link
              href="/"
              className={`${montserrat.className} mb-10 inline-block text-xl font-bold tracking-tight lg:hidden`}
            >
              YnadimeShop
              <span className="text-[#DB4444]">.</span>
            </Link>

            {/* Heading */}
            <header>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#DB4444]">
                Your account
              </span>

              <h1
                className={`${montserrat.className} mt-4 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl`}
              >
                Welcome back.
              </h1>

              <p className="mt-3 text-sm leading-6 text-neutral-500">
                Enter your credentials to access your account and continue
                shopping.
              </p>
            </header>

            {/* Login form */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {error && (
                <div
                  role="alert"
                  className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
                >
                  {error}
                </div>
              )}

              {/* Email */}
              <div>
                <label
                  htmlFor="login-email"
                  className="mb-2 block text-sm font-medium text-neutral-800"
                >
                  Email address
                </label>

                <input
                  id="login-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={isBusy}
                  className={inputClass}
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="login-password"
                  className="mb-2 block text-sm font-medium text-neutral-800"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    disabled={isBusy}
                    className={`${inputClass} pr-12`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((previous) => !previous)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    aria-pressed={showPassword}
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-neutral-400 transition-colors hover:text-neutral-900"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-5"
                    >
                      {showPassword ? (
                        <>
                          <path d="m3 3 18 18" />
                          <path d="M10.6 10.7a2 2 0 0 0 2.7 2.7" />
                          <path d="M9.9 5.2A10.9 10.9 0 0 1 12 5c5.5 0 9 7 9 7a15 15 0 0 1-2.1 3" />
                          <path d="M6.2 6.2C4.2 7.9 3 10 2 12c0 0 3.5 7 10 7 1.8 0 3.4-.5 4.8-1.3" />
                        </>
                      ) : (
                        <>
                          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                          <circle cx="12" cy="12" r="3" />
                        </>
                      )}
                    </svg>
                  </button>
                </div>
              </div>

              {/* Forgot password */}
              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-[#DB4444] hover:underline hover:underline-offset-4"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isBusy}
                className="group flex min-h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-lg bg-[#DB4444] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#c33b3b] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Signing in..." : "Sign in"}

                {!isLoading && (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-4 transition-transform group-hover:translate-x-1"
                  >
                    <path d="M4 12h16m-6-6 6 6-6 6" />
                  </svg>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-neutral-200" />
              <span className="text-xs text-neutral-400">or</span>
              <div className="h-px flex-1 bg-neutral-200" />
            </div>

            {/* Demo account */}
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={isBusy}
              className="flex min-h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-lg border border-neutral-200 bg-white px-5 py-3 text-sm font-medium text-neutral-900 transition-colors hover:border-neutral-400 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21v-2a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v2" />
              </svg>

              {isDemoLoading
                ? "Accessing demo..."
                : "Continue with demo account"}
            </button>

            {/* Register */}
            <p className="mt-8 text-center text-sm text-neutral-500">
              New to YnadimeShop?{" "}
              <Link
                href="/signup"
                className="font-semibold text-[#DB4444] hover:underline hover:underline-offset-4"
              >
                Create an account
              </Link>
            </p>

            {/* Return to store */}
            <div className="mt-8 border-t border-neutral-100 pt-6 text-center">
              <Link
                href="/store"
                className="inline-flex items-center gap-2 text-xs font-medium text-neutral-500 transition-colors hover:text-neutral-900"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4"
                >
                  <path d="M20 12H4m6-6-6 6 6 6" />
                </svg>
                Back to shopping
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
