import { Users, ShoppingBag, Package, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"
import Link from "next/link"

export default function AdminDashboardPage() {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">داشبورد مدیریت</h1>
          <p className="text-gray-500 mt-1">خلاصه وضعیت فروشگاه و آمار کلیدی</p>
        </div>
        <div className="mt-4 md:mt-0">
          <span className="text-sm text-gray-500">آخرین بروزرسانی: امروز ۱۴:۳۰</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">فروش امروز</p>
              <p className="text-2xl font-bold mt-1">۱۲,۵۰۰,۰۰۰ تومان</p>
              <div className="flex items-center mt-2 text-green-600 text-sm">
                <ArrowUpRight size={14} className="mr-1" />
                <span>۱۵٪ افزایش</span>
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
              <p className="text-2xl font-bold mt-1">۲۴</p>
              <div className="flex items-center mt-2 text-green-600 text-sm">
                <ArrowUpRight size={14} className="mr-1" />
                <span>۸٪ افزایش</span>
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
              <p className="text-2xl font-bold mt-1">۱۵۶</p>
              <div className="flex items-center mt-2 text-gray-500 text-sm">
                <span>۱۲ محصول کم‌موجود</span>
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
              <p className="text-2xl font-bold mt-1">۱۸</p>
              <div className="flex items-center mt-2 text-red-600 text-sm">
                <ArrowDownRight size={14} className="mr-1" />
                <span>۳٪ کاهش</span>
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
                <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">#۱۲۳۴۵</td>
                  <td className="px-4 py-3 text-sm text-gray-600">علی محمدی</td>
                  <td className="px-4 py-3 text-sm text-gray-600">گوشی موبایل سامسونگ</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">۱۲,۵۰۰,۰۰۰ تومان</td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      تکمیل شده
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">۱۴۰۲/۰۸/۱۵</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">#۱۲۳۴۶</td>
                  <td className="px-4 py-3 text-sm text-gray-600">مریم احمدی</td>
                  <td className="px-4 py-3 text-sm text-gray-600">لپ تاپ ایسوس</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">۳۵,۸۰۰,۰۰۰ تومان</td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                      در حال پردازش
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">۱۴۰۲/۰۸/۱۵</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">#۱۲۳۴۷</td>
                  <td className="px-4 py-3 text-sm text-gray-600">رضا کریمی</td>
                  <td className="px-4 py-3 text-sm text-gray-600">هدفون بی سیم</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">۲,۸۰۰,۰۰۰ تومان</td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                      ارسال شده
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">۱۴۰۲/۰۸/۱۴</td>
                </tr>
                <tr className="border-b-0 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">#۱۲۳۴۸</td>
                  <td className="px-4 py-3 text-sm text-gray-600">سارا حسینی</td>
                  <td className="px-4 py-3 text-sm text-gray-600">ساعت هوشمند</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">۴,۵۰۰,۰۰۰ تومان</td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                      لغو شده
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">۱۴۰۲/۰۸/۱۴</td>
                </tr>
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
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-bold">ع</span>
              </div>
              <div>
                <p className="font-medium">علی محمدی</p>
                <p className="text-sm text-gray-500">عضویت: امروز</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <span className="text-purple-600 font-bold">م</span>
              </div>
              <div>
                <p className="font-medium">مریم احمدی</p>
                <p className="text-sm text-gray-500">عضویت: امروز</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600 font-bold">ر</span>
              </div>
              <div>
                <p className="font-medium">رضا کریمی</p>
                <p className="text-sm text-gray-500">عضویت: دیروز</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                <span className="text-amber-600 font-bold">س</span>
              </div>
              <div>
                <p className="font-medium">سارا حسینی</p>
                <p className="text-sm text-gray-500">عضویت: دیروز</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
