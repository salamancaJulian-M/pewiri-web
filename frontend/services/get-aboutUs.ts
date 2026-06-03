import { getStrapiData } from "@/lib/strapi";
import { STRAPI_HOST } from "@/lib/config";

export async function getAboutUs() {
  const response = await getStrapiData("about-us?populate[Image1][fields][0]=url&populate[Image2][fields][0]=url&populate[ImageTeam][fields][0]=url");
  if (!response?.data) return null;

  const raw = response.data;

  return {
    title: raw.Title,
    textAboutUs: raw.TextAboutUs,
    textHistory: raw.History,
    textTeam: raw.TextTeam,
    image1: raw.Image1?.url ? `${raw.Image1.url}` : null,
    image2: raw.Image2?.url ? `${raw.Image2.url}` : null,
    imageTeam: raw.ImageTeam?.url ? `${raw.ImageTeam.url}` : null,
  };
};
