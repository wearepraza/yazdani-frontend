"use client"

import { BarChart3, Users, ShoppingBag, CreditCard, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { summuryReports } from "@/lib/api/admin/reports/summuryReports"
import { topProductsReports } from "@/lib/api/admin/reports/topProductsReports"
import { getTimelineReports } from "@/lib/api/admin/reports/timelineReports"
import { useEffect, useState } from "react"
import ReportsLoading from "./loading"

export default function ReportsPage() {
  const [summaryData, setSummaryData] = useState({
    total_sales: 0,
    sales_growth: 0,
    total_users: 0,
    users_growth: 0,
    total_orders: 0,
    orders_growth: 0,
    average_order: 0,
    average_order_growth: 0,
    recent_orders: []
  });
  const [topProducts, setTopProducts] = useState([]);
  const [timelineData, setTimelineData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Fetch summary data
        const summaryResponse = await summuryReports();
        console.log('Summary Reports Response:', summaryResponse);
        if (summaryResponse?.data) {
          setSummaryData(summaryResponse.data);
        }

        // Fetch top products
        const topProductsResponse = await topProductsReports();
        console.log('Top Products Response:', topProductsResponse);
        if (topProductsResponse?.data) {
          setTopProducts(topProductsResponse.data.top_products);
        }

        // Fetch timeline data
        const timelineResponse = await getTimelineReports('monthly');
        console.log('Timeline Response:', timelineResponse);
        if (timelineResponse?.data) {
          setTimelineData(timelineResponse.data);
        }
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <ReportsLoading />
  }

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
              <h3 className="text-2xl font-bold">{summaryData?.total_revenue || '۰'} تومان</h3>
              <div className="flex items-center mt-2 text-green-500 text-sm">
                <ArrowUpRight size={16} className="mr-1" />
                <span>{summaryData?.sales_growth || '۰'}٪ نسبت به ماه قبل</span>
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
              <h3 className="text-2xl font-bold">{summaryData?.total_users || '۰'}</h3>
              <div className="flex items-center mt-2 text-green-500 text-sm">
                <ArrowUpRight size={16} className="mr-1" />
                <span>{summaryData?.users_growth || '۰'}٪ نسبت به ماه قبل</span>
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
              <h3 className="text-2xl font-bold">{summaryData?.total_orders || '۰'}</h3>
              <div className="flex items-center mt-2 text-red-500 text-sm">
                <ArrowDownRight size={16} className="mr-1" />
                <span>{summaryData?.orders_growth || '۰'}٪ نسبت به ماه قبل</span>
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
              <h3 className="text-2xl font-bold">{summaryData?.average_order_value || '۰'} تومان</h3>
              <div className="flex items-center mt-2 text-green-500 text-sm">
                <ArrowUpRight size={16} className="mr-1" />
                <span>{summaryData?.average_order_growth || '۰'}٪ نسبت به ماه قبل</span>
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
              {timelineData && timelineData.length > 0 ? (
                timelineData.map((item, index) => {
                  // Skip items with null period
                  if (!item.period) return null;
                  
                  // Format the period to show month name
                  const [year, month] = item.period.split('-');
                  const date = new Date(year, month - 1);
                  const monthName = date.toLocaleDateString('fa-IR', { month: 'long' });
                  
                  // Calculate percentage based on revenue
                  const revenue = parseInt(item.revenue) || 0;
                  const percentage = Math.min((revenue / 1000000) * 100, 100); // Assuming 1M is max for 100%
                  
                  return (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{monthName}</span>
                        <span className="text-sm text-gray-500">{revenue.toLocaleString('fa-IR')} تومان</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5">
                        <div 
                          className="bg-primary h-2.5 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      {/* <div className="flex justify-between mt-1 text-xs text-gray-500">
                        <span>{item.orders} سفارش</span>
                        <span>{item.new_users} کاربر جدید</span>
                      </div> */}
                    </div>
                  );
                }).filter(Boolean) // Remove null items
              ) : (
                <p className="text-center text-gray-500">هنوز سفارشی ثبت نشده </p>
              )}
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
              {topProducts && topProducts.length > 0 ? (
                topProducts.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-sm">{item.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">{item.total_sales} فروش</p>
                    </div>
                    <div className="text-sm font-medium">{parseInt(item.total_revenue).toLocaleString('fa-IR')} تومان</div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 text-sm">هنوز سفارشی ثبت نشده </p>
              )}
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
              {summaryData?.recent_orders && summaryData.recent_orders.length > 0 ? (
                summaryData.recent_orders.map((order, index) => (
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
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-4 px-6 text-center text-gray-500">
                  <p className="text-center text-gray-500">هنوز سفارشی ثبت نشده </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
