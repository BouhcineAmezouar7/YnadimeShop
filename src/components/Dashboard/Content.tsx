"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { products, formatPrice } from "@/data/products";
import { getOrders, type Order } from "@/utils/orders";

const sections: Record<string, [string, string]> = {
  dashboard: ["Store overview", "Review your catalog and locally recorded orders."],
  products: ["Products", "Browse the products in your store catalog."],
  category: ["Categories", "Explore your product collections."],
  orders: ["Orders", "Review locally recorded orders."],
  carousel: ["Carousel", "Manage your storefront presentation."],
  settings: ["Settings", "Store configuration and preferences."],
  account: ["Account", "Manage your account information."],
};
const categories = Array.from(new Set(products.map(p => p.category))).map(name => ({name, count: products.filter(p => p.category === name).length}));
const panel = "rounded-xl border border-neutral-200 bg-white";
const heading = "text-base font-semibold tracking-tight text-neutral-950";

function OrderTable({ orders }: { orders: Order[] }) {
  if (!orders.length) return <p className="px-5 py-12 text-center text-sm text-neutral-500">No locally recorded orders yet.</p>;
  return <div className="overflow-x-auto"><table className="w-full whitespace-nowrap text-left text-sm"><thead className="border-y border-neutral-100 bg-neutral-50 text-xs text-neutral-500"><tr>{["Order", "Date", "Status", "Total"].map(h => <th key={h} className="px-5 py-3 font-medium">{h}</th>)}</tr></thead><tbody className="divide-y divide-neutral-100">{orders.map(o => <tr key={o.id}><td className="px-5 py-4 font-medium">{o.id}</td><td className="px-5 py-4 text-neutral-500">{new Date(o.date).toLocaleDateString()}</td><td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs ${o.status === "Cancelled" ? "bg-red-50 text-red-700" : o.status === "Processing" ? "bg-amber-50 text-amber-700" : "bg-neutral-100 text-neutral-700"}`}>{o.status}</span></td><td className="px-5 py-4 font-medium tabular-nums">{formatPrice(o.total)}</td></tr>)}</tbody></table></div>;
}
function Categories() {
  return <div className="space-y-5 p-5">{categories.map(c => <div key={c.name}><div className="mb-2 flex justify-between gap-3 text-sm"><span className="font-medium">{c.name}</span><span className="text-neutral-500">{c.count} products</span></div><div className="h-2 overflow-hidden rounded-full bg-neutral-100"><div className="h-full rounded-full bg-[#DB4444]" style={{width: `${products.length ? c.count / products.length * 100 : 0}%`}}/></div></div>)}</div>;
}
export default function Content() {
  const pathname = usePathname();
  const section = pathname.split("/").filter(Boolean)[1] || "dashboard";
  const content = Object.prototype.hasOwnProperty.call(sections, section) ? sections[section] : null;
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  useEffect(() => {
    function load() { try { setOrders([...getOrders()].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())); setError(""); } catch { setError("Unable to read local orders."); } finally { setLoading(false); } }
    load(); window.addEventListener("storage", load); return () => window.removeEventListener("storage", load);
  }, [section]);
  const value = orders.filter(o => o.status !== "Cancelled").reduce((sum,o) => sum + o.total, 0);
  const metrics = [{label:"Order value",value:loading || error ? "—" : formatPrice(value),hint:"Excludes cancelled orders"},{label:"Total orders",value:loading || error ? "—" : orders.length,hint:"Recorded in this browser"},{label:"Products",value:products.length,hint:"Catalog products"},{label:"Categories",value:categories.length,hint:"Catalog collections"}];
  const filtered = products.filter(p => `${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(search.trim().toLowerCase()));
  return <div className="min-w-0 text-neutral-900">
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 bg-white px-5 py-4 sm:px-8"><nav aria-label="Breadcrumb" className="text-sm text-neutral-500"><Link href="/dashboard" className="hover:text-[#DB4444]">Dashboard</Link> / <span className="text-neutral-900">{content?.[0] || "Not found"}</span></nav><Link href="/store" className="rounded-lg border border-neutral-200 px-4 py-2 text-xs font-medium hover:border-[#DB4444] hover:text-[#DB4444]">View store ↗</Link></header>
    <div className="mx-auto max-w-[1600px] space-y-7 p-5 sm:p-8">
      <div><p className="text-xs font-semibold uppercase tracking-widest text-[#DB4444]">Store management</p><h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{content?.[0] || "Section not found"}</h1><p className="mt-2 text-sm text-neutral-500">{content?.[1] || "Choose a section from the navigation."}</p></div>
      {section === "dashboard" && <>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{metrics.map(m => <article key={m.label} className={`${panel} p-5`}><p className="text-sm font-medium text-neutral-500">{m.label}</p><p className="mt-4 break-words text-2xl font-semibold tracking-tight tabular-nums">{m.value}</p><p className="mt-2 text-xs text-neutral-400">{m.hint}</p></article>)}</div>
        <div className="grid gap-5 xl:grid-cols-[1fr_1.5fr]"><section className={panel}><h2 className={`${heading} border-b border-neutral-100 p-5`}>Product distribution</h2><Categories/></section><section className={`${panel} p-5`}><h2 className={heading}>Catalog snapshot</h2><div className="mt-5 grid grid-cols-2 gap-4"><div className="rounded-lg bg-neutral-50 p-4"><p className="text-xs text-neutral-500">In stock</p><p className="mt-2 text-2xl font-semibold">{products.filter(p=>p.inStock).length}</p></div><div className="rounded-lg bg-neutral-50 p-4"><p className="text-xs text-neutral-500">Out of stock</p><p className="mt-2 text-2xl font-semibold">{products.filter(p=>!p.inStock).length}</p></div></div><Link href="/dashboard/products" className="mt-5 inline-block text-sm font-medium text-[#DB4444] hover:underline">Browse catalog →</Link></section></div>
      </>}
      {(section === "dashboard" || section === "orders") && <section className={panel}><div className="flex items-center justify-between gap-3 p-5"><h2 className={heading}>{section === "dashboard" ? "Recent orders" : "Order history"}</h2>{section === "dashboard" && <Link href="/dashboard/orders" className="text-sm font-medium text-[#DB4444] hover:underline">View all →</Link>}</div>{loading ? <p role="status" className="p-5 text-sm text-neutral-500">Loading orders…</p> : error ? <p role="alert" className="p-5 text-sm text-red-700">{error}</p> : <OrderTable orders={section === "dashboard" ? orders.slice(0,5) : orders}/>}</section>}
      {section === "products" && <section className={panel}><div className="flex flex-wrap items-center justify-between gap-4 p-5"><h2 className={heading}>{filtered.length} products</h2><input aria-label="Search products" placeholder="Search products…" value={search} onChange={e=>setSearch(e.target.value)} className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm outline-none focus:border-[#DB4444] sm:w-64"/></div><div className="overflow-x-auto"><table className="w-full whitespace-nowrap text-left text-sm"><thead className="border-y border-neutral-100 bg-neutral-50 text-xs text-neutral-500"><tr>{["Product","Category","Price","Availability"].map(h=><th key={h} className="px-5 py-3 font-medium">{h}</th>)}</tr></thead><tbody className="divide-y divide-neutral-100">{filtered.map(p=><tr key={p.id}><td className="px-5 py-3"><Link href={`/productDetails/${p.id}`} className="flex items-center gap-3 font-medium hover:text-[#DB4444]"><div className="relative size-12 overflow-hidden rounded-md bg-neutral-100"><Image src={p.image} alt={p.name} fill sizes="48px" className="object-cover"/></div>{p.name}</Link></td><td className="px-5 py-3 text-neutral-500">{p.category}</td><td className="px-5 py-3">{formatPrice(p.price)}</td><td className="px-5 py-3"><span className={p.inStock ? "text-green-700" : "text-neutral-500"}>{p.inStock ? "In stock" : "Out of stock"}</span></td></tr>)}</tbody></table></div>{!filtered.length && <p className="p-10 text-center text-sm text-neutral-500">No matching products.</p>}</section>}
      {section === "category" && <section className={panel}><h2 className={`${heading} border-b border-neutral-100 p-5`}>Catalog categories</h2><Categories/></section>}
      {["carousel","settings","account"].includes(section) && <section className={`${panel} p-8`}><h2 className={heading}>{content?.[0]}</h2><p className="mt-3 text-sm leading-6 text-neutral-500">{section === "account" ? "Use your existing profile page to update account details." : "This section is ready for configuration. Editing functionality has not been connected yet."}</p>{section === "account" && <Link href="/profile" className="mt-5 inline-block rounded-lg bg-[#DB4444] px-5 py-3 text-sm font-semibold text-white">Open profile</Link>}</section>}
      <p className="text-xs leading-5 text-neutral-400">Demo dashboard · Catalog and browser-local orders. Order value is not verified payment revenue.</p>
    </div>
  </div>;
}
