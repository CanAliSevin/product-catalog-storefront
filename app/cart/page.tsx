"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

function formatPrice(price: number) {
    return price.toLocaleString("tr-TR", {
        style: "currency",
        currency: "TRY",
        minimumFractionDigits: 2,
    });
}

export default function CartPage() {
    const { items, removeItem, updateQuantity } = useCart();

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (items.length === 0) {
        return (
            <main className="min-h-screen bg-[#F7F5F0] px-6 py-12 text-center">
                <p className="text-[#5C5A52]">Sepetiniz boş.</p>
                <Link href="/" className="mt-4 inline-block text-[#0B3D42] underline">
                    Alışverişe başla
                </Link>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#F7F5F0] px-6 py-12">
            <div className="mx-auto max-w-3xl">
                <h1 className="mb-6 text-2xl font-semibold text-[#1A1A1A]">Sepetim</h1>

                <div className="flex flex-col gap-4">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5"
                        >
                            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-[#EFEBE2]">
                                {item.imageUrl ? (
                                    <img
                                        src={item.imageUrl}
                                        alt={item.name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-xs text-[#A6A28F]">
                                        Görsel yok
                                    </div>
                                )}
                            </div>

                            <div className="flex-1">
                                <h2 className="text-sm font-medium text-[#1A1A1A]">{item.name}</h2>
                                <p className="mt-1 text-sm text-[#C4602A]">{formatPrice(item.price)}</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="h-8 w-8 rounded-full border border-[#D9D5C7] text-[#5C5A52] hover:bg-red-50"
                                >
                                    −
                                </button>
                                <span className="w-6 text-center text-sm text-black">{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="h-8 w-8 rounded-full border border-[#D9D5C7] text-[#5C5A52] hover:bg-green-50"
                                >
                                    +
                                </button>
                            </div>

                            <button
                                onClick={() => removeItem(item.id)}
                                className="ml-4 text-sm text-[#A6A28F] hover:text-[#C4602A]"
                            >
                                Kaldır
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex items-center justify-between rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5">
                    <span className="text-sm font-medium text-[#5C5A52]">Toplam</span>
                    <span className="text-xl font-semibold text-[#C4602A]">{formatPrice(total)}</span>
                </div>
            </div>
        </main>
    );
}