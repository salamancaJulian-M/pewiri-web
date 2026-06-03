import { notFound } from "next/navigation";
import getProduct from "@/services/get-product";
import ProductDetail from "@/components/ui/product/ProductDetail";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const productData = {
    name: product.name,
    description: product.description,
    price: `$ ${product.price.toLocaleString()}`,
    images: product.images.map((img: any) => (`${img.url}`)),
  };

  return (
    <main className="min-h-screen py-35">
      <ProductDetail product={productData} />
    </main>
  );
}
