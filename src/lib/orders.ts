import { z } from "zod";
import { getProductById, getVariant, getVariantLabel } from "./catalog";
import type { CustomerOrder } from "./types";

export const checkoutSchema = z.object({
  customerName: z.string().min(2),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(8).optional().or(z.literal("")),
  shippingAddress: z.string().min(10),
  paymentMethod: z.enum(["PROMPTPAY", "CREDIT_CARD"]),
  items: z
    .array(
      z.object({
        productId: z.string(),
        variantId: z.string(),
        quantity: z.number().int().min(1).max(20),
      }),
    )
    .min(1),
});

type CheckoutInput = z.infer<typeof checkoutSchema>;

declare global {
  var __commerceOrders: CustomerOrder[] | undefined;
}

const initialOrders: CustomerOrder[] = [
  {
    id: "ord-seed-1001",
    orderNo: "MC-1001",
    customerName: "Narin Design Studio",
    customerEmail: "procurement@example.com",
    customerPhone: "0812345678",
    shippingAddress: "88 Sukhumvit Road, Bangkok 10110",
    paymentMethod: "PROMPTPAY",
    status: "SHIPPED",
    trackingNo: "THP93820184",
    totalAmount: 41800,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
    items: [
      {
        productId: "prod-cloud-rest",
        productName: "CloudRest Hybrid Mattress",
        variantId: "var-cloud-60",
        sku: "CR-HYB-60",
        label: "6 ft",
        quantity: 1,
        unitPrice: 19900,
      },
      {
        productId: "prod-oak-storage-bed",
        productName: "Oakline Storage Bed",
        variantId: "var-oak-50",
        sku: "OK-STO-50",
        label: "5 ft / Natural oak",
        quantity: 1,
        unitPrice: 21900,
      },
    ],
  },
  {
    id: "ord-seed-1002",
    orderNo: "MC-1002",
    customerName: "Guest Customer",
    customerEmail: "guest@example.com",
    shippingAddress: "55 Rama IX Road, Bangkok 10310",
    paymentMethod: "CREDIT_CARD",
    status: "PAID",
    totalAmount: 15900,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    items: [
      {
        productId: "prod-nord-sofa",
        productName: "Nord Three-Seat Sofa",
        variantId: "var-nord-ash",
        sku: "ND-SFA-ASH",
        label: "Ash grey",
        quantity: 1,
        unitPrice: 15900,
      },
    ],
  },
];

function orderStore() {
  if (!globalThis.__commerceOrders) {
    globalThis.__commerceOrders = [...initialOrders];
  }
  return globalThis.__commerceOrders;
}

export function getOrders() {
  return orderStore().toSorted((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
}

export function findOrder(orderNo: string) {
  return orderStore().find((order) => order.orderNo.toLowerCase() === orderNo.toLowerCase());
}

export function createOrder(input: CheckoutInput) {
  const parsed = checkoutSchema.parse(input);

  const items = parsed.items.map((item) => {
    const product = getProductById(item.productId);
    const variant = getVariant(item.productId, item.variantId);

    if (!product || !variant) {
      throw new Error("Product variant was not found.");
    }

    if (item.quantity > variant.stock) {
      throw new Error(`${product.name} has only ${variant.stock} items in stock.`);
    }

    return {
      productId: product.id,
      productName: product.name,
      variantId: variant.id,
      sku: variant.sku,
      label: getVariantLabel(product, variant.id),
      quantity: item.quantity,
      unitPrice: variant.price,
    };
  });

  const totalAmount = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const orderNo = `MC-${Math.floor(100000 + Math.random() * 900000)}`;
  const order: CustomerOrder = {
    id: crypto.randomUUID(),
    orderNo,
    customerName: parsed.customerName,
    customerEmail: parsed.customerEmail,
    customerPhone: parsed.customerPhone || undefined,
    shippingAddress: parsed.shippingAddress,
    paymentMethod: parsed.paymentMethod,
    status: parsed.paymentMethod === "CREDIT_CARD" ? "PAID" : "PENDING",
    totalAmount,
    createdAt: new Date().toISOString(),
    items,
  };

  orderStore().unshift(order);
  return order;
}
