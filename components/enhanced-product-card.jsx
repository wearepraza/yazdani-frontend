"use client"

import Link from "next/link"
import { Heart, ShoppingCart, Star, Loader2, Check, Minus } from "lucide-react"
import { STORAGE } from "@/lib/api/config"
import { toggleFavoriteUser } from "@/lib/api/user/favorites/toggleFavoriteUser"
import { addToCart as addToCartAPI } from "@/lib/api/user/cart/addToCart"
import { removeCartItem } from "@/lib/api/user/cart/removeItemCart"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '@/lib/store/cartSlice'

export default function EnhancedProductCard({ product, showActions = true }) {
  const { id, title, price, discountedPrice, discount, image, isNew, rating, category } = product
  const [isFavorite, setIsFavorite] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isAddedToCart, setIsAddedToCart] = useState(false)
  
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items)
  const isInCart = cartItems.some(item => item.id === id)

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

  const handleCartAction = async (e) => {
    e.preventDefault()
    if (isAddingToCart) return

    setIsAddingToCart(true)
    setIsAddedToCart(false)
    try {
      if (isInCart) {
        // Remove from cart
        const response = await removeCartItem({ product_id: id })
        if (!response.error) {
          dispatch(removeFromCart(id))
        } else {
          console.error("Error removing from cart:", response.message)
        }
      } else {
        // Add to cart
        const payload = {
          product_id: id,
          quantity: 1
        }
        const response = await addToCartAPI(payload)
        if (!response.error) {
          dispatch(addToCart({
            id,
            title,
            price: discountedPrice || price,
            image,
            quantity: 1
          }))
          setIsAddedToCart(true)
          // Reset success state after 2 seconds
          setTimeout(() => {
            setIsAddedToCart(false)
          }, 2000)
        } else {
          console.error("Error adding to cart:", response.message)
        }
      }
    } catch (error) {
      console.error("Error with cart action:", error)
    } finally {
      setIsAddingToCart(false)
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
            <button 
              onClick={handleCartAction}
              disabled={isAddingToCart}
              className={`rounded-full bg-white p-2 transition-colors hover:bg-blue-500 hover:text-white ${
                isAddedToCart ? "text-green-500" : isInCart ? "text-red-500" : "text-gray-800"
              }`}
            >
              {isAddingToCart ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : isAddedToCart ? (
                <Check className="h-5 w-5" />
              ) : isInCart ? (
                <Minus className="h-5 w-5" />
              ) : (
                <ShoppingCart className="h-5 w-5" />
              )}
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
          <button 
            onClick={handleCartAction}
            disabled={isAddingToCart}
            className={`rounded-full p-2 transition-all ${
              isAddedToCart 
                ? "bg-green-100 text-green-600" 
                : isInCart
                ? "bg-red-100 text-red-600 hover:bg-red-600 hover:text-white"
                : "bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white"
            }`}
          >
            {isAddingToCart ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : isAddedToCart ? (
              <Check className="h-5 w-5" />
            ) : isInCart ? (
              <Minus className="h-5 w-5" />
            ) : (
              <ShoppingCart className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
