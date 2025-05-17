"use client"

import Link from "next/link"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { STORAGE } from "@/lib/api/config"
import { toggleFavoriteUser } from "@/lib/api/user/favorites/toggleFavoriteUser"
import { useState } from "react"

export default function EnhancedProductCard({ product, showActions = true }) {
  const { id, title, price, discountedPrice, discount, image, isNew, rating, category } = product
  const [isFavorite, setIsFavorite] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const hasDiscount = discount > 0

  const handleFavoriteToggle = async (e) => {
    e.preventDefault()
    if (isLoading) return

    setIsLoading(true)
    try {
      const response = await toggleFavoriteUser(id)
      if (!response.error) {
        setIsFavorite(!isFavorite)
      }
    } catch (error) {
      console.error("Error toggling favorite:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg h-[420px]">
      {/* New badge */}
      {isNew && (
        <div className="absolute right-2 top-2 z-10 rounded-full bg-blue-500 px-2 py-1 text-xs font-bold text-white">
          جدید
        </div>
      )}

      {/* Discount badge */}
      {hasDiscount && (
        <div className="absolute left-2 top-2 z-10 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
          {discount}% تخفیف
        </div>
      )}

      {/* Image container with hover effect */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image ? `${STORAGE}${image}` : "/placeholder.svg?height=192&width=256&query=product"}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Quick action buttons that appear on hover */}
        {showActions && (
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {/* <Link href={`/products/${id}`}>
              <button className="rounded-full bg-white p-2 text-gray-800 transition-colors hover:bg-blue-500 hover:text-white">
                <Star className="h-5 w-5" />
              </button>
            </Link> */}
            <button 
              onClick={handleFavoriteToggle}
              disabled={isLoading}
              className={`rounded-full bg-white p-2 transition-colors hover:bg-blue-500 hover:text-white ${
                isFavorite ? "text-red-500 hover:text-white" : "text-gray-800"
              }`}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
            </button>
            <button className="rounded-full bg-white p-2 text-gray-800 transition-colors hover:bg-blue-500 hover:text-white">
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="p-4">
        {/* Category */}
        <div className="mb-1 text-xs font-medium text-gray-500">{category}</div>

        {/* Title */}
        <Link href={`/products/${id}`}>
          <h3 className="mb-2 text-sm font-bold text-gray-800 transition-colors hover:text-blue-600 md:text-base">
            {title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="mb-2 flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
            />
          ))}
          <span className="mr-1 text-xs text-gray-500">({rating})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between absolute bottom-4 left-4 right-4">
          <div>
            {hasDiscount ? (
              <div className="flex flex-col items-end">
                <span className="text-xs font-medium text-gray-500 line-through">{price.toLocaleString()} تومان</span>
                <span className="text-base font-bold text-blue-600">{discountedPrice.toLocaleString()} تومان</span>
              </div>
            ) : (
              <span className="text-base font-bold text-blue-600">{price.toLocaleString()} تومان</span>
            )}
          </div>

          {/* Add to cart button */}
          <button className="rounded-full bg-blue-100 p-2 text-blue-600 transition-all hover:bg-blue-600 hover:text-white">
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
