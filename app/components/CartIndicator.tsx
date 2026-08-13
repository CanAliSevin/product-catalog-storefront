"use client";

import { useCart } from "@/app/context/CartContext";
import Link from "next/link";

export default function CartIndicator() {
    const { totalCount } = useCart();

    return (
        <Link href="/cart" className="text-white hover:text-[#C4602A]">
            Sepet {totalCount > 0 && `(${totalCount})`}
        </Link>
    );
}