"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { montserrat } from "@/app/fonts";
import { getOrders, type Order } from "@/utils/orders";

const nextSteps = [
  {
    title: "Order received",
    description: "Your order has been recorded.",
    icon: (
      <>
        <rect x="5" y="5" width="14" height="16" rx="2" />
        <rect x="9" y="2" width="6" height="5" rx="1" />
        <path d="m9 14 2 2 4-4" />
      </>
    ),
  },
  {
    title: "Order preparation",
    description: "The next step is preparing your items.",
    icon: (
      <>
        <path d="m12 3 9 5-9 5-9-5 9-5Z" />
        <path d="M3 8v9l9 5 9-5V8M12 13v9" />
      </>
    ),
  },
  {
    title: "Delivery",
    description: "Check your account for order updates.",
    icon: (
      <>
        <path d="M2 5h13v13H2zM15 9h4l3 4v5h-7" />
        <circle cx="6" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
      </>
    ),
  },
];

export default function OrderSuccessPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  useEffect(() => {
    try {
      const id = new URLSearchParams(window.location.search).get("id");

      if (id) {
        const existingOrder = getOrders().find((item) => item.id === id);

        setOrder(existingOrder || null);
      }
    } catch {
      setOrder(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!copied) return;

    const timeout = window.setTimeout(() => {
      setCopied(false);
    }, 2000);

    return () => window.clearTimeout(timeout);
  }, [copied]);

  async function copyOrderId() {
    if (!order) return;

    setCopyError(false);

    try {
      await navigator.clipboard.writeText(order.id);
      setCopied(true);
    } catch {
      setCopyError(true);
    }
  }

  return (
    <main className="container mx-auto min-h-[70vh] px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pb-24">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-2 text-sm"
      >
        <Link
          href="/"
          className="text-neutral-500 transition-colors hover:text-[#DB4444]"
        >
          Home
        </Link>

        <span className="text-neutral-300">/</span>

        <span className="text-neutral-500">Checkout</span>

        <span className="text-neutral-300">/</span>

        <span aria-current="page" className="font-medium text-neutral-900">
          Confirmation
        </span>
      </nav>

      {loading ? (
        /* Loading state */
        <div
          role="status"
          aria-label="Loading order confirmation"
          className="mx-auto mt-16 max-w-xl animate-pulse space-y-6 text-center"
        >
          <div className="mx-auto size-24 rounded-full bg-neutral-100" />

          <div className="mx-auto h-9 w-3/4 rounded-lg bg-neutral-100" />

          <div className="mx-auto h-4 w-2/3 rounded bg-neutral-100" />

          <div className="h-36 rounded-xl bg-neutral-100" />

          <div className="h-12 rounded-lg bg-neutral-100" />

          <div className="h-12 rounded-lg bg-neutral-100" />
        </div>
      ) : !order ? (
        /* Invalid or missing order */
        <section className="mx-auto flex max-w-xl flex-col items-center py-20 text-center">
          <div className="flex size-20 items-center justify-center rounded-full bg-neutral-100 text-neutral-600">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="size-9"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v6M12 16h.01" />
            </svg>
          </div>

          <h1
            className={`${montserrat.className} mt-7 text-3xl font-semibold tracking-tight`}
          >
            Order not found.
          </h1>

          <p className="mt-4 max-w-sm text-sm leading-7 text-neutral-500">
            We couldn&apos;t find this order. Please check your order history.
          </p>

          <Link
            href="/orders"
            className="mt-8 rounded-lg bg-[#DB4444] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#c33b3b]"
          >
            View my orders
          </Link>
        </section>
      ) : (
        <>
          {/* Checkout progress */}
          <div className="mx-auto flex max-w-2xl items-center justify-center gap-2 border-b border-neutral-200 py-8 sm:gap-5 sm:py-10">
            {["Cart", "Checkout", "Confirmation"].map((step, index) => (
              <div
                key={step}
                className={`flex items-center gap-2 ${
                  index === 2 ? "" : "flex-1"
                }`}
                aria-current={index === 2 ? "step" : undefined}
              >
                <span
                  className={`flex size-7 shrink-0 items-center justify-center rounded-full text-xs text-white sm:size-8 ${
                    index === 2 ? "bg-[#DB4444]" : "bg-neutral-900"
                  }`}
                >
                  ✓
                </span>

                <span
                  className={`text-[11px] font-medium sm:text-sm ${
                    index === 2 ? "text-[#DB4444]" : "text-neutral-600"
                  }`}
                >
                  {step}
                </span>

                {index < 2 && (
                  <div className="mx-1 h-px flex-1 bg-neutral-300 sm:mx-3" />
                )}
              </div>
            ))}
          </div>

          {/* Order confirmation */}
          <section className="mx-auto flex max-w-2xl flex-col items-center py-12 text-center lg:py-16">
            {/* Success icon */}
            <div className="flex size-24 items-center justify-center rounded-full border border-green-100 bg-green-50 text-green-700">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-14"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="m8 12 3 3 5-6" />
              </svg>
            </div>

            {/* Heading */}
            <span className="mt-8 text-xs font-semibold uppercase tracking-widest text-[#DB4444]">
              Order confirmed
            </span>

            <h1
              className={`${montserrat.className} mt-4 text-3xl font-semibold leading-tight tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl`}
            >
              Thank you for your order.
            </h1>

            <p className="mt-5 max-w-md text-sm leading-7 text-neutral-500 sm:text-base">
              Your order has been placed successfully. You can follow its
              progress from your account.
            </p>

            {/* Order information */}
            <div className="mt-8 w-full max-w-md rounded-xl border border-neutral-200 bg-[#F5F5F5] p-5 text-left sm:p-6">
              {/* Order reference */}
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs font-medium text-neutral-500">
                    Order reference
                  </p>

                  <p className="mt-2 break-all text-lg font-semibold tracking-tight text-neutral-950">
                    #{order.id}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={copyOrderId}
                  aria-label="Copy order reference"
                  title="Copy order reference"
                  className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-600 transition-colors hover:border-neutral-400 hover:text-neutral-950"
                >
                  {copied ? (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-5 text-green-700"
                    >
                      <path d="m5 12 4 4L19 6" />
                    </svg>
                  ) : (
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
                      <rect x="8" y="8" width="12" height="12" rx="2" />
                      <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
                    </svg>
                  )}
                </button>
              </div>

              {copied && (
                <p role="status" className="mt-2 text-xs text-green-700">
                  Order reference copied.
                </p>
              )}

              {copyError && (
                <p role="alert" className="mt-2 text-xs text-neutral-500">
                  Unable to copy. Please select and copy your order reference
                  manually.
                </p>
              )}

              {/* Order status */}
              <div className="mt-5 flex items-center justify-between gap-4 border-t border-neutral-200 pt-5">
                <span className="text-sm text-neutral-500">Order status</span>

                <span
                  className={`flex items-center gap-2 text-sm font-medium ${
                    order.status === "Cancelled"
                      ? "text-[#DB4444]"
                      : order.status === "Processing"
                        ? "text-amber-700"
                        : "text-neutral-700"
                  }`}
                >
                  <span className="size-1.5 rounded-full bg-current" />

                  {order.status}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-7 flex w-full max-w-md flex-col gap-3">
              <Link
                href="/orders"
                className="group flex min-h-12 items-center justify-center gap-3 rounded-lg bg-[#DB4444] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#c33b3b]"
              >
                View my orders
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

              <Link
                href="/store"
                className="flex min-h-12 items-center justify-center rounded-lg border border-neutral-200 bg-white px-6 py-3.5 text-sm font-medium text-neutral-900 transition-colors hover:border-neutral-400 hover:bg-neutral-50"
              >
                Continue shopping
              </Link>
            </div>
          </section>

          {/* Next steps */}
          {order.status === "Processing" && (
            <section className="mx-auto max-w-4xl border-t border-neutral-200 pt-10">
              <h2
                className={`${montserrat.className} text-center text-xl font-semibold tracking-tight text-neutral-950`}
              >
                What happens next?
              </h2>

              <div className="mt-8 grid gap-8 sm:grid-cols-3 sm:gap-5">
                {nextSteps.map((step) => (
                  <div
                    key={step.title}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="flex size-14 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700">
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
                        {step.icon}
                      </svg>
                    </div>

                    <h3 className="mt-4 text-sm font-semibold text-neutral-900">
                      {step.title}
                    </h3>

                    <p className="mt-2 max-w-xs text-xs leading-6 text-neutral-500">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Support */}
          <p className="mt-12 text-center text-sm text-neutral-500">
            Need help with your order?{" "}
            <Link
              href="/contact"
              className="font-medium text-[#DB4444] hover:underline hover:underline-offset-4"
            >
              Contact support
            </Link>
          </p>
        </>
      )}
    </main>
  );
}
