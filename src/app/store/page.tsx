import PlusServices from "@/components/HomePage/PlusServices";
import StoreProducts from "@/components/Store/StoreProducts";
import StoreSidebar from "@/components/Store/StoreSidebar";
import Sponsors from "@/components/Store/Sponsors";
import Link from "next/link";
import { Suspense } from "react";

export default function StorePage() {
  return (
    <main className="container mx-auto px-4 pb-10 pt-8 sm:px-6 lg:px-8">
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 text-sm text-neutral-500"
      >
        <Link href="/" className="hover:text-[#DB4444]">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page" className="text-neutral-900">
          Store
        </span>
      </nav>
      <header className="mb-8 mt-6 border-b border-neutral-200 pb-7">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
          Explore our store
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          Discover clothing, accessories and technology for everyday life.
        </p>
      </header>
      <div className="grid min-w-0 gap-6 lg:grid-cols-[220px_minmax(0,1fr)] xl:gap-10">
        <aside className="min-w-0 lg:border-r lg:border-neutral-200 lg:pr-5">
          <Suspense
            fallback={
              <p className="text-sm text-neutral-500">Loading filters...</p>
            }
          >
            <StoreSidebar />
          </Suspense>
        </aside>
        <StoreProducts />
      </div>
      <PlusServices />
      <Sponsors />
    </main>
  );
}
