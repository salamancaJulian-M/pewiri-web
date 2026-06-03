import Image from "next/image";
import Link from "next/link";
import { STRAPI_HOST } from "@/lib/config";
import type { Product } from "@/types/product";

export default function CardProduct({ item }: { item: Product }) {
  const imageUrl = item.images?.[0]?.url
    ? `${item.images[0].url}`
    : "/placeholder.png";

  return (
    <Link
      href={`/product/${item.slug}`}
      className="group flex flex-col w-full outline-none"
    >
      <div className="relative aspect-square overflow-hidden bg-green-200 rounded-lg shadow-sm ring-1 ring-green-200/50">
        <Image
          src={imageUrl}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          alt={item.name}
          priority={false}
        />

        <div className="absolute top-3 left-3">
          <span className="bg-green-200/90 backdrop-blur-md px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-green-600 rounded shadow-sm">
            {item.product_category?.name || "Nuevo"}
          </span>
        </div>

        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div className="w-full bg-green-200/90 backdrop-blur py-2 text-xs text-center font-semibold text-green-600 rounded-md shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            Más Información
          </div>
        </div>
      </div>

      {/* Detalles del Producto */}
      <div className="mt-4 space-y-1">
        <h3 className="text-sm font-medium text-green-400 line-clamp-1 group-hover:text-green-700 transition-colors">
          {item.name}
        </h3>

        <div className="flex items-center gap-2">
          <span className="text-base text-green-400 group-hover:text-green-700 transition-colors">
            ${Number(item.price).toLocaleString("es-CO")}
          </span>
        </div>
      </div>
    </Link>
  );
}
