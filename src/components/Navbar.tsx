"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { montserrat } from "@/app/fonts";
import TopNav from "./TopNav";
import MenuModal from "./HomePage/MenuModal";
import { usePathname, useRouter } from "next/navigation";
import { AUTH_CHANGED_EVENT, auth } from "@/utils/auth";
import {
  CART_ITEM_ADDED_EVENT,
  CART_UPDATED_EVENT,
  getCartItemCount,
  getStoredCart,
  type CartProduct,
  type StoredCartItem,
} from "@/utils/cart";
import {
  FAVORITES_UPDATED_EVENT,
  getStoredFavorites,
  type FavoriteProduct,
} from "@/utils/favorites";

function NavIcon({
  name,
}: {
  name: "bag" | "search" | "heart" | "cart" | "user" | "menu" | "close";
}) {
  const paths = {
    bag: (
      <>
        <path d="M5 7h14l1 14H4L5 7Z" />
        <path d="M9 9V6a3 3 0 0 1 6 0v3" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    heart: (
      <path d="M20.8 8.6c0 4.2-8.8 9.7-8.8 9.7S3.2 12.8 3.2 8.6a4.6 4.6 0 0 1 8.8-1.9 4.6 4.6 0 0 1 8.8 1.9Z" />
    ),
    cart: (
      <>
        <path d="M3 4h2l2.5 12h11l2-8H6" />
        <circle cx="9" cy="20" r="1" />
        <circle cx="18" cy="20" r="1" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M4.5 21v-2a7.5 7.5 0 0 1 15 0v2" />
      </>
    ),
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
  };
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [cartNotice, setCartNotice] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    setIsLoggedIn(auth.isAuthenticated());
    setCartCount(getCartItemCount());
    setFavoriteCount(getStoredFavorites().length);

    let noticeTimer: number | undefined;
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    const handleCartUpdate = (event: Event) => {
      const cart = (event as CustomEvent<StoredCartItem[]>).detail;
      setCartCount(getCartItemCount(cart || getStoredCart()));
    };
    const handleProductAdded = (event: Event) => {
      const { product } = (
        event as CustomEvent<{ product: CartProduct; quantity: number }>
      ).detail;
      setCartNotice(`${product.name} added to cart`);
      window.clearTimeout(noticeTimer);
      noticeTimer = window.setTimeout(() => setCartNotice(""), 2600);
    };
    const handleFavoritesUpdate = (event: Event) => {
      const favorites = (event as CustomEvent<FavoriteProduct[]>).detail;
      setFavoriteCount((favorites || getStoredFavorites()).length);
    };
    const handleAuthChange = () => setIsLoggedIn(auth.isAuthenticated());

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener(CART_UPDATED_EVENT, handleCartUpdate);
    window.addEventListener(CART_ITEM_ADDED_EVENT, handleProductAdded);
    window.addEventListener(FAVORITES_UPDATED_EVENT, handleFavoritesUpdate);
    window.addEventListener(AUTH_CHANGED_EVENT, handleAuthChange);

    return () => {
      window.clearTimeout(noticeTimer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener(CART_UPDATED_EVENT, handleCartUpdate);
      window.removeEventListener(CART_ITEM_ADDED_EVENT, handleProductAdded);
      window.removeEventListener(
        FAVORITES_UPDATED_EVENT,
        handleFavoritesUpdate,
      );
      window.removeEventListener(AUTH_CHANGED_EVENT, handleAuthChange);
    };
  }, []);

  const toggleMenu = useCallback(() => {
    setIsOpen((open) => !open);
  }, []);

  const pathname = usePathname();
  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const query = searchQuery.trim();
    router.push(
      query ? `/store?search=${encodeURIComponent(query)}` : "/store",
    );
  };

  const links = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/store" },
    { label: "Contact", href: "/contact" },
    { label: "About", href: "/about" },
  ];
  const active = (href: string) =>
    href === "/"
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);
  const iconClass = (href: string) =>
    `relative inline-flex size-10 shrink-0 items-center justify-center rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-[#DB4444] ${active(href) ? "bg-[#DB4444]/10 text-[#DB4444]" : "text-neutral-800 hover:bg-neutral-100"}`;
  const countBadge = (count: number) =>
    count > 0 && (
      <span className="absolute right-0 top-0 flex min-h-4 min-w-4 items-center justify-center rounded-full bg-[#DB4444] px-1 text-[10px] font-semibold leading-4 text-white ring-2 ring-white">
        {count > 99 ? "99+" : count}
      </span>
    );

  return (
    <>
      <TopNav />
      <header
        className={`sticky top-0 z-30 border-b border-neutral-200 bg-white transition-shadow ${isScrolled ? "shadow-sm" : ""}`}
      >
        <nav
          aria-label="Main navigation"
          className="container mx-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-3 px-4 py-3 sm:px-6 lg:flex-nowrap lg:gap-x-6 lg:py-0"
        >
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 text-neutral-950"
          >
            <span className="text-[#DB4444]">
              <NavIcon name="bag" />
            </span>
            <span
              className={`${montserrat.className} text-lg font-bold tracking-tight sm:text-xl`}
            >
              YnadimeShop
            </span>
          </Link>
          <div className="hidden h-[72px] items-center gap-6 xl:flex">
            {links.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                aria-current={active(href) ? "page" : undefined}
                className={`relative flex h-full items-center whitespace-nowrap text-sm font-medium transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 ${active(href) ? "text-[#DB4444] after:bg-[#DB4444]" : "text-neutral-600 hover:text-neutral-950"}`}
              >
                {label}
              </Link>
            ))}
          </div>
          <form
            onSubmit={handleSearch}
            role="search"
            className="order-last flex h-10 w-full items-center gap-2 rounded-md border border-neutral-200 bg-neutral-50 px-3 focus-within:border-[#DB4444] lg:order-none lg:max-w-64 lg:flex-1"
          >
            <input
              aria-label="Search products"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search products..."
              className="min-w-0 flex-1 bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-500"
            />
            <button
              type="submit"
              aria-label="Search"
              className="text-neutral-500 hover:text-[#DB4444]"
            >
              <NavIcon name="search" />
            </button>
          </form>
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <Link
              href="/favorite"
              aria-label={`Favorites, ${favoriteCount} items`}
              className={iconClass("/favorite")}
            >
              <NavIcon name="heart" />
              {countBadge(favoriteCount)}
            </Link>
            <Link
              href="/card"
              aria-label={`Cart, ${cartCount} items`}
              className={iconClass("/card")}
            >
              <NavIcon name="cart" />
              {countBadge(cartCount)}
            </Link>
            {isLoggedIn ? (
              <div className="hidden items-center gap-2 xl:flex">
                <Link
                  href="/profile"
                  aria-label="Profile"
                  className={iconClass("/profile")}
                >
                  <NavIcon name="user" />
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    void auth.logout();
                    router.push("/");
                  }}
                  className="text-xs font-medium text-neutral-600 hover:text-[#DB4444]"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden items-center gap-3 border-l border-neutral-200 pl-3 xl:flex">
                <Link
                  href="/login"
                  className={`text-sm font-medium ${active("/login") ? "text-[#DB4444]" : "text-neutral-700 hover:text-[#DB4444]"}`}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="rounded-md bg-[#DB4444] px-3 py-2 text-sm font-medium text-white hover:bg-[#c93939]"
                >
                  Register
                </Link>
              </div>
            )}
            <div className="xl:hidden">
              <button
                type="button"
                onClick={toggleMenu}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                className="flex size-10 items-center justify-center rounded-md text-neutral-900 hover:bg-neutral-100"
              >
                <NavIcon name={isOpen ? "close" : "menu"} />
              </button>
              <MenuModal
                isOpen={isOpen}
                toggleMenu={toggleMenu}
                cartCount={cartCount}
                favoriteCount={favoriteCount}
                isLoggedIn={isLoggedIn}
              />
            </div>
          </div>
        </nav>
      </header>
      {cartNotice && (
        <div
          role="status"
          aria-live="polite"
          className="fixed right-4 top-4 z-[70] flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-900 shadow-lg"
        >
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-700">
            ✓
          </span>
          {cartNotice}
        </div>
      )}
    </>
  );
}
