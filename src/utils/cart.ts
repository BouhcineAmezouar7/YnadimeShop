export type CartProduct = {
  id: string;
  name: string;
  price: number;
  image: string;
  color: string;
};

export type StoredCartItem = CartProduct & { quantity: number };

const CART_STORAGE_KEY = "ynadime_cart";
export const CART_UPDATED_EVENT = "cart:updated";
export const CART_ITEM_ADDED_EVENT = "cart:item-added";

export function getStoredCart(): StoredCartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const value = window.localStorage.getItem(CART_STORAGE_KEY);
    return value ? (JSON.parse(value) as StoredCartItem[]) : [];
  } catch {
    return [];
  }
}

export function addProductToCart(product: CartProduct, quantity = 1) {
  const cart = getStoredCart();
  const existing = cart.find((item) => item.id === product.id);
  const nextCart = existing
    ? cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      )
    : [...cart, { ...product, quantity }];

  saveStoredCart(nextCart);
  window.dispatchEvent(
    new CustomEvent(CART_ITEM_ADDED_EVENT, {
      detail: { product, quantity },
    })
  );
}

export function saveStoredCart(cart: StoredCartItem[]) {
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT, { detail: cart }));
}

export function getCartItemCount(cart = getStoredCart()) {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

export function clearCart() {
  saveStoredCart([]);
}
