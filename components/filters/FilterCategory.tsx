"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Category } from "@/types/category";

interface Props {
  categories: Category[];
  selectedCategory?: string;
  selectedMaxPrice?: string;
}

export default function FilterCategory({ categories, selectedCategory, selectedMaxPrice }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedArray = selectedCategory ? selectedCategory.split(",") : [];

  const handleCheckboxChange = (categorySlug: string) => {
    let newSelected: string[];

    if (selectedArray.includes(categorySlug)) {
      newSelected = selectedArray.filter((c) => c !== categorySlug);
    } else {
      newSelected = [...selectedArray, categorySlug];
    }

    const params = new URLSearchParams(searchParams.toString());

    if (newSelected.length > 0) {
      params.set("category", newSelected.join(","));
    } else {
      params.delete("category")
    }

    if (selectedMaxPrice) {
      params.set("maxPrice", selectedMaxPrice);
    }

    router.push(`/catalog?${params.toString()}`);
  };

  return (
    <div className="mb-10">
      <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-green-400">
        Categorías
      </h3>
      <div className="flex flex-col gap-3">
        {categories.map((cat) => {
          const isChecked = selectedArray.includes(cat.slug);

          return (
            <label
              key={cat.id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleCheckboxChange(cat.slug)}
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-green-300 checked:bg-green-600 checked:border-green-600 transition-all"
                />
                <svg
                  className="absolute h-3.5 w-3.5 text-green-200 opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span className={`text-sm transition-colors ${isChecked ? 'text-green-700 font-medium' : 'text-green-400 group-hover:text-green-900'
                }`}>
                {cat.name}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
