import Link from "next/link";
import SearchBar from "./components/SearchBar";
import CategorySidebar from "./components/CategorySideBar";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
}

async function getProducts(query?: string, categoryId?: string): Promise<Product[]> {
  let endpoint: string;

  if (query) {
    endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/Products/search?q=${encodeURIComponent(query)}`;
  } else {
    endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/Products`;
    if (categoryId) {
      endpoint += `?categoryId=${categoryId}`;
    }
  }

  const response = await fetch(endpoint, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Ürünler yüklenemedi");
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

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; categoryId?: string }>;
}) {
  const { q, categoryId } = await searchParams;
  const products = await getProducts(q, categoryId);

  return (
    <main className="min-h-screen bg-[#F7F5F0]">
      <header className="bg-[#0B3D42] px-6 py-5">
        <h1 className="mb-4 text-2xl font-semibold text-white tracking-tight">
          Ürün Kataloğu
        </h1>
        <SearchBar />
      </header>

      <div className="mx-auto flex max-w-7xl gap-8 px-6 py-8">
        <CategorySidebar activeCategoryId={categoryId} />

        <div className="flex-1">
          <p className="mb-6 text-sm text-[#5C5A52]">
            {q ? `"${q}" için ${products.length} sonuç` : `${products.length} ürün listeleniyor`}
          </p>

          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5 transition hover:shadow-md"
              >
                <div className="aspect-square w-full overflow-hidden bg-[#EFEBE2]">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-[#A6A28F]">
                      Görsel yok
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h2 className="line-clamp-1 text-sm font-medium text-[#1A1A1A]">
                    {product.name}
                  </h2>
                  <p className="mt-1 line-clamp-2 text-xs text-[#8A8778]">
                    {product.description}
                  </p>
                  <p className="mt-3 text-base font-semibold text-[#C4602A]">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}