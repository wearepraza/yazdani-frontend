import ProductsClient from "./ProductsClient"
import { listProducts } from "@/lib/api/main/listProducts"
import { listCategory } from "@/lib/api/main/listCategory"

export default async function ProductsPage({ searchParams }) {
  const categoryFromURL = searchParams?.category || "all";

  const [productRes, categoryRes] = await Promise.all([
    listProducts(),
    listCategory()
  ]);

  const products = productRes?.data || [];
  const categories = categoryRes?.data?.categories || [];

  return (
    <ProductsClient
      products={products}
      categories={categories}
      initialCategoryId={categoryFromURL}
    />
  );
}
