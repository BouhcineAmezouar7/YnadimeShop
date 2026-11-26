import type { StoredCartItem } from "./cart";

export type Order = {
  id: string;
  date: string;
  status: "Processing" | "Delivered" | "Cancelled";
  items: StoredCartItem[];
  total: number;
  customer: { name: string; email: string; address: string; city: string; postalCode: string; country: string };
  payment: string;
};

const ORDERS_KEY = "ynadime_orders";
export function getOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]"); } catch { return []; }
}
export function saveOrder(order: Order) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...getOrders()]));
}
export function cancelOrder(id: string) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(getOrders().map((order) => order.id === id ? { ...order, status: "Cancelled" } : order)));
}
