# Product Requirements Document (PRD)
**Project Name:** E-Commerce Platform for Mattress & Furniture
**Version:** 1.0.0

## 1. Project Overview
ระบบเว็บไซต์อีคอมเมิร์ซสำหรับบริษัทจำหน่ายที่นอนและเฟอร์นิเจอร์ เพื่อรองรับการขายสินค้าผ่านช่องทางออนไลน์ (B2C) และการจัดการสต๊อกสินค้าหลังบ้าน โดยเน้นประสบการณ์การใช้งานที่ราบรื่น (Seamless UX) การค้นหาสินค้าที่รวดเร็ว และระบบการชำระเงินที่ปลอดภัย

## 2. Target Audience
- ลูกค้ารายย่อยที่ต้องการซื้อที่นอนและเฟอร์นิเจอร์ตกแต่งบ้าน
- ผู้รับเหมาหรือนักออกแบบภายในที่ต้องการสั่งซื้อสินค้าจำนวนมาก

## 3. Key Features

### 3.1 Customer Facing (Front-end)
- **Product Catalog & Search:** แสดงหมวดหมู่สินค้า (ที่นอน, เตียง, โซฟา, ตู้ ฯลฯ) พร้อมระบบค้นหาและฟิลเตอร์ (ตามขนาด, วัสดุ, ราคา, แบรนด์)
- **Product Details:** หน้ารายละเอียดสินค้าที่รองรับรูปภาพหลายมุมมอง, รายละเอียดสเปก, และตัวเลือกสินค้า (Variants เช่น ขนาด 3.5 ฟุต, 5 ฟุต, 6 ฟุต)
- **Shopping Cart & Checkout:** ระบบตะกร้าสินค้า และหน้าชำระเงินที่ใช้งานง่าย (Guest checkout และ Member checkout)
- **Payment Integration:** รองรับการชำระเงินผ่าน QR PromptPay และบัตรเครดิต
- **Order Tracking:** ระบบตรวจสอบสถานะคำสั่งซื้อสำหรับลูกค้า

### 3.2 Admin / Back-office
- **Dashboard:** สรุปยอดขายรายวัน/รายเดือน และสถานะคำสั่งซื้อล่าสุด
- **Product Management:** ระบบเพิ่ม/แก้ไข/ลบ สินค้า, จัดการหมวดหมู่, และจัดการตัวเลือกสินค้า (Variants)
- **Inventory Management:** ระบบตัดสต๊อกอัตโนมัติเมื่อมีการสั่งซื้อ
- **Order Management:** ระบบอัปเดตสถานะการจัดส่ง (Pending, Paid, Shipped, Completed)

## 4. Non-Functional Requirements
- **Performance:** หน้าเว็บต้องโหลดเสร็จภายใน 2 วินาที (ใช้ Caching)
- **Responsive Design:** รองรับการแสดงผลทุกขนาดหน้าจอ (Mobile-First)
- **SEO Optimization:** รองรับ Dynamic Meta Tags สำหรับสินค้าทุกชิ้น
