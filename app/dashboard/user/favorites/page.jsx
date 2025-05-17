"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "@/components/product-card"
import { listFavoriteUser } from "@/lib/api/user/favorites/listFavoriteUser"
import Loading from "./loading"

export default function FavoritesPage() {
  const [favoriteProducts, setFavoriteProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchFavorites() {
      setLoading(true)
      setError(null)
      try {
        const resp = await listFavoriteUser()
        console.log("listFavoriteUser response:", resp)
        const items = resp.data?.favorites
        setFavoriteProducts(items)
      } catch (err) {
        console.error(err)
        setError(err.message || "خطا در دریافت علاقه‌مندی‌ها")
      } finally {
        setLoading(false)
      }
    }
    fetchFavorites()
  }, [])

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <p className="text-destructive">{error}</p>
  }
console.log(favoriteProducts)
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
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12
                7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            لیست علاقه‌مندی‌های شما خالی است
          </h3>
          <p className="text-gray-600 mb-4">
            محصولات مورد علاقه خود را با کلیک بر روی آیکون قلب به این لیست اضافه کنید.
          </p>
          <a
            href="/products"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90"
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
