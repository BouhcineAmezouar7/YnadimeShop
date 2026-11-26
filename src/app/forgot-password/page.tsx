"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent, type ChangeEvent } from "react";
import { montserrat } from "@/app/fonts";
import { auth } from "@/utils/auth";

const initialFormData = {
  email: "",
  password: "",
  confirmation: "",
};

const inputClass =
  "min-h-12 w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-[#DB4444] focus:ring-2 focus:ring-[#DB4444]/10 disabled:opacity-60";

const labelClass = "mb-2 block text-sm font-medium text-neutral-800";

type PasswordFieldProps = {
  name: string;
  label: string;
  placeholder: string;
  value: string;
  disabled?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

/* Reusable password field */
function PasswordField({
  name,
  label,
  placeholder,
  value,
  disabled,
  onChange,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>

      <div className="relative">
        <input
          id={name}
          name={name}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete="new-password"
          required
          minLength={8}
          disabled={disabled}
          className={`${inputClass} pr-12`}
        />

        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={`${visible ? "Hide" : "Show"} ${label.toLowerCase()}`}
          aria-pressed={visible}
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
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />

            {visible && <path d="m3 3 18 18" />}
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const passwordsMatch =
    formData.password.length >= 8 &&
    formData.password === formData.confirmation;

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

    if (isLoading) return;

    setError("");

    if (formData.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (formData.password !== formData.confirmation) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      await auth.resetPassword(formData.email.trim(), formData.password);

      setFormData(initialFormData);
      setSuccess(true);
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : "Unable to reset your password. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="grid min-h-[680px] overflow-hidden rounded-2xl border border-neutral-200 lg:grid-cols-2">
        {/* Illustration panel */}
        <aside className="hidden flex-col justify-between overflow-hidden bg-[#F5F5F5] p-10 lg:flex xl:p-14">
          <Link
            href="/"
            className={`${montserrat.className} w-fit text-2xl font-bold tracking-tight text-neutral-950`}
          >
            YnadimeShop
            <span className="text-[#DB4444]">.</span>
          </Link>

          <div className="mx-auto flex w-full max-w-lg flex-1 items-center justify-center py-8">
            <Image
              src="/login.svg"
              alt="Account recovery illustration"
              width={500}
              height={500}
              className="h-auto w-full object-contain"
            />
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#DB4444]">
              Account recovery
            </span>

            <h2
              className={`${montserrat.className} mt-4 max-w-md text-3xl font-semibold leading-tight tracking-tight text-neutral-950 xl:text-4xl`}
            >
              Get back to shopping.
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-7 text-neutral-500">
              Reset your password and regain access to your favorite products
              and order history.
            </p>
          </div>
        </aside>

        {/* Recovery panel */}
        <section className="flex items-center justify-center px-6 py-12 sm:px-12 lg:px-10 xl:px-16">
          <div className="w-full max-w-md">
            {/* Mobile branding */}
            <Link
              href="/"
              className={`${montserrat.className} mb-8 inline-block text-xl font-bold tracking-tight lg:hidden`}
            >
              YnadimeShop
              <span className="text-[#DB4444]">.</span>
            </Link>

            {/* Back to login */}
            <Link
              href="/login"
              className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-[#DB4444]"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4 transition-transform group-hover:-translate-x-1"
              >
                <path d="M20 12H4m6-6-6 6 6 6" />
              </svg>
              Back to login
            </Link>

            {success ? (
              /* Successful password update */
              <div className="py-8">
                <div className="flex size-20 items-center justify-center rounded-full border border-green-100 bg-green-50 text-green-700">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-11"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="m8 12 3 3 5-6" />
                  </svg>
                </div>

                <span className="mt-7 block text-xs font-semibold uppercase tracking-widest text-green-700">
                  Password updated
                </span>

                <h1
                  className={`${montserrat.className} mt-4 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl`}
                >
                  You&apos;re all set.
                </h1>

                <p
                  role="status"
                  className="mt-4 text-sm leading-7 text-neutral-500"
                >
                  Your password has been updated. You can now sign in using your
                  new password.
                </p>

                <Link
                  href="/login"
                  className="group mt-8 flex min-h-12 w-full items-center justify-center gap-3 rounded-lg bg-[#DB4444] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#c33b3b]"
                >
                  Continue to login
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
                </Link>
              </div>
            ) : (
              <>
                {/* Heading */}
                <header>
                  <div className="flex size-12 items-center justify-center rounded-xl bg-[#DB4444]/10 text-[#DB4444]">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-6"
                    >
                      <rect x="4" y="10" width="16" height="11" rx="2" />
                      <path d="M8 10V6a4 4 0 0 1 8 0v4M12 14v3" />
                    </svg>
                  </div>

                  <span className="mt-6 block text-xs font-semibold uppercase tracking-widest text-[#DB4444]">
                    Account recovery
                  </span>

                  <h1
                    className={`${montserrat.className} mt-3 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl`}
                  >
                    Reset password.
                  </h1>

                  <p className="mt-3 text-sm leading-7 text-neutral-500">
                    Enter your account email and choose a new password.
                  </p>
                </header>

                {/* Recovery form */}
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  {/* Error feedback */}
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
                    <label htmlFor="recovery-email" className={labelClass}>
                      Email address
                    </label>

                    <input
                      id="recovery-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                      className={inputClass}
                    />
                  </div>

                  {/* New password */}
                  <PasswordField
                    name="password"
                    label="New password"
                    placeholder="Enter new password"
                    value={formData.password}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />

                  {/* Confirmation */}
                  <PasswordField
                    name="confirmation"
                    label="Confirm password"
                    placeholder="Confirm new password"
                    value={formData.confirmation}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />

                  {/* Password validation */}
                  <div className="space-y-2">
                    <p
                      className={`flex items-center gap-2 text-xs ${
                        formData.password.length >= 8
                          ? "text-green-700"
                          : "text-neutral-500"
                      }`}
                    >
                      <span aria-hidden="true">
                        {formData.password.length >= 8 ? "✓" : "○"}
                      </span>
                      At least 8 characters
                    </p>

                    <p
                      className={`flex items-center gap-2 text-xs ${
                        passwordsMatch
                          ? "text-green-700"
                          : formData.confirmation &&
                              formData.password !== formData.confirmation
                            ? "text-[#DB4444]"
                            : "text-neutral-500"
                      }`}
                    >
                      <span aria-hidden="true">
                        {passwordsMatch ? "✓" : "○"}
                      </span>

                      {formData.confirmation &&
                      formData.password !== formData.confirmation
                        ? "Passwords do not match"
                        : "Passwords must match"}
                    </p>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group flex min-h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-lg bg-[#DB4444] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#c33b3b] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isLoading ? "Updating password..." : "Update password"}

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

                  {/* Demo notice */}
                  <div className="rounded-lg bg-neutral-50 p-4">
                    <p className="text-xs leading-6 text-neutral-500">
                      Demo account recovery only. This feature does not send a
                      password reset email.
                    </p>
                  </div>
                </form>

                {/* Sign in */}
                <p className="mt-7 text-center text-sm text-neutral-500">
                  Remember your password?{" "}
                  <Link
                    href="/login"
                    className="font-semibold text-[#DB4444] hover:underline hover:underline-offset-4"
                  >
                    Sign in
                  </Link>
                </p>

                {/* Support */}
                <div className="mt-7 border-t border-neutral-200 pt-6 text-center">
                  <p className="text-xs text-neutral-500">
                    Need help accessing your account?{" "}
                    <Link
                      href="/contact"
                      className="font-medium text-neutral-800 transition-colors hover:text-[#DB4444]"
                    >
                      Contact support
                    </Link>
                  </p>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
