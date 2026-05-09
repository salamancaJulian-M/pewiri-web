import { getStrapiData } from "@/lib/strapi";
import { faq } from "@/types/faq";

export async function getFAQ(): Promise<faq[]> {
  const response = await getStrapiData("faqs");

  if (!response?.data) return [];

  return response.data.map((item: faq) => ({
    id: item.id,
    question: item.question,
    answer: item.answer
  }));
}
