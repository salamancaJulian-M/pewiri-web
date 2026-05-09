"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

const DEFAULT_PRICE = "2500000";

export default function FilterPrice() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  const currentMaxPrice = searchParams.get("maxPrice") || DEFAULT_PRICE;
  const [price, setPrice] = useState(currentMaxPrice);
  const debouncedPrice = useDebounce(price, 400);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setPrice(currentMaxPrice);
  }, [currentMaxPrice]);

  useEffect(() => {
    if (!mounted) return;

    const params = new URLSearchParams(window.location.search);
    const urlPrice = params.get("maxPrice") || DEFAULT_PRICE;

    if (debouncedPrice !== urlPrice) {
      params.set("maxPrice", debouncedPrice);
      router.push(`?${params.toString()}`, { scroll: false });
    }
  }, [debouncedPrice, router, mounted]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  const formatPrice = (val: string | number) => {
    return Number(val).toLocaleString("es-CO");
  };

  if (!mounted) return <div className="mt-6 opacity-0" />;

  return (
    <div className="mt-6">
      <h3 className="font-semibold mb-3 text-sm text-green-400">
        Precio máximo: <span className="text-green-400">${Number(price).toLocaleString("es-CO")}</span>
      </h3>
      <input
        type="range"
        min="100000"
        max={DEFAULT_PRICE}
        step="100000"
        value={price}
        onChange={handleChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-700"
      />
      <div className="flex justify-between text-[10px] text-green-400 mt-2">
        <span>$100.000</span>
        <span>{formatPrice(DEFAULT_PRICE)}</span>
      </div>
    </div>
  );
}
