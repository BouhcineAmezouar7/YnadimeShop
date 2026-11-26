"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    title: "Account",
    links: [
      {
        label: "My profile",
        href: "/profile",
        icon: (
          <>
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21v-2a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v2" />
          </>
        ),
      },
      {
        label: "Address book",
        href: "/account/addresses",
        icon: (
          <>
            <path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="2.5" />
          </>
        ),
      },
      {
        label: "Payment options",
        href: "/account/payment",
        icon: (
          <>
            <rect x="2" y="4" width="20" height="16" rx="3" />
            <path d="M2 9h20M6 15h4" />
          </>
        ),
      },
    ],
  },
  {
    title: "Shopping",
    links: [
      {
        label: "My orders",
        href: "/orders",
        icon: (
          <>
            <path d="m12 3 9 5-9 5-9-5 9-5Z" />
            <path d="M3 8v9l9 5 9-5V8M12 13v9M7.5 5.5l9 5" />
          </>
        ),
      },
      {
        label: "My returns",
        href: "/account/returns",
        icon: (
          <>
            <path d="M3 12a9 9 0 1 1 3 6.7M3 4v8h8" />
          </>
        ),
      },
      {
        label: "Cancellations",
        href: "/account/cancellations",
        icon: (
          <>
            <circle cx="12" cy="12" r="9" />
            <path d="m9 9 6 6m0-6-6 6" />
          </>
        ),
      },
      {
        label: "My wishlist",
        href: "/favorite",
        icon: (
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" />
        ),
      },
    ],
  },
];

export default function ProfileSidebar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Account navigation"
      className="overflow-hidden rounded-xl border border-neutral-200 bg-white"
    >
      {/* Sidebar heading */}
      <div className="flex items-center gap-3 border-b border-neutral-200 p-5">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-800">
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
        </div>

        <div>
          <h2 className="text-sm font-semibold text-neutral-900">My account</h2>

          <p className="mt-1 text-xs text-neutral-500">Customer dashboard</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="space-y-6 p-3 sm:p-4">
        {navigation.map((section) => (
          <div key={section.title}>
            <h3 className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
              {section.title}
            </h3>

            <ul className="space-y-1">
              {section.links.map((item) => {
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`group flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors ${
                        isActive
                          ? "bg-[#DB4444]/[0.08] font-semibold text-[#DB4444]"
                          : "font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                      }`}
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="size-[19px] shrink-0"
                      >
                        {item.icon}
                      </svg>

                      <span className="flex-1">{item.label}</span>

                      {isActive && (
                        <span className="size-1.5 rounded-full bg-[#DB4444]" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Return to store */}
      <div className="border-t border-neutral-200 p-4">
        <Link
          href="/store"
          className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-500 transition-colors hover:text-[#DB4444]"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-5 transition-transform group-hover:-translate-x-1"
          >
            <path d="M20 12H4m6-6-6 6 6 6" />
          </svg>
          Back to shopping
        </Link>
      </div>
    </nav>
  );
}
