"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { montserrat } from "@/app/fonts";
import { formatPrice } from "@/data/products";
import { auth } from "@/utils/auth";
import { clearCart, getStoredCart, type StoredCartItem } from "@/utils/cart";
import { saveOrder } from "@/utils/orders";

const inputClass =
  "mt-2 min-h-12 w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-[#DB4444] focus:ring-2 focus:ring-[#DB4444]/10";

const paymentMethods = [
  {
    name: "Cash on delivery",
    description: "Pay when your order arrives.",
    icon: (
      <>
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <circle cx="12" cy="12" r="3" />
        <path d="M6 12h.01M18 12h.01" />
      </>
    ),
  },
  {
    name: "Card (demo)",
    description: "Simulate a card payment without being charged.",
    icon: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="3" />
        <path d="M2 9h20M6 15h4" />
      </>
    ),
  },
];

export default function CheckoutPage() {
  const router = useRouter();

  const [items, setItems] = useState<StoredCartItem[]>([]);
  const [user, setUser] =
    useState<ReturnType<typeof auth.getCurrentUser>>(null);

  const [payment, setPayment] = useState("Cash on delivery");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setItems(getStoredCart());
    setUser(auth.getCurrentUser());
    setIsLoading(false);
  }, []);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const shipping = items.length > 0 ? 2 : 0;
  const tax = Math.round(subtotal * 0.02 * 100) / 100;
  const total = subtotal + shipping + tax;

  async function placeOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!items.length || isSubmitting) return;

    setIsSubmitting(true);
    setError("");

    const data = new FormData(event.currentTarget);
    const id = `YN-${Date.now().toString().slice(-8)}`;

    try {
      await saveOrder({
        id,
        date: new Date().toISOString(),
        status: "Processing",
        items,
        total,
        payment,
        customer: {
          name: String(data.get("name")),
          email: String(data.get("email")),
          address: String(data.get("address")),
          city: String(data.get("city")),
          postalCode: String(data.get("postalCode")),
          country: String(data.get("country")),
        },
      });

      clearCart();

      router.push(`/order-success?id=${encodeURIComponent(id)}`);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to place your order. Please try again.",
      );

      setIsSubmitting(false);
    }
  }

  const billingFields = [
    {
      name: "name",
      label: "Full name",
      placeholder: "Enter your full name",
      autoComplete: "name",
      defaultValue: user ? `${user.name} ${user.last_name}` : "",
      className: "sm:col-span-2",
    },
    {
      name: "email",
      label: "Email address",
      placeholder: "you@example.com",
      autoComplete: "email",
      defaultValue: user?.email || "",
      type: "email",
      className: "sm:col-span-2",
    },
    {
      name: "address",
      label: "Street address",
      placeholder: "Street and building number",
      autoComplete: "street-address",
      defaultValue: user?.address || "",
      className: "sm:col-span-2",
    },
    {
      name: "city",
      label: "City",
      placeholder: "Enter your city",
      autoComplete: "address-level2",
      defaultValue: user?.city || "",
      className: "",
    },
    {
      name: "postalCode",
      label: "Postal code",
      placeholder: "Postal code",
      autoComplete: "postal-code",
      defaultValue: user?.postal_code || "",
      className: "",
    },
    {
      name: "country",
      label: "Country",
      placeholder: "Enter your country",
      autoComplete: "country-name",
      defaultValue: user?.country || "",
      className: "sm:col-span-2",
    },
  ];

  return (
    <main className="container mx-auto min-h-[65vh] px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pb-24">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
        <Link
          href="/"
          className="text-neutral-500 transition-colors hover:text-[#DB4444]"
        >
          Home
        </Link>

        <span className="text-neutral-300">/</span>

        <Link
          href="/card"
          className="text-neutral-500 transition-colors hover:text-[#DB4444]"
        >
          Cart
        </Link>

        <span className="text-neutral-300">/</span>

        <span aria-current="page" className="font-medium text-neutral-900">
          Checkout
        </span>
      </nav>

      {/* Page header */}
      <header className="border-b border-neutral-200 py-10 lg:py-14">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#DB4444]">
          Complete your order
        </span>

        <h1
          className={`${montserrat.className} mt-4 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl`}
        >
          Checkout.
        </h1>

        <p className="mt-3 text-sm leading-6 text-neutral-500">
          Complete your delivery and payment information to place your order.
        </p>
      </header>

      {/* Loading state */}
      {isLoading ? (
        <div
          role="status"
          aria-label="Loading checkout"
          className="mt-10 grid animate-pulse gap-10 lg:grid-cols-[minmax(0,1fr)_420px]"
        >
          <div className="space-y-5">
            <div className="h-6 w-48 rounded bg-neutral-100" />

            {Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="space-y-2">
                <div className="h-3 w-24 rounded bg-neutral-100" />
                <div className="h-12 rounded-lg bg-neutral-100" />
              </div>
            ))}
          </div>

          <div className="h-96 rounded-xl bg-neutral-100" />
        </div>
      ) : items.length === 0 ? (
        /* Empty checkout */
        <section className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 px-6 py-20 text-center">
          <div className="flex size-20 items-center justify-center rounded-full border border-neutral-200 bg-white">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-9"
            >
              <path d="M6 7h12l2 14H4L6 7Z" />
              <path d="M9 9V5a3 3 0 0 1 6 0v4" />
            </svg>
          </div>

          <h2
            className={`${montserrat.className} mt-6 text-2xl font-semibold tracking-tight`}
          >
            Your cart is empty.
          </h2>

          <p className="mt-3 max-w-sm text-sm leading-6 text-neutral-500">
            Add something to your shopping cart before proceeding to checkout.
          </p>

          <Link
            href="/store"
            className="mt-7 rounded-lg bg-[#DB4444] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#c33b3b]"
          >
            Continue shopping
          </Link>
        </section>
      ) : (
        <>
          {/* Checkout progress */}
          <div className="mx-auto flex max-w-2xl items-center justify-center gap-3 py-8 sm:gap-5">
            <Link
              href="/card"
              className="flex shrink-0 items-center gap-2 text-xs font-medium text-neutral-600 sm:text-sm"
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-neutral-900 text-white">
                ✓
              </span>

              <span>Cart</span>
            </Link>

            <div className="h-px flex-1 bg-neutral-300" />

            <div
              aria-current="step"
              className="flex shrink-0 items-center gap-2 text-xs font-semibold text-[#DB4444] sm:text-sm"
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-[#DB4444] text-white">
                2
              </span>
              Checkout
            </div>

            <div className="h-px flex-1 bg-neutral-200" />

            <div className="flex shrink-0 items-center gap-2 text-xs text-neutral-400 sm:text-sm">
              <span className="flex size-8 items-center justify-center rounded-full border border-neutral-200">
                3
              </span>
              Confirmation
            </div>
          </div>

          {/* Checkout form */}
          <form
            onSubmit={placeOrder}
            className="mt-5 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_380px] xl:grid-cols-[minmax(0,1fr)_440px] xl:gap-16"
          >
            {/* Billing and payment */}
            <div className="min-w-0 space-y-10">
              {/* Contact information */}
              <section>
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-neutral-100 text-sm font-medium">
                    01
                  </span>

                  <h2
                    className={`${montserrat.className} text-xl font-semibold tracking-tight`}
                  >
                    Contact information
                  </h2>
                </div>

                <p className="mt-3 text-sm text-neutral-500">
                  Enter your contact details for this order.
                </p>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  {billingFields.slice(0, 2).map((field) => (
                    <div key={field.name} className={field.className}>
                      <label
                        htmlFor={field.name}
                        className="text-sm font-medium text-neutral-800"
                      >
                        {field.label}
                      </label>

                      <input
                        id={field.name}
                        name={field.name}
                        type={field.type || "text"}
                        required
                        defaultValue={field.defaultValue}
                        autoComplete={field.autoComplete}
                        placeholder={field.placeholder}
                        className={inputClass}
                      />
                    </div>
                  ))}
                </div>
              </section>

              {/* Delivery address */}
              <section className="border-t border-neutral-200 pt-8">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-neutral-100 text-sm font-medium">
                    02
                  </span>

                  <h2
                    className={`${montserrat.className} text-xl font-semibold tracking-tight`}
                  >
                    Delivery address
                  </h2>
                </div>

                <p className="mt-3 text-sm text-neutral-500">
                  Where should we deliver your order?
                </p>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  {billingFields.slice(2).map((field) => (
                    <div key={field.name} className={field.className}>
                      <label
                        htmlFor={field.name}
                        className="text-sm font-medium text-neutral-800"
                      >
                        {field.label}
                      </label>

                      <input
                        id={field.name}
                        name={field.name}
                        type="text"
                        required
                        defaultValue={field.defaultValue}
                        autoComplete={field.autoComplete}
                        placeholder={field.placeholder}
                        className={inputClass}
                      />
                    </div>
                  ))}
                </div>
              </section>

              {/* Payment method */}
              <fieldset className="border-t border-neutral-200 pt-8">
                <legend className="sr-only">Payment method</legend>

                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-neutral-100 text-sm font-medium">
                    03
                  </span>

                  <h2
                    className={`${montserrat.className} text-xl font-semibold tracking-tight`}
                  >
                    Payment method
                  </h2>
                </div>

                <p className="mt-3 text-sm text-neutral-500">
                  Choose how you would like to pay.
                </p>

                <div className="mt-6 space-y-3">
                  {paymentMethods.map((method) => {
                    const selected = payment === method.name;

                    return (
                      <label
                        key={method.name}
                        className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-colors sm:p-5 ${
                          selected
                            ? "border-[#DB4444] bg-[#DB4444]/[0.03]"
                            : "border-neutral-200 hover:border-neutral-400"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={method.name}
                          checked={selected}
                          onChange={() => setPayment(method.name)}
                          className="size-4 shrink-0 accent-[#DB4444]"
                        />

                        <div className="min-w-0 flex-1">
                          <span className="text-sm font-semibold text-neutral-900">
                            {method.name}
                          </span>

                          <p className="mt-1 text-xs leading-5 text-neutral-500">
                            {method.description}
                          </p>
                        </div>

                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="size-6 shrink-0 text-neutral-600"
                        >
                          {method.icon}
                        </svg>
                      </label>
                    );
                  })}
                </div>

                {/* Demo payment notice */}
                {payment === "Card (demo)" && (
                  <div className="mt-4 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
                    <p className="text-sm font-medium text-neutral-900">
                      Demo card payment
                    </p>

                    <p className="mt-2 text-xs leading-6 text-neutral-500">
                      This payment is simulated. No money will be charged and no
                      real card information is required.
                    </p>
                  </div>
                )}
              </fieldset>

              {/* Back to cart */}
              <Link
                href="/card"
                className="group inline-flex items-center gap-3 text-sm font-medium text-neutral-600 transition-colors hover:text-[#DB4444]"
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
                Return to cart
              </Link>
            </div>

            {/* Order summary */}
            <aside className="rounded-xl bg-[#F5F5F5] p-5 sm:p-7 lg:sticky lg:top-28">
              <div className="flex items-center justify-between gap-3">
                <h2
                  className={`${montserrat.className} text-xl font-semibold tracking-tight text-neutral-950`}
                >
                  Order summary
                </h2>

                <span className="text-xs text-neutral-500">
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </span>
              </div>

              {/* Order products */}
              <div className="mt-6 max-h-[360px] divide-y divide-neutral-200 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 py-4 first:pt-0"
                  >
                    <div className="relative size-[72px] shrink-0 overflow-hidden rounded-lg bg-white">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="72px"
                        className="object-cover object-center"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-neutral-900">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-xs text-neutral-500">
                        {item.color} · Qty: {item.quantity}
                      </p>

                      <p className="mt-2 text-sm font-medium text-neutral-900">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order totals */}
              <dl className="mt-4 space-y-4 border-t border-neutral-200 pt-6">
                {[
                  { label: "Subtotal", value: subtotal },
                  { label: "Shipping", value: shipping },
                  { label: "Tax (2%)", value: tax },
                ].map((entry) => (
                  <div
                    key={entry.label}
                    className="flex items-center justify-between gap-4 text-sm"
                  >
                    <dt className="text-neutral-500">{entry.label}</dt>

                    <dd className="font-medium tabular-nums text-neutral-900">
                      {formatPrice(entry.value)}
                    </dd>
                  </div>
                ))}

                <div className="flex items-center justify-between border-t border-neutral-200 pt-5">
                  <dt className="font-semibold text-neutral-950">Total</dt>

                  <dd className="text-2xl font-semibold tracking-tight tabular-nums text-neutral-950">
                    {formatPrice(total)}
                  </dd>
                </div>
              </dl>

              {/* Error feedback */}
              {error && (
                <div
                  role="alert"
                  className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                >
                  {error}
                </div>
              )}

              {/* Place order */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group mt-7 flex min-h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-lg bg-[#DB4444] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#c33b3b] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Placing your order..." : "Place order"}

                {!isSubmitting && (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5 transition-transform group-hover:translate-x-1"
                  >
                    <path d="M4 12h16m-6-6 6 6-6 6" />
                  </svg>
                )}
              </button>

              {/* Terms */}
              <p className="mt-5 text-center text-xs leading-6 text-neutral-500">
                By placing your order, you agree to our{" "}
                <Link
                  href="/info/terms"
                  className="font-medium text-neutral-700 underline underline-offset-2 hover:text-[#DB4444]"
                >
                  Terms &amp; Conditions
                </Link>{" "}
                and{" "}
                <Link
                  href="/info/privacy"
                  className="font-medium text-neutral-700 underline underline-offset-2 hover:text-[#DB4444]"
                >
                  Privacy Policy
                </Link>
                .
              </p>

              {/* Payment information */}
              <div className="mt-6 border-t border-neutral-200 pt-5">
                <div className="flex items-center justify-center gap-3">
                  {[
                    {
                      name: "Mastercard",
                      image: "/card/mastercard.png",
                    },
                    {
                      name: "Visa",
                      image: "/card/visa.png",
                    },
                    {
                      name: "American Express",
                      image: "/card/american-express.png",
                    },
                  ].map((method) => (
                    <div
                      key={method.name}
                      className="flex h-9 w-14 items-center justify-center rounded-md border border-neutral-200 bg-white"
                    >
                      <Image
                        src={method.image}
                        alt={method.name}
                        width={36}
                        height={24}
                        className="h-auto max-h-6 object-contain"
                      />
                    </div>
                  ))}
                </div>

                <p className="mt-3 text-center text-xs text-neutral-400">
                  Card payments are currently in demo mode.
                </p>
              </div>
            </aside>
          </form>
        </>
      )}
    </main>
  );
}
