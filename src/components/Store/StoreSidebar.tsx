"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { products } from "@/data/products";
import { initialFilters, matchesPrice, publishStoreFilters, type StoreFilters } from "./storeFilters";

const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];
const brands = ["All", ...Array.from(new Set(products.map(p => p.brand))).sort()];
const ranges = ["All", "$0 - $50", "$51 - $100", "$101 - $200", "$201 - $500", "$501+"];

function FilterGroup({ title, options, selected, onSelect }: {
  title: string; options: { value: string; count: number }[]; selected: string; onSelect: (value: string) => void;
}) {
  return (
    <details open className="group border-b border-neutral-200 py-4">
      <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold [&::-webkit-details-marker]:hidden">
        {title}<span aria-hidden="true" className="text-neutral-400 group-open:rotate-180">⌄</span>
      </summary>
      <div className="mt-3 max-h-64 space-y-1 overflow-y-auto">
        {options.map(({ value, count }) => (
          <label key={value} className={`flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm ${selected === value ? "bg-[#DB4444]/5 text-[#DB4444]" : "text-neutral-600 hover:bg-neutral-50"}`}>
            <input type="radio" name={`store-${title}`} checked={selected === value} onChange={() => onSelect(value)} className="size-4 shrink-0 accent-[#DB4444]" />
            <span className="flex-1">{value === "All" ? `All ${title.toLowerCase()}` : value}</span><span className="text-xs tabular-nums text-neutral-500">{count}</span>
          </label>
        ))}
      </div>
    </details>
  );
}

export default function StoreSidebar() {
  const params = useSearchParams();
  const [filters, setFilters] = useState<StoreFilters>(initialFilters);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const category = params.get("category");
    setFilters({ ...initialFilters, query: params.get("search") || "", category: category && categories.some(c => c === category) ? category : "All" });
  }, [params]);
  useEffect(() => { publishStoreFilters(filters); }, [filters]);
  const update = (key: keyof StoreFilters, value: string) => setFilters(prev => ({ ...prev, [key]: value }));
  const active = Number(!!filters.query) + Number(filters.category !== "All") + Number(filters.brand !== "All") + Number(filters.price !== "All");
  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-base font-semibold">Filters {active > 0 && <span className="text-[#DB4444]">({active})</span>}</h2>
        <button type="button" onClick={() => setFilters(initialFilters)} className="text-xs font-medium text-[#DB4444] hover:underline">Clear all</button>
        <button type="button" aria-expanded={mobileOpen} aria-controls="store-filter-panel" onClick={() => setMobileOpen(v => !v)} className="rounded-md border border-neutral-200 px-3 py-2 text-xs lg:hidden">{mobileOpen ? "Hide filters" : "Show filters"}</button>
      </div>
      <div id="store-filter-panel" className={`${mobileOpen ? "block" : "hidden"} mt-5 lg:block`}>
        <label className="flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2.5 focus-within:border-[#DB4444]">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-4 shrink-0 text-neutral-500"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg>
          <input aria-label="Search products" type="search" value={filters.query} onChange={e => update("query", e.target.value)} placeholder="Search products" className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
        </label>
        <FilterGroup title="Categories" selected={filters.category} onSelect={v => update("category", v)} options={categories.map(value => ({ value, count: products.filter(p => value === "All" || p.category === value).length }))} />
        <FilterGroup title="Brands" selected={filters.brand} onSelect={v => update("brand", v)} options={brands.map(value => ({ value, count: products.filter(p => value === "All" || p.brand === value).length }))} />
        <FilterGroup title="Prices" selected={filters.price} onSelect={v => update("price", v)} options={ranges.map(value => ({ value, count: products.filter(p => matchesPrice(p.price, value)).length }))} />
      </div>
    </div>
  );
}
