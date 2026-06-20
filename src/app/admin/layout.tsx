import Link from "next/link";
import { BarChart3, Boxes, ClipboardList, Shield } from "lucide-react";

const adminNav = [
  { href: "/admin", label: "Dashboard", icon: BarChart3 },
  { href: "/admin/products", label: "Products", icon: Boxes },
  { href: "/admin/orders", label: "Orders", icon: ClipboardList },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-lg bg-slate-950 text-white">
            <Shield size={20} aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Protected route demo</p>
            <h1 className="text-xl font-bold tracking-normal text-slate-950">Admin back-office</h1>
          </div>
        </div>
        <nav className="flex flex-wrap gap-2">
          {adminNav.map((item) => (
            <Link key={item.href} href={item.href} className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-semibold text-slate-700 hover:border-slate-300 hover:bg-slate-50">
              <item.icon size={16} aria-hidden="true" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      {children}
    </main>
  );
}
