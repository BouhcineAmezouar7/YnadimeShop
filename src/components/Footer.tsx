"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { montserrat } from "@/app/fonts";

const footerLinks = [
  {
    title: "Shop",
    links: [
      { label: "All products", href: "/store" },
      { label: "Clothing", href: "/store?category=Clothing" },
      { label: "Accessories", href: "/store?category=Accessories" },
      { label: "Electronics", href: "/store?category=Electronics" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "My account", href: "/profile" },
      { label: "My orders", href: "/orders" },
      { label: "Shopping cart", href: "/card" },
      { label: "Wishlist", href: "/favorite" },
      { label: "Login / Register", href: "/login" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact us", href: "/contact" },
      { label: "FAQs", href: "/info/faq" },
      { label: "Privacy policy", href: "/info/privacy" },
      { label: "Terms & conditions", href: "/info/terms" },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) return;

    // Connect your newsletter API here.
    setSubmitted(true);
  }

  return (
    <footer className="bg-[#141414] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter */}
        <div className="grid gap-8 border-b border-white/10 py-10 md:grid-cols-2 md:items-center lg:py-14">
          <div>
            <h2
              className={`${montserrat.className} text-2xl font-semibold tracking-tight sm:text-3xl`}
            >
              Stay in the loop.
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-neutral-400">
              Discover new products, exclusive offers and updates from
              YnadimeShop.
            </p>
          </div>

          <div className="w-full md:max-w-md md:justify-self-end">
            <form
              onSubmit={handleSubscribe}
              className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 p-1.5 focus-within:border-white/40"
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>

              <input
                id="footer-email"
                type="email"
                name="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setSubmitted(false);
                }}
                required
                autoComplete="email"
                placeholder="Your email address"
                className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-neutral-500"
              />

              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="flex size-11 shrink-0 items-center justify-center rounded-md bg-[#DB4444] text-white transition-colors hover:bg-[#c33b3b]"
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
                  <path d="M4 12h16m-6-6 6 6-6 6" />
                </svg>
              </button>
            </form>

            {submitted && (
              <p role="status" className="mt-3 text-xs text-neutral-400">
                Newsletter subscription is not connected yet.
              </p>
            )}

            <p className="mt-3 text-xs text-neutral-500">
              Read our{" "}
              <Link
                href="/info/privacy"
                className="underline underline-offset-2 hover:text-white"
              >
                privacy policy
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Main footer */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:py-16">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link
              href="/"
              className={`${montserrat.className} inline-block text-2xl font-bold tracking-tight`}
            >
              YnadimeShop
              <span className="text-[#DB4444]">.</span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-7 text-neutral-400">
              Your destination for modern fashion, innovative technology, and
              everyday essentials. All in one place.
            </p>

            <Link
              href="/contact"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-[#DB4444]"
            >
              Get in touch
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

          {/* Navigation columns */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="mb-5 text-sm font-semibold text-white">
                {section.title}
              </h3>

              <ul className="space-y-3">
                {section.links.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm leading-relaxed text-neutral-400 transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom footer */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 sm:flex-row">
          <p className="text-center text-xs text-neutral-500 sm:text-left">
            © {new Date().getFullYear()} YnadimeShop. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <Link
              href="/info/privacy"
              className="text-xs text-neutral-400 transition-colors hover:text-white"
            >
              Privacy
            </Link>

            <Link
              href="/info/terms"
              className="text-xs text-neutral-400 transition-colors hover:text-white"
            >
              Terms
            </Link>

            <Link
              href="/contact"
              className="text-xs text-neutral-400 transition-colors hover:text-white"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
