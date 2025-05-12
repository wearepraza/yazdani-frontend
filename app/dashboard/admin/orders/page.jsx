"use client"

import { useState } from "react"
import { Search, Filter, Eye, Calendar, User, Package, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Sample orders data
const sampleOrders = [
  {
    id: "ORD-12345",
    customer: "علی محمدی",
    date: "۱۴۰۲/۰۸/۱۵",
    total: "۱۲,۵۰۰,۰۰۰",
    items: 2,
    status: "تکمیل شده",
    paymentStatus: "پرداخت شده",
  },
  {
    id: "ORD-12346",
    customer: "مریم احمدی",
    date: "۱۴۰۲/۰۸/۱۵",
    total: "۳۵,۸۰۰,۰۰۰",
    items: 1,
    status: "در حال پردازش",
    paymentStatus: "پرداخت شده",
  },
  {
    id: "ORD-12347",
    customer: "رضا کریمی",
    date: "۱۴۰۲/۰۸/۱۴",
    total: "۲,۸۰۰,۰۰۰",
    items: 1,
    status: "ارسال شده",
    paymentStatus: "پرداخت شده",
  },
  {
    id: "ORD-12348",
    customer: "سارا حسینی",
    date: "۱۴۰۲/۰۸/۱۴",
    total: "۴,۵۰۰,۰۰۰",
    items: 1,
    status: "لغو شده",
    paymentStatus: "بازگشت وجه",
  },
  {
    id: "ORD-12349",
    customer: "محمد رضایی",
    date: "۱۴۰۲/۰۸/۱۳",
    total: "۸,۹۰۰,۰۰۰",
    items: 3,
    status: "تحویل داده شده",
    paymentStatus: "پرداخت شده",
  },
]

export default function OrdersPage() {
  const [orders, setOrders] = useState(sampleOrders)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredOrders = orders.filter((order) => order.id.includes(searchTerm) || order.customer.includes(searchTerm))

  const getStatusColor = (status) => {
    switch (status) {
      case "تکمیل شده":
      case "تحویل داده شده":
        return "bg-green-100 text-green-700"
      case "در حال پردازش":
        return "bg-amber-100 text-amber-700"
      case "ارسال شده":
        return "bg-blue-100 text-blue-700"
      case "لغو شده":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "پرداخت شده":
        return "bg-green-100 text-green-700"
      case "در انتظار پرداخت":
        return "bg-amber-100 text-amber-700"
      case "بازگشت وجه":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">سفارش‌ها</h1>
          <p className="text-gray-500 mt-1">مدیریت سفارش‌های فروشگاه</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="جستجو در سفارش‌ها..."
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

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">شناسه</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">مشتری</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">تاریخ</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">مبلغ کل</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">تعداد اقلام</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">وضعیت سفارش</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">وضعیت پرداخت</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <User size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-600">{order.customer}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-600">{order.date}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <CreditCard size={14} className="text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">{order.total} تومان</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Package size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-600">{order.items} محصول</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Link href={`/dashboard/admin/orders/${order.id}`}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Eye size={16} className="text-gray-500" />
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                    هیچ سفارشی یافت نشد.
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
          نمایش {filteredOrders.length} از {orders.length} سفارش
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
