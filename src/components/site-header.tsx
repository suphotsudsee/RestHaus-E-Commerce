"use client";

import Link from "next/link";
import { Armchair, ClipboardList, Menu, PackageSearch, ShoppingCart } from "lucide-react";
import { useCart } from "./cart-provider";

const navItems = [
  { href: "/shop", label: "Shop" },
  { href: "/track", label: "Track order" },
  { href: "/admin", label: "Admin" },
];

export function SiteHeader() {
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-slate-950">
          <span className="flex size-10 items-center justify-center rounded-lg bg-slate-950 text-white">
            <Armchair size={20} aria-hidden="true" />
          </span>
          <span className="text-lg font-semibold">RestHaus</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-700 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-slate-950">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/orders"
            className="hidden size-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 sm:flex"
            aria-label="Open order management"
            title="Orders"
          >
            <ClipboardList size={18} aria-hidden="true" />
          </Link>
          <Link
            href="/shop"
            className="hidden size-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 sm:flex"
            aria-label="Search products"
            title="Products"
          >
            <PackageSearch size={18} aria-hidden="true" />
          </Link>
          <Link
            href="/cart"
            className="relative flex size-10 items-center justify-center rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
            aria-label="Open cart"
            title="Cart"
          >
            <ShoppingCart size={18} aria-hidden="true" />
            {count > 0 ? (
              <span className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-amber-400 px-1 text-xs font-bold text-slate-950">
                {count}
              </span>
            ) : null}
          </Link>
          <button
            className="flex size-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 md:hidden"
            aria-label="Open navigation"
            title="Menu"
          >
            <Menu size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
