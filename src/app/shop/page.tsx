import type { Metadata } from "next";
import { Search, SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { categories, filterProducts, products } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Shop",
};

const sizes = Array.from(new Set(products.flatMap((product) => product.variants.map((variant) => variant.size).filter(Boolean))));
const materials = Array.from(new Set(products.map((product) => product.material)));

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const value = (key: string) => {
    const raw = params[key];
    return Array.isArray(raw) ? raw[0] : raw;
  };
  const filtered = filterProducts({
    q: value("q"),
    category: value("category"),
    size: value("size"),
    material: value("material"),
    min: value("min"),
    max: value("max"),
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Product catalog</p>
          <h1 className="mt-2 text-4xl font-bold tracking-normal text-slate-950">Shop mattresses and furniture</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Search by brand, filter by category, size, material, and price range.
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
          Showing <span className="font-semibold text-slate-950">{filtered.length}</span> of {products.length} products
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="h-fit rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center gap-2">
            <SlidersHorizontal size={18} aria-hidden="true" />
            <h2 className="font-semibold text-slate-950">Filters</h2>
          </div>
          <form className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Search</span>
              <div className="mt-2 flex h-11 items-center gap-2 rounded-lg border border-slate-300 px-3">
                <Search size={17} className="text-slate-400" aria-hidden="true" />
                <input
                  name="q"
                  defaultValue={value("q")}
                  placeholder="Mattress, sofa, brand"
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Category</span>
              <select name="category" defaultValue={value("category") ?? ""} className="mt-2 h-11 w-full rounded-lg border border-slate-300 px-3 text-sm">
                <option value="">All categories</option>
                {categories.map((category) => (
                  <option key={category.slug} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Size</span>
              <select name="size" defaultValue={value("size") ?? ""} className="mt-2 h-11 w-full rounded-lg border border-slate-300 px-3 text-sm">
                <option value="">Any size</option>
                {sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Material</span>
              <select name="material" defaultValue={value("material") ?? ""} className="mt-2 h-11 w-full rounded-lg border border-slate-300 px-3 text-sm">
                <option value="">Any material</option>
                {materials.map((material) => (
                  <option key={material} value={material}>
                    {material}
                  </option>
                ))}
              </select>
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label>
                <span className="text-sm font-medium text-slate-700">Min</span>
                <input name="min" type="number" defaultValue={value("min")} className="mt-2 h-11 w-full rounded-lg border border-slate-300 px-3 text-sm" />
              </label>
              <label>
                <span className="text-sm font-medium text-slate-700">Max</span>
                <input name="max" type="number" defaultValue={value("max")} className="mt-2 h-11 w-full rounded-lg border border-slate-300 px-3 text-sm" />
              </label>
            </div>

            <button type="submit" className="h-11 w-full rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white hover:bg-slate-800">
              Apply filters
            </button>
          </form>
        </aside>

        <section>
          {filtered.length ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center">
              <h2 className="text-xl font-semibold text-slate-950">No products found</h2>
              <p className="mt-2 text-slate-600">Try removing one or more filters.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
