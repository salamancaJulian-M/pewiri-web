import { getCategories } from "@/services/get-categories"
import CardCategory from "./ui/CardCategory"

export default async function Categories() {
  const categories = await getCategories()
  return(
  <section className="max-w-7xl mx-auto px-6 py-16">
      {/* Título de la sección con estilo editorial */}
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-3xl font-serif tracking-tight text-gray-900 sm:text-4xl">
          Categorías
        </h2>
        <div className="h-px w-20 bg-gold-500 mt-4"></div>
      </div>

      {/* Grid Responsivo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category) => (
          <CardCategory
            key={category.id}
            name={category.name}
            image={category.image}
            description={category.description} 
            slug={category.slug || "#"}
          />
        ))}
      </div>
    </section>
  )
}