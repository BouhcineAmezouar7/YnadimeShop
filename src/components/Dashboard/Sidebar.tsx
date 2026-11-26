"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { auth } from "@/utils/auth";

const groups = [
  { title: "Workspace", links: [
    ["Overview", "/dashboard", "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z"],
    ["Products", "/dashboard/products", "m12 3 9 5v9l-9 5-9-5V8l9-5ZM3 8l9 5 9-5M12 13v9"],
    ["Categories", "/dashboard/category", "m12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5"],
    ["Orders", "/dashboard/orders", "M5 7h14l2 14H3L5 7ZM9 7V5a3 3 0 0 1 6 0v2"],
  ]},
  { title: "Storefront", links: [["Carousel", "/dashboard/carousel", "M5 4h14v16H5zM8 15l3-4 5 6M1 7v10M23 7v10"]]},
  { title: "Preferences", links: [
    ["Settings", "/dashboard/settings", "M4 6h16M4 12h16M4 18h16M8 3v6M16 9v6M10 15v6"],
    ["Account", "/dashboard/account", "M16 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4 21v-2a8 8 0 0 1 16 0v2"],
  ]},
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function logout() {
    setBusy(true); setError("");
    try { await auth.logout(); router.replace("/login"); }
    catch { setError("Unable to sign out. Please retry."); }
    finally { setBusy(false); }
  }
  return (
    <aside className="flex flex-col border-b border-neutral-200 bg-white lg:sticky lg:top-0 lg:h-dvh lg:border-b-0 lg:border-r">
      <div className="flex items-center justify-between gap-3 border-b border-neutral-100 p-5 lg:p-6">
        <Link href="/dashboard" className="min-w-0">
          <p className="text-xl font-bold tracking-tight text-neutral-950">Ynadime<span className="text-[#DB4444]">.</span></p>
          <p className="mt-1 text-xs text-neutral-500">Store administration</p>
        </Link>
        <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="dashboard-navigation" className="rounded-lg border border-neutral-200 px-3 py-2 text-sm lg:hidden">{open ? "Close" : "Menu"}</button>
      </div>
      <div id="dashboard-navigation" className={`${open ? "flex" : "hidden"} min-h-0 flex-1 flex-col lg:flex`}>
        <nav aria-label="Dashboard navigation" className="flex-1 space-y-7 overflow-y-auto p-4">
          {groups.map(group => <div key={group.title}>
            <h2 className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-neutral-400">{group.title}</h2>
            <ul className="space-y-1">{group.links.map(([label, href, path]) => {
              const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href + "/"));
              return <li key={href}><Link href={href} onClick={() => setOpen(false)} aria-current={active ? "page" : undefined} className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${active ? "bg-[#DB4444]/10 text-[#DB4444]" : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950"}`}>
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-5 shrink-0"><path d={path}/></svg><span className="flex-1">{label}</span>{active && <span className="size-1.5 rounded-full bg-current"/>}
              </Link></li>;
            })}</ul>
          </div>)}
        </nav>
        <div className="space-y-2 border-t border-neutral-200 p-4">
          <Link href="/store" className="block rounded-lg px-3 py-3 text-sm text-neutral-600 hover:bg-neutral-100">View store ↗</Link>
          <button type="button" disabled={busy} onClick={logout} className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium text-neutral-600 hover:bg-red-50 hover:text-[#DB4444] disabled:opacity-50"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5"><path d="M10 3H4v18h6M9 12h12m-5-5 5 5-5 5"/></svg>{busy ? "Signing out…" : "Log out"}</button>
          {error && <p role="alert" className="px-3 text-xs text-red-700">{error}</p>}
        </div>
      </div>
    </aside>
  );
}
