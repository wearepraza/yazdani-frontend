"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react"
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart, setCart } from '@/lib/store/cartSlice'
import { getCartList } from "@/lib/api/user/cart/listCart"
import { addToCart as addToCartAPI } from "@/lib/api/user/cart/addToCart"
import { removeCartItem } from "@/lib/api/user/cart/removeItemCart"
import { STORAGE } from "@/lib/api/config"
import { checkoutCart } from '@/lib/api/user/cart/checkoutCart'

export default function CartPageClient() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items)
  const totalAmount = useSelector((state) => state.cart.totalAmount)

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await getCartList()
        if (response.data?.cart) {
          dispatch(setCart(response.data.cart))
        }
      } catch (error) {
        console.error('Error fetching cart:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCartItems()
  }, [dispatch])

  const updateQuantity = async (id, newQuantity, product) => {
    if (newQuantity < 0) return

    if (newQuantity === 0) {
      await removeItem(id, product)
      return
    }

    dispatch(addToCart({ product_id: id, quantity: newQuantity, product }))

    try {
      const payload = { product_id: id, quantity: newQuantity }
      await addToCartAPI(payload)
    } catch (error) {
      console.error('Error updating quantity:', error)
      dispatch(addToCart({ product_id: id, quantity: newQuantity - 1, product }))
    }
  }

  const removeItem = async (id, product) => {
    dispatch(removeFromCart(id))

    try {
      await removeCartItem({ product_id: id })
    } catch (error) {
      dispatch(addToCart({ product_id: id, quantity: 1, product }))
      console.error('Error removing item:', error)
    }
  }

  const calculateDiscount = () => {
    return cartItems.reduce((total, item) => {
      const discount = item.product?.discount_price ? (item.product.price - item.product.discount_price) * item.quantity : 0
      return total + discount
    }, 0)
  }

  const formatPrice = (price) => {
    if (!price && price !== 0) return "0 تومان"
    return price.toLocaleString("fa-IR") + " تومان"
  }

  const handleCheckout = async () => {
    try {
      const response = await checkoutCart()
      console.log(response)
      if (response.error) {
        console.error('Checkout error:', response.message)
      } else {
        console.log('Checkout successful:', response)
      }
    } catch (error) {
      console.error('Error during checkout:', error)
    }
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
                <div className="col-span-1 md:col-span-6">
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.product?.image_path ? `${STORAGE}${item.product.image_path}` : "/placeholder.svg"}
                        alt={item.product?.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm md:text-base mb-1">
                        <Link href={`/products/${item.product_id}`} className="hover:text-primary transition-colors">
                          {item.product?.title}
                        </Link>
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="col-span-1 md:col-span-2 text-center">
                  <div className="flex flex-col items-center">
                    {item.product?.discount_price && (
                      <span className="line-through text-gray-400 text-xs">
                        {formatPrice(item.product.price)}
                      </span>
                    )}
                    <span className="font-medium text-sm">
                      {formatPrice(item.product?.discount_price || item.product?.price)}
                    </span>
                  </div>
                </div>

                <div className="col-span-1 md:col-span-2 flex justify-center">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateQuantity(item.product_id, item.quantity - 1, item.product)}
                      className="p-2 rounded-lg bg-primary/10 hover:bg-primary text-primary hover:text-white transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product_id, item.quantity + 1, item.product)}
                      className="p-2 rounded-lg bg-primary/10 hover:bg-primary text-primary hover:text-white transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div className="col-span-1 md:col-span-2 flex justify-between md:justify-center items-center">
                  <span className="md:hidden">قیمت کل:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {formatPrice((item.product?.discount_price || item.product?.price) * item.quantity)}
                    </span>
                    <button
                      onClick={() => removeItem(item.product_id, item.product)}
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

      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
          <h2 className="text-lg font-bold mb-4 pb-4 border-b">خلاصه سفارش</h2>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">قیمت کالاها ({cartItems.length})</span>
              <span>{formatPrice(totalAmount + calculateDiscount())}</span>
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
              <span className="font-bold text-lg text-primary">{formatPrice(totalAmount)}</span>
            </div>
          </div>

          <button onClick={handleCheckout} className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
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
