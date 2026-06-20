import type { Metadata } from "next";
import { PackageCheck, Truck } from "lucide-react";
import { formatPrice } from "@/lib/catalog";
import { getOrders } from "@/lib/orders";

export const metadata: Metadata = {
  title: "Order Management",
};

export default function AdminOrdersPage() {
  const orders = getOrders();

  return (
    <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-5">
        <h2 className="text-xl font-bold tracking-normal text-slate-950">Order management</h2>
        <p className="mt-1 text-sm text-slate-600">Update shipment workflow from pending to completed.</p>
      </div>
      <div className="divide-y divide-slate-100">
        {orders.map((order) => (
          <article key={order.id} className="grid gap-5 p-5 lg:grid-cols-[1fr_260px]">
            <div>
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                  <p className="text-sm text-slate-500">{new Date(order.createdAt).toLocaleString("th-TH")}</p>
                  <h3 className="mt-1 text-lg font-semibold text-slate-950">{order.orderNo}</h3>
                  <p className="text-sm text-slate-600">{order.customerName} · {order.customerEmail}</p>
                </div>
                <span className="h-fit rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">{order.status}</span>
              </div>
              <div className="mt-4 grid gap-3">
                {order.items.map((item) => (
                  <div key={item.variantId} className="flex justify-between gap-4 rounded-lg bg-slate-50 p-3 text-sm">
                    <div>
                      <p className="font-medium text-slate-950">{item.productName}</p>
                      <p className="text-slate-500">{item.sku} · {item.label} · Qty {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-slate-950">{formatPrice(item.unitPrice * item.quantity)}</p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="rounded-lg border border-slate-200 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-950">
                <PackageCheck size={17} aria-hidden="true" />
                Fulfillment
              </div>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Payment</span>
                  <span className="font-medium text-slate-950">{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tracking</span>
                  <span className="font-medium text-slate-950">{order.trackingNo ?? "Not assigned"}</span>
                </div>
                <div className="flex justify-between border-t border-slate-100 pt-3">
                  <span className="font-semibold text-slate-950">Total</span>
                  <span className="font-bold text-slate-950">{formatPrice(order.totalAmount)}</span>
                </div>
              </div>
              <button className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white">
                <Truck size={16} aria-hidden="true" />
                Update status
              </button>
            </aside>
          </article>
        ))}
      </div>
    </section>
  );
}
