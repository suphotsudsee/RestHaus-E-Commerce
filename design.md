# System Architecture & Design Specification

## 1. Technology Stack
- **Frontend / Backend:** Next.js (App Router)
- **Styling:** Tailwind CSS + shadcn/ui (สำหรับ UI Components ที่รวดเร็วและเป็นมาตรฐาน)
- **Database:** MySQL (Relational Database สำหรับเก็บข้อมูลหลัก)
- **ORM:** Prisma
- **Caching / Session:** Redis (สำหรับเก็บข้อมูล Shopping Cart ชั่วคราว และ Cache สินค้าหน้าแรก)
- **Infrastructure:** Docker & Docker Compose (สำหรับการทำ Containerization ให้พร้อม Deploy บน VPS)

## 2. UI/UX Guidelines
- **Theme Concept:** "Cozy, Minimal, Trustworthy"
- **Color Palette:**
  - Primary: สีน้ำเงินเข้ม (Navy Blue) หรือสีเอิร์ธโทน (Wood/Beige) เพื่อสื่อถึงความพักผ่อนและความอบอุ่น
  - Background: ขาว (#FFFFFF) และ เทาอ่อน (#F9FAFB)
  - Accent: สีเขียว (Success/Buy) หรือสีทอง (Premium)
- **Typography:** ฟอนต์ที่อ่านง่ายและดูทันสมัย (เช่น Prompt หรือ Kanit สำหรับภาษาไทย, Inter สำหรับภาษาอังกฤษ)
- **Imagery:** เน้นภาพสินค้าขนาดใหญ่ ชัดเจน มีภาพประกอบการใช้งานจริง (Lifestyle images)

## 3. Core Pages / Routes
- `/` - หน้าแรก (Hero banner, สินค้าขายดี, หมวดหมู่แนะนำ)
- `/shop` - หน้ารวมสินค้าทั้งหมด (พร้อม Sidebar สำหรับ Filter)
- `/product/[slug]` - หน้ารายละเอียดสินค้า (แสดง Variants ที่เลือกได้ และปุ่ม Add to Cart)
- `/cart` - หน้าสรุปตะกร้าสินค้า
- `/checkout` - หน้ากรอกข้อมูลจัดส่งและเลือกวิธีชำระเงิน
- `/admin` - หน้า Dashboard สำหรับผู้ดูแลระบบ (Protected Route)
  - `/admin/products`
  - `/admin/orders`
