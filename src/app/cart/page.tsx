"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { formatPrice, getProductById, getVariant, getVariantLabel } from "@/lib/catalog";
import { useCart } from "@/components/cart-provider";

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCart();
  const lines = items
    .map((item) => {
      const product = getProductById(item.productId);
      const variant = getVariant(item.productId, item.variantId);
      if (!product || !variant) return null;
      return { item, product, variant, lineTotal: variant.price * item.quantity };
    })
    .filter(Boolean);
  const total = lines.reduce((sum, line) => sum + (line?.lineTotal ?? 0), 0);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <span className="flex size-11 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
          <ShoppingBag size={22} aria-hidden="true" />
        </span>
        <div>
          <h1 className="text-3xl font-bold tracking-normal text-slate-950">Shopping cart</h1>
          <p className="text-slate-600">Review items before checkout.</p>
        </div>
      </div>

      {lines.length ? (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <section className="space-y-4">
            {lines.map((line) =>
              line ? (
                <article key={line.variant.id} className="grid gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[120px_1fr_auto]">
                  <img src={line.product.images[0]} alt={line.product.name} className="aspect-square rounded-lg object-cover" />
                  <div>
                    <h2 className="font-semibold text-slate-950">{line.product.name}</h2>
                    <p className="mt-1 text-sm text-slate-500">{getVariantLabel(line.product, line.variant.id)}</p>
                    <p className="mt-3 font-semibold text-slate-950">{formatPrice(line.variant.price)}</p>
                  </div>
                  <div className="flex items-center gap-2 sm:flex-col sm:items-end sm:justify-between">
                    <div className="flex h-10 items-center rounded-lg border border-slate-300">
                      <button
                        type="button"
                        onClick={() => updateQuantity(line.variant.id, line.item.quantity - 1)}
                        className="grid size-10 place-items-center text-slate-600 hover:bg-slate-50"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} aria-hidden="true" />
                      </button>
                      <span className="w-10 text-center text-sm font-semibold">{line.item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(line.variant.id, Math.min(line.item.quantity + 1, line.variant.stock))}
                        className="grid size-10 place-items-center text-slate-600 hover:bg-slate-50"
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} aria-hidden="true" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(line.variant.id)}
                      className="grid size-10 place-items-center rounded-lg text-red-600 hover:bg-red-50"
                      aria-label="Remove item"
                    >
                      <Trash2 size={17} aria-hidden="true" />
                    </button>
                  </div>
                </article>
              ) : null,
            )}
          </section>

          <aside className="h-fit rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-950">Order summary</h2>
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Subtotal</span>
                <span className="font-medium text-slate-950">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Delivery</span>
                <span className="font-medium text-slate-950">Calculated after address</span>
              </div>
              <div className="border-t border-slate-200 pt-3">
                <div className="flex justify-between text-base">
                  <span className="font-semibold text-slate-950">Total</span>
                  <span className="font-bold text-slate-950">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
            <Link href="/checkout" className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-lg bg-emerald-600 px-4 text-sm font-semibold text-white hover:bg-emerald-700">
              Checkout
            </Link>
          </aside>
        </div>
      ) : (
        <div className="mt-8 rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center">
          <h2 className="text-xl font-semibold text-slate-950">Your cart is empty</h2>
          <p className="mt-2 text-slate-600">Add a mattress or furniture item to continue.</p>
          <Link href="/shop" className="mt-5 inline-flex h-11 items-center justify-center rounded-lg bg-slate-950 px-5 text-sm font-semibold text-white">
            Browse products
          </Link>
        </div>
      )}
    </main>
  );
}
