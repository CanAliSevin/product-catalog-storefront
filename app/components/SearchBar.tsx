"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("q") ?? "");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/?q=${encodeURIComponent(query.trim())}`);
        } else {
            router.push("/");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ürün ara..."
                className="flex-1 rounded-lg border border-[#D9D5C7] bg-black px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D42]"
            />
            <button
                type="submit"
                className="rounded-lg bg-[#0B3D42] px-5 py-2 text-sm font-medium text-white hover:bg-[#0B3D42]/90"
            >
                Ara
            </button>
        </form>
    );
}