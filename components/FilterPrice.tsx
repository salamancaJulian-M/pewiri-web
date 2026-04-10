"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function FilterPrice() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [price, setPrice] = useState(searchParams.get("maxPrice") || "5000");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPrice(value);

    // Actualiza la URL sin recargar la página completamente
    const params = new URLSearchParams(searchParams.toString());
    params.set("maxPrice", value);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="mt-6">
      <h3 className="font-semibold mb-3 text-sm text-gray-600">Precio máximo: <span className="text-emerald-700">${price}</span></h3>
      <input
        type="range"
        min="0"
        max="5000"
        step="100"
        value={price}
        onChange={handleChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
      />
    </div>
  );
}
