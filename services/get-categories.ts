import type { Category, StrapiCategory } from "@/types/category";
import { STRAPI_HOST } from "@/lib/config";
import { getStrapiData } from "@/lib/strapi";

export async function getCategories(): Promise<Category[]> {
  const rawCategories = await getStrapiData("product-categories?populate[image][fields][0]=url")
  if (!rawCategories?.data) return [];
  return rawCategories.data.map((category : StrapiCategory) => {
    const {id, name, slug, description, image: rawImage} = category
    const image = `${STRAPI_HOST}${rawImage.url}`
    return {id, name, slug, description, image}
  })
}