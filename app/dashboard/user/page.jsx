import Link from "next/link"
import { Package, CreditCard, Award, Bell, ChevronLeft, ShoppingBag, Truck, CheckCircle, Clock } from "lucide-react"

export default function DashboardPage() {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">داشبورد</h1>
          <p className="text-gray-500 mt-1">به پنل کاربری خود خوش آمدید!</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link
            href="/dashboard/user/account"
            className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
          >
            <span>تکمیل اطلاعات پروفایل</span>
            <ChevronLeft size={16} />
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">سفارش‌های من</p>
              <p className="text-2xl font-bold mt-1">0</p>
            </div>
            <div className="bg-blue-50 p-2 rounded-lg">
              <Package className="h-6 w-6 text-blue-500" />
            </div>
          </div>
          <div className="mt-4">
            <Link
              href="/dashboard/user/orders"
              className="text-sm text-blue-500 hover:text-blue-600 transition-colors flex items-center gap-1"
            >
              <span>مشاهده همه</span>
              <ChevronLeft size={14} />
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">تراکنش‌های من</p>
              <p className="text-2xl font-bold mt-1">0</p>
            </div>
            <div className="bg-green-50 p-2 rounded-lg">
              <CreditCard className="h-6 w-6 text-green-500" />
            </div>
          </div>
          <div className="mt-4">
            <Link
              href="/dashboard/user/transactions"
              className="text-sm text-green-500 hover:text-green-600 transition-colors flex items-center gap-1"
            >
              <span>مشاهده همه</span>
              <ChevronLeft size={14} />
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">امتیاز باشگاه مشتریان</p>
              <p className="text-2xl font-bold mt-1">0</p>
            </div>
            <div className="bg-purple-50 p-2 rounded-lg">
              <Award className="h-6 w-6 text-purple-500" />
            </div>
          </div>
          <div className="mt-4">
            <Link
              href="/dashboard/user/club"
              className="text-sm text-purple-500 hover:text-purple-600 transition-colors flex items-center gap-1"
            >
              <span>مشاهده جزئیات</span>
              <ChevronLeft size={14} />
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">پیام‌های جدید</p>
              <p className="text-2xl font-bold mt-1">3</p>
            </div>
            <div className="bg-amber-50 p-2 rounded-lg">
              <Bell className="h-6 w-6 text-amber-500" />
            </div>
          </div>
          <div className="mt-4">
            <Link
              href="/dashboard/user/messages"
              className="text-sm text-amber-500 hover:text-amber-600 transition-colors flex items-center gap-1"
            >
              <span>مشاهده همه</span>
              <ChevronLeft size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">سفارش‌های اخیر</h2>
          <Link
            href="/dashboard/user/orders"
            className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
          >
            <span>مشاهده همه</span>
            <ChevronLeft size={14} />
          </Link>
        </div>

        <div className="bg-gray-50 rounded-xl p-8 border border-gray-100 flex flex-col items-center justify-center text-center">
          <div className="bg-white p-4 rounded-full mb-3 shadow-sm">
            <ShoppingBag className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium mb-2">هنوز سفارشی ثبت نکرده‌اید</h3>
          <p className="text-gray-500 mb-4 max-w-md">
            با ثبت اولین سفارش خود، می‌توانید از امکانات باشگاه مشتریان بهره‌مند شوید.
          </p>
          <Link href="#" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
            مشاهده محصولات
          </Link>
        </div>
      </div>

      {/* Order Status */}
      <div>
        <h2 className="text-lg font-bold mb-4">وضعیت سفارش‌ها</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 p-2 rounded-lg">
                <ShoppingBag className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">در انتظار پرداخت</p>
                <p className="text-lg font-bold mt-0.5">0</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="bg-amber-50 p-2 rounded-lg">
                <Clock className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">در حال پردازش</p>
                <p className="text-lg font-bold mt-0.5">0</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="bg-green-50 p-2 rounded-lg">
                <Truck className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">در حال ارسال</p>
                <p className="text-lg font-bold mt-0.5">0</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="bg-purple-50 p-2 rounded-lg">
                <CheckCircle className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">تحویل شده</p>
                <p className="text-lg font-bold mt-0.5">0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
