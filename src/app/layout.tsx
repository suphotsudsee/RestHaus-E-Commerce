import type { Metadata } from "next";
import { Inter, Prompt } from "next/font/google";
import { CartProvider } from "@/components/cart-provider";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const prompt = Prompt({
  variable: "--font-prompt",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "RestHaus | Mattress & Furniture Store",
    template: "%s | RestHaus",
  },
  description:
    "Shop mattresses, beds, sofas, and home furniture with secure checkout, order tracking, and admin inventory tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${prompt.variable} h-full antialiased`}>
      <body className="min-h-full bg-slate-50 text-slate-950">
        <CartProvider>
          <SiteHeader />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
