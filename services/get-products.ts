import { getStrapiData } from "@/lib/strapi";
import type { Product } from "@/types/product";

type StrapiMeta = {
  pagination: {
    page: number,
    pageSize: number,
    pageCount: number,
    total: number
  }
}

export async function getProducts(params?: { category?: string, maxPrice?: string, page?: string }) {
  const pageSize = 9;
  const currentPage = Number(params?.page) || 1;

  let query = "products?populate[images][fields][0]=url&populate[product_category][fields][0]=name";
  query += `&pagination[page]=${currentPage}&pagination[pageSize]=${pageSize}`;

  if (params?.category) {
    const categories = params.category.split(",");

    categories.forEach((catName, index) => {
      query += `&filters[product_category][name][$in][${index}]=${encodeURIComponent(catName)}`;
    });
  }

  if (params?.maxPrice) {
    query += `&filters[price][$lte]=${params.maxPrice}`;
  }

  const response = await getStrapiData(query);

  if (!response?.data) return { data: [], meta: null };

  const data = response.data.map((item: Product) => ({
    id: item.id,
    name: item.name,
    images: item.images,
    description: item.description,
    price: item.price,
    stock: item.stock,
    slug: item.slug,
    product_category: item.product_category
  }));

  return { data, meta: response.meta as StrapiMeta };
}
