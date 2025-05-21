// app/products/page.jsx
import EnhancedProductCard from "@/components/enhanced-product-card"
import { listProducts } from "@/lib/api/main/listProducts"
import { listCategory } from "@/lib/api/main/listCategory"
import ProductsClient from "@/app/products/ProductsClient"

export const dynamic = "force-dynamic" // SSR فعال

export default async function ProductsPage() {
  const productsRes = await listProducts()
  const categoriesRes = await listCategory()

  const products = productsRes?.data || []
  const categories = categoriesRes?.data?.categories || []

  return (
    <ProductsClient products={products} categories={categories} />
  )
}
