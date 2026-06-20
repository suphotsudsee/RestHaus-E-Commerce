# Database Schema (Prisma Format for MySQL)

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String?
  name      String?
  role      Role     @default(CUSTOMER)
  phone     String?
  orders    Order[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  CUSTOMER
  ADMIN
}

model Category {
  id          String    @id @default(uuid())
  name        String
  slug        String    @unique
  description String?
  products    Product[]
}

model Product {
  id          String           @id @default(uuid())
  categoryId  String
  name        String
  slug        String           @unique
  description String           @db.Text
  basePrice   Decimal          @db.Decimal(10, 2)
  isFeatured  Boolean          @default(false)
  category    Category         @relation(fields: [categoryId], references: [id])
  variants    ProductVariant[]
  images      ProductImage[]
  createdAt   DateTime         @default(now())
  updatedAt   DateTime         @updatedAt
}

model ProductVariant {
  id         String      @id @default(uuid())
  productId  String
  sku        String      @unique
  size       String?     // เช่น 3.5ft, 5ft, 6ft
  color      String?
  price      Decimal     @db.Decimal(10, 2) // ราคาของ variant นี้
  stock      Int         @default(0)
  product    Product     @relation(fields: [productId], references: [id], onDelete: Cascade)
  orderItems OrderItem[]
}

model ProductImage {
  id        String  @id @default(uuid())
  productId String
  url       String
  isPrimary Boolean @default(false)
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
}

model Order {
  id              String      @id @default(uuid())
  userId          String?     // Nullable for guest checkout
  status          OrderStatus @default(PENDING)
  totalAmount     Decimal     @db.Decimal(10, 2)
  shippingAddress String      @db.Text
  trackingNo      String?
  user            User?       @relation(fields: [userId], references: [id])
  items           OrderItem[]
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
}

enum OrderStatus {
  PENDING
  PAID
  SHIPPED
  COMPLETED
  CANCELLED
}

model OrderItem {
  id               String         @id @default(uuid())
  orderId          String
  productVariantId String
  quantity         Int
  unitPrice        Decimal        @db.Decimal(10, 2)
  order            Order          @relation(fields: [orderId], references: [id], onDelete: Cascade)
  variant          ProductVariant @relation(fields: [productVariantId], references: [id])
}
```
