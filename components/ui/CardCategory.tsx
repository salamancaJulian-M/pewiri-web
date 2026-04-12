import Image from "next/image";
import Link from "next/link";

interface CardCategoryProps {
  name: string;
  image: string;
  description?: string;
  slug: string;
}

export default function CardCategory({ name, image, description, slug }: CardCategoryProps) {
  return (
    <Link href={`/joyas/${slug}`} className="group block text-center">
      <div className="relative aspect-square overflow-hidden bg-gray-100 rounded-lg mb-4">
        <Image
          src={image}
          alt={description || name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <h3 className="text-sm uppercase font-semibold tracking-widest text-gray-900 group-hover:text-emerald-700 transition-colors">
        {name}
      </h3>
    </Link>
  )

}
