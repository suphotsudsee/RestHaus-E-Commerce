import Link from "next/link";
import { ArrowRight, Boxes } from "lucide-react";
import { categories, formatPrice, getVariantLabel } from "@/lib/catalog";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const category = categories.find((item) => item.id === product.categoryId);
  const stock = product.variants.reduce((sum, variant) => sum + variant.stock, 0);
  const variantSummary = product.variants
    .slice(0, 3)
    .map((variant) => getVariantLabel(product, variant.id))
    .join(", ");

  return (
    <article className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="aspect-[4/3] overflow-hidden bg-slate-100">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="space-y-4 p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
            {category?.name}
          </p>
          <Link href={`/product/${product.slug}`}>
            <h3 className="mt-1 text-lg font-semibold text-slate-950 group-hover:text-emerald-700">
              {product.name}
            </h3>
          </Link>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{product.description}</p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-lg font-bold text-slate-950">{formatPrice(product.basePrice)}</p>
            <p className="text-xs text-slate-500">{variantSummary}</p>
          </div>
          <div className="flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
            <Boxes size={14} aria-hidden="true" />
            {stock}
          </div>
        </div>
        <Link
          href={`/product/${product.slug}`}
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white hover:bg-slate-800"
        >
          View product
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
