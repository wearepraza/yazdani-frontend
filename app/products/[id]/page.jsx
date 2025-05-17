"use client"

import { useEffect, useState, use } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import EnhancedProductCard from "@/components/enhanced-product-card"
import { Star, Heart, ShoppingCart, Share2, Check, Truck, Shield, RotateCcw } from "lucide-react"
import { detailsProducts } from "@/lib/api/main/detailsProducts"
import { STORAGE } from "@/lib/api/config"
import { toggleFavoriteUser } from "@/lib/api/user/favorites/toggleFavoriteUser"
import { toast } from "react-hot-toast"

export default function ProductDetailPage({ params }) {
  const resolvedParams = use(params)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [isFavorite, setIsFavorite] = useState(false)
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false)

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true)
        const response = await detailsProducts(resolvedParams.id)
        console.log(response)
        if (response.error) {
          setError(response.message)
        } else {
          setProduct(response.data)
          setRelatedProducts(response.data.related_products || [])
          setIsFavorite(response.data.is_favorite || false)
        }
      } catch (err) {
        setError("خطا در دریافت اطلاعات محصول")
      } finally {
        setLoading(false)
      }
    }

    fetchProductDetails()
  }, [resolvedParams.id])

  const handleToggleFavorite = async () => {
    if (!product) return
    
    try {
      setIsFavoriteLoading(true)
      const response = await toggleFavoriteUser(product.id)
      
      if (response.error) {
        toast.error(response.message || "خطا در ثبت علاقه‌مندی")
      } else {
        setIsFavorite(!isFavorite)
        toast.success(isFavorite ? "از علاقه‌مندی‌ها حذف شد" : "به علاقه‌مندی‌ها اضافه شد")
      }
    } catch (error) {
      toast.error("خطا در ثبت علاقه‌مندی")
    } finally {
      setIsFavoriteLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center">
            <div className="text-lg text-gray-600">در حال بارگذاری...</div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center">
            <div className="text-lg text-red-600">{error}</div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center">
            <div className="text-lg text-gray-600">محصول یافت نشد</div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const hasDiscount = product.discount_price !== null

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
            <Link href={`/products?category=${product.category.name}`} className="hover:text-blue-600">
              {product.category.name}
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
                  src={`${STORAGE}${product.image_path}` || "/placeholder.svg"}
                  alt={product.title}
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="grid grid-cols-4 gap-2">
                {product.gallery && product.gallery.map((image, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer overflow-hidden rounded-md border-2 ${
                      index === 0 ? "border-blue-500" : "border-gray-200"
                    }`}
                  >
                    <img
                      src={`${STORAGE}${image}` || "/placeholder.svg"}
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
                <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>
              </div>

              {/* Price */}
              <div className="mb-6">
                {hasDiscount ? (
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 line-through">{product.price.toLocaleString()} تومان</span>
                      <span className="mr-2 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
                        {Math.round(((product.price - product.discount_price) / product.price) * 100)}% تخفیف
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                      {product.discount_price.toLocaleString()} تومان
                    </div>
                  </div>
                ) : (
                  <div className="text-2xl font-bold text-blue-600">{product.price.toLocaleString()} تومان</div>
                )}
              </div>

              {/* Availability */}
              <div className="mb-6">
                {product.inventory > 0 ? (
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
                <button 
                  onClick={handleToggleFavorite}
                  disabled={isFavoriteLoading}
                  className={`rounded-lg border border-gray-300 p-3 transition-colors hover:bg-gray-50 ${
                    isFavorite ? "bg-red-50 text-red-500 border-red-200" : "bg-white text-gray-600"
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
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
                {product.features && product.features.map((feature, index) => (
                  <div key={index} className="flex flex-wrap px-6 py-4 even:bg-gray-50">
                    <div className="w-full font-medium text-gray-600 md:w-1/3">{feature.name}</div>
                    <div className="w-full text-gray-800 md:w-2/3">{feature.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">محصولات مرتبط</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {relatedProducts.map((product) => (
                <EnhancedProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
