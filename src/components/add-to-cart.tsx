"use client";

import { useState } from "react";
import { Check, ShoppingCart } from "lucide-react";
import { formatPrice, getVariantLabel } from "@/lib/catalog";
import type { Product } from "@/lib/types";
import { useCart } from "./cart-provider";

export function AddToCart({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [variantId, setVariantId] = useState(product.variants[0]?.id ?? "");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const variant = product.variants.find((item) => item.id === variantId) ?? product.variants[0];

  function handleAdd() {
    if (!variant) return;
    addItem({ productId: product.id, variantId: variant.id, quantity });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  if (!variant) return null;

  return (
    <div className="space-y-5 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <p className="text-sm font-semibold text-slate-700">Variant</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {product.variants.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setVariantId(item.id)}
              className={`rounded-lg border px-3 py-3 text-left text-sm transition ${
                item.id === variant.id
                  ? "border-slate-950 bg-slate-950 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
              }`}
            >
              <span className="block font-semibold">{getVariantLabel(product, item.id)}</span>
              <span className={item.id === variant.id ? "text-slate-200" : "text-slate-500"}>
                {formatPrice(item.price)} · Stock {item.stock}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-end gap-3">
        <label className="flex-1">
          <span className="text-sm font-semibold text-slate-700">Quantity</span>
          <input
            type="number"
            min={1}
            max={Math.min(variant.stock, 20)}
            value={quantity}
            onChange={(event) =>
              setQuantity(Math.max(1, Math.min(Number(event.target.value), Math.min(variant.stock, 20))))
            }
            className="mt-2 h-11 w-full rounded-lg border border-slate-300 px-3 text-slate-950 outline-none focus:border-slate-950"
          />
        </label>
        <button
          type="button"
          onClick={handleAdd}
          disabled={variant.stock < 1}
          className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 text-sm font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {added ? <Check size={18} aria-hidden="true" /> : <ShoppingCart size={18} aria-hidden="true" />}
          {added ? "Added" : "Add to cart"}
        </button>
      </div>
    </div>
  );
}
