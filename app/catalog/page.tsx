import { getProducts } from "@/services/get-products";
import CardProduct from "@/components/ui/catalog/CardProduct";
import AsideFilter from "@/components/ui/catalog/AsideFilter";
import Pagination from "@/components/ui/catalog/Pagination";

type Props =
  {
    searchParams: Promise<{ category?: string; maxPrice?: string }>;
  };

export default async function Catalog({ searchParams }: Props) {
  const currentParams = await searchParams;
  const { data, meta } = await getProducts(currentParams);

  return (
    <main className="max-w-7xl mx-auto px-4 py-35">
      <div className="flex flex-col md:gap-12 md:flex-row">
        <AsideFilter searchParams={currentParams} />
        <div className="flex-1">
          <h1 className="text-center text-4xl mt-4 mb-4">Nuestro Catalogo</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {data.map((item: any) => (
              <article key={item.id} className="group cursor-pointer">
                <CardProduct item={item} />
              </article>
            ))}
          </div>
          {meta && meta.pagination.pageCount > 1 && (
            <Pagination currentPage={meta?.pagination.page} pageCount={meta?.pagination.pageCount} />
          )}

          {data.length === 0 && (
            <div className="flex flex-col items-center justify-center py-38 border-2 border-dashed border-gray-100 rounded-xl">
              <p className="text-gray-400 text-lg">No hay productos.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
