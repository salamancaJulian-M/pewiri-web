import { getStrapiData } from "@/lib/strapi";

export async function getCustom() {
  const response = await getStrapiData("custom-jewel?populate[cover][fields][0]=url");
  if (!response?.data) return null;

  const raw = response.data;
  return {
    title: raw.title,
    coverText: raw.coverText,
    cover: `${raw.cover.url}`,
    text: raw.text
  }
}
