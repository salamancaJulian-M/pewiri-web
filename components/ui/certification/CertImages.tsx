import type { Certificate } from "@/types/certificate";
import Image from "next/image";

export default function CertImages({ cert }: { cert: Certificate }) {
  return (
    <div className="mt-8">
      <p className="text-xs uppercase tracking-wider text-green-300 font-semibold mb-4">Evidencia Fotográfica</p>
      <div className="flex flex-wrap gap-4">
        {cert.images.map((fullUrl, index) => (
          <div key={index} className="relative w-64 h-64 border rounded-lg overflow-hidden shadow-sm">
            <Image
              src={fullUrl}
              alt={`Imagen ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 300px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
