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

export interface Product {
  id: number,
  name: string,
  images: StrapiImage[],
  description: string,
  price: number,
  stock: number,
  slug: string,
  product_category: StrapiCategory
}
