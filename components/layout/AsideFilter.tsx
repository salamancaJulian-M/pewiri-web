import Link from "next/link";
import FilterCategory from "../filters/FilterCategory";
import FilterPrice from "../filters/FilterPrice";
import { getCategories } from "@/services/get-categories";

interface Props {
  searchParams: { category?: string; maxPrice?: string };
}

export default async function AsideFilter({ searchParams }: Props) {
  const categories = await getCategories();

  return (
    <aside className="w-full md:w-64 mb-10 md:mb-0">
      <div className="sticky top-28">
        <h2 className="text-2xl font-bold mb-8 text-gray-900">Filtros</h2>
        <FilterCategory
          categories={categories}
          selectedCategory={searchParams.category}
          selectedMaxPrice={searchParams.maxPrice}
        />
        <FilterPrice />
        {(searchParams.category || searchParams.maxPrice) && (
          <Link
            href="/catalog"
            className="block w-full mt-10 py-3 text-center text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-gray-900 border-t border-gray-100 hover:border-gray-300 transition-all"
          >
            × Quitar filtros
          </Link>
        )}
      </div>
    </aside>
  )
}
