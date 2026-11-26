export type FavoriteProduct = {
  id: string;
  name: string;
  price: number;
  image: string;
  color: string;
};

const FAVORITES_STORAGE_KEY = "ynadime_favorites";
export const FAVORITES_UPDATED_EVENT = "favorites:updated";

export function getStoredFavorites(): FavoriteProduct[] {
  if (typeof window === "undefined") return [];

  try {
    const value = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    return value ? (JSON.parse(value) as FavoriteProduct[]) : [];
  } catch {
    return [];
  }
}

function saveFavorites(favorites: FavoriteProduct[]) {
  window.localStorage.setItem(
    FAVORITES_STORAGE_KEY,
    JSON.stringify(favorites)
  );
  window.dispatchEvent(
    new CustomEvent(FAVORITES_UPDATED_EVENT, { detail: favorites })
  );
}

export function isFavoriteProduct(id: string) {
  return getStoredFavorites().some((product) => product.id === id);
}

export function toggleFavorite(product: FavoriteProduct) {
  const favorites = getStoredFavorites();
  const isFavorite = favorites.some((item) => item.id === product.id);
  const nextFavorites = isFavorite
    ? favorites.filter((item) => item.id !== product.id)
    : [...favorites, product];

  saveFavorites(nextFavorites);
  return !isFavorite;
}

export function removeFavorite(id: string) {
  saveFavorites(getStoredFavorites().filter((product) => product.id !== id));
}
