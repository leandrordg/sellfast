import { ProductType } from "@/types/globals";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem extends ProductType {
  count: number;
  expectCoins: number;
}

export const FREE_SHIPPING_THRESHOLD = 499.99; // Valor em BRL
export const SHIPPING_PRICE = 29.99; // Valor em BRL

export type CartStore = {
  cart: CartItem[];
  addItem: (product: ProductType) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
  incrementItem: (id: string) => void;
  decrementItem: (id: string) => void;
  setItemCount: (id: string, count: number) => void;
  count: () => number;
  shippingPrice: () => number;
  remainingForFreeShipping: () => number;
  subtotalPrice: () => number;
  totalPrice: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      count: () => {
        const { cart } = get();
        if (cart.length) {
          return cart.map((item) => item.count).reduce((a, b) => a + b);
        }
        return 0;
      },
      addItem: (product: ProductType) => {
        const { cart } = get();
        const updatedCart = addToCart(cart, product);
        set({ cart: updatedCart });
      },
      removeItem: (id: string) => {
        const { cart } = get();
        const updatedCart = removeFromCart(cart, id);
        set({ cart: updatedCart });
      },
      removeAll: () => {
        set({ cart: [] });
      },
      incrementItem: (id: string) => {
        const { cart } = get();
        const updatedCart = incrementInCart(cart, id);
        set({ cart: updatedCart });
      },
      decrementItem: (id: string) => {
        const { cart } = get();
        const updatedCart = decrementInCart(cart, id);
        set({ cart: updatedCart });
      },
      setItemCount(id: string, count: number) {
        const { cart } = get();
        const updatedCart = setCountInCart(cart, id, count);
        set({ cart: updatedCart });
      },
      subtotalPrice: () => {
        const { cart } = get();
        if (cart.length) {
          return cart
            .map((item) => item.price * item.count)
            .reduce((a, b) => a + b);
        }
        return 0;
      },
      shippingPrice: () => {
        return get().subtotalPrice() >= FREE_SHIPPING_THRESHOLD
          ? 0
          : SHIPPING_PRICE;
      },
      remainingForFreeShipping: () => {
        return get().subtotalPrice() >= FREE_SHIPPING_THRESHOLD
          ? 0
          : FREE_SHIPPING_THRESHOLD - get().subtotalPrice();
      },
      totalPrice: () => {
        const { shippingPrice } = get();
        return get().subtotalPrice() + shippingPrice();
      },
    }),
    { name: "cart-storage" }
  )
);

const addToCart = (cart: CartItem[], product: ProductType): CartItem[] => {
  const item = cart.find((item) => item.id === product.id);

  if (item) {
    return cart.map((item) => {
      if (item.id === product.id) {
        const itemCount = item.count >= 1 ? item.count + 1 : 1;
        return { ...item, count: itemCount };
      }
      return item;
    });
  }

  return [
    ...cart,
    {
      ...product,
      count: 1,
      expectCoins: product.price * 0.1,
      colors: product.colors,
    },
  ];
};

const removeFromCart = (cart: CartItem[], id: string): CartItem[] => {
  const item = cart.find((item) => item.id === id);
  if (item) {
    return cart.filter((item) => item.id !== id);
  }
  return cart;
};

const incrementInCart = (cart: CartItem[], id: string): CartItem[] => {
  const item = cart.find((item) => item.id === id);

  // check if stock is available
  if (item && item.count >= item.stock) return cart;

  return cart.map((item) => {
    if (item.id === id) {
      return { ...item, count: item.count + 1 };
    }

    return item;
  });
};

const decrementInCart = (cart: CartItem[], id: string): CartItem[] => {
  const item = cart.find((item) => item.id === id);

  if (item) {
    return cart.map((item) => {
      if (item.id === id) {
        const itemCount = item.count > 1 ? item.count - 1 : 1;
        return { ...item, count: itemCount };
      }

      return item;
    });
  }

  return cart;
};

const setCountInCart = (
  cart: CartItem[],
  id: string,
  count: number
): CartItem[] => {
  const item = cart.find((item) => item.id === id);
  if (item) {
    return cart.map((item) => {
      if (item.id === id) {
        const itemCount = count >= 1 ? count : 1;
        return { ...item, count: itemCount };
      }
      return item;
    });
  }

  return cart;
};
