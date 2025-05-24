"use client"
import { Users, ShoppingBag, Package, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"
import Link from "next/link"
import { overviewDashboard } from "@/lib/api/admin/dashboard/overviewDashboard"
import { useEffect, useState } from "react"

export default function AdminDashboardPage() {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        console.log("Fetching dashboard data...")
        const response = await overviewDashboard()
        console.log("Dashboard API Response:", response)
        
        if (response.error) {
          console.error("Dashboard API Error:", response.message)
          setError(response.message)
        } else {
          setDashboardData(response.data)
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err)
        setError("خطا در دریافت اطلاعات داشبورد")
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return <div className="text-center py-8">در حال بارگذاری...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">داشبورد مدیریت</h1>
          <p className="text-gray-500 mt-1">خلاصه وضعیت فروشگاه و آمار کلیدی</p>
        </div>
        <div className="mt-4 md:mt-0">
          <span className="text-sm text-gray-500">آخرین بروزرسانی: {new Date().toLocaleTimeString('fa-IR')}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">فروش امروز</p>
              <p className="text-2xl font-bold mt-1">{dashboardData?.today_sales?.toLocaleString('fa-IR')} تومان</p>
              <div className="flex items-center mt-2 text-gray-500 text-sm">
                <span>بدون تغییر نسبت به دیروز</span>
              </div>
            </div>
            <div className="bg-blue-50 p-2 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">سفارش‌های جدید</p>
              <p className="text-2xl font-bold mt-1">{dashboardData?.new_orders_today}</p>
              <div className="flex items-center mt-2 text-gray-500 text-sm">
                <span>سفارش امروز</span>
              </div>
            </div>
            <div className="bg-green-50 p-2 rounded-lg">
              <Package className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">محصولات</p>
              <p className="text-2xl font-bold mt-1">{dashboardData?.total_products}</p>
              <div className="flex items-center mt-2 text-gray-500 text-sm">
                <span>{dashboardData?.low_stock_products} محصول کم‌موجود</span>
              </div>
            </div>
            <div className="bg-purple-50 p-2 rounded-lg">
              <ShoppingBag className="h-6 w-6 text-purple-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">کاربران جدید</p>
              <p className="text-2xl font-bold mt-1">{dashboardData?.new_users_today}</p>
              <div className="flex items-center mt-2 text-gray-500 text-sm">
                <span>کاربر امروز</span>
              </div>
            </div>
            <div className="bg-amber-50 p-2 rounded-lg">
              <Users className="h-6 w-6 text-amber-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">سفارش‌های اخیر</h2>
          <Link
            href="/dashboard/admin/orders"
            className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
          >
            <span>مشاهده همه</span>
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">شناسه</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">مشتری</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">محصول</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">مبلغ</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">وضعیت</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">تاریخ</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData?.recent_orders?.map((order) => (
                  <tr key={order.order_number} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{order.order_number}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{order.user_name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{order.product_name}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{order.total_amount?.toLocaleString('fa-IR')} تومان</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === 'completed' ? 'bg-green-100 text-green-700' :
                        order.status === 'processing' ? 'bg-amber-100 text-amber-700' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {order.status === 'completed' ? 'تکمیل شده' :
                         order.status === 'processing' ? 'در حال پردازش' :
                         order.status === 'shipped' ? 'ارسال شده' :
                         'لغو شده'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{order.created_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recent Users */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">کاربران جدید</h2>
          <Link
            href="/dashboard/admin/users"
            className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
          >
            <span>مشاهده همه</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {dashboardData?.new_users?.map((user, index) => (
            <div key={index} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full ${
                  index % 4 === 0 ? 'bg-blue-100' :
                  index % 4 === 1 ? 'bg-purple-100' :
                  index % 4 === 2 ? 'bg-green-100' :
                  'bg-amber-100'
                } flex items-center justify-center`}>
                  <span className={`font-bold ${
                    index % 4 === 0 ? 'text-blue-600' :
                    index % 4 === 1 ? 'text-purple-600' :
                    index % 4 === 2 ? 'text-green-600' :
                    'text-amber-600'
                  }`}>{`${user.name.charAt(0)}`}</span>
                </div>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500">عضویت: {user.registered_at.replace('days ago', 'روز پیش')}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
