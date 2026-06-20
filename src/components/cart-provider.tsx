"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem } from "@/lib/types";

type CartContextValue = {
  items: CartItem[];
  count: number;
  addItem: (item: CartItem) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "mattress-commerce-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    window.setTimeout(() => {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      setItems(raw ? (JSON.parse(raw) as CartItem[]) : []);
      setHydrated(true);
    }, 0);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [hydrated, items]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count: hydrated ? items.reduce((sum, item) => sum + item.quantity, 0) : 0,
      addItem: (item) => {
        setItems((current) => {
          const existing = current.find((entry) => entry.variantId === item.variantId);
          if (existing) {
            return current.map((entry) =>
              entry.variantId === item.variantId
                ? { ...entry, quantity: Math.min(entry.quantity + item.quantity, 20) }
                : entry,
            );
          }
          return [...current, item];
        });
      },
      updateQuantity: (variantId, quantity) => {
        setItems((current) =>
          current
            .map((item) => (item.variantId === variantId ? { ...item, quantity } : item))
            .filter((item) => item.quantity > 0),
        );
      },
      removeItem: (variantId) => {
        setItems((current) => current.filter((item) => item.variantId !== variantId));
      },
      clearCart: () => setItems([]),
    }),
    [hydrated, items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return value;
}
