"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { montserrat } from "@/app/fonts";
import { auth } from "@/utils/auth";

const initialFormData = {
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
};

const inputClass =
  "min-h-12 w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-[#DB4444] focus:ring-2 focus:ring-[#DB4444]/10 disabled:opacity-60";

type FieldName = keyof typeof initialFormData;

type FieldProps = {
  name: FieldName;
  label: string;
  placeholder: string;
  value: string;
  type?: string;
  autoComplete?: string;
  disabled?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

/* Reusable input field */
function FormField({
  name,
  label,
  placeholder,
  value,
  type = "text",
  autoComplete,
  disabled,
  onChange,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-neutral-800"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={onChange}
        disabled={disabled}
        required
        className={inputClass}
      />
    </div>
  );
}

/* Reusable section heading */
function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="flex size-7 items-center justify-center rounded-md bg-[#DB4444]/10 text-xs font-semibold text-[#DB4444]">
        {number}
      </span>

      <h2 className="text-sm font-semibold text-neutral-900">{title}</h2>
    </div>
  );
}

/* Password visibility icon */
function EyeIcon({ visible }: { visible: boolean }) {
  return (
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
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />

      {visible && <path d="m3 3 18 18" />}
    </svg>
  );
}

export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isDemoLoading, setIsDemoLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isBusy = isLoading || isDemoLoading || Boolean(success);

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

    setError("");
    setSuccess("");

    if (formData.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const { password_confirmation: confirmation, ...account } = formData;

      void confirmation;

      await auth.register(account);

      setSuccess("Account created successfully!");

      router.push("/login");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to create your account.",
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
      <div className="grid overflow-hidden rounded-2xl border border-neutral-200 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Left illustration panel */}
        <aside className="hidden flex-col justify-between bg-[#F5F5F5] p-10 lg:flex xl:p-14">
          {/* Brand */}
          <Link
            href="/"
            className={`${montserrat.className} w-fit text-2xl font-bold tracking-tight text-neutral-950`}
          >
            YnadimeShop
            <span className="text-[#DB4444]">.</span>
          </Link>

          {/* Illustration */}
          <div className="flex flex-1 items-center justify-center py-12">
            <Image
              src="/signup.svg"
              alt="YnadimeShop registration illustration"
              width={500}
              height={500}
              className="h-auto w-full max-w-md object-contain"
            />
          </div>

          {/* Brand message */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#DB4444]">
              Join us
            </span>

            <h2
              className={`${montserrat.className} mt-4 text-3xl font-semibold leading-tight tracking-tight text-neutral-950 xl:text-4xl`}
            >
              A better way to shop.
            </h2>

            <p className="mt-4 max-w-sm text-sm leading-7 text-neutral-500">
              Create your account and discover clothing, accessories and
              technology for your everyday life.
            </p>

            {/* Account benefits */}
            <div className="mt-8 space-y-4 border-t border-neutral-200 pt-8">
              {[
                "Save your favorite products",
                "Manage and track your orders",
                "Discover new collections",
              ].map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-3 text-sm text-neutral-600"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5 shrink-0 text-[#DB4444]"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="m8 12 3 3 5-6" />
                  </svg>

                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Right registration panel */}
        <section className="px-6 py-10 sm:px-10 lg:px-10 lg:py-12 xl:px-16">
          <div className="mx-auto w-full max-w-xl">
            {/* Mobile brand */}
            <Link
              href="/"
              className={`${montserrat.className} mb-8 inline-block text-xl font-bold tracking-tight lg:hidden`}
            >
              YnadimeShop
              <span className="text-[#DB4444]">.</span>
            </Link>

            {/* Page heading */}
            <header>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#DB4444]">
                Get started
              </span>

              <h1
                className={`${montserrat.className} mt-3 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl`}
              >
                Create an account.
              </h1>

              <p className="mt-3 text-sm leading-6 text-neutral-500">
                Enter your details to join YnadimeShop and start shopping.
              </p>
            </header>

            {/* Registration form */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-7">
              {/* Error feedback */}
              {error && (
                <div
                  role="alert"
                  className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {error}
                </div>
              )}

              {/* Success feedback */}
              {success && (
                <div
                  role="status"
                  className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
                >
                  {success}
                </div>
              )}

              {/* 01 - Personal information */}
              <div>
                <SectionHeading number="01" title="Personal information" />

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    name="name"
                    label="First name"
                    placeholder="First name"
                    autoComplete="given-name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={isBusy}
                  />

                  <FormField
                    name="last_name"
                    label="Last name"
                    placeholder="Last name"
                    autoComplete="family-name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    disabled={isBusy}
                  />

                  <FormField
                    name="email"
                    label="Email address"
                    placeholder="you@example.com"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={isBusy}
                  />

                  <FormField
                    name="phone_number"
                    label="Phone number"
                    placeholder="Your phone number"
                    type="tel"
                    autoComplete="tel"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    disabled={isBusy}
                  />
                </div>
              </div>

              {/* 02 - Delivery address */}
              <div className="border-t border-neutral-100 pt-6">
                <SectionHeading number="02" title="Delivery address" />

                <div className="space-y-4">
                  <FormField
                    name="address"
                    label="Street address"
                    placeholder="Enter your address"
                    autoComplete="street-address"
                    value={formData.address}
                    onChange={handleInputChange}
                    disabled={isBusy}
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      name="country"
                      label="Country"
                      placeholder="Country"
                      autoComplete="country-name"
                      value={formData.country}
                      onChange={handleInputChange}
                      disabled={isBusy}
                    />

                    <FormField
                      name="city"
                      label="City"
                      placeholder="City"
                      autoComplete="address-level2"
                      value={formData.city}
                      onChange={handleInputChange}
                      disabled={isBusy}
                    />
                  </div>

                  <FormField
                    name="postal_code"
                    label="Postal code"
                    placeholder="Postal code"
                    autoComplete="postal-code"
                    value={formData.postal_code}
                    onChange={handleInputChange}
                    disabled={isBusy}
                  />
                </div>
              </div>

              {/* 03 - Account security */}
              <div className="border-t border-neutral-100 pt-6">
                <SectionHeading number="03" title="Account security" />

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-medium text-neutral-800"
                    >
                      Password
                    </label>

                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create password"
                        autoComplete="new-password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        minLength={8}
                        disabled={isBusy}
                        className={`${inputClass} pr-12`}
                      />

                      <button
                        type="button"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        aria-pressed={showPassword}
                        onClick={() => setShowPassword((previous) => !previous)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 transition-colors hover:text-neutral-900"
                      >
                        <EyeIcon visible={showPassword} />
                      </button>
                    </div>
                  </div>

                  {/* Confirm password */}
                  <div>
                    <label
                      htmlFor="password_confirmation"
                      className="mb-2 block text-sm font-medium text-neutral-800"
                    >
                      Confirm password
                    </label>

                    <div className="relative">
                      <input
                        id="password_confirmation"
                        name="password_confirmation"
                        type={showConfirmation ? "text" : "password"}
                        placeholder="Confirm password"
                        autoComplete="new-password"
                        value={formData.password_confirmation}
                        onChange={handleInputChange}
                        required
                        minLength={8}
                        disabled={isBusy}
                        className={`${inputClass} pr-12`}
                      />

                      <button
                        type="button"
                        aria-label={
                          showConfirmation
                            ? "Hide confirmation password"
                            : "Show confirmation password"
                        }
                        aria-pressed={showConfirmation}
                        onClick={() =>
                          setShowConfirmation((previous) => !previous)
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 transition-colors hover:text-neutral-900"
                      >
                        <EyeIcon visible={showConfirmation} />
                      </button>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-xs text-neutral-500">
                  Your password must contain at least 8 characters.
                </p>

                {formData.password_confirmation &&
                  formData.password === formData.password_confirmation && (
                    <p className="mt-2 text-xs text-green-700">
                      Passwords match.
                    </p>
                  )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isBusy}
                className="group flex min-h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-lg bg-[#DB4444] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#c33b3b] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading
                  ? "Creating account..."
                  : success
                    ? "Account created"
                    : "Create account"}

                {!isLoading && !success && (
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

            {/* Login link */}
            <p className="mt-7 text-center text-sm text-neutral-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-[#DB4444] hover:underline hover:underline-offset-4"
              >
                Sign in
              </Link>
            </p>

            {/* Privacy and terms */}
            <div className="mt-7 border-t border-neutral-100 pt-6 text-center text-xs leading-6 text-neutral-500">
              <Link href="/info/terms" className="hover:text-[#DB4444]">
                Terms of service
              </Link>

              <span className="mx-3 text-neutral-300">·</span>

              <Link href="/info/privacy" className="hover:text-[#DB4444]">
                Privacy policy
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
