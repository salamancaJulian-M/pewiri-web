export interface Category {
  id: number,
  name: string,
  description?: string,
  image: string,
  slug: string
}

export interface StrapiCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: {
    url: string;
  };
}
