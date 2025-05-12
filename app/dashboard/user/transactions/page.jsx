"use client"

import { useState } from "react"
import { Search, Filter, Download, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { transactions } from "@/lib/sample-data"

export default function TransactionsPage() {
  const [sortField, setSortField] = useState("date")
  const [sortDirection, setSortDirection] = useState("desc")
  const [searchTerm, setSearchTerm] = useState("")

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const filteredTransactions = transactions.filter(
    (transaction) => transaction.productName.includes(searchTerm) || transaction.id.includes(searchTerm),
  )

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortDirection === "asc") {
      return a[sortField] > b[sortField] ? 1 : -1
    } else {
      return a[sortField] < b[sortField] ? 1 : -1
    }
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "موفق":
        return "bg-green-100 text-green-700"
      case "ناموفق":
        return "bg-red-100 text-red-700"
      case "در انتظار":
        return "bg-amber-100 text-amber-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">تراکنش‌ها</h1>
          <p className="text-gray-500 mt-1">تاریخچه تراکنش‌های مالی شما در این بخش نمایش داده می‌شود.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} />
            <span>دانلود گزارش</span>
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="جستجو در تراکنش‌ها..."
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

      {/* Transactions Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th
                  className="px-4 py-3 text-right text-sm font-medium text-gray-500 cursor-pointer"
                  onClick={() => handleSort("id")}
                >
                  <div className="flex items-center">
                    <span>شناسه</span>
                    {sortField === "id" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp size={16} className="mr-1" />
                      ) : (
                        <ChevronDown size={16} className="mr-1" />
                      ))}
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-right text-sm font-medium text-gray-500 cursor-pointer"
                  onClick={() => handleSort("date")}
                >
                  <div className="flex items-center">
                    <span>تاریخ</span>
                    {sortField === "date" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp size={16} className="mr-1" />
                      ) : (
                        <ChevronDown size={16} className="mr-1" />
                      ))}
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-right text-sm font-medium text-gray-500 cursor-pointer"
                  onClick={() => handleSort("productName")}
                >
                  <div className="flex items-center">
                    <span>نام محصول</span>
                    {sortField === "productName" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp size={16} className="mr-1" />
                      ) : (
                        <ChevronDown size={16} className="mr-1" />
                      ))}
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-right text-sm font-medium text-gray-500 cursor-pointer"
                  onClick={() => handleSort("price")}
                >
                  <div className="flex items-center">
                    <span>مبلغ (تومان)</span>
                    {sortField === "price" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp size={16} className="mr-1" />
                      ) : (
                        <ChevronDown size={16} className="mr-1" />
                      ))}
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-right text-sm font-medium text-gray-500 cursor-pointer"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center">
                    <span>وضعیت</span>
                    {sortField === "status" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp size={16} className="mr-1" />
                      ) : (
                        <ChevronDown size={16} className="mr-1" />
                      ))}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedTransactions.length > 0 ? (
                sortedTransactions.map((transaction, index) => (
                  <tr
                    key={transaction.id}
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      index === sortedTransactions.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">{transaction.id}</td>
                    <td className="px-4 py-4 text-sm text-gray-600">{transaction.date}</td>
                    <td className="px-4 py-4 text-sm text-gray-600">{transaction.productName}</td>
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">{transaction.price}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                    هیچ تراکنشی یافت نشد.
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
          نمایش {sortedTransactions.length} از {transactions.length} تراکنش
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
