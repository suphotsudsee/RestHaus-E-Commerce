"use client";

import { FormEvent, useEffect, useState } from "react";
import { CheckCircle2, CircleDot, PackageSearch, Truck } from "lucide-react";
import { formatPrice } from "@/lib/catalog";
import type { CustomerOrder, OrderStatus } from "@/lib/types";

const steps: OrderStatus[] = ["PENDING", "PAID", "SHIPPED", "COMPLETED"];

export default function TrackOrderPage() {
  const [orderNo, setOrderNo] = useState(() => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get("order") ?? "";
  });
  const [order, setOrder] = useState<CustomerOrder | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (orderNo) {
      window.setTimeout(() => void lookup(orderNo), 0);
    }
    // Initial query-param lookup only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function lookup(value: string) {
    setLoading(true);
    setError("");
    const localOrders = JSON.parse(window.localStorage.getItem("mattress-commerce-orders") ?? "[]") as CustomerOrder[];
    const local = localOrders.find((item) => item.orderNo.toLowerCase() === value.toLowerCase());
    if (local) {
      setOrder(local);
      setLoading(false);
      return;
    }

    const response = await fetch(`/api/orders/${encodeURIComponent(value)}`);
    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setOrder(null);
      setError("Order not found. Try MC-1001 or an order created from checkout.");
      return;
    }
    setOrder(data.order as CustomerOrder);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void lookup(orderNo);
  }

  const activeIndex = order ? steps.indexOf(order.status) : -1;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
            <PackageSearch size={22} aria-hidden="true" />
          </span>
          <div>
            <h1 className="text-3xl font-bold tracking-normal text-slate-950">Order tracking</h1>
            <p className="text-slate-600">Check shipment and payment status by order number.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
          <input
            value={orderNo}
            onChange={(event) => setOrderNo(event.target.value)}
            placeholder="MC-1001"
            required
            className="h-11 flex-1 rounded-lg border border-slate-300 px-3 outline-none focus:border-slate-950"
          />
          <button type="submit" disabled={loading} className="h-11 rounded-lg bg-slate-950 px-5 text-sm font-semibold text-white disabled:bg-slate-300">
            {loading ? "Checking..." : "Track order"}
          </button>
        </form>
        {error ? <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
      </div>

      {order ? (
        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col justify-between gap-3 sm:flex-row">
              <div>
                <p className="text-sm text-slate-500">Order number</p>
                <h2 className="text-2xl font-bold tracking-normal text-slate-950">{order.orderNo}</h2>
              </div>
              <span className="h-fit rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                {order.status}
              </span>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-4">
              {steps.map((step, index) => {
                const complete = index <= activeIndex;
                return (
                  <div key={step} className="rounded-lg border border-slate-200 p-4">
                    {complete ? (
                      <CheckCircle2 className="text-emerald-600" size={22} aria-hidden="true" />
                    ) : (
                      <CircleDot className="text-slate-300" size={22} aria-hidden="true" />
                    )}
                    <p className="mt-3 text-sm font-semibold text-slate-950">{step}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 space-y-4">
              {order.items.map((item) => (
                <div key={item.variantId} className="flex justify-between gap-4 border-t border-slate-100 pt-4 text-sm">
                  <div>
                    <p className="font-medium text-slate-950">{item.productName}</p>
                    <p className="text-slate-500">{item.label} · Qty {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-slate-950">{formatPrice(item.unitPrice * item.quantity)}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="h-fit rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <Truck className="text-emerald-700" size={24} aria-hidden="true" />
            <h2 className="mt-3 text-lg font-semibold text-slate-950">Delivery</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{order.shippingAddress}</p>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-500">Tracking no.</dt>
                <dd className="font-medium text-slate-950">{order.trackingNo ?? "Pending"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Payment</dt>
                <dd className="font-medium text-slate-950">{order.paymentMethod}</dd>
              </div>
              <div className="flex justify-between border-t border-slate-100 pt-3">
                <dt className="font-semibold text-slate-950">Total</dt>
                <dd className="font-bold text-slate-950">{formatPrice(order.totalAmount)}</dd>
              </div>
            </dl>
          </aside>
        </section>
      ) : null}
    </main>
  );
}
