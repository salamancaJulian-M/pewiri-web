'use server'
import { STRAPI_HOST } from "@/lib/config";
import { getStrapiData } from "@/lib/strapi";
import { Certificate } from "@/types/certificate";

export async function getCertificate(code: string) {
  const response = await getStrapiData(`certificates?filters[cod][$eq]=${code}&populate[images][fields]=url`);
  if (!response?.data || response.data.length === 0) return null;
  const item = response.data[0];
  const certificate: Certificate = {
    cod: item.cod,
    description: item.description,
    customer: item.customer,
    type: item.type,
    images: item.images ? item.images.map((img: any) => `${img.url}`) : []
  }

  return certificate;
}
