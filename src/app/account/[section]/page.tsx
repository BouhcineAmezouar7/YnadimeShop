"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import ProfileSidebar from "@/components/Profile/ProfileSidebar";
import { montserrat } from "@/app/fonts";
import { auth } from "@/utils/auth";

const sections = {
  addresses: {
    title: "Address book",
    description: "Manage your default delivery address.",
  },
  payment: {
    title: "Payment options",
    description: "Manage your preferred payment methods.",
  },
  returns: {
    title: "My returns",
    description: "View and manage your return requests.",
  },
  cancellations: {
    title: "Cancellations",
    description: "View your cancelled order history.",
  },
};

type Section = keyof typeof sections;

type PaymentMethod = {
  holder: string;
  last4: string;
};

const inputClass =
  "min-h-12 w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-[#DB4444] focus:ring-2 focus:ring-[#DB4444]/10 disabled:opacity-60";

const labelClass =
  "mb-2 block text-sm font-medium text-neutral-800";

const primaryButton =
  "inline-flex min-h-12 cursor-pointer items-center justify-center gap-3 rounded-lg bg-[#DB4444] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#c33b3b] disabled:cursor-not-allowed disabled:opacity-50";

const secondaryButton =
  "inline-flex min-h-12 cursor-pointer items-center justify-center rounded-lg border border-neutral-200 px-6 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 disabled:opacity-50";

function ArrowIcon() {
  return (
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
      <path d="M4 12h16m-6-6 6 6-6 6" />
    </svg>
  );
}

/* Shared panel header */
function PanelHeader({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: "address" | "payment" | "orders";
}) {
  return (
    <header className="flex items-start justify-between gap-4 border-b border-neutral-200 p-6 sm:p-8">
      <div>
        <h2
          className={`${montserrat.className} text-xl font-semibold tracking-tight text-neutral-950`}
        >
          {title}
        </h2>

        <p className="mt-2 text-sm leading-6 text-neutral-500">
          {description}
        </p>
      </div>

      <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-700">
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
          {icon === "address" && (
            <>
              <path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="2.5" />
            </>
          )}

          {icon === "payment" && (
            <>
              <rect x="2" y="4" width="20" height="16" rx="3" />
              <path d="M2 9h20M6 15h4" />
            </>
          )}

          {icon === "orders" && (
            <>
              <path d="m12 3 9 5-9 5-9-5 9-5Z" />
              <path d="M3 8v9l9 5 9-5V8M12 13v9" />
            </>
          )}
        </svg>
      </div>
    </header>
  );
}

export default function AccountSectionPage() {
  const params = useParams();
  const router = useRouter();

  const section = String(params.section || "addresses");

  const isValidSection = Object.prototype.hasOwnProperty.call(
    sections,
    section
  );

  const currentSection = isValidSection
    ? sections[section as Section]
    : null;

  const [user, setUser] = useState<
    ReturnType<typeof auth.getCurrentUser>
  >(null);

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod | null>(null);

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      if (!auth.isAuthenticated()) {
        router.replace("/login");
        return;
      }

      setUser(auth.getCurrentUser());

      const storedPayment = localStorage.getItem(
        "ynadime_payment"
      );

      if (storedPayment) {
        setPaymentMethod(JSON.parse(storedPayment));
      }
    } catch {
      setError("Unable to load your account details.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    setSaved(false);
    setError("");
  }, [section]);

  function clearFeedback() {
    setSaved(false);
    setError("");
  }

  async function handleSave(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (isSaving || !user) return;

    setIsSaving(true);
    clearFeedback();

    const data = new FormData(event.currentTarget);

    try {
      if (section === "addresses") {
        await auth.updateUser({
          address: String(data.get("address") || "").trim(),
          city: String(data.get("city") || "").trim(),
          postal_code: String(
            data.get("postalCode") || ""
          ).trim(),
          country: String(data.get("country") || "").trim(),
        });

        setUser(auth.getCurrentUser());
      } else if (section === "payment") {
        const method = {
          holder: String(data.get("holder") || "").trim(),
          last4: "4242",
        };

        localStorage.setItem(
          "ynadime_payment",
          JSON.stringify(method)
        );

        setPaymentMethod(method);
      } else {
        return;
      }

      setSaved(true);
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : "Unable to save your changes."
      );
    } finally {
      setIsSaving(false);
    }
  }

  function removePaymentMethod() {
    try {
      localStorage.removeItem("ynadime_payment");
      setPaymentMethod(null);
      clearFeedback();
    } catch {
      setError("Unable to remove the payment method.");
    }
  }

  const addressFields = [
    {
      name: "address",
      label: "Street address",
      placeholder: "Enter your street address",
      autoComplete: "street-address",
      value: user?.address || "",
      className: "sm:col-span-2",
    },
    {
      name: "city",
      label: "City",
      placeholder: "Enter your city",
      autoComplete: "address-level2",
      value: user?.city || "",
      className: "",
    },
    {
      name: "postalCode",
      label: "Postal code",
      placeholder: "Enter postal code",
      autoComplete: "postal-code",
      value: user?.postal_code || "",
      className: "",
    },
    {
      name: "country",
      label: "Country",
      placeholder: "Enter your country",
      autoComplete: "country-name",
      value: user?.country || "",
      className: "sm:col-span-2",
    },
  ];

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

        <Link
          href="/profile"
          className="text-neutral-500 transition-colors hover:text-[#DB4444]"
        >
          My account
        </Link>

        <span className="text-neutral-300">/</span>

        <span
          aria-current="page"
          className="font-medium text-neutral-900"
        >
          {currentSection?.title || "Account"}
        </span>
      </nav>

      {/* Page header */}
      <header className="flex flex-wrap items-end justify-between gap-6 border-b border-neutral-200 py-10 lg:py-14">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#DB4444]">
            Your account
          </span>

          <h1
            className={`${montserrat.className} mt-4 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl`}
          >
            {currentSection?.title || "Account"}.
          </h1>

          <p className="mt-3 text-sm leading-6 text-neutral-500">
            {currentSection?.description ||
              "Manage your account preferences."}
          </p>
        </div>

        {user && (
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-full bg-neutral-100 font-semibold text-neutral-800">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div>
              <p className="text-xs text-neutral-500">
                Welcome back,
              </p>

              <p className="mt-1 text-sm font-semibold text-neutral-900">
                {user.name}
              </p>
            </div>
          </div>
        )}
      </header>

      {/* Loading state */}
      {loading ? (
        <div
          role="status"
          aria-label="Loading account details"
          className="mt-10 grid animate-pulse gap-8 lg:grid-cols-[260px_minmax(0,1fr)]"
        >
          <div className="h-96 rounded-xl bg-neutral-100" />

          <div className="space-y-5 rounded-xl border border-neutral-200 p-7">
            <div className="h-6 w-48 rounded bg-neutral-100" />

            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} className="space-y-2">
                <div className="h-3 w-24 rounded bg-neutral-100" />
                <div className="h-12 rounded-lg bg-neutral-100" />
              </div>
            ))}
          </div>
        </div>
      ) : !user ? (
        <div className="mt-10 rounded-xl border border-neutral-200 bg-neutral-50 px-6 py-20 text-center">
          <h2 className="text-xl font-semibold">
            Please sign in to continue.
          </h2>

          <Link
            href="/login"
            className={`${primaryButton} mt-6`}
          >
            Sign in
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)] xl:gap-12">
          {/* Account navigation */}
          <aside className="min-w-0 lg:sticky lg:top-28">
            <ProfileSidebar />
          </aside>

          {/* Dynamic account content */}
          <div className="min-w-0 space-y-5">
            {!isValidSection ? (
              <section className="rounded-xl border border-neutral-200 px-6 py-20 text-center">
                <h2 className="text-xl font-semibold">
                  Account section not found.
                </h2>

                <Link
                  href="/profile"
                  className={`${primaryButton} mt-6`}
                >
                  Back to profile
                </Link>
              </section>
            ) : (
              <>
                {/* Address book */}
                {section === "addresses" && (
                  <section className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
                    <PanelHeader
                      title="Delivery address"
                      description="Update the address used for your orders."
                      icon="address"
                    />

                    <form
                      key={`address-${user.email}`}
                      onSubmit={handleSave}
                      onChange={clearFeedback}
                      className="p-6 sm:p-8"
                    >
                      <div className="grid gap-5 sm:grid-cols-2">
                        {addressFields.map((field) => (
                          <div
                            key={field.name}
                            className={field.className}
                          >
                            <label
                              htmlFor={field.name}
                              className={labelClass}
                            >
                              {field.label}
                            </label>

                            <input
                              id={field.name}
                              name={field.name}
                              type="text"
                              required
                              disabled={isSaving}
                              defaultValue={field.value}
                              placeholder={field.placeholder}
                              autoComplete={field.autoComplete}
                              className={inputClass}
                            />
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 flex flex-wrap justify-end gap-3 border-t border-neutral-200 pt-6">
                        <button
                          type="reset"
                          onClick={clearFeedback}
                          disabled={isSaving}
                          className={secondaryButton}
                        >
                          Cancel
                        </button>

                        <button
                          type="submit"
                          disabled={isSaving}
                          className={primaryButton}
                        >
                          {isSaving
                            ? "Saving..."
                            : "Save address"}
                        </button>
                      </div>
                    </form>
                  </section>
                )}

                {/* Payment options */}
                {section === "payment" && (
                  <section className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
                    <PanelHeader
                      title="Payment methods"
                      description="Manage your saved demo payment method."
                      icon="payment"
                    />

                    <div className="p-6 sm:p-8">
                      {/* Demo card preview */}
                      <div className="relative flex aspect-[1.7] w-full max-w-sm flex-col justify-between overflow-hidden rounded-2xl bg-[#141414] p-6 text-white sm:p-8">
                        <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full border border-white/10" />

                        <div className="pointer-events-none absolute -bottom-28 -right-10 size-72 rounded-full border border-white/10" />

                        <div className="relative flex items-center justify-between">
                          <span
                            className={`${montserrat.className} text-sm font-semibold tracking-tight`}
                          >
                            YnadimeShop
                            <span className="text-[#DB4444]">
                              .
                            </span>
                          </span>

                          <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="size-7 text-neutral-400"
                          >
                            <rect
                              x="2"
                              y="4"
                              width="20"
                              height="16"
                              rx="3"
                            />
                            <path d="M2 9h20M6 15h4" />
                          </svg>
                        </div>

                        <div className="relative">
                          <p className="text-lg font-medium tracking-[0.15em] sm:text-xl">
                            •••• •••• ••••{" "}
                            {paymentMethod?.last4 || "4242"}
                          </p>
                        </div>

                        <div className="relative flex items-end justify-between gap-4">
                          <div className="min-w-0">
                            <p className="text-[10px] uppercase tracking-widest text-neutral-400">
                              Cardholder
                            </p>

                            <p className="mt-2 truncate text-sm font-medium uppercase">
                              {paymentMethod?.holder ||
                                "Your name"}
                            </p>
                          </div>

                          <span className="text-xs font-medium uppercase text-neutral-400">
                            Demo
                          </span>
                        </div>
                      </div>

                      {/* Saved payment information */}
                      {paymentMethod && (
                        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-neutral-200 p-4">
                          <div>
                            <p className="text-sm font-semibold text-neutral-900">
                              Saved demo payment method
                            </p>

                            <p className="mt-1 text-xs text-neutral-500">
                              Ending in {paymentMethod.last4}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={removePaymentMethod}
                            disabled={isSaving}
                            className="text-sm font-medium text-[#DB4444] hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      )}

                      <form
                        onSubmit={handleSave}
                        onChange={clearFeedback}
                        className="mt-8 space-y-5"
                      >
                        <div>
                          <label
                            htmlFor="holder"
                            className={labelClass}
                          >
                            Cardholder name
                          </label>

                          <input
                            key={paymentMethod?.holder || "new"}
                            id="holder"
                            name="holder"
                            type="text"
                            required
                            disabled={isSaving}
                            defaultValue={
                              paymentMethod?.holder || ""
                            }
                            placeholder="Enter cardholder name"
                            className={inputClass}
                          />
                        </div>

                        <div>
                          <label className={labelClass}>
                            Demo card number
                          </label>

                          <div className="flex min-h-12 items-center rounded-lg border border-neutral-200 bg-neutral-50 px-4 text-sm tracking-wider text-neutral-500">
                            4242 4242 4242 4242
                          </div>
                        </div>

                        {/* Demo notice */}
                        <div className="flex items-start gap-3 rounded-lg bg-neutral-100 p-4">
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="mt-0.5 size-5 shrink-0 text-neutral-600"
                          >
                            <circle cx="12" cy="12" r="9" />
                            <path d="M12 11v6M12 7h.01" />
                          </svg>

                          <div>
                            <p className="text-sm font-medium text-neutral-900">
                              Demo payment only
                            </p>

                            <p className="mt-1 text-xs leading-6 text-neutral-500">
                              No real payment is processed.
                              Never enter real card details.
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-end border-t border-neutral-200 pt-6">
                          <button
                            type="submit"
                            disabled={isSaving}
                            className={primaryButton}
                          >
                            {isSaving
                              ? "Saving..."
                              : "Save payment method"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </section>
                )}

                {/* Returns and cancellations */}
                {["returns", "cancellations"].includes(
                  section
                ) && (
                  <section className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
                    <PanelHeader
                      title={
                        section === "returns"
                          ? "Return history"
                          : "Cancellation history"
                      }
                      description="Review your order requests."
                      icon="orders"
                    />

                    <div className="flex flex-col items-center justify-center px-6 py-20 text-center sm:py-28">
                      <div className="flex size-20 items-center justify-center rounded-full bg-neutral-100 text-neutral-700">
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="size-9"
                        >
                          {section === "returns" ? (
                            <path d="M3 12a9 9 0 1 1 3 6.7M3 4v8h8" />
                          ) : (
                            <>
                              <circle
                                cx="12"
                                cy="12"
                                r="9"
                              />
                              <path d="m9 9 6 6m0-6-6 6" />
                            </>
                          )}
                        </svg>
                      </div>

                      <h2
                        className={`${montserrat.className} mt-6 text-2xl font-semibold tracking-tight text-neutral-950`}
                      >
                        {section === "returns"
                          ? "No returns yet."
                          : "No cancellations yet."}
                      </h2>

                      <p className="mt-3 max-w-sm text-sm leading-7 text-neutral-500">
                        This section currently has no order
                        requests to display. You can review
                        your existing orders below.
                      </p>

                      <Link
                        href="/orders"
                        className={`${primaryButton} mt-7`}
                      >
                        View my orders
                        <ArrowIcon />
                      </Link>
                    </div>
                  </section>
                )}

                {/* Success feedback */}
                {saved && (
                  <div
                    role="status"
                    className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-5 shrink-0"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="m8 12 3 3 5-6" />
                    </svg>

                    Your changes have been saved successfully.
                  </div>
                )}

                {/* Error feedback */}
                {error && (
                  <div
                    role="alert"
                    className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                  >
                    {error}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}