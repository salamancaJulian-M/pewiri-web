import { getStrapiData } from "@/lib/strapi";
import { STRAPI_HOST } from "@/lib/config";

export async function getAboutUs() {
  const response = await getStrapiData("about-us?populate[Image1][fields][0]=url&populate[Image2][fields][0]=url&populate[Image3][fields][0]=url&populate[ImageTeam][fields][0]=url");
  if (!response?.data) return null;

  const raw = response.data;

  return {
    title: raw.Title,
    textAboutUs: raw.TextAboutUs,
    textTeam: raw.TextTeam,
    image1: raw.Image1?.url ? `${STRAPI_HOST}${raw.Image1.url}` : null,
    image2: raw.Image2?.url ? `${STRAPI_HOST}${raw.Image2.url}` : null,
    image3: raw.Image3?.url ? `${STRAPI_HOST}${raw.Image3.url}` : null,
    imageTeam: raw.ImageTeam?.url ? `${STRAPI_HOST}${raw.ImageTeam.url}` : null,
  };
};
