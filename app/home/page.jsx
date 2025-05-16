"use client"
import Link from "next/link"
import EnhancedProductCard from "@/components/enhanced-product-card"
import {listProducts} from "@/lib/api/main/listProducts"
import { listCategory } from "@/lib/api/main/listCategory";
import { useEffect } from "react"

// Sample data for products
const featuredProducts = [
  {
    id: 1,
    title: "هدفون بی سیم سونی WH-1000XM4",
    price: 8500000,
    discountedPrice: 7650000,
    discount: 10,
    image: "/diverse-people-listening-headphones.png",
    isNew: true,
    rating: 4.8,
    category: "هدفون و صوتی",
  },
  {
    id: 2,
    title: "لپ تاپ اپل مک بوک پرو M1",
    price: 52000000,
    discountedPrice: 49400000,
    discount: 5,
    image: "/silver-macbook-on-desk.png",
    isNew: false,
    rating: 4.9,
    category: "لپ تاپ",
  },
  {
    id: 3,
    title: "ساعت هوشمند سامسونگ گلکسی واچ 4",
    price: 6200000,
    discountedPrice: 5580000,
    discount: 10,
    image: "/modern-smartwatch.png",
    isNew: true,
    rating: 4.5,
    category: "ساعت هوشمند",
  },
  {
    id: 4,
    title: "گوشی موبایل آیفون 13 پرو",
    price: 42000000,
    discountedPrice: 39900000,
    discount: 5,
    image: "/modern-smartphone.png",
    isNew: false,
    rating: 4.7,
    category: "موبایل",
  },
  {
    id: 5,
    title: "تبلت سامسونگ گلکسی تب S7",
    price: 18500000,
    discountedPrice: 16650000,
    discount: 10,
    image: "/modern-tablet-display.png",
    isNew: true,
    rating: 4.6,
    category: "تبلت",
  },
  {
    id: 6,
    title: "دوربین بدون آینه کانن EOS R5",
    price: 98000000,
    discountedPrice: 93100000,
    discount: 5,
    image: "/vintage-camera-still-life.png",
    isNew: false,
    rating: 4.9,
    category: "دوربین",
  },
  {
    id: 7,
    title: "اسپیکر بلوتوثی JBL Charge 5",
    price: 4800000,
    discountedPrice: 4320000,
    discount: 10,
    image: "/audio-speaker.png",
    isNew: true,
    rating: 4.4,
    category: "اسپیکر",
  },
  {
    id: 8,
    title: "کنسول بازی پلی استیشن 5",
    price: 25000000,
    discountedPrice: 23750000,
    discount: 5,
    image: "/gaming-console-setup.png",
    isNew: false,
    rating: 4.8,
    category: "کنسول بازی",
  },
]

const newProducts = [
  {
    id: 9,
    title: "ایرپاد پرو نسل دوم",
    price: 7200000,
    discountedPrice: 6480000,
    discount: 10,
    image: "/wireless-earbuds.png",
    isNew: true,
    rating: 4.7,
    category: "هدفون و صوتی",
  },
  {
    id: 10,
    title: "مانیتور گیمینگ ایسوس ROG Swift",
    price: 32000000,
    discountedPrice: 30400000,
    discount: 5,
    image: "/computer-monitor.png",
    isNew: true,
    rating: 4.6,
    category: "مانیتور",
  },
  {
    id: 11,
    title: "کیبورد مکانیکی لاجیتک G Pro X",
    price: 4500000,
    discountedPrice: 4050000,
    discount: 10,
    image: "/mechanical-keyboard.png",
    isNew: true,
    rating: 4.5,
    category: "لوازم جانبی",
  },
  {
    id: 12,
    title: "ماوس گیمینگ ریزر DeathAdder V2",
    price: 3200000,
    discountedPrice: 3040000,
    discount: 5,
    image: "/field-mouse.png",
    isNew: true,
    rating: 4.8,
    category: "لوازم جانبی",
  },
]

const popularProducts = [
  {
    id: 13,
    title: "هارد اکسترنال وسترن دیجیتال 2TB",
    price: 3800000,
    discountedPrice: 3420000,
    discount: 10,
    image: "/placeholder.svg?key=s42v0",
    isNew: false,
    rating: 4.5,
    category: "ذخیره‌سازی",
  },
  {
    id: 14,
    title: "پاور بانک انکر 20000mAh",
    price: 2500000,
    discountedPrice: 2375000,
    discount: 5,
    image: "/portable-power-bank.png",
    isNew: false,
    rating: 4.6,
    category: "لوازم جانبی",
  },
  {
    id: 15,
    title: "اسپیکر هوشمند گوگل نست",
    price: 4200000,
    discountedPrice: 3780000,
    discount: 10,
    image: "/placeholder.svg?key=nq4nv",
    isNew: false,
    rating: 4.3,
    category: "اسپیکر",
  },
  {
    id: 16,
    title: "هاب USB-C مک بوک",
    price: 1800000,
    discountedPrice: 1710000,
    discount: 5,
    image: "/usb-hub.png",
    isNew: false,
    rating: 4.4,
    category: "لوازم جانبی",
  },
]

export default function HomePage() {

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await listProducts();
      console.log(response);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await listCategory();
      console.log(response);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  fetchProducts();
  fetchCategories();
}, []);


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="text-center md:text-right md:w-1/2">
              <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">فروشگاه آنلاین لوازم جانبی فونیکسو</h1>
              <p className="mb-6 text-lg opacity-90">بهترین محصولات با بهترین قیمت‌ها و ضمانت اصالت کالا</p>
              <Link href="/products">
                <button className="rounded-lg bg-white px-6 py-3 font-bold text-blue-600 transition-all hover:bg-blue-50">
                  مشاهده محصولات
                </button>
              </Link>
            </div>
            <div className="md:w-1/2">
              <img src="/electronics-store-interior.png" alt="فروشگاه دیجیتال" className="rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-2xl font-bold text-gray-800 md:text-3xl">دسته‌بندی محصولات</h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
            {["موبایل", "لپ تاپ", "تبلت", "هدفون", "ساعت هوشمند", "لوازم جانبی"].map((category, index) => (
              <Link href="/products" key={index}>
                <div className="group flex flex-col items-center rounded-lg bg-white p-4 text-center shadow-md transition-all hover:shadow-lg">
                  <div className="mb-3 h-16 w-16 rounded-full bg-blue-100 p-3 transition-all group-hover:bg-blue-200">
                    <img
                      src={`/abstract-geometric-shapes.png?height=64&width=64&query=${category}`}
                      alt={category}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <h3 className="font-medium text-gray-800">{category}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">محصولات ویژه</h2>
            <Link href="/products" className="text-blue-600 hover:text-blue-700">
              مشاهده همه
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {featuredProducts.slice(0, 8).map((product) => (
              <EnhancedProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
            <div className="flex flex-col items-center justify-between gap-6 p-8 md:flex-row">
              <div className="text-center md:text-right md:w-1/2">
                <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">تخفیف‌های ویژه تابستانی</h2>
                <p className="mb-6 text-white/90">تا ۳۰٪ تخفیف روی محصولات منتخب فقط تا پایان ماه</p>
                <Link href="/products">
                  <button className="rounded-lg bg-white px-6 py-3 font-bold text-blue-600 transition-all hover:bg-blue-50">
                    مشاهده تخفیف‌ها
                  </button>
                </Link>
              </div>
              <div className="md:w-1/2">
                <img src="/placeholder.svg?key=dm3kz" alt="تخفیف تابستانی" className="rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">محصولات جدید</h2>
            <Link href="/products" className="text-blue-600 hover:text-blue-700">
              مشاهده همه
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {newProducts.map((product) => (
              <EnhancedProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">محصولات پرفروش</h2>
            <Link href="/products" className="text-blue-600 hover:text-blue-700">
              مشاهده همه
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {popularProducts.map((product) => (
              <EnhancedProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-2xl font-bold text-gray-800 md:text-3xl">چرا ما را انتخاب کنید؟</h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "ارسال سریع", desc: "تحویل در کمترین زمان ممکن", icon: "🚚" },
              { title: "ضمانت اصالت", desc: "تضمین اصالت تمامی محصولات", icon: "✅" },
              { title: "پشتیبانی ۲۴/۷", desc: "پاسخگویی در تمام ساعات", icon: "📞" },
              { title: "بازگشت رایگان", desc: "۷ روز ضمانت بازگشت کالا", icon: "🔄" },
            ].map((feature, index) => (
              <div
                key={index}
                className="rounded-lg bg-blue-50 p-6 text-center shadow-sm transition-all hover:shadow-md"
              >
                <div className="mb-4 text-4xl">{feature.icon}</div>
                <h3 className="mb-2 text-lg font-bold text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
