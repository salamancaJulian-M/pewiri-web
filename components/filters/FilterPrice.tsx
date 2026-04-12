"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function FilterPrice() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultPrice = "8000";

  const currentMaxPrice = searchParams.get("maxPrice") || defaultPrice;

  const [price, setPrice] = useState(currentMaxPrice);

  useEffect(() => {
    setPrice(currentMaxPrice);
  }, [currentMaxPrice]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPrice(value);

    const params = new URLSearchParams(searchParams.toString());
    params.set("maxPrice", value);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="mt-6">
      <h3 className="font-semibold mb-3 text-sm text-gray-600">
        Precio máximo: <span className="text-emerald-700">${Number(price).toLocaleString()}</span>
      </h3>
      <input
        type="range"
        min="1000"
        max="5000"
        step="100"
        value={price}
        onChange={handleChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
      />
      <div className="flex justify-between text-[10px] text-gray-400 mt-2">
        <span>$1,000</span>
        <span>${Number(defaultPrice).toLocaleString()}</span>
      </div>
    </div>
  );
}
