"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { montserrat } from "@/app/fonts";

const contactInfo = [
  {
    title: "Call us",
    description: "Available 24/7, every day.",
    icon: (
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2A18 18 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.7 3a2 2 0 0 1-.6 2.1L8 10a14 14 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.6l3 .7a2 2 0 0 1 1.7 2Z" />
    ),
    links: [
      {
        label: "(123) 456-7890",
        href: "tel:+1234567890",
      },
    ],
  },
  {
    title: "Email us",
    description: "For support and general inquiries.",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    links: [
      {
        label: "support@example.com",
        href: "mailto:support@example.com",
      },
      {
        label: "sales@example.com",
        href: "mailto:sales@example.com",
      },
    ],
  },
  {
    title: "Response time",
    description: "We aim to respond within 24 hours.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    links: [],
  },
];

const inputClass =
  "min-h-12 w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-[#DB4444] focus:ring-2 focus:ring-[#DB4444]/10";

const labelClass =
  "mb-2 block text-sm font-medium text-neutral-800";

export default function ContactPage() {
  const [status, setStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = Object.fromEntries(new FormData(form));

    try {
      const stored = JSON.parse(
        window.localStorage.getItem(
          "ynadime_contact_messages"
        ) || "[]"
      );

      const existing = Array.isArray(stored) ? stored : [];

      window.localStorage.setItem(
        "ynadime_contact_messages",
        JSON.stringify([...existing, formData])
      );

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="container mx-auto px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pb-24">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 text-sm"
      >
        <Link
          href="/"
          className="text-neutral-500 transition-colors hover:text-[#DB4444]"
        >
          Home
        </Link>

        <span className="text-neutral-300">/</span>

        <span
          aria-current="page"
          className="font-medium text-neutral-900"
        >
          Contact
        </span>
      </nav>

      {/* Page header */}
      <header className="border-b border-neutral-200 py-10 lg:py-14">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#DB4444]">
          Contact us
        </span>

        <h1
          className={`${montserrat.className} mt-4 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl`}
        >
          Let&apos;s get in touch.
        </h1>

        <p className="mt-4 max-w-xl text-sm leading-7 text-neutral-500 sm:text-base">
          Have a question about your order, our products,
          or anything else? We&apos;d love to hear from you.
        </p>
      </header>

      {/* Main content */}
      <div className="mt-10 grid items-start gap-8 lg:mt-14 lg:grid-cols-[0.85fr_1.5fr] lg:gap-16">

        {/* Contact information */}
        <aside className="rounded-xl bg-[#F5F5F5] p-6 sm:p-8">
          <h2
            className={`${montserrat.className} text-xl font-semibold tracking-tight text-neutral-900`}
          >
            Contact information
          </h2>

          <p className="mt-2 text-sm leading-6 text-neutral-500">
            Choose the best way to reach us.
          </p>

          <div className="mt-8 divide-y divide-neutral-200">
            {contactInfo.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 py-6 first:pt-0 last:pb-0"
              >
                {/* Icon */}
                <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-white text-[#DB4444]">
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
                    {item.icon}
                  </svg>
                </div>

                {/* Information */}
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-neutral-900">
                    {item.title}
                  </h3>

                  <p className="mt-1.5 text-sm leading-6 text-neutral-500">
                    {item.description}
                  </p>

                  {item.links.length > 0 && (
                    <div className="mt-3 flex flex-col gap-1.5">
                      {item.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          className="break-all text-sm font-medium text-neutral-800 transition-colors hover:text-[#DB4444]"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Contact form */}
        <section className="min-w-0">
          <h2
            className={`${montserrat.className} text-2xl font-semibold tracking-tight text-neutral-900`}
          >
            Send us a message
          </h2>

          <p className="mt-2 text-sm leading-6 text-neutral-500">
            Fill in the form below and let us know how we
            can help.
          </p>

          <form
            onSubmit={handleSubmit}
            onChange={() => {
              if (status !== "idle") setStatus("idle");
            }}
            className="mt-8 space-y-6"
          >
            {/* Name and email */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className={labelClass}
                >
                  Full name{" "}
                  <span className="text-[#DB4444]">*</span>
                </label>

                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Enter your name"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className={labelClass}
                >
                  Email address{" "}
                  <span className="text-[#DB4444]">*</span>
                </label>

                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="contact-phone"
                className={labelClass}
              >
                Phone number
                <span className="ml-2 text-xs font-normal text-neutral-400">
                  Optional
                </span>
              </label>

              <input
                id="contact-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="Enter your phone number"
                className={inputClass}
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="contact-message"
                className={labelClass}
              >
                Your message{" "}
                <span className="text-[#DB4444]">*</span>
              </label>

              <textarea
                id="contact-message"
                name="message"
                required
                rows={6}
                placeholder="How can we help you?"
                className={`${inputClass} min-h-40 resize-y`}
              />
            </div>

            {/* Form feedback */}
            {status === "success" && (
              <div
                role="status"
                className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
              >
                Your message has been saved locally.
                It has not been sent to the support team.
              </div>
            )}

            {status === "error" && (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                Unable to save your message. Please try
                again.
              </div>
            )}

            {/* Submit */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-neutral-500">
                Read our{" "}
                <Link
                  href="/info/privacy"
                  className="underline underline-offset-2 hover:text-[#DB4444]"
                >
                  privacy policy
                </Link>
                .
              </p>

              <button
                type="submit"
                className="group inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-4 rounded-lg bg-[#DB4444] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#c33b3b] sm:w-auto"
              >
                Send message

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
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}