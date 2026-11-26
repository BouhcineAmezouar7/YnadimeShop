"use client";

import { memo, useEffect, useState } from "react";
import ViewAllLink from "./ViewAllLink";

const INITIAL_SECONDS = 19 * 86400 + 23 * 3600 + 44 * 60 + 11;

const DayOffer = memo(function DayOffer() {
  const [remaining, setRemaining] = useState(INITIAL_SECONDS);

  useEffect(() => {
    const deadline = Date.now() + INITIAL_SECONDS * 1000;
    const interval = window.setInterval(() => {
      const seconds = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setRemaining(seconds);
      if (seconds === 0) window.clearInterval(interval);
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const units = [
    { label: "Days", value: Math.floor(remaining / 86400) },
    { label: "Hours", value: Math.floor((remaining % 86400) / 3600) },
    { label: "Minutes", value: Math.floor((remaining % 3600) / 60) },
    { label: "Seconds", value: remaining % 60 },
  ];

  return (
    <section
      aria-labelledby="flash-sale-heading"
      className="container mx-auto px-4 pt-12 sm:px-6 lg:px-8 lg:pt-16"
    >
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
        <div className="min-w-0">
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#DB4444]">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
            >
              <path d="m13 2-9 12h7l-1 8 10-12h-7l1-8Z" />
            </svg>
            Today&apos;s offers
          </div>
          <h2
            id="flash-sale-heading"
            className="text-2xl font-semibold tracking-tight text-neutral-950 dark:text-white sm:text-3xl"
          >
            Flash Sales
          </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
            Limited-time savings on your everyday favorites.
          </p>
        </div>
        <div className="flex w-full flex-wrap items-center justify-between gap-4 lg:w-auto lg:gap-8">
          <div
            className="flex items-center gap-2 sm:gap-3"
            role="timer"
            aria-label="Time remaining in flash sale"
          >
            {units.map(({ label, value }) => (
              <div
                key={label}
                className="flex min-w-[44px] flex-col items-center gap-1 sm:min-w-[52px]"
              >
                <span className="flex h-10 w-full items-center justify-center rounded-md bg-neutral-100 px-2 text-xl font-semibold tabular-nums text-neutral-900 dark:bg-neutral-800 dark:text-white sm:h-12 sm:text-2xl">
                  {String(value).padStart(2, "0")}
                </span>
                <span className="text-[10px] font-medium text-neutral-500 dark:text-neutral-400">
                  {label}
                </span>
              </div>
            ))}
          </div>
          <ViewAllLink
            href="/store"
          />
        </div>
      </div>
      <div className="mt-6 border-b border-neutral-200 dark:border-neutral-800" />
    </section>
  );
});

export default DayOffer;
