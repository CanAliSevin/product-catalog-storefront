"use client";

import { useCart } from "@/app/context/CartContext";
import { useState } from "react";

interface Props {
    id: string;
    name: string;
    price: number;
    imageUrl: string | null;
}

export default function AddToCartButton({ id, name, price, imageUrl }: Props) {
    const { addItem } = useCart();
    const [added, setAdded] = useState(false);

    function handleClick() {
        addItem({ id, name, price, imageUrl });
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    }

    return (
        <button
            onClick={handleClick}
            className="mt-6 w-full rounded-lg bg-[#C4602A] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#C4602A]/90"
        >
            {added ? "Sepete Eklendi ✓" : "Sepete Ekle"}
        </button>
    );
}