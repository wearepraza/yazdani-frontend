import { BarChart3, Users, ShoppingBag, CreditCard, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"

export default function ReportsPage() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">گزارش‌ها</h1>
        <p className="text-gray-500">آمار و اطلاعات کلی فروشگاه</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">کل فروش</p>
              <h3 className="text-2xl font-bold">۱,۲۵۶,۰۰۰,۰۰۰</h3>
              <div className="flex items-center mt-2 text-green-500 text-sm">
                <ArrowUpRight size={16} className="mr-1" />
                <span>۱۲.۵٪ نسبت به ماه قبل</span>
              </div>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">تعداد کاربران</p>
              <h3 className="text-2xl font-bold">۲,۵۶۷</h3>
              <div className="flex items-center mt-2 text-green-500 text-sm">
                <ArrowUpRight size={16} className="mr-1" />
                <span>۸.۳٪ نسبت به ماه قبل</span>
              </div>
            </div>
            <div className="bg-amber-500/10 p-3 rounded-lg">
              <Users className="h-6 w-6 text-amber-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">تعداد سفارشات</p>
              <h3 className="text-2xl font-bold">۹۸۷</h3>
              <div className="flex items-center mt-2 text-red-500 text-sm">
                <ArrowDownRight size={16} className="mr-1" />
                <span>۳.۲٪ نسبت به ماه قبل</span>
              </div>
            </div>
            <div className="bg-green-500/10 p-3 rounded-lg">
              <ShoppingBag className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">میانگین سفارش</p>
              <h3 className="text-2xl font-bold">۱,۲۷۵,۰۰۰</h3>
              <div className="flex items-center mt-2 text-green-500 text-sm">
                <ArrowUpRight size={16} className="mr-1" />
                <span>۵.۷٪ نسبت به ماه قبل</span>
              </div>
            </div>
            <div className="bg-purple-500/10 p-3 rounded-lg">
              <CreditCard className="h-6 w-6 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Sales Data */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">فروش ماهانه</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">سال ۱۴۰۲</span>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <div className="space-y-4">
              {[
                { month: "فروردین", amount: "۸۵,۰۰۰,۰۰۰", percentage: 40 },
                { month: "اردیبهشت", amount: "۱۱۰,۰۰۰,۰۰۰", percentage: 55 },
                { month: "خرداد", amount: "۹۵,۰۰۰,۰۰۰", percentage: 48 },
                { month: "تیر", amount: "۱۲۵,۰۰۰,۰۰۰", percentage: 62 },
                { month: "مرداد", amount: "۱۴۰,۰۰۰,۰۰۰", percentage: 70 },
                { month: "شهریور", amount: "۱۶۰,۰۰۰,۰۰۰", percentage: 80 },
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{item.month}</span>
                    <span className="text-sm text-gray-500">{item.amount} تومان</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">محصولات پرفروش</h2>
            <div className="flex items-center gap-1 text-primary text-sm">
              <span>مشاهده همه</span>
              <TrendingUp size={16} />
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <div className="space-y-6">
              {[
                {
                  name: "گوشی موبایل سامسونگ گلکسی S23",
                  count: 87,
                  amount: "۳۹۱,۵۰۰,۰۰۰",
                },
                {
                  name: "لپ تاپ اپل مک‌بوک پرو",
                  count: 64,
                  amount: "۵۴۴,۰۰۰,۰۰۰",
                },
                {
                  name: "هدفون بی‌سیم سونی",
                  count: 52,
                  amount: "۶۲,۴۰۰,۰۰۰",
                },
                {
                  name: "ساعت هوشمند اپل واچ",
                  count: 45,
                  amount: "۱۰۱,۲۵۰,۰۰۰",
                },
                {
                  name: "تبلت سامسونگ گلکسی تب",
                  count: 38,
                  amount: "۷۰,۳۰۰,۰۰۰",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{item.count} فروش</p>
                  </div>
                  <div className="text-sm font-medium">{item.amount}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">سفارشات اخیر</h2>
            <div className="flex items-center gap-1 text-primary text-sm">
              <span>مشاهده همه</span>
              <TrendingUp size={16} />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="py-3 px-6 text-right">شماره سفارش</th>
                <th className="py-3 px-6 text-right">مشتری</th>
                <th className="py-3 px-6 text-right">محصول</th>
                <th className="py-3 px-6 text-right">تاریخ</th>
                <th className="py-3 px-6 text-right">مبلغ</th>
                <th className="py-3 px-6 text-right">وضعیت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                {
                  id: "#ORD-71267",
                  customer: "علی محمدی",
                  product: "گوشی موبایل سامسونگ گلکسی S23",
                  date: "۱۴۰۲/۰۶/۱۵",
                  amount: "۴۵,۹۰۰,۰۰۰",
                  status: "تکمیل شده",
                  statusColor: "bg-green-500",
                },
                {
                  id: "#ORD-71268",
                  customer: "مریم احمدی",
                  product: "لپ تاپ اپل مک‌بوک پرو",
                  date: "۱۴۰۲/۰۶/۱۴",
                  amount: "۸۵,۵۰۰,۰۰۰",
                  status: "در حال پردازش",
                  statusColor: "bg-amber-500",
                },
                {
                  id: "#ORD-71269",
                  customer: "رضا کریمی",
                  product: "هدفون بی‌سیم سونی",
                  date: "۱۴۰۲/۰۶/۱۴",
                  amount: "۱۲,۸۰۰,۰۰۰",
                  status: "تکمیل شده",
                  statusColor: "bg-green-500",
                },
                {
                  id: "#ORD-71270",
                  customer: "سارا حسینی",
                  product: "ساعت هوشمند اپل واچ",
                  date: "۱۴۰۲/۰۶/۱۳",
                  amount: "۲۲,۵۰۰,۰۰۰",
                  status: "در حال ارسال",
                  statusColor: "bg-blue-500",
                },
                {
                  id: "#ORD-71271",
                  customer: "محمد رضایی",
                  product: "تبلت سامسونگ گلکسی تب",
                  date: "۱۴۰۲/۰۶/۱۲",
                  amount: "۱۸,۵۰۰,۰۰۰",
                  status: "لغو شده",
                  statusColor: "bg-red-500",
                },
              ].map((order, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-4 px-6 font-medium">{order.id}</td>
                  <td className="py-4 px-6">{order.customer}</td>
                  <td className="py-4 px-6">{order.product}</td>
                  <td className="py-4 px-6">{order.date}</td>
                  <td className="py-4 px-6">{order.amount} تومان</td>
                  <td className="py-4 px-6">
                    <span className="flex items-center">
                      <span className={`w-2 h-2 rounded-full ${order.statusColor} mr-2`}></span>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
