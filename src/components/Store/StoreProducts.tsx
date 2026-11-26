"use client";

import { useEffect, useMemo, useState } from "react";
import ProductCard from "@/components/HomePage/ProductCard";
import { products } from "@/data/products";
import { STORE_FILTER_EVENT, initialFilters, getStoreFilters, matchesPrice, type StoreFilters } from "./storeFilters";

export default function StoreProducts() {
  const [sortBy, setSortBy] = useState("default");
  const [filters, setFilters] = useState(initialFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  useEffect(() => {
    const handleFilters = (event: Event) => {
      setFilters((event as CustomEvent<StoreFilters>).detail);
      setCurrentPage(1);
    };
    window.addEventListener(STORE_FILTER_EVENT, handleFilters);
    setFilters(getStoreFilters());
    return () => window.removeEventListener(STORE_FILTER_EVENT, handleFilters);
  }, []);

  const sortedProducts = useMemo(() => {
    const query = filters.query.trim().toLowerCase();
    return products
      .filter((product) => {
        const text = `${product.name} ${product.color} ${product.brand} ${product.category}`.toLowerCase();
        return (!query || text.includes(query)) &&
          (filters.category === "All" || product.category === filters.category) &&
          (filters.brand === "All" || product.brand === filters.brand) &&
          matchesPrice(product.price, filters.price);
      })
      .sort((a, b) => {
        if (sortBy === "price-low-high") return a.price - b.price;
        if (sortBy === "price-high-low") return b.price - a.price;
        if (sortBy === "name-a-z") return a.name.localeCompare(b.name);
        if (sortBy === "name-z-a") return b.name.localeCompare(a.name);
        return products.indexOf(a) - products.indexOf(b);
      });
  }, [filters, sortBy]);

  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / pageSize));
  const pageStart = (currentPage - 1) * pageSize;
  const visibleProducts = sortedProducts.slice(pageStart, pageStart + pageSize);

  return (
    <section className="min-w-0">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 pb-4">
        <div><h2 className="text-lg font-semibold">{filters.category === "All" ? "All products" : filters.category}</h2><p aria-live="polite" className="mt-1 text-xs text-neutral-500">{sortedProducts.length} products · Showing {sortedProducts.length ? pageStart + 1 : 0}–{Math.min(pageStart + pageSize, sortedProducts.length)}</p></div>
        <label className="flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2 text-sm"><span className="text-neutral-500">Sort:</span><select aria-label="Sort products" value={sortBy} onChange={e => { setSortBy(e.target.value); setCurrentPage(1); }} className="max-w-[150px] bg-white text-sm outline-none">
          <option value="default">Featured</option><option value="price-low-high">Price: low to high</option><option value="price-high-low">Price: high to low</option><option value="name-a-z">Name: A to Z</option><option value="name-z-a">Name: Z to A</option>
        </select></label>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-6">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            showFavorite
            imageSizes="(max-width: 767px) 50vw, (max-width: 1279px) 33vw, 25vw"
          />
        ))}
      </div>
      {!visibleProducts.length && <div className="rounded-lg border border-dashed border-neutral-200 py-16 text-center"><h3 className="font-semibold">No products found</h3><p className="mt-2 text-sm text-neutral-500">Try another search or clear your filters.</p></div>}
      {totalPages > 1 && <nav aria-label="Product pages" className="mt-8 flex flex-wrap justify-center gap-2">
        <button type="button" aria-label="Previous page" disabled={currentPage === 1} onClick={() => setCurrentPage(p => Math.max(1,p-1))} className="size-10 rounded-md border border-neutral-200 disabled:opacity-40">←</button>
        {Array.from({length: totalPages}, (_,i) => i+1).map(page => <button type="button" key={page} aria-current={currentPage === page ? "page" : undefined} onClick={() => setCurrentPage(page)} className={`size-10 rounded-md border text-sm ${currentPage === page ? "border-[#DB4444] bg-[#DB4444] text-white" : "border-neutral-200 hover:border-[#DB4444]"}`}>{page}</button>)}
        <button type="button" aria-label="Next page" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => Math.min(totalPages,p+1))} className="size-10 rounded-md border border-neutral-200 disabled:opacity-40">→</button>
      </nav>}
    </section>
  );
}
