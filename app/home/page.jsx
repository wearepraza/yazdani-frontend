"use client"
import Link from "next/link"
import EnhancedProductCard from "@/components/enhanced-product-card"
import { Footer } from "@/components/footer"
import {listProducts} from "@/lib/api/main/listProducts"
import { listCategory } from "@/lib/api/main/listCategory";
import { useEffect, useState } from "react"

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [parentCategories, setParentCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await listProducts();
        console.log("Products response:", response); // Debug log
        if (response?.data) {
          // Transform the API data to match the product card format
          const products = response.data.map(product => ({
            id: product.id,
            title: product.title,
            price: product.price,
            discountedPrice: product.discount_price,
            discount: product.discount_price ? Math.round(((product.price - product.discount_price) / product.price) * 100) : 0,
            image: product.image_path ? `/${product.image_path}` : "/placeholder.svg",
            isNew: true,
            rating: 4.5,
            category: product.category?.name || "بدون دسته‌بندی",
          }));
          console.log("Transformed products:", products); // Debug log
          setFeaturedProducts(products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    const fetchCategories = async () => {
      try {
        const response = await listCategory();
        if (response?.data?.categories) {
          setCategories(response.data.categories);
          const parents = response.data.categories.filter(cat => cat.parent_id === null);
          setParentCategories(parents);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
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
              <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">فروشگاه آنلاین محصولات دیجیتال</h1>
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

        {/* Wave shape divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="text-gray-50">
            <path
              fill="currentColor"
              fillOpacity="1"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-2xl font-bold text-gray-800 md:text-3xl">دسته‌بندی محصولات</h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
            {parentCategories.map((category) => (
              <Link href={`/products?category=${category.id}`} key={category.id}>
                <div className="group flex flex-col items-center rounded-lg bg-white p-4 text-center shadow-md transition-all hover:shadow-lg">
                  <div className="mb-3 h-16 w-16 rounded-full bg-blue-100 p-3 transition-all group-hover:bg-blue-200">
                    <img
                      src={`/abstract-geometric-shapes.png?height=64&width=64&query=${category.name}`}
                      alt={category.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <h3 className="font-medium text-gray-800">{category.name}</h3>
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
            {featuredProducts && featuredProducts.length > 0 ? (
              featuredProducts.slice(0, 8).map((product) => (
                <EnhancedProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                محصولی یافت نشد
              </div>
            )}
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

    </div>
  )
}
