"use client"

import Link from "next/link"
import EnhancedProductCard from "@/components/enhanced-product-card"
import { useState } from "react"

const priceRanges = [
  { id: "under-5m", name: "کمتر از ۵ میلیون تومان", min: 0, max: 5000000 },
  { id: "5m-10m", name: "۵ تا ۱۰ میلیون تومان", min: 5000000, max: 10000000 },
  { id: "10m-20m", name: "۱۰ تا ۲۰ میلیون تومان", min: 10000000, max: 20000000 },
  { id: "over-20m", name: "بیشتر از ۲۰ میلیون تومان", min: 20000000, max: Infinity },
]

export default function ProductsClient({ products, categories }) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPriceRange, setSelectedPriceRange] = useState("")
  const [showOnlyDiscounted, setShowOnlyDiscounted] = useState(false)
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false)
  const [sortBy, setSortBy] = useState("newest")

  const transformedCategories = [
    { id: "all", name: "همه محصولات" },
    ...categories.map(cat => ({ id: cat.id.toString(), name: cat.name }))
  ]

  const filteredProducts = products.filter(product => {
    if (selectedCategory !== "all" && product.category_id.toString() !== selectedCategory) return false
    if (selectedPriceRange) {
      const range = priceRanges.find(r => r.id === selectedPriceRange)
      if (range && (product.price < range.min || product.price > range.max)) return false
    }
    if (showOnlyDiscounted && !product.discount_price) return false
    if (showOnlyAvailable && product.inventory <= 0) return false
    return true
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "newest": return new Date(b.created_at) - new Date(a.created_at)
      case "price-asc": return a.price - b.price
      case "price-desc": return b.price - a.price
      case "discount":
        const dA = a.discount_price ? ((a.price - a.discount_price) / a.price) * 100 : 0
        const dB = b.discount_price ? ((b.price - b.discount_price) / b.price) * 100 : 0
        return dB - dA
      default: return 0
    }
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar Filters */}
        <div className="lg:w-1/4">
          <div className="sticky top-4 space-y-6 rounded-lg bg-white p-6 shadow-md">
            <div>
              <h3 className="mb-4 border-b pb-2 font-bold">دسته‌بندی‌ها</h3>
              <ul className="space-y-2">
                {transformedCategories.map(cat => (
                  <li key={cat.id}>
                    <label className="flex items-center cursor-pointer">
                      <input type="radio" name="category" value={cat.id}
                        checked={selectedCategory === cat.id}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="h-4 w-4 text-blue-600" />
                      <span className="mr-2">{cat.name}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 border-b pb-2 font-bold">محدوده قیمت</h3>
              <ul className="space-y-2">
                {priceRanges.map(range => (
                  <li key={range.id}>
                    <label className="flex items-center cursor-pointer">
                      <input type="radio" name="price" value={range.id}
                        checked={selectedPriceRange === range.id}
                        onChange={(e) => setSelectedPriceRange(e.target.value)}
                        className="h-4 w-4 text-blue-600" />
                      <span className="mr-2">{range.name}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 border-b pb-2 font-bold">ویژگی‌ها</h3>
              <ul className="space-y-2">
                <li>
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" checked={showOnlyDiscounted}
                      onChange={(e) => setShowOnlyDiscounted(e.target.checked)}
                      className="h-4 w-4 text-blue-600" />
                    <span className="mr-2">فقط تخفیف‌دار</span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" checked={showOnlyAvailable}
                      onChange={(e) => setShowOnlyAvailable(e.target.checked)}
                      className="h-4 w-4 text-blue-600" />
                    <span className="mr-2">فقط موجودها</span>
                  </label>
                </li>
              </ul>
            </div>

            <button
              className="w-full rounded-lg bg-blue-600 py-2 font-medium text-white hover:bg-blue-700"
              onClick={() => {
                setSelectedCategory("all")
                setSelectedPriceRange("")
                setShowOnlyDiscounted(false)
                setShowOnlyAvailable(false)
              }}
            >
              پاک کردن فیلترها
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:w-3/4">
          <div className="flex justify-between items-center mb-6 bg-white p-4 shadow rounded-lg">
            <div className="flex items-center gap-2">
              <span>مرتب‌سازی:</span>
              <select
                className="border rounded-md px-3 py-1 text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">جدیدترین</option>
                <option value="price-asc">ارزان‌ترین</option>
                <option value="price-desc">گران‌ترین</option>
                <option value="discount">بیشترین تخفیف</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map(product => (
              <EnhancedProductCard
                key={product.id}
                product={{
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  discountedPrice: product.discount_price || 0,
                  discount: product.discount_price ? Math.round(((product.price - product.discount_price) / product.price) * 100) : 0,
                  image: product.image_path || `/placeholder.svg?height=300&width=300&query=product+${product.id}`,
                  isNew: false,
                  rating: 4.5,
                  inventory: product.inventory,
                  category: product.category?.name || "",
                  description: product.description,
                }}
              />
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="mt-8 text-center text-gray-500">
              محصولی با فیلترهای انتخاب شده یافت نشد.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
