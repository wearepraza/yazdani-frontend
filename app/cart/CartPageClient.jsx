"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react"

// Sample cart data - in a real app, this would come from a context or state management
const initialCartItems = [
  {
    id: 1,
    name: "گوشی موبایل سامسونگ گلکسی S23 Ultra",
    price: 45900000,
    discountedPrice: 42500000,
    image: "/samsung-galaxy-s23-ultra.png",
    quantity: 1,
    color: "مشکی",
    warranty: "گارانتی 18 ماهه",
  },
  {
    id: 2,
    name: "هدفون بی سیم اپل ایرپادز پرو",
    price: 12500000,
    discountedPrice: 11800000,
    image: "/airpods-pro-lifestyle.png",
    quantity: 2,
    color: "سفید",
    warranty: "گارانتی 12 ماهه",
  },
]

export default function CartPageClient() {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading cart items from API or localStorage
    setTimeout(() => {
      setCartItems(initialCartItems)
      setLoading(false)
    }, 500)
  }, [])

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return

    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.discountedPrice || item.price) * item.quantity, 0)
  }

  const calculateDiscount = () => {
    return cartItems.reduce((total, item) => {
      const discount = item.discountedPrice ? (item.price - item.discountedPrice) * item.quantity : 0
      return total + discount
    }, 0)
  }

  const formatPrice = (price) => {
    return price.toLocaleString("fa-IR") + " تومان"
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="bg-gray-100 p-6 rounded-full mb-6">
          <ShoppingBag size={64} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold mb-2">سبد خرید شما خالی است</h2>
        <p className="text-gray-500 mb-8 max-w-md">
          محصولات مورد نظر خود را به سبد خرید اضافه کنید تا در اینجا نمایش داده شوند.
        </p>
        <Link
          href="/products"
          className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
        >
          مشاهده محصولات
          <ArrowLeft size={18} />
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="hidden md:grid grid-cols-12 bg-gray-50 p-4 border-b">
            <div className="col-span-6 font-medium">محصول</div>
            <div className="col-span-2 font-medium text-center">قیمت واحد</div>
            <div className="col-span-2 font-medium text-center">تعداد</div>
            <div className="col-span-2 font-medium text-center">قیمت کل</div>
          </div>

          {cartItems.map((item) => (
            <div key={item.id} className="border-b last:border-b-0 p-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                {/* Product Info */}
                <div className="col-span-1 md:col-span-6">
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm md:text-base mb-1">
                        <Link href={`/products/${item.id}`} className="hover:text-primary transition-colors">
                          {item.name}
                        </Link>
                      </h3>
                      <div className="text-xs text-gray-500 space-y-1">
                        <p>رنگ: {item.color}</p>
                        <p>{item.warranty}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="col-span-1 md:col-span-2 text-center">
                  <div className="flex flex-col items-center">
                    {item.discountedPrice && (
                      <span className="line-through text-gray-400 text-xs">{formatPrice(item.price)}</span>
                    )}
                    <span className="font-medium text-sm">{formatPrice(item.discountedPrice || item.price)}</span>
                  </div>
                </div>

                {/* Quantity */}
                <div className="col-span-1 md:col-span-2 flex justify-center">
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-gray-100 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                    <span className="w-10 text-center py-1">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-gray-100 transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                  </div>
                </div>

                {/* Total Price */}
                <div className="col-span-1 md:col-span-2 flex justify-between md:justify-center items-center">
                  <span className="md:hidden">قیمت کل:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {formatPrice((item.discountedPrice || item.price) * item.quantity)}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 p-1 hover:bg-red-50 rounded-full transition-colors"
                      aria-label="حذف از سبد خرید"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
          <h2 className="text-lg font-bold mb-4 pb-4 border-b">خلاصه سفارش</h2>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">قیمت کالاها ({cartItems.length})</span>
              <span>{formatPrice(calculateSubtotal() + calculateDiscount())}</span>
            </div>

            {calculateDiscount() > 0 && (
              <div className="flex justify-between text-red-500">
                <span>تخفیف کالاها</span>
                <span>{formatPrice(calculateDiscount())} -</span>
              </div>
            )}

            <div className="flex justify-between">
              <span className="text-gray-600">هزینه ارسال</span>
              <span>رایگان</span>
            </div>
          </div>

          <div className="border-t pt-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="font-bold">مبلغ قابل پرداخت</span>
              <span className="font-bold text-lg text-primary">{formatPrice(calculateSubtotal())}</span>
            </div>
          </div>

          <button className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
            ادامه فرآیند خرید
          </button>

          <div className="mt-4">
            <Link href="/products" className="block text-center text-primary hover:text-primary/80 transition-colors">
              ادامه خرید
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
