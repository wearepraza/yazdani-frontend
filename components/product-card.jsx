import Link from "next/link"
import { Star, ShoppingCart } from "lucide-react"
import { STORAGE } from "@/lib/api/config"
export function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-md hover:border-gray-200 group">
      <Link href={`/products/${product.id}`} className="block relative">
        <div className="h-52 md:h-64 p-4 flex items-center justify-center overflow-hidden bg-gray-50/50">
          <img
            src={`${STORAGE}${product.image_url.replace("https://phonixo.praza.ir/storage/", "")}` || "/placeholder.svg"}
            alt={product.title}
            className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          {product.discount && (
            <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1.5 rounded-full shadow-sm">
              {product.discount} تخفیف
            </div>
          )}
          {product.isNew && (
            <div className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-bold px-2.5 py-1.5 rounded-full shadow-sm">
              جدید
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/products/${product.id}`} className="block group-hover:text-primary transition-colors">
          <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 min-h-[48px]">{product.title}</h3>
        </Link>

        {product.rating && (
          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center text-amber-500">
              <Star size={14} fill="currentColor" />
              <span className="text-xs text-gray-700 mr-1 font-medium">{product.rating}</span>
            </div>
            {product.reviewCount && <span className="text-xs text-gray-500">({product.reviewCount} نظر)</span>}
          </div>
        )}

        <div className="flex items-center justify-between mt-3">
          <div>
            {product.discount && product.originalPrice && (
              <div className="text-gray-400 line-through text-xs mb-1">{product.originalPrice} تومان</div>
            )}
            <div className="font-bold text-gray-900">{product.price} تومان</div>
          </div>

          <button
            className="flex items-center justify-center p-2 rounded-lg bg-primary/10 hover:bg-primary text-primary hover:text-white transition-colors"
            aria-label="افزودن به سبد خرید"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
