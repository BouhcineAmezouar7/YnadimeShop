"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { montserrat } from "@/app/fonts";
import ProfileSidebar from "@/components/Profile/ProfileSidebar";
import { formatPrice } from "@/data/products";
import { cancelOrder, getOrders, type Order } from "@/utils/orders";

type OrderFilter = "All orders" | "Processing" | "Cancelled";

const filters: OrderFilter[] = ["All orders", "Processing", "Cancelled"];

const primaryButton =
  "inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-[#DB4444] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#c33b3b] disabled:cursor-not-allowed disabled:opacity-50";

function getStatusClass(status: string) {
  switch (status) {
    case "Processing":
      return "bg-amber-50 text-amber-700";

    case "Cancelled":
      return "bg-red-50 text-[#DB4444]";

    case "Delivered":
      return "bg-green-50 text-green-700";

    case "Shipped":
      return "bg-blue-50 text-blue-700";

    default:
      return "bg-neutral-100 text-neutral-600";
  }
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

/* Order card */
function OrderCard({
  order,
  onCancel,
}: {
  order: Order;
  onCancel: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);

  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);

  const visibleItems = expanded ? order.items : order.items.slice(0, 2);

  return (
    <article className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
      {/* Order header */}
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 bg-[#F5F5F5] px-5 py-5 sm:px-6">
        <div>
          <h3 className="text-sm font-semibold text-neutral-950 sm:text-base">
            Order #{order.id}
          </h3>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-neutral-500">
            <time dateTime={order.date}>{formatDate(order.date)}</time>

            <span className="text-neutral-300">·</span>

            <span>
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </span>
          </div>
        </div>

        {/* Order status */}
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ${getStatusClass(
            order.status,
          )}`}
        >
          <span className="size-1.5 rounded-full bg-current" />

          {order.status}
        </span>
      </header>

      {/* Order products */}
      <div className="divide-y divide-neutral-100 px-5 sm:px-6">
        {visibleItems.map((item) => (
          <div key={item.id} className="flex items-center gap-4 py-5">
            {/* Product image */}
            <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-neutral-100 sm:size-24">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 639px) 80px, 96px"
                className="object-cover object-center"
              />
            </div>

            {/* Product information */}
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-semibold leading-6 text-neutral-900">
                {item.name}
              </h4>

              <p className="mt-1 text-xs text-neutral-500">
                Color: {item.color}
              </p>

              <p className="mt-1 text-xs text-neutral-500">
                Quantity: {item.quantity}
              </p>

              <p className="mt-2 text-sm font-semibold text-neutral-900">
                {formatPrice(item.price)}
              </p>
            </div>

            {/* Product total */}
            <div className="shrink-0 text-right">
              <p className="text-xs text-neutral-400">Total</p>

              <p className="mt-1 text-sm font-semibold tabular-nums text-neutral-900">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Remaining products */}
      {!expanded && order.items.length > 2 && (
        <div className="px-5 pb-5 sm:px-6">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="cursor-pointer text-sm font-medium text-[#DB4444] hover:underline"
          >
            + {order.items.length - 2} more products
          </button>
        </div>
      )}

      {/* Expanded order details */}
      {expanded && (
        <div className="mx-5 mb-5 grid gap-6 rounded-lg bg-neutral-50 p-5 sm:mx-6 sm:grid-cols-2">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Delivery address
            </h4>

            <div className="mt-3 space-y-1 text-sm leading-6 text-neutral-700">
              <p className="font-semibold text-neutral-900">
                {order.customer.name}
              </p>

              <p>{order.customer.address}</p>

              <p>
                {order.customer.city}, {order.customer.postalCode}
              </p>

              <p>{order.customer.country}</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Payment information
            </h4>

            <p className="mt-3 text-sm font-medium text-neutral-900">
              {order.payment}
            </p>

            <p className="mt-2 break-all text-xs leading-6 text-neutral-500">
              {order.customer.email}
            </p>
          </div>
        </div>
      )}

      {/* Order footer */}
      <footer className="flex flex-wrap items-center justify-between gap-5 border-t border-neutral-200 px-5 py-5 sm:px-6">
        <div>
          <p className="text-xs text-neutral-500">Order total</p>

          <p className="mt-1 text-xl font-semibold tracking-tight tabular-nums text-neutral-950">
            {formatPrice(order.total)}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Toggle order details */}
          <button
            type="button"
            onClick={() => setExpanded((previous) => !previous)}
            aria-expanded={expanded}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-neutral-200 px-4 py-2.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-100 sm:text-sm"
          >
            {expanded ? "Hide details" : "View details"}

            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`size-4 transition-transform ${
                expanded ? "rotate-180" : ""
              }`}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          {/* Cancel order */}
          {order.status === "Processing" && (
            <button
              type="button"
              onClick={() => setConfirmCancel(true)}
              className="cursor-pointer rounded-lg border border-[#DB4444]/25 px-4 py-2.5 text-xs font-medium text-[#DB4444] transition-colors hover:bg-red-50 sm:text-sm"
            >
              Cancel order
            </button>
          )}
        </div>
      </footer>

      {/* Cancellation confirmation */}
      {confirmCancel && order.status === "Processing" && (
        <div
          role="group"
          aria-label="Confirm order cancellation"
          className="border-t border-red-100 bg-red-50/60 px-5 py-5 sm:px-6"
        >
          <h4 className="text-sm font-semibold text-neutral-900">
            Cancel this order?
          </h4>

          <p className="mt-2 text-sm leading-6 text-neutral-600">
            Are you sure you want to cancel order #{order.id}?
          </p>

          <div className="mt-5 flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={() => setConfirmCancel(false)}
              className="cursor-pointer rounded-lg border border-neutral-200 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
            >
              Keep order
            </button>

            <button
              type="button"
              onClick={() => {
                onCancel(order.id);
                setConfirmCancel(false);
              }}
              className="cursor-pointer rounded-lg bg-[#DB4444] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#c33b3b]"
            >
              Confirm cancellation
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<OrderFilter>("All orders");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    try {
      setOrders(getOrders());
    } catch {
      setError("Unable to load your order history.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  function handleCancel(id: string) {
    setError("");
    setSuccess("");

    try {
      cancelOrder(id);
      setOrders(getOrders());

      setSuccess(`Order #${id} has been cancelled.`);
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : "Unable to cancel this order.",
      );
    }
  }

  const filteredOrders = orders
    .filter((order) => filter === "All orders" || order.status === filter)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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

        <span aria-current="page" className="font-medium text-neutral-900">
          Orders
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
            My orders.
          </h1>

          <p className="mt-3 text-sm leading-6 text-neutral-500">
            View your order history and manage your recent purchases.
          </p>
        </div>

        <Link
          href="/store"
          className="group inline-flex items-center gap-3 rounded-lg border border-neutral-200 px-5 py-3 text-sm font-medium text-neutral-800 transition-colors hover:border-[#DB4444] hover:text-[#DB4444]"
        >
          Continue shopping
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
      </header>

      {/* Account layout */}
      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)] xl:gap-12">
        {/* Account sidebar */}
        <aside className="min-w-0 lg:sticky lg:top-28">
          <ProfileSidebar />
        </aside>

        {/* Orders content */}
        <section className="min-w-0">
          {/* Section heading */}
          <div className="flex items-center justify-between gap-4">
            <h2
              className={`${montserrat.className} text-xl font-semibold tracking-tight text-neutral-950`}
            >
              Order history
            </h2>

            {!isLoading && (
              <span className="text-sm text-neutral-500">
                {orders.length} {orders.length === 1 ? "order" : "orders"}
              </span>
            )}
          </div>

          {/* Order filters */}
          <div className="mt-6 flex flex-wrap gap-2 border-b border-neutral-200 pb-5">
            {filters.map((item) => {
              const active = filter === item;

              const count =
                item === "All orders"
                  ? orders.length
                  : orders.filter((order) => order.status === item).length;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  aria-pressed={active}
                  className={`inline-flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2.5 text-xs font-medium transition-colors sm:text-sm ${
                    active
                      ? "border-neutral-900 bg-neutral-900 text-white"
                      : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400"
                  }`}
                >
                  {item}

                  {!isLoading && (
                    <span
                      className={`rounded px-1.5 py-0.5 text-[10px] ${
                        active
                          ? "bg-white/15 text-white"
                          : "bg-neutral-100 text-neutral-500"
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Success feedback */}
          {success && (
            <div
              role="status"
              className="mt-5 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700"
            >
              {success}
            </div>
          )}

          {/* Error feedback */}
          {error && (
            <div
              role="alert"
              className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          {/* Loading skeleton */}
          {isLoading ? (
            <div
              role="status"
              aria-label="Loading orders"
              className="mt-6 space-y-5"
            >
              {[1, 2].map((index) => (
                <div
                  key={index}
                  className="animate-pulse overflow-hidden rounded-xl border border-neutral-200"
                >
                  <div className="space-y-3 bg-neutral-100 p-5">
                    <div className="h-4 w-36 rounded bg-neutral-200" />
                    <div className="h-3 w-24 rounded bg-neutral-200" />
                  </div>

                  <div className="flex gap-4 p-5">
                    <div className="size-24 rounded-lg bg-neutral-100" />

                    <div className="flex-1 space-y-3 py-2">
                      <div className="h-4 w-2/3 rounded bg-neutral-100" />
                      <div className="h-3 w-1/3 rounded bg-neutral-100" />
                      <div className="h-4 w-20 rounded bg-neutral-100" />
                    </div>
                  </div>

                  <div className="h-16 border-t border-neutral-100" />
                </div>
              ))}
            </div>
          ) : filteredOrders.length > 0 ? (
            /* Order list */
            <div className="mt-6 space-y-5">
              {filteredOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onCancel={handleCancel}
                />
              ))}
            </div>
          ) : (
            /* Empty state */
            <div className="mt-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-200 bg-neutral-50/50 px-6 py-20 text-center">
              {/* Empty state icon */}
              <div className="flex size-20 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-800">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-9"
                >
                  <path d="m12 3 9 5-9 5-9-5 9-5Z" />
                  <path d="M3 8v9l9 5 9-5V8M12 13v9" />
                  <path d="m7.5 5.5 9 5" />
                </svg>
              </div>

              <h3
                className={`${montserrat.className} mt-6 text-2xl font-semibold tracking-tight text-neutral-950`}
              >
                {error
                  ? "Orders unavailable."
                  : filter === "All orders"
                    ? "No orders yet."
                    : `No ${filter.toLowerCase()} orders.`}
              </h3>

              <p className="mt-3 max-w-sm text-sm leading-7 text-neutral-500">
                {error
                  ? "Your order history could not be loaded."
                  : filter === "All orders"
                    ? "Your purchases will appear here once you place your first order."
                    : "There are currently no orders matching this status."}
              </p>

              {filter === "All orders" ? (
                <Link href="/store" className={`${primaryButton} mt-7`}>
                  Explore products
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
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => setFilter("All orders")}
                  className={`${primaryButton} mt-7 cursor-pointer`}
                >
                  View all orders
                </button>
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
