import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import CartIndicator from "./components/CartIndicator";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});




export const metadata: Metadata = {
  title: "PettAVM",
  description: "Ürün Kataloğu",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <nav className="flex items-center justify-between bg-[#0B3D42] px-6 py-4">
            <div className="flex gap-6">
              <Link href="/" className="text-white hover:text-[#C4602A]">
                Ürünler
              </Link>
            </div>
            <CartIndicator />
          </nav>
          <main className="flex-1">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}