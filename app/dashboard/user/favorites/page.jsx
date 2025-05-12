import { ProductCard } from "@/components/product-card"

// Sample data for favorites
const favoriteProducts = [
  {
    id: 1,
    title: "گوشی موبایل سامسونگ گلکسی S23 Ultra با ظرفیت 256 گیگابایت",
    price: "۴۵,۹۰۰,۰۰۰",
    originalPrice: "۵۱,۰۰۰,۰۰۰",
    discount: "۱۰٪",
    image: "/placeholder.svg?height=300&width=300&text=سامسونگ+گلکسی+S23+Ultra",
    rating: 4.8,
    reviewCount: 125,
  },
  {
    id: 2,
    title: "گوشی موبایل اپل آیفون 14 پرو مکس با ظرفیت 256 گیگابایت",
    price: "۶۵,۹۰۰,۰۰۰",
    image: "/placeholder.svg?height=300&width=300&text=آیفون+14+پرو+مکس",
    rating: 4.9,
    reviewCount: 98,
  },
  {
    id: 3,
    title: "لپ تاپ اپل مک‌بوک پرو 14 اینچ M2 Pro",
    price: "۱۲۵,۰۰۰,۰۰۰",
    originalPrice: "۱۳۵,۰۰۰,۰۰۰",
    discount: "۷٪",
    image: "/placeholder.svg?height=300&width=300&text=مک‌بوک+پرو+14",
    rating: 4.7,
    reviewCount: 45,
  },
  {
    id: 4,
    title: "هدفون بی‌سیم سونی WH-1000XM5",
    price: "۱۲,۵۰۰,۰۰۰",
    image: "/placeholder.svg?height=300&width=300&text=سونی+WH-1000XM5",
    rating: 4.6,
    reviewCount: 72,
    isNew: true,
  },
  {
    id: 5,
    title: "ساعت هوشمند اپل واچ سری 8",
    price: "۲۲,۹۰۰,۰۰۰",
    originalPrice: "۲۴,۵۰۰,۰۰۰",
    discount: "۶٪",
    image: "/placeholder.svg?height=300&width=300&text=اپل+واچ+سری+8",
    rating: 4.5,
    reviewCount: 63,
  },
  {
    id: 6,
    title: "تبلت سامسونگ گلکسی تب S8 اولترا",
    price: "۳۵,۹۰۰,۰۰۰",
    image: "/placeholder.svg?height=300&width=300&text=گلکسی+تب+S8+اولترا",
    rating: 4.7,
    reviewCount: 37,
    isNew: true,
  },
]

export default function FavoritesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">محصولات مورد علاقه</h1>

      {favoriteProducts.length === 0 ? (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-center">
          <div className="text-amber-500 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">لیست علاقه‌مندی‌های شما خالی است</h3>
          <p className="text-gray-600 mb-4">
            محصولات مورد علاقه خود را با کلیک بر روی آیکون قلب به این لیست اضافه کنید.
          </p>
          <a
            href="/products"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            مشاهده محصولات
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
