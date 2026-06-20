import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Banknote, ClipboardList, PackageCheck, ShoppingCart } from "lucide-react";
import { formatPrice, products } from "@/lib/catalog";
import { getOrders } from "@/lib/orders";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default function AdminDashboardPage() {
  const orders = getOrders();
  const revenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const stock = products.flatMap((product) => product.variants).reduce((sum, variant) => sum + variant.stock, 0);
  const pending = orders.filter((order) => order.status === "PENDING").length;

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Total sales", value: formatPrice(revenue), icon: Banknote },
          { label: "Orders", value: orders.length.toString(), icon: ShoppingCart },
          { label: "Stock units", value: stock.toString(), icon: PackageCheck },
          { label: "Pending payment", value: pending.toString(), icon: ClipboardList },
        ].map((card) => (
          <div key={card.label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <card.icon className="text-emerald-700" size={22} aria-hidden="true" />
            <p className="mt-4 text-sm text-slate-500">{card.label}</p>
            <p className="mt-1 text-2xl font-bold tracking-normal text-slate-950">{card.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 p-5">
            <h2 className="text-lg font-semibold text-slate-950">Latest orders</h2>
            <Link href="/admin/orders" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950">
              Manage
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="grid gap-3 p-5 sm:grid-cols-[1fr_auto_auto] sm:items-center">
                <div>
                  <p className="font-semibold text-slate-950">{order.orderNo}</p>
                  <p className="text-sm text-slate-500">{order.customerName}</p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{order.status}</span>
                <p className="font-semibold text-slate-950">{formatPrice(order.totalAmount)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">Low stock variants</h2>
          <div className="mt-4 space-y-3">
            {products
              .flatMap((product) => product.variants.map((variant) => ({ product, variant })))
              .filter((row) => row.variant.stock <= 7)
              .map((row) => (
                <div key={row.variant.id} className="flex justify-between gap-4 rounded-lg bg-slate-50 p-3 text-sm">
                  <div>
                    <p className="font-medium text-slate-950">{row.product.name}</p>
                    <p className="text-slate-500">{row.variant.sku}</p>
                  </div>
                  <span className="font-semibold text-amber-700">{row.variant.stock}</span>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
