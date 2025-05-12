export default function CreditCardsAdminLoading() {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <div className="h-8 w-48 bg-gray-200 rounded-md animate-pulse mb-2"></div>
          <div className="h-5 w-72 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
        <div className="mt-4 md:mt-0">
          <div className="h-10 w-36 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="h-10 w-full bg-gray-200 rounded-md animate-pulse"></div>
        </div>
        <div className="h-10 w-24 bg-gray-200 rounded-md animate-pulse"></div>
      </div>

      {/* Credit Cards Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">عنوان</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">قیمت</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">سقف اعتبار</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">مدت اعتبار</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">تعداد فروش</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">وضعیت</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(4)].map((_, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                      <div className="h-5 w-32 bg-gray-200 rounded-md animate-pulse"></div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-5 w-24 bg-gray-200 rounded-md animate-pulse"></div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-5 w-28 bg-gray-200 rounded-md animate-pulse"></div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-5 w-16 bg-gray-200 rounded-md animate-pulse"></div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-5 w-12 bg-gray-200 rounded-md animate-pulse"></div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 bg-gray-200 rounded-md animate-pulse"></div>
                      <div className="h-8 w-8 bg-gray-200 rounded-md animate-pulse"></div>
                      <div className="h-8 w-8 bg-gray-200 rounded-md animate-pulse"></div>
                    </div>
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
