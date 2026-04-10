import { STRAPI_HOST } from "@/lib/config";
import { getStrapiData } from "@/lib/strapi";

export async function getCustom() {
  const response = await getStrapiData("custom-jewel?populate[cover][fields][0]=url");
  if (!response?.data) return null;

  const raw = response.data;
  return {
    title: raw.title,
    coverText: raw.coverText,
    cover: raw.cover?.url ? `${STRAPI_HOST}${raw.cover.url}` : null,
    text: raw.text
  }
}
