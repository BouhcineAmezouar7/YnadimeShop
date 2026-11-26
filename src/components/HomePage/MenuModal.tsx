"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  HomeIcon,
  Squares2X2Icon,
  InformationCircleIcon,
  ChatBubbleLeftRightIcon,
  ShoppingBagIcon,
  HeartIcon,
  UserCircleIcon,
  MagnifyingGlassIcon,
  ChevronRightIcon,
  XMarkIcon,
  ArrowRightStartOnRectangleIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

import { auth } from "@/utils/auth";

interface MenuModalProps {
  isOpen: boolean;
  toggleMenu: () => void;
  cartCount: number;
  favoriteCount: number;
  isLoggedIn: boolean;
}

const navigation = [
  {
    label: "Home",
    href: "/",
    icon: HomeIcon,
  },
  {
    label: "Shop all products",
    href: "/store",
    icon: Squares2X2Icon,
  },
  {
    label: "About us",
    href: "/about",
    icon: InformationCircleIcon,
  },
  {
    label: "Contact",
    href: "/contact",
    icon: ChatBubbleLeftRightIcon,
  },
];

export default function MenuModal({
  isOpen,
  toggleMenu,
  cartCount,
  favoriteCount,
  isLoggedIn,
}: MenuModalProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState("");

  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const closeMenuRef = useRef(toggleMenu);

  useEffect(() => {
    closeMenuRef.current = toggleMenu;
  }, [toggleMenu]);

  /* Scroll lock, keyboard navigation and focus management */
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;

    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMenuRef.current();
        return;
      }

      if (event.key !== "Tab") return;

      const elements = drawerRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex="0"]',
      );

      if (!elements?.length) return;

      const first = elements[0];
      const last = elements[elements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;

      document.removeEventListener("keydown", handleKeyDown);

      previousFocus?.focus();
    };
  }, [isOpen]);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const query = search.trim();

    router.push(
      query ? `/store?search=${encodeURIComponent(query)}` : "/store",
    );

    setSearch("");
    toggleMenu();
  }

  async function handleLogout() {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    setError("");

    try {
      await auth.logout();

      toggleMenu();
      window.location.assign("/");
    } catch {
      setError("Unable to sign out. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  }

  const shoppingLinks = [
    {
      label: "Wishlist",
      href: "/favorite",
      icon: HeartIcon,
      count: favoriteCount,
    },
    {
      label: "My cart",
      href: "/card",
      icon: ShoppingBagIcon,
      count: cartCount,
    },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={isOpen ? toggleMenu : undefined}
        className={`fixed inset-0 z-[100] bg-black/45 backdrop-blur-[2px] transition-opacity duration-300 motion-reduce:transition-none ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Navigation drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal={isOpen ? true : undefined}
        aria-labelledby="mobile-menu-title"
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={`fixed inset-y-0 right-0 z-[110] flex h-dvh w-[88%] max-w-[400px] flex-col bg-white transition-transform duration-300 ease-in-out motion-reduce:transition-none ${
          isOpen ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
      >
        {/* Header */}
        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-neutral-200 px-6 py-6">
          <div>
            <Link
              href="/"
              onClick={toggleMenu}
              id="mobile-menu-title"
              aria-label="YnadimeShop home"
              className="block"
            >
              <Image
                src="/full_logo.png"
                alt="YnadimeShop"
                width={2172}
                height={724}
                sizes="180px"
                className="h-auto w-[180px]"
              />
            </Link>

            <p className="mt-2 text-xs text-neutral-500">
              Discover something new.
            </p>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={toggleMenu}
            aria-label="Close menu"
            className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-neutral-100 text-neutral-700 transition-colors hover:bg-neutral-200 hover:text-neutral-950"
          >
            <XMarkIcon className="size-5" />
          </button>
        </header>

        {/* Scrollable content */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-6">
          {/* Product search */}
          <form
            onSubmit={handleSearch}
            className="flex min-h-12 items-center gap-3 rounded-lg border border-neutral-200 bg-[#F5F5F5] px-4 transition-colors focus-within:border-[#DB4444]"
          >
            <MagnifyingGlassIcon className="size-5 shrink-0 text-neutral-500" />

            <input
              type="search"
              name="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products..."
              aria-label="Search products"
              className="min-w-0 flex-1 bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
            />

            <button
              type="submit"
              aria-label="Submit search"
              className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-neutral-500 transition-colors hover:bg-neutral-200 hover:text-[#DB4444]"
            >
              <ChevronRightIcon className="size-4" />
            </button>
          </form>

          {/* Main navigation */}
          <nav aria-label="Mobile navigation" className="mt-8">
            <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-neutral-400">
              Explore
            </h2>

            <ul className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;

                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname === item.href ||
                      pathname.startsWith(`${item.href}/`);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={toggleMenu}
                      aria-current={isActive ? "page" : undefined}
                      className={`group flex min-h-12 items-center gap-3 rounded-lg px-3 py-3.5 text-sm transition-colors ${
                        isActive
                          ? "bg-[#DB4444]/[0.08] font-semibold text-[#DB4444]"
                          : "font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950"
                      }`}
                    >
                      <Icon className="size-5 shrink-0" />

                      <span className="flex-1">{item.label}</span>

                      <ChevronRightIcon
                        className={`size-4 transition-transform group-hover:translate-x-0.5 ${
                          isActive ? "text-[#DB4444]" : "text-neutral-400"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Shopping actions */}
          <section className="mt-7 border-t border-neutral-200 pt-7">
            <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-neutral-400">
              Your shopping
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {shoppingLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={toggleMenu}
                    className="group flex flex-col gap-5 rounded-xl border border-neutral-200 p-4 transition-colors hover:border-[#DB4444] hover:bg-[#DB4444]/[0.03]"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <Icon className="size-6 text-neutral-800 transition-colors group-hover:text-[#DB4444]" />

                      {item.count > 0 && (
                        <span className="flex min-w-6 items-center justify-center rounded-full bg-[#DB4444]/10 px-2 py-1 text-xs font-semibold tabular-nums text-[#DB4444]">
                          {item.count}
                        </span>
                      )}
                    </div>

                    <span className="text-sm font-medium text-neutral-900">
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Account navigation */}
          {isLoggedIn && (
            <section className="mt-7 border-t border-neutral-200 pt-7">
              <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-neutral-400">
                Your account
              </h2>

              <div className="space-y-1">
                <Link
                  href="/profile"
                  onClick={toggleMenu}
                  className="flex items-center gap-3 rounded-lg px-3 py-3.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-[#DB4444]"
                >
                  <UserCircleIcon className="size-5" />

                  <span className="flex-1">My account</span>

                  <ChevronRightIcon className="size-4 text-neutral-400" />
                </Link>

                <Link
                  href="/orders"
                  onClick={toggleMenu}
                  className="flex items-center gap-3 rounded-lg px-3 py-3.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-[#DB4444]"
                >
                  <ClipboardDocumentListIcon className="size-5" />

                  <span className="flex-1">My orders</span>

                  <ChevronRightIcon className="size-4 text-neutral-400" />
                </Link>
              </div>
            </section>
          )}
        </div>

        {/* Bottom account actions */}
        <footer className="shrink-0 border-t border-neutral-200 bg-white px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-5">
          {error && (
            <p
              role="alert"
              className="mb-3 rounded-lg bg-red-50 p-3 text-xs text-red-700"
            >
              {error}
            </p>
          )}

          {isLoggedIn ? (
            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex min-h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-lg border border-[#DB4444]/30 px-5 py-3 text-sm font-semibold text-[#DB4444] transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ArrowRightStartOnRectangleIcon className="size-5" />

              {isLoggingOut ? "Signing out..." : "Sign out"}
            </button>
          ) : (
            <div className="space-y-3">
              <Link
                href="/login"
                onClick={toggleMenu}
                className="flex min-h-12 w-full items-center justify-center rounded-lg bg-[#DB4444] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#c33b3b]"
              >
                Sign in
              </Link>

              <Link
                href="/signup"
                onClick={toggleMenu}
                className="flex min-h-12 w-full items-center justify-center rounded-lg border border-neutral-200 px-5 py-3 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-100"
              >
                Create an account
              </Link>
            </div>
          )}

          <p className="mt-5 text-center text-[11px] text-neutral-400">
            YnadimeShop — Shop your way.
          </p>
        </footer>
      </div>
    </>
  );
}
