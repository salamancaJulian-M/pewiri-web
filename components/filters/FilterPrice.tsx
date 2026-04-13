"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function FilterPrice() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultPrice = "8000";
  const [mounted, setMounted] = useState(false);



  const currentMaxPrice = searchParams.get("maxPrice") || defaultPrice;

  const [price, setPrice] = useState(currentMaxPrice);
  useEffect(() => {
    setMounted(true);
    setPrice(currentMaxPrice);
  }, [currentMaxPrice]);

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

  const formatPrice = (val: string | number) => {
    return Number(val).toLocaleString("es-CO");
  };

  if (!mounted) {
    return (
      <div className="mt-6 opacity-0">
        <h3 className="font-semibold mb-3 text-sm text-green-400">
          Precio máximo: <span className="text-green-400">${defaultPrice}</span>
        </h3>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h3 className="font-semibold mb-3 text-sm text-green-400">
        Precio máximo: <span className="text-green-400">${Number(price).toLocaleString()}</span>
      </h3>
      <input
        type="range"
        min="1000"
        max="8000"
        step="100"
        value={price}
        onChange={handleChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-700"
      />
      <div className="flex justify-between text-[10px] text-green-400 mt-2">
        <span>$1.000</span>
        <span>{formatPrice(defaultPrice)}</span>
      </div>
    </div>
  );
}
