export type StoreFilters = { query: string; category: string; brand: string; price: string };
export const initialFilters: StoreFilters = { query: "", category: "All", brand: "All", price: "All" };
export const STORE_FILTER_EVENT = "store:filters";
let currentFilters = initialFilters;
export function getStoreFilters() { return currentFilters; }
export function publishStoreFilters(filters: StoreFilters) {
  currentFilters = filters;
  window.dispatchEvent(new CustomEvent<StoreFilters>(STORE_FILTER_EVENT, { detail: filters }));
}
export function matchesPrice(price: number, range: string) {
  switch (range) {
    case "$0 - $50": return price >= 0 && price <= 50;
    case "$51 - $100": return price > 50 && price <= 100;
    case "$101 - $200": return price > 100 && price <= 200;
    case "$201 - $500": return price > 200 && price <= 500;
    case "$501+": return price > 500;
    default: return true;
  }
}
