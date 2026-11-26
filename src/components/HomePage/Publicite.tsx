"use client";

import { useEffect, useState } from "react";
import { montserrat } from "@/app/fonts";
import Image from "next/image";
import Link from "next/link";

const OFFER_DURATION = 5 * 86400 + 23 * 3600 + 59 * 60 + 35;

export default function Publicite() {
  const [remaining, setRemaining] = useState(OFFER_DURATION);

  useEffect(() => {
    const deadline = Date.now() + OFFER_DURATION * 1000;

    const timer = window.setInterval(() => {
      const seconds = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));

      setRemaining(seconds);

      if (seconds === 0) {
        window.clearInterval(timer);
      }
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const countdown = [
    {
      label: "Days",
      value: Math.floor(remaining / 86400),
    },
    {
      label: "Hours",
      value: Math.floor((remaining % 86400) / 3600),
    },
    {
      label: "Min",
      value: Math.floor((remaining % 3600) / 60),
    },
    {
      label: "Sec",
      value: remaining % 60,
    },
  ];

  return (
    <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div
        className={`${montserrat.className} relative grid overflow-hidden rounded-2xl bg-[#141414] lg:grid-cols-2`}
      >
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center p-6 sm:p-10 lg:p-14 xl:p-16">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#DB4444]">
            Exclusive offer
          </span>

          <h2 className="mt-5 text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl">
            Sound without
            <span className="block">limits.</span>
          </h2>

          <p className="mt-5 max-w-sm text-sm leading-7 text-neutral-400 sm:text-base">
            Experience exceptional sound with Sonic Hush wireless headphones.
            Designed for your everyday life.
          </p>

          {/* Countdown */}
          <div className="mt-8">
            <p className="mb-3 text-xs font-medium text-neutral-400">
              {remaining > 0 ? "Offer ends in" : "Offer ended"}
            </p>

            <div className="flex max-w-xs gap-2 sm:gap-3">
              {countdown.map((item) => (
                <div
                  key={item.label}
                  className="flex min-w-0 flex-1 flex-col items-center rounded-lg border border-white/10 bg-white/5 px-2 py-3"
                >
                  <span className="text-xl font-semibold tabular-nums text-white sm:text-2xl">
                    {String(item.value).padStart(2, "0")}
                  </span>

                  <span className="mt-1 text-[10px] text-neutral-400 sm:text-xs">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Shop button */}
          <div className="mt-8">
            <Link
              href="/productDetails/sonic-hush-headphones"
              className="group inline-flex min-h-12 items-center justify-center gap-4 rounded-lg bg-[#DB4444] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#c33b3b]"
            >
              Shop now
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
            </Link>
          </div>
        </div>

        {/* Product image */}
        <div className="relative min-h-[280px] overflow-hidden sm:min-h-[360px] lg:min-h-[480px]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#363636_0%,transparent_70%)]" />

          <Image
            src="/MusicPub.png"
            alt="Sonic Hush wireless headphones"
            fill
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="relative z-10 object-contain object-center"
          />
        </div>
      </div>
    </section>
  );
}
