import { getStrapiData } from "./strapi";
import { STRAPI_HOST } from "./config";

export async function getHomeInfo() {
  const {title, description, homeImage} = await getStrapiData("home-page?populate=homeImage")
  const image = `${STRAPI_HOST}${homeImage.url}`
  return {title, description, image} 
}