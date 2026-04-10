import { getStrapiData } from "@/lib/strapi";
import type { Commentary } from '@/types/commentary';


export async function getCommentaries() {
  const response = await getStrapiData("opinions");

  if (!response?.data) return [];

  return response.data.map((item: Commentary) => ({
    id: item.id,
    name: item.name,
    commentary: item.commentary,
    stars: item.stars
  }));
}
