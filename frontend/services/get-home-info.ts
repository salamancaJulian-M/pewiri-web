import { getStrapiData } from "@/lib/strapi";
import { STRAPI_HOST } from "@/lib/config";

export async function getHomeInfo() {
  const data = await getStrapiData("home-page?populate[homeImage][fields][0]=url");
  const { title, description, homeImage } = data.data;
  const image = `${homeImage.url}`;
  return { title, description, image };
};