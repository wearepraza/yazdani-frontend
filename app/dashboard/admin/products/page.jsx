"use client"

import { useState } from "react"
import { Search, Filter, Plus, Edit, Trash, Eye, ImageOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Sample products data
const sampleProducts = [
  {
    id: 1,
    title: "گوشی موبایل سامسونگ گلکسی S23 Ultra",
    price: "۴۵,۹۰۰,۰۰۰",
    category: "موبایل",
    stock: 15,
    status: "موجود",
  },
  {
    id: 2,
    title: "لپ تاپ اپل مک‌بوک پرو M2",
    price: "۸۵,۵۰۰,۰۰۰",
    category: "لپ تاپ",
    stock: 8,
    status: "موجود",
  },
  {
    id: 3,
    title: "هدفون بی سیم سونی WH-1000XM5",
    price: "۱۲,۸۰۰,۰۰۰",
    category: "صوتی",
    stock: 20,
    status: "موجود",
  },
  {
    id: 4,
    title: "ساعت هوشمند اپل واچ سری ۸",
    price: "۲۲,۵۰۰,۰۰۰",
    category: "پوشیدنی",
    stock: 0,
    status: "ناموجود",
  },
  {
    id: 5,
    title: "تبلت سامسونگ گلکسی Tab S8",
    price: "۱۸,۵۰۰,۰۰۰",
    category: "تبلت",
    stock: 5,
    status: "کم موجود",
  },
]

export default function ProductsPage() {
  const [products, setProducts] = useState(sampleProducts)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProducts = products.filter(
    (product) => product.title.includes(searchTerm) || product.category.includes(searchTerm),
  )

  const getStatusColor = (status) => {
    switch (status) {
      case "موجود":
        return "bg-green-100 text-green-700"
      case "ناموجود":
        return "bg-red-100 text-red-700"
      case "کم موجود":
        return "bg-amber-100 text-amber-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id))
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">محصولات</h1>
          <p className="text-gray-500 mt-1">مدیریت محصولات فروشگاه</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link href="/dashboard/admin/products/add">
            <Button className="flex items-center gap-2">
              <Plus size={16} />
              <span>افزودن محصول</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="جستجو در محصولات..."
            className="w-full bg-white border border-gray-200 rounded-lg py-2 pr-10 pl-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Button variant="outline" className="flex items-center gap-2">
          <Filter size={16} />
          <span>فیلتر</span>
        </Button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">محصول</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">دسته‌بندی</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">قیمت</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">موجودی</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">وضعیت</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                          <ImageOff size={16} className="text-gray-400" />
                        </div>
                        <span className="font-medium text-gray-900">{product.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">{product.category}</td>
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">{product.price} تومان</td>
                    <td className="px-4 py-4 text-sm text-gray-600">{product.stock} عدد</td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Link href={`/dashboard/admin/products/${product.id}`}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Eye size={16} className="text-gray-500" />
                          </Button>
                        </Link>
                        <Link href={`/dashboard/admin/products/edit/${product.id}`}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit size={16} className="text-blue-500" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash size={16} className="text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                    هیچ محصولی یافت نشد.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-500">
          نمایش {filteredProducts.length} از {products.length} محصول
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            قبلی
          </Button>
          <Button variant="outline" size="sm" disabled>
            بعدی
          </Button>
        </div>
      </div>
    </div>
  )
}
