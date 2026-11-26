"use client";

import React, { useState } from "react";
import Link from "next/link";

const TopNav = React.memo(function TopNav() {
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  return (
    <div className="bg-neutral-950 text-white">
      <div className="container mx-auto flex min-h-9 items-center justify-between gap-3 px-4 py-2 sm:px-6">
        <div className="hidden flex-1 md:block" />
        <p className="flex flex-wrap items-center gap-x-2 text-[11px] leading-4 sm:text-xs md:justify-center">
          <span className="text-neutral-200">Summer Sale — Up to 50% off selected swimwear</span>
          <span className="hidden text-neutral-400 lg:inline">· Free express delivery</span>
          <Link href="/store" className="whitespace-nowrap font-semibold underline underline-offset-4 hover:text-neutral-300">Shop now →</Link>
        </p>
        <div className="flex flex-none justify-end md:flex-1">
          <select aria-label="Language" value={selectedLanguage} onChange={(event) => setSelectedLanguage(event.target.value)} className="max-w-24 cursor-pointer bg-neutral-950 text-xs text-neutral-200 outline-none focus-visible:ring-1 focus-visible:ring-white">
            <option value="English">English</option>
            <option value="French">French</option>
            <option value="Spanish">Spanish</option>
          </select>
        </div>
      </div>
    </div>
  );
});

export default TopNav;
