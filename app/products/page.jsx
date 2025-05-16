"use client"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import EnhancedProductCard from "@/components/enhanced-product-card"
import { listProducts } from "@/lib/api/main/listProducts"
import { listCategory } from "@/lib/api/main/listCategory"
import { useState, useEffect } from "react"

// Price ranges for filter
const priceRanges = [
  { id: "under-5m", name: "کمتر از ۵ میلیون تومان", min: 0, max: 5000000 },
  { id: "5m-10m", name: "۵ تا ۱۰ میلیون تومان", min: 5000000, max: 10000000 },
  { id: "10m-20m", name: "۱۰ تا ۲۰ میلیون تومان", min: 10000000, max: 20000000 },
  { id: "over-20m", name: "بیشتر از ۲۰ میلیون تومان", min: 20000000, max: Infinity },
]

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPriceRange, setSelectedPriceRange] = useState("")
  const [showOnlyDiscounted, setShowOnlyDiscounted] = useState(false)
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false)
  const [sortBy, setSortBy] = useState("newest")
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      const productsResponse = await listProducts()
      const categoriesResponse = await listCategory()
      
      setProducts(productsResponse.data || [])
      setCategories(categoriesResponse.data?.categories || [])
    }
    
    fetchData()
  }, [])

  // Transform categories to match the required format
  const transformedCategories = [
    { id: "all", name: "همه محصولات" },
    ...categories.map(cat => ({
      id: cat.id.toString(),
      name: cat.name
    }))
  ]

  // Filter products based on selected filters
  const filteredProducts = products.filter(product => {
    // Category filter
    if (selectedCategory !== "all" && product.category_id.toString() !== selectedCategory) {
      return false
    }

    // Price range filter
    if (selectedPriceRange) {
      const range = priceRanges.find(r => r.id === selectedPriceRange)
      if (range && (product.price < range.min || product.price > range.max)) {
        return false
      }
    }

    // Discount filter
    if (showOnlyDiscounted && !product.discount_price) {
      return false
    }

    // Availability filter
    if (showOnlyAvailable && product.inventory <= 0) {
      return false
    }

    return true
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.created_at) - new Date(a.created_at)
      case "price-asc":
        return a.price - b.price
      case "price-desc":
        return b.price - a.price
      case "discount":
        const discountA = a.discount_price ? ((a.price - a.discount_price) / a.price) * 100 : 0
        const discountB = b.discount_price ? ((b.price - b.discount_price) / b.price) * 100 : 0
        return discountB - discountA
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white py-4 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">
              خانه
            </Link>
            <span className="mx-2">/</span>
            <span className="font-medium text-gray-900">محصولات</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="sticky top-4 space-y-6 rounded-lg bg-white p-6 shadow-md">
              <div>
                <h3 className="mb-4 border-b border-gray-200 pb-2 text-lg font-bold">دسته‌بندی‌ها</h3>
                <ul className="space-y-2">
                  {transformedCategories.map((category) => (
                    <li key={category.id}>
                      <label className="flex cursor-pointer items-center">
                        <input
                          type="radio"
                          name="category"
                          value={category.id}
                          className="h-4 w-4 text-blue-600"
                          checked={selectedCategory === category.id}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                        />
                        <span className="mr-2 text-gray-700">{category.name}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-4 border-b border-gray-200 pb-2 text-lg font-bold">محدوده قیمت</h3>
                <ul className="space-y-2">
                  {priceRanges.map((range) => (
                    <li key={range.id}>
                      <label className="flex cursor-pointer items-center">
                        <input 
                          type="radio" 
                          name="price" 
                          value={range.id} 
                          className="h-4 w-4 text-blue-600"
                          checked={selectedPriceRange === range.id}
                          onChange={(e) => setSelectedPriceRange(e.target.value)}
                        />
                        <span className="mr-2 text-gray-700">{range.name}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-4 border-b border-gray-200 pb-2 text-lg font-bold">ویژگی‌ها</h3>
                <ul className="space-y-2">
                  <li>
                    <label className="flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        name="feature"
                        value="discount"
                        className="h-4 w-4 rounded text-blue-600"
                        checked={showOnlyDiscounted}
                        onChange={(e) => setShowOnlyDiscounted(e.target.checked)}
                      />
                      <span className="mr-2 text-gray-700">فقط کالاهای تخفیف‌دار</span>
                    </label>
                  </li>
                  <li>
                    <label className="flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        name="feature"
                        value="available"
                        className="h-4 w-4 rounded text-blue-600"
                        checked={showOnlyAvailable}
                        onChange={(e) => setShowOnlyAvailable(e.target.checked)}
                      />
                      <span className="mr-2 text-gray-700">فقط کالاهای موجود</span>
                    </label>
                  </li>
                </ul>
              </div>

              <button 
                className="w-full rounded-lg bg-blue-600 py-2 font-medium text-white transition-colors hover:bg-blue-700"
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

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Sorting and View Options */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-lg bg-white p-4 shadow-md">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">مرتب‌سازی بر اساس:</span>
                <select 
                  className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">جدیدترین</option>
                  <option value="price-asc">ارزان‌ترین</option>
                  <option value="price-desc">گران‌ترین</option>
                  <option value="discount">بیشترین تخفیف</option>
                </select>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-gray-600">نمایش:</span>
                <div className="flex gap-2">
                  <button className="rounded-md bg-blue-100 p-1 text-blue-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                  <button className="rounded-md p-1 text-gray-400 hover:bg-gray-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sortedProducts.map((product) => (
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
                    category: product.category?.name || "بدون دسته‌بندی",
                    description: product.description,
                    inventory: product.inventory
                  }} 
                />
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <div className="mt-8 text-center text-gray-500">
                محصولی با فیلترهای انتخاب شده یافت نشد
              </div>
            )}

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <div className="flex items-center gap-2 rounded-lg bg-white p-2 shadow-md">
                <button className="rounded-md p-2 text-gray-400 hover:bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                {[1, 2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    className={`h-8 w-8 rounded-md ${
                      page === 1 ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button className="rounded-md p-2 text-gray-700 hover:bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
