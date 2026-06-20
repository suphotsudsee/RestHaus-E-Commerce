import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, WalletCards } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { categories, products } from "@/lib/catalog";

export default function Home() {
  const featuredProducts = products.filter((product) => product.isFeatured);

  return (
    <main>
      <section className="relative min-h-[680px] overflow-hidden bg-slate-950 text-white">
        <img
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2200&q=80"
          alt="Warm bedroom with modern bed and furniture"
          className="absolute inset-0 h-full w-full object-cover opacity-65"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.88),rgba(15,23,42,0.46),rgba(15,23,42,0.2))]" />
        <div className="relative mx-auto flex min-h-[680px] max-w-7xl items-center px-4 pb-20 pt-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              Mattress & furniture commerce
            </p>
            <h1 className="mt-5 text-5xl font-bold leading-[1.05] tracking-normal sm:text-6xl">
              RestHaus
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-100">
              Shop premium mattresses, beds, sofas, and storage furniture with fast filtering,
              variant selection, secure checkout, and order tracking.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/shop"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Shop collection
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link
                href="/track"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-white/50 px-6 text-sm font-semibold text-white hover:bg-white/10"
              >
                Track an order
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="-mt-16 px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto grid max-w-7xl gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-lg md:grid-cols-3">
          {[
            { icon: Truck, title: "Delivery ready", text: "Shipping statuses are tracked from checkout to completion." },
            { icon: WalletCards, title: "PromptPay or card", text: "Checkout supports QR PromptPay and credit card payment modes." },
            { icon: ShieldCheck, title: "Stock aware", text: "Variant inventory is validated before each order is created." },
          ].map((item) => (
            <div key={item.title} className="flex gap-4 p-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                <item.icon size={22} aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-semibold text-slate-950">{item.title}</h2>
                <p className="mt-1 text-sm leading-6 text-slate-600">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              Featured products
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-normal text-slate-950">
              Best sellers for better rest
            </h2>
          </div>
          <Link href="/shop" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950">
            View all products
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              Shop by category
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-normal text-slate-950">
              Find the right room solution
            </h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/shop?category=${category.slug}`}
                className="rounded-lg border border-slate-200 bg-slate-50 p-5 hover:border-emerald-300 hover:bg-emerald-50"
              >
                <h3 className="text-lg font-semibold text-slate-950">{category.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
