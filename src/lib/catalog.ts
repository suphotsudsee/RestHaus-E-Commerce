import type { Category, Product } from "./types";

export const categories: Category[] = [
  {
    id: "cat-mattress",
    name: "Mattresses",
    slug: "mattresses",
    description: "Pocket spring, latex, and hybrid mattresses for every room.",
  },
  {
    id: "cat-bed",
    name: "Beds",
    slug: "beds",
    description: "Bed frames, storage beds, and upholstered headboards.",
  },
  {
    id: "cat-sofa",
    name: "Sofas",
    slug: "sofas",
    description: "Compact sofas and family lounge seating.",
  },
  {
    id: "cat-storage",
    name: "Storage",
    slug: "storage",
    description: "Wardrobes, cabinets, and bedside storage.",
  },
];

export const products: Product[] = [
  {
    id: "prod-cloud-rest",
    categoryId: "cat-mattress",
    name: "CloudRest Hybrid Mattress",
    slug: "cloudrest-hybrid-mattress",
    description:
      "A medium-firm hybrid mattress with pocket springs, cooling foam, and reinforced edges for balanced support.",
    basePrice: 12900,
    brand: "CloudRest",
    material: "Hybrid foam",
    isFeatured: true,
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1400&q=80",
    ],
    variants: [
      { id: "var-cloud-35", sku: "CR-HYB-35", size: "3.5 ft", price: 12900, stock: 18 },
      { id: "var-cloud-50", sku: "CR-HYB-50", size: "5 ft", price: 16900, stock: 11 },
      { id: "var-cloud-60", sku: "CR-HYB-60", size: "6 ft", price: 19900, stock: 7 },
    ],
  },
  {
    id: "prod-latex-air",
    categoryId: "cat-mattress",
    name: "LatexAir Natural Mattress",
    slug: "latexair-natural-mattress",
    description:
      "Natural latex comfort with breathable pin-core structure, ideal for buyers who prefer resilient support.",
    basePrice: 18900,
    brand: "LatexAir",
    material: "Natural latex",
    isFeatured: true,
    images: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1400&q=80",
    ],
    variants: [
      { id: "var-latex-35", sku: "LA-NAT-35", size: "3.5 ft", price: 18900, stock: 10 },
      { id: "var-latex-50", sku: "LA-NAT-50", size: "5 ft", price: 23900, stock: 6 },
      { id: "var-latex-60", sku: "LA-NAT-60", size: "6 ft", price: 27900, stock: 5 },
    ],
  },
  {
    id: "prod-oak-storage-bed",
    categoryId: "cat-bed",
    name: "Oakline Storage Bed",
    slug: "oakline-storage-bed",
    description:
      "Warm oak veneer bed frame with hydraulic under-bed storage and a padded headboard.",
    basePrice: 21900,
    brand: "Oakline",
    material: "Oak veneer",
    isFeatured: true,
    images: [
      "https://images.unsplash.com/photo-1617325710236-4a36d46427ec?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1617104678098-de229db51175?auto=format&fit=crop&w=1400&q=80",
    ],
    variants: [
      { id: "var-oak-50", sku: "OK-STO-50", size: "5 ft", color: "Natural oak", price: 21900, stock: 8 },
      { id: "var-oak-60", sku: "OK-STO-60", size: "6 ft", color: "Natural oak", price: 24900, stock: 4 },
    ],
  },
  {
    id: "prod-nord-sofa",
    categoryId: "cat-sofa",
    name: "Nord Three-Seat Sofa",
    slug: "nord-three-seat-sofa",
    description:
      "A compact three-seat sofa with washable performance fabric and firm cushions for everyday living.",
    basePrice: 15900,
    brand: "Nord",
    material: "Performance fabric",
    isFeatured: false,
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=1400&q=80",
    ],
    variants: [
      { id: "var-nord-ash", sku: "ND-SFA-ASH", color: "Ash grey", price: 15900, stock: 14 },
      { id: "var-nord-moss", sku: "ND-SFA-MOS", color: "Moss green", price: 16900, stock: 6 },
    ],
  },
  {
    id: "prod-luna-wardrobe",
    categoryId: "cat-storage",
    name: "Luna Sliding Wardrobe",
    slug: "luna-sliding-wardrobe",
    description:
      "Two-door sliding wardrobe with soft-close rails, hanging space, shelves, and mirrored option.",
    basePrice: 13900,
    brand: "Luna",
    material: "Engineered wood",
    isFeatured: false,
    images: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1400&q=80",
    ],
    variants: [
      { id: "var-luna-white", sku: "LN-WRD-WHT", color: "White", price: 13900, stock: 9 },
      { id: "var-luna-walnut", sku: "LN-WRD-WAL", color: "Walnut", price: 14900, stock: 7 },
    ],
  },
  {
    id: "prod-pure-pillow",
    categoryId: "cat-mattress",
    name: "PureSupport Pillow Set",
    slug: "puresupport-pillow-set",
    description:
      "A pair of ergonomic pillows with removable covers, designed to pair with every mattress size.",
    basePrice: 2490,
    brand: "PureSupport",
    material: "Memory foam",
    isFeatured: false,
    images: [
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1400&q=80",
    ],
    variants: [
      { id: "var-pillow-standard", sku: "PS-PIL-STD", size: "Standard pair", price: 2490, stock: 30 },
    ],
  },
];

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

export function getVariant(productId: string, variantId: string) {
  return getProductById(productId)?.variants.find((variant) => variant.id === variantId);
}

export function getVariantLabel(product: Product, variantId: string) {
  const variant = product.variants.find((item) => item.id === variantId);
  if (!variant) return "";
  return [variant.size, variant.color].filter(Boolean).join(" / ") || variant.sku;
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(value);
}

export function filterProducts(filters: {
  q?: string;
  category?: string;
  size?: string;
  material?: string;
  min?: string;
  max?: string;
}) {
  const query = filters.q?.trim().toLowerCase();
  const min = filters.min ? Number(filters.min) : undefined;
  const max = filters.max ? Number(filters.max) : undefined;

  return products.filter((product) => {
    const category = categories.find((item) => item.id === product.categoryId);
    const matchesQuery =
      !query ||
      product.name.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query) ||
      product.material.toLowerCase().includes(query);
    const matchesCategory = !filters.category || category?.slug === filters.category;
    const matchesSize = !filters.size || product.variants.some((variant) => variant.size === filters.size);
    const matchesMaterial = !filters.material || product.material === filters.material;
    const matchesMin = min === undefined || product.basePrice >= min;
    const matchesMax = max === undefined || product.basePrice <= max;

    return matchesQuery && matchesCategory && matchesSize && matchesMaterial && matchesMin && matchesMax;
  });
}
