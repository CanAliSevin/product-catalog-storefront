import Link from "next/link";

interface Category {
    id: string;
    name: string;
}

async function getCategories(): Promise<Category[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Categories`, {
        cache: "no-store",
    });

    if (!response.ok) {
        return [];
    }

    return response.json();
}

export default async function CategorySidebar({
    activeCategoryId,
}: {
    activeCategoryId?: string;
}) {
    const categories = await getCategories();

    return (
        <aside className="w-full md:w-56 shrink-0">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#8A8778]">
                Kategoriler
            </h2>
            {/* Mobilde yan yana ve kaydırılabilir (flex-row overflow-x-auto), masaüstünde alt alta (md:flex-col) */}
            <nav className="flex flex-row md:flex-col gap-2 md:gap-1 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                <Link
                    href="/"
                    className={`shrink-0 whitespace-nowrap rounded-lg px-3 py-2 text-sm ${!activeCategoryId
                        ? "bg-[#0B3D42] text-white"
                        : "text-[#5C5A52] hover:bg-[#EFEBE2]"
                        }`}
                >
                    Tüm Ürünler
                </Link>
                {categories.map((category) => (
                    <Link
                        key={category.id}
                        href={`/?categoryId=${category.id}`}
                        className={`shrink-0 whitespace-nowrap rounded-lg px-3 py-2 text-sm ${activeCategoryId === category.id
                            ? "bg-[#0B3D42] text-white"
                            : "text-[#5C5A52] hover:bg-[#EFEBE2]"
                            }`}
                    >
                        {category.name}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}