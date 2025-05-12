import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import EnhancedProductCard from "@/components/enhanced-product-card"

// Sample data for products
const products = Array(16)
  .fill()
  .map((_, i) => ({
    id: i + 1,
    title: `محصول شماره ${i + 1}`,
    price: Math.floor(Math.random() * 10000000) + 1000000,
    discountedPrice: 0,
    discount: Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 5 : 0,
    image: `/placeholder.svg?height=300&width=300&query=product+${i + 1}`,
    isNew: Math.random() > 0.8,
    rating: (Math.random() * 2 + 3).toFixed(1),
    category: ["موبایل", "لپ تاپ", "تبلت", "هدفون", "ساعت هوشمند"][Math.floor(Math.random() * 5)],
  }))
  .map((product) => ({
    ...product,
    discountedPrice: product.discount > 0 ? Math.floor(product.price * (1 - product.discount / 100)) : product.price,
  }))

// Categories for filter
const categories = [
  { id: "all", name: "همه محصولات" },
  { id: "mobile", name: "موبایل" },
  { id: "laptop", name: "لپ تاپ" },
  { id: "tablet", name: "تبلت" },
  { id: "headphone", name: "هدفون و هندزفری" },
  { id: "smartwatch", name: "ساعت هوشمند" },
  { id: "accessories", name: "لوازم جانبی" },
]

// Brands for filter
const brands = [
  { id: "apple", name: "اپل" },
  { id: "samsung", name: "سامسونگ" },
  { id: "xiaomi", name: "شیائومی" },
  { id: "huawei", name: "هواوی" },
  { id: "sony", name: "سونی" },
  { id: "lg", name: "ال جی" },
]

// Price ranges for filter
const priceRanges = [
  { id: "under-5m", name: "کمتر از ۵ میلیون تومان" },
  { id: "5m-10m", name: "۵ تا ۱۰ میلیون تومان" },
  { id: "10m-20m", name: "۱۰ تا ۲۰ میلیون تومان" },
  { id: "over-20m", name: "بیشتر از ۲۰ میلیون تومان" },
]

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

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
                  {categories.map((category) => (
                    <li key={category.id}>
                      <label className="flex cursor-pointer items-center">
                        <input
                          type="radio"
                          name="category"
                          value={category.id}
                          className="h-4 w-4 text-blue-600"
                          defaultChecked={category.id === "all"}
                        />
                        <span className="mr-2 text-gray-700">{category.name}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-4 border-b border-gray-200 pb-2 text-lg font-bold">برند‌ها</h3>
                <ul className="space-y-2">
                  {brands.map((brand) => (
                    <li key={brand.id}>
                      <label className="flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          name="brand"
                          value={brand.id}
                          className="h-4 w-4 rounded text-blue-600"
                        />
                        <span className="mr-2 text-gray-700">{brand.name}</span>
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
                        <input type="radio" name="price" value={range.id} className="h-4 w-4 text-blue-600" />
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
                      />
                      <span className="mr-2 text-gray-700">فقط کالاهای موجود</span>
                    </label>
                  </li>
                  <li>
                    <label className="flex cursor-pointer items-center">
                      <input type="checkbox" name="feature" value="new" className="h-4 w-4 rounded text-blue-600" />
                      <span className="mr-2 text-gray-700">فقط کالاهای جدید</span>
                    </label>
                  </li>
                </ul>
              </div>

              <button className="w-full rounded-lg bg-blue-600 py-2 font-medium text-white transition-colors hover:bg-blue-700">
                اعمال فیلترها
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Sorting and View Options */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-lg bg-white p-4 shadow-md">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">مرتب‌سازی بر اساس:</span>
                <select className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm">
                  <option>پرفروش‌ترین</option>
                  <option>جدیدترین</option>
                  <option>ارزان‌ترین</option>
                  <option>گران‌ترین</option>
                  <option>بیشترین تخفیف</option>
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
                        d="M4 6h16M4 10h16M4 14h16M4 18h7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <EnhancedProductCard key={product.id} product={product} />
              ))}
            </div>

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

      <Footer />
    </div>
  )
}
