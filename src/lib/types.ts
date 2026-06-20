export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
};

export type ProductVariant = {
  id: string;
  sku: string;
  size?: string;
  color?: string;
  price: number;
  stock: number;
};

export type Product = {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  description: string;
  basePrice: number;
  brand: string;
  material: string;
  isFeatured: boolean;
  images: string[];
  variants: ProductVariant[];
};

export type CartItem = {
  productId: string;
  variantId: string;
  quantity: number;
};

export type OrderStatus = "PENDING" | "PAID" | "SHIPPED" | "COMPLETED" | "CANCELLED";

export type PaymentMethod = "PROMPTPAY" | "CREDIT_CARD";

export type CustomerOrder = {
  id: string;
  orderNo: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  shippingAddress: string;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  trackingNo?: string;
  totalAmount: number;
  createdAt: string;
  items: Array<{
    productId: string;
    productName: string;
    variantId: string;
    sku: string;
    label: string;
    quantity: number;
    unitPrice: number;
  }>;
};
