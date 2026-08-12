import Link from "next/link";

interface Product {
    id: string;
    name: string;
    description: string | null;
    price: number;
    imageUrl: string | null;
    categoryName: string;
    storeName: string;
}

async function getProduct(id: string): Promise<Product | null> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Products/${id}`, {
        cache: "no-store",
    });

    if (response.status === 404) {
        return null;
    }

    if (!response.ok) {
        throw new Error("Ürün yüklenemedi");
    }

    return response.json();
}

function formatPrice(price: number) {
    return price.toLocaleString("tr-TR", {
        style: "currency",
        currency: "TRY",
        minimumFractionDigits: 2,
    });
}

export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) {
        return (
            <main className="min-h-screen bg-[#F7F5F0] px-6 py-12 text-center">
                <p className="text-[#5C5A52]">Ürün bulunamadı.</p>
                <Link href="/" className="mt-4 inline-block text-[#0B3D42] underline">
                    Ürünlere dön
                </Link>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#F7F5F0] px-6 py-12">
            <div className="mx-auto max-w-4xl">
                <Link href="/" className="mb-6 inline-block text-sm text-[#5C5A52] hover:text-[#0B3D42]">
                    ← Ürünlere dön
                </Link>

                <div className="grid gap-8 rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:grid-cols-2">
                    <div className="aspect-square w-full overflow-hidden rounded-lg bg-[#EFEBE2]">
                        {product.imageUrl ? (
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-sm text-[#A6A28F]">
                                Görsel yok
                            </div>
                        )}
                    </div>

                    <div>
                        <p className="text-xs uppercase tracking-wide text-[#A6A28F]">
                            {product.categoryName}
                        </p>
                        <h1 className="mt-1 text-2xl font-semibold text-[#1A1A1A]">
                            {product.name}
                        </h1>
                        <p className="mt-4 text-sm leading-relaxed text-[#5C5A52]">
                            {product.description}
                        </p>
                        <p className="mt-6 text-3xl font-semibold text-[#C4602A]">
                            {formatPrice(product.price)}
                        </p>
                        <p className="mt-4 text-sm text-[#8A8778]">
                            Satıcı: {product.storeName}
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}