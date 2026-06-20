import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2, PackageCheck, Truck } from "lucide-react";
import { AddToCart } from "@/components/add-to-cart";
import { categories, formatPrice, getProduct } from "@/lib/catalog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) return {};

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images,
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  const category = categories.find((item) => item.id === product.categoryId);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="space-y-4">
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
            <img src={product.images[0]} alt={product.name} className="aspect-[4/3] w-full object-cover" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {product.images.slice(1).map((image) => (
              <img key={image} src={image} alt={product.name} className="aspect-[4/3] rounded-lg border border-slate-200 object-cover" />
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">{category?.name}</p>
            <h1 className="mt-2 text-4xl font-bold tracking-normal text-slate-950">{product.name}</h1>
            <p className="mt-4 text-lg font-semibold text-slate-950">From {formatPrice(product.basePrice)}</p>
            <p className="mt-4 leading-8 text-slate-600">{product.description}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { icon: PackageCheck, label: "Real-time variant stock" },
              { icon: Truck, label: "Delivery status updates" },
              { icon: CheckCircle2, label: "Guest checkout ready" },
            ].map((item) => (
              <div key={item.label} className="rounded-lg border border-slate-200 bg-white p-4">
                <item.icon size={20} className="text-emerald-700" aria-hidden="true" />
                <p className="mt-3 text-sm font-medium text-slate-700">{item.label}</p>
              </div>
            ))}
          </div>

          <AddToCart product={product} />

          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="font-semibold text-slate-950">Specifications</h2>
            <dl className="mt-4 grid gap-3 text-sm">
              <div className="flex justify-between gap-4 border-b border-slate-100 pb-3">
                <dt className="text-slate-500">Brand</dt>
                <dd className="font-medium text-slate-950">{product.brand}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-slate-100 pb-3">
                <dt className="text-slate-500">Material</dt>
                <dd className="font-medium text-slate-950">{product.material}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">SKU variants</dt>
                <dd className="font-medium text-slate-950">{product.variants.length}</dd>
              </div>
            </dl>
          </div>
        </section>
      </div>
    </main>
  );
}
