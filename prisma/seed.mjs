import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  { id: "cat-mattress", name: "Mattresses", slug: "mattresses", description: "Pocket spring, latex, and hybrid mattresses." },
  { id: "cat-bed", name: "Beds", slug: "beds", description: "Bed frames, storage beds, and upholstered headboards." },
  { id: "cat-sofa", name: "Sofas", slug: "sofas", description: "Compact sofas and family lounge seating." },
  { id: "cat-storage", name: "Storage", slug: "storage", description: "Wardrobes, cabinets, and bedside storage." },
];

const products = [
  {
    id: "prod-cloud-rest",
    categoryId: "cat-mattress",
    name: "CloudRest Hybrid Mattress",
    slug: "cloudrest-hybrid-mattress",
    description: "A medium-firm hybrid mattress with pocket springs, cooling foam, and reinforced edges.",
    basePrice: "12900.00",
    brand: "CloudRest",
    material: "Hybrid foam",
    isFeatured: true,
    images: ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80"],
    variants: [
      { id: "var-cloud-35", sku: "CR-HYB-35", size: "3.5 ft", price: "12900.00", stock: 18 },
      { id: "var-cloud-50", sku: "CR-HYB-50", size: "5 ft", price: "16900.00", stock: 11 },
      { id: "var-cloud-60", sku: "CR-HYB-60", size: "6 ft", price: "19900.00", stock: 7 },
    ],
  },
  {
    id: "prod-oak-storage-bed",
    categoryId: "cat-bed",
    name: "Oakline Storage Bed",
    slug: "oakline-storage-bed",
    description: "Warm oak veneer bed frame with hydraulic under-bed storage and a padded headboard.",
    basePrice: "21900.00",
    brand: "Oakline",
    material: "Oak veneer",
    isFeatured: true,
    images: ["https://images.unsplash.com/photo-1617325710236-4a36d46427ec?auto=format&fit=crop&w=1400&q=80"],
    variants: [
      { id: "var-oak-50", sku: "OK-STO-50", size: "5 ft", color: "Natural oak", price: "21900.00", stock: 8 },
      { id: "var-oak-60", sku: "OK-STO-60", size: "6 ft", color: "Natural oak", price: "24900.00", stock: 4 },
    ],
  },
];

async function main() {
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
  }

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        description: product.description,
        basePrice: product.basePrice,
        brand: product.brand,
        material: product.material,
        isFeatured: product.isFeatured,
      },
      create: {
        id: product.id,
        categoryId: product.categoryId,
        name: product.name,
        slug: product.slug,
        description: product.description,
        basePrice: product.basePrice,
        brand: product.brand,
        material: product.material,
        isFeatured: product.isFeatured,
        images: {
          create: product.images.map((url, index) => ({
            url,
            alt: product.name,
            isPrimary: index === 0,
          })),
        },
        variants: {
          create: product.variants,
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
