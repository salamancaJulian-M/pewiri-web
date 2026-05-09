import { getStrapiData } from "@/lib/strapi";

export default async function getProduct(slug: string) {
  const response = await getStrapiData(`products?filters[slug][$eq]=${slug}&populate=*`);

  if (!response?.data || response.data.length === 0) return null;
  return response.data[0];
}
