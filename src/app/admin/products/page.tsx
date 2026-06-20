import type { Metadata } from "next";
import { Edit, Plus, Trash2 } from "lucide-react";
import { categories, formatPrice, products } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Product Management",
};

export default function AdminProductsPage() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold tracking-normal text-slate-950">Product management</h2>
          <p className="mt-1 text-sm text-slate-600">Catalog, categories, variants, and stock overview.</p>
        </div>
        <button className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white">
          <Plus size={16} aria-hidden="true" />
          Add product
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[920px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-5 py-3">Product</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Brand</th>
              <th className="px-5 py-3">Base price</th>
              <th className="px-5 py-3">Variants</th>
              <th className="px-5 py-3">Stock</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((product) => {
              const category = categories.find((item) => item.id === product.categoryId);
              const stock = product.variants.reduce((sum, variant) => sum + variant.stock, 0);
              return (
                <tr key={product.id}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img src={product.images[0]} alt={product.name} className="size-12 rounded-lg object-cover" />
                      <div>
                        <p className="font-semibold text-slate-950">{product.name}</p>
                        <p className="text-xs text-slate-500">{product.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-700">{category?.name}</td>
                  <td className="px-5 py-4 text-slate-700">{product.brand}</td>
                  <td className="px-5 py-4 font-semibold text-slate-950">{formatPrice(product.basePrice)}</td>
                  <td className="px-5 py-4 text-slate-700">{product.variants.length}</td>
                  <td className="px-5 py-4">
                    <span className={stock <= 7 ? "font-semibold text-amber-700" : "font-semibold text-emerald-700"}>{stock}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button className="grid size-9 place-items-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50" aria-label="Edit product">
                        <Edit size={15} aria-hidden="true" />
                      </button>
                      <button className="grid size-9 place-items-center rounded-lg border border-slate-200 text-red-600 hover:bg-red-50" aria-label="Delete product">
                        <Trash2 size={15} aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
