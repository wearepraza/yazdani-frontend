"use client"

import { useState } from "react"
import { Search, Filter, Eye, Mail, Phone, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Sample users data
const sampleUsers = [
  {
    id: 1,
    name: "علی محمدی",
    email: "ali@example.com",
    phone: "۰۹۱۲۳۴۵۶۷۸۹",
    registerDate: "۱۴۰۲/۰۸/۱۵",
    orders: 5,
    status: "فعال",
  },
  {
    id: 2,
    name: "مریم احمدی",
    email: "maryam@example.com",
    phone: "۰۹۱۲۳۴۵۶۷۸۹",
    registerDate: "۱۴۰۲/۰۸/۱۰",
    orders: 2,
    status: "فعال",
  },
  {
    id: 3,
    name: "رضا کریمی",
    email: "reza@example.com",
    phone: "۰۹۱۲۳۴۵۶۷۸۹",
    registerDate: "۱۴۰۲/۰۷/۲۵",
    orders: 0,
    status: "غیرفعال",
  },
  {
    id: 4,
    name: "سارا حسینی",
    email: "sara@example.com",
    phone: "۰۹۱۲۳۴۵۶۷۸۹",
    registerDate: "۱۴۰۲/۰۷/۱۸",
    orders: 3,
    status: "فعال",
  },
  {
    id: 5,
    name: "محمد رضایی",
    email: "mohammad@example.com",
    phone: "۰۹۱۲۳۴۵۶۷۸۹",
    registerDate: "۱۴۰۲/۰۷/۰۵",
    orders: 1,
    status: "فعال",
  },
]

export default function UsersPage() {
  const [users, setUsers] = useState(sampleUsers)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUsers = users.filter(
    (user) => user.name.includes(searchTerm) || user.email.includes(searchTerm) || user.phone.includes(searchTerm),
  )

  const getStatusColor = (status) => {
    switch (status) {
      case "فعال":
        return "bg-green-100 text-green-700"
      case "غیرفعال":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">کاربران</h1>
          <p className="text-gray-500 mt-1">مدیریت کاربران فروشگاه</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="جستجو در کاربران..."
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

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">کاربر</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">ایمیل</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">شماره موبایل</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">تاریخ عضویت</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">سفارش‌ها</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">وضعیت</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-bold">{user.name.charAt(0)}</span>
                        </div>
                        <span className="font-medium text-gray-900">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Mail size={14} className="text-gray-400" />
                        <span>{user.email}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Phone size={14} className="text-gray-400" />
                        <span>{user.phone}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} className="text-gray-400" />
                        <span>{user.registerDate}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">{user.orders} سفارش</td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Link href={`/dashboard/admin/users/${user.id}`}>
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
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                    هیچ کاربری یافت نشد.
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
          نمایش {filteredUsers.length} از {users.length} کاربر
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
