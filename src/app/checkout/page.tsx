"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { CheckCircle2, CreditCard, QrCode } from "lucide-react";
import { formatPrice, getProductById, getVariant } from "@/lib/catalog";
import type { CustomerOrder, PaymentMethod } from "@/lib/types";
import { useCart } from "@/components/cart-provider";

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("PROMPTPAY");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState<CustomerOrder | null>(null);

  const lines = useMemo(
    () =>
      items
        .map((item) => {
          const product = getProductById(item.productId);
          const variant = getVariant(item.productId, item.variantId);
          if (!product || !variant) return null;
          return { item, product, variant, lineTotal: variant.price * item.quantity };
        })
        .filter(Boolean),
    [items],
  );
  const total = lines.reduce((sum, line) => sum + (line?.lineTotal ?? 0), 0);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const form = new FormData(event.currentTarget);
    const payload = {
      customerName: String(form.get("customerName") ?? ""),
      customerEmail: String(form.get("customerEmail") ?? ""),
      customerPhone: String(form.get("customerPhone") ?? ""),
      shippingAddress: String(form.get("shippingAddress") ?? ""),
      paymentMethod,
      items,
    };

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    setSubmitting(false);

    if (!response.ok) {
      setError(data.message ?? "Unable to create order.");
      return;
    }

    const created = data.order as CustomerOrder;
    const stored = JSON.parse(window.localStorage.getItem("mattress-commerce-orders") ?? "[]") as CustomerOrder[];
    window.localStorage.setItem("mattress-commerce-orders", JSON.stringify([created, ...stored]));
    clearCart();
    setOrder(created);
  }

  if (order) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-emerald-200 bg-white p-8 text-center shadow-sm">
          <CheckCircle2 className="mx-auto text-emerald-600" size={48} aria-hidden="true" />
          <h1 className="mt-5 text-3xl font-bold tracking-normal text-slate-950">Order received</h1>
          <p className="mt-3 text-slate-600">
            Your order number is <span className="font-semibold text-slate-950">{order.orderNo}</span>.
          </p>
          <p className="mt-2 text-slate-600">
            Status: <span className="font-semibold text-slate-950">{order.status}</span>
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href={`/track?order=${order.orderNo}`} className="inline-flex h-11 items-center justify-center rounded-lg bg-slate-950 px-5 text-sm font-semibold text-white">
              Track order
            </Link>
            <Link href="/shop" className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-300 px-5 text-sm font-semibold text-slate-950">
              Continue shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-normal text-slate-950">Checkout</h1>
      <p className="mt-2 text-slate-600">Guest checkout with delivery and payment information.</p>

      {items.length ? (
        <form onSubmit={handleSubmit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <section className="space-y-6">
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-950">Shipping details</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Full name</span>
                  <input name="customerName" required className="mt-2 h-11 w-full rounded-lg border border-slate-300 px-3 outline-none focus:border-slate-950" />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Email</span>
                  <input name="customerEmail" type="email" required className="mt-2 h-11 w-full rounded-lg border border-slate-300 px-3 outline-none focus:border-slate-950" />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-sm font-medium text-slate-700">Phone</span>
                  <input name="customerPhone" className="mt-2 h-11 w-full rounded-lg border border-slate-300 px-3 outline-none focus:border-slate-950" />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-sm font-medium text-slate-700">Shipping address</span>
                  <textarea name="shippingAddress" required rows={4} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-3 outline-none focus:border-slate-950" />
                </label>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-950">Payment method</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  { id: "PROMPTPAY" as const, icon: QrCode, title: "QR PromptPay", text: "Creates a pending order for QR payment." },
                  { id: "CREDIT_CARD" as const, icon: CreditCard, title: "Credit card", text: "Simulates a paid card authorization." },
                ].map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id)}
                    className={`rounded-lg border p-4 text-left ${
                      paymentMethod === method.id ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-700"
                    }`}
                  >
                    <method.icon size={22} aria-hidden="true" />
                    <span className="mt-3 block font-semibold">{method.title}</span>
                    <span className={paymentMethod === method.id ? "mt-1 block text-sm text-slate-200" : "mt-1 block text-sm text-slate-500"}>
                      {method.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <aside className="h-fit rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-950">Summary</h2>
            <div className="mt-5 space-y-4">
              {lines.map((line) =>
                line ? (
                  <div key={line.variant.id} className="flex justify-between gap-3 text-sm">
                    <div>
                      <p className="font-medium text-slate-950">{line.product.name}</p>
                      <p className="text-slate-500">Qty {line.item.quantity}</p>
                    </div>
                    <span className="font-semibold text-slate-950">{formatPrice(line.lineTotal)}</span>
                  </div>
                ) : null,
              )}
              <div className="border-t border-slate-200 pt-4">
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-950">Total</span>
                  <span className="font-bold text-slate-950">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
            {error ? <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
            <button type="submit" disabled={submitting} className="mt-5 h-11 w-full rounded-lg bg-emerald-600 px-4 text-sm font-semibold text-white hover:bg-emerald-700 disabled:bg-slate-300">
              {submitting ? "Creating order..." : "Place order"}
            </button>
          </aside>
        </form>
      ) : (
        <div className="mt-8 rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center">
          <h2 className="text-xl font-semibold text-slate-950">Cart is empty</h2>
          <Link href="/shop" className="mt-5 inline-flex h-11 items-center justify-center rounded-lg bg-slate-950 px-5 text-sm font-semibold text-white">
            Browse products
          </Link>
        </div>
      )}
    </main>
  );
}
