import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import EnhancedProductCard from "@/components/enhanced-product-card"
import { Star, Heart, ShoppingCart, Share2, Check, Truck, Shield, RotateCcw } from "lucide-react"

// Sample product data
const product = {
  id: 1,
  title: "هدفون بی سیم سونی WH-1000XM4",
  description:
    "هدفون بی‌سیم سونی مدل WH-1000XM4 با تکنولوژی حذف نویز پیشرفته، کیفیت صدای فوق‌العاده و باتری با دوام طولانی. این هدفون با طراحی ارگونومیک و راحت، برای استفاده طولانی مدت مناسب است و با بلوتوث به دستگاه‌های مختلف متصل می‌شود.",
  price: 8500000,
  discountedPrice: 7650000,
  discount: 10,
  images: [
    "/placeholder.svg?key=4r315",
    "/placeholder.svg?height=500&width=500&query=sony+headphones+2",
    "/placeholder.svg?height=500&width=500&query=sony+headphones+3",
    "/placeholder.svg?height=500&width=500&query=sony+headphones+4",
  ],
  isNew: true,
  rating: 4.8,
  reviewCount: 124,
  category: "هدفون و صوتی",
  brand: "سونی",
  availability: true,
  colors: ["مشکی", "نقره‌ای", "آبی"],
  specifications: [
    { name: "نوع اتصال", value: "بی‌سیم (بلوتوث)" },
    { name: "نوع هدفون", value: "روی گوش (Over-ear)" },
    { name: "عمر باتری", value: "تا 30 ساعت" },
    { name: "قابلیت حذف نویز", value: "دارد" },
    { name: "میکروفون", value: "دارد" },
    { name: "وزن", value: "254 گرم" },
    { name: "گارانتی", value: "18 ماه" },
  ],
}

// Sample related products
const relatedProducts = [
  {
    id: 2,
    title: "هدفون بی سیم اپل AirPods Max",
    price: 12500000,
    discountedPrice: 11875000,
    discount: 5,
    image: "/placeholder.svg?height=300&width=300&query=airpods+max",
    isNew: false,
    rating: 4.7,
    category: "هدفون و صوتی",
  },
  {
    id: 3,
    title: "هدفون بی سیم بوز QuietComfort 45",
    price: 7800000,
    discountedPrice: 7020000,
    discount: 10,
    image: "/placeholder.svg?height=300&width=300&query=bose+headphones",
    isNew: true,
    rating: 4.6,
    category: "هدفون و صوتی",
  },
  {
    id: 4,
    title: "هدفون بی سیم سنهایزر Momentum 4",
    price: 9200000,
    discountedPrice: 8740000,
    discount: 5,
    image: "/placeholder.svg?height=300&width=300&query=sennheiser+headphones",
    isNew: false,
    rating: 4.5,
    category: "هدفون و صوتی",
  },
  {
    id: 5,
    title: "هدفون بی سیم جی بی ال Tour One",
    price: 6500000,
    discountedPrice: 5850000,
    discount: 10,
    image: "/placeholder.svg?height=300&width=300&query=jbl+headphones",
    isNew: true,
    rating: 4.4,
    category: "هدفون و صوتی",
  },
]

export default function ProductDetailPage({ params }) {
  const hasDiscount = product.discount > 0

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
            <Link href="/products" className="hover:text-blue-600">
              محصولات
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/products?category=${product.category}`} className="hover:text-blue-600">
              {product.category}
            </Link>
            <span className="mx-2">/</span>
            <span className="font-medium text-gray-900">{product.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <img
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.title}
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer overflow-hidden rounded-md border-2 ${
                      index === 0 ? "border-blue-500" : "border-gray-200"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.title} - تصویر ${index + 1}`}
                      className="h-20 w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              {/* Title and badges */}
              <div className="mb-4">
                {product.isNew && (
                  <span className="mb-2 inline-block rounded-full bg-blue-500 px-2 py-1 text-xs font-bold text-white">
                    جدید
                  </span>
                )}
                <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>
              </div>

              {/* Brand */}
              <div className="mb-4">
                <span className="text-gray-600">برند: </span>
                <Link href={`/products?brand=${product.brand}`} className="font-medium text-blue-600 hover:underline">
                  {product.brand}
                </Link>
              </div>

              {/* Rating */}
              <div className="mb-4 flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="mr-2 text-sm text-gray-600">
                  {product.rating} ({product.reviewCount} نظر)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                {hasDiscount ? (
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 line-through">{product.price.toLocaleString()} تومان</span>
                      <span className="mr-2 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
                        {product.discount}% تخفیف
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                      {product.discountedPrice.toLocaleString()} تومان
                    </div>
                  </div>
                ) : (
                  <div className="text-2xl font-bold text-blue-600">{product.price.toLocaleString()} تومان</div>
                )}
              </div>

              {/* Color Selection */}
              <div className="mb-6">
                <h3 className="mb-2 text-sm font-medium text-gray-700">رنگ:</h3>
                <div className="flex gap-2">
                  {product.colors.map((color, index) => (
                    <label key={index} className="cursor-pointer">
                      <input type="radio" name="color" className="peer sr-only" defaultChecked={index === 0} />
                      <div className="rounded-lg border-2 border-transparent px-3 py-1 peer-checked:border-blue-500 peer-checked:bg-blue-50">
                        {color}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="mb-6">
                {product.availability ? (
                  <div className="flex items-center text-green-600">
                    <Check className="h-5 w-5" />
                    <span className="mr-1 font-medium">موجود در انبار</span>
                  </div>
                ) : (
                  <div className="text-red-500">ناموجود</div>
                )}
              </div>

              {/* Actions */}
              <div className="mt-auto flex flex-wrap gap-4">
                <button className="flex-1 rounded-lg bg-blue-600 py-3 font-medium text-white transition-colors hover:bg-blue-700">
                  <div className="flex items-center justify-center">
                    <ShoppingCart className="h-5 w-5" />
                    <span className="mr-2">افزودن به سبد خرید</span>
                  </div>
                </button>
                <button className="rounded-lg border border-gray-300 bg-white p-3 text-gray-600 transition-colors hover:bg-gray-50">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="rounded-lg border border-gray-300 bg-white p-3 text-gray-600 transition-colors hover:bg-gray-50">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>

              {/* Features */}
              <div className="mt-6 grid grid-cols-1 gap-3 border-t border-gray-200 pt-6 sm:grid-cols-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Truck className="h-5 w-5 text-blue-500" />
                  <span className="mr-2">ارسال سریع</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Shield className="h-5 w-5 text-blue-500" />
                  <span className="mr-2">ضمانت اصالت کالا</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <RotateCcw className="h-5 w-5 text-blue-500" />
                  <span className="mr-2">۷ روز ضمانت بازگشت</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Shield className="h-5 w-5 text-blue-500" />
                  <span className="mr-2">گارانتی ۱۸ ماهه</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Description and Specifications */}
          <div className="mt-12">
            <div className="mb-8 border-b border-gray-200">
              <div className="flex flex-wrap gap-4">
                <button className="border-b-2 border-blue-600 pb-2 font-medium text-blue-600">توضیحات محصول</button>
                <button className="border-b-2 border-transparent pb-2 text-gray-500 hover:text-gray-700">
                  مشخصات فنی
                </button>
                <button className="border-b-2 border-transparent pb-2 text-gray-500 hover:text-gray-700">
                  نظرات کاربران
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <p className="leading-relaxed text-gray-700">{product.description}</p>
            </div>

            {/* Specifications */}
            <div className="mb-8 overflow-hidden rounded-lg border border-gray-200">
              <div className="bg-gray-50 px-6 py-4">
                <h3 className="text-lg font-medium text-gray-800">مشخصات فنی</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {product.specifications.map((spec, index) => (
                  <div key={index} className="flex flex-wrap px-6 py-4 even:bg-gray-50">
                    <div className="w-full font-medium text-gray-600 md:w-1/3">{spec.name}</div>
                    <div className="w-full text-gray-800 md:w-2/3">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-800">محصولات مرتبط</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {relatedProducts.map((product) => (
              <EnhancedProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
