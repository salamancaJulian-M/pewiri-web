import { getStrapiData } from "@/lib/strapi";

interface StrapiImage {
  id: number;
  documentId: string;
  url: string;
}

interface StrapiCategory {
  id: number;
  documentId: string;
  name: string;
}

interface Product {
  id: number,
  name: string,
  images: StrapiImage[],
  description: string,
  price: number,
  stock: number,
  slug: string,
  product_category: StrapiCategory
}

export async function getProducts(params?: { category?: string, maxPrice?: string }): Promise<Product[]> {
  let query = "products?populate[images][fields][0]=url&populate[product_category][fields][0]=name";
  if (params?.category) {
    query += `&filters[product_category][name][$eq]=${params.category}`;
  }

  if (params?.maxPrice) {
    query += `&filters[price][$lte]=${params.maxPrice}`;
  }
  const response = await getStrapiData(query);

  if (!response?.data) return [];

  return response.data.map((item: Product) => ({
    id: item.id,
    name: item.name,
    images: item.images,
    description: item.description,
    price: item.price,
    stock: item.stock,
    slug: item.slug,
    product_category: item.product_category
  }));
}
