import { STRAPI_HOST } from "@/lib/config";
import { getProducts } from "@/services/get-products";
import FilterPrice from "@/components/FilterPrice";
import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/services/get-categories";

type Props = {
  searchParams: Promise<{ category?: string; maxPrice?: string }>;
};

export default async function Catalog({ searchParams }: Props) {
  const currentParams = await searchParams;

  const selectedCategory = currentParams.category;
  const selectedMaxPrice = currentParams.maxPrice;

  const data = await getProducts(currentParams);
  const categories = await getCategories();

  return (
    <main className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-col md:gap-12 md:flex-row">

        <aside className="w-full md:w-64 mb-10 md:mb-0">
          <div className="sticky top-28">
            <h2 className="text-2xl font-bold mb-8 text-gray-900">Filtros</h2>

            <div className="mb-10">
              <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-400">Categorías</h3>
              <div className="flex flex-col gap-3">
                <Link
                  href="/catalog"
                  className={`text-sm ${!selectedCategory ? 'text-emerald-700 font-bold' : 'text-gray-600'}`}
                >
                  Todos los productos
                </Link>

                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={{
                      pathname: '/catalog',
                      // IMPORTANTE: Construimos la query usando los valores resueltos
                      query: {
                        ...(selectedMaxPrice ? { maxPrice: selectedMaxPrice } : {}),
                        category: cat.name
                      },
                    }}
                    className={`text-sm hover:text-emerald-700 transition-colors ${selectedCategory === cat.name ? 'text-emerald-700 font-bold' : 'text-gray-600'
                      }`}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <FilterPrice />

            <Link href="/catalog" className="block mt-8 text-xs text-gray-400 hover:text-red-500 underline">
              Limpiar todos los filtros
            </Link>
          </div>
        </aside>

        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {data.map((item: any) => (
              <article key={item.id} className="group cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-sm">
                  <Image
                    src={`${STRAPI_HOST}${item.images[0]?.url}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    alt={item.name}
                  />
                </div>
                <div className="mt-4 flex flex-col">
                  <p className="text-xs text-emerald-700 font-medium mb-1">{item.product_category?.name}</p>
                  <h3 className="text-sm font-normal text-gray-900 uppercase tracking-tight">{item.name}</h3>
                  <span className="mt-1 text-lg font-light text-gray-700">
                    ${item.price.toLocaleString()}
                  </span>
                </div>
              </article>
            ))}
          </div>

          {data.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-100 rounded-xl">
              <p className="text-gray-400 text-lg">No hay productos.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
