import { ShoppingBag, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function OrdersPage() {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">سفارش‌ها</h1>
          <p className="text-gray-500 mt-1">لیست سفارش‌های شما در این بخش نمایش داده می‌شود.</p>
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
          />
        </div>

        <Button variant="outline" className="flex items-center gap-2">
          <Filter size={16} />
          <span>فیلتر</span>
        </Button>
      </div>

      {/* Empty State */}
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
  )
}
