import { getStrapiData } from "@/lib/strapi";

export async function getContact() {
  const data = await getStrapiData("contact");
  const {number, message} = data.data;
  return {number, message};
};