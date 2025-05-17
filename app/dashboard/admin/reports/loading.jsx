export default function ReportsLoading() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="h-8 w-40 bg-gray-200 rounded animate-pulse mb-2"></div>
        <div className="h-5 w-64 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-36 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="h-12 w-12 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Sales Data Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <div className="space-y-6">
              {[...Array(2)].map((_, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div
                      className="bg-gray-200 h-2.5 rounded-full animate-pulse"
                      style={{ width: `${[75, 40, 60, 20, 30, 50][index]}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6 gap-3">
            <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <div className="space-y-6">
              {[...Array(2)].map((_, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <div className="h-5 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Skeleton */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="h-6 w-36 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                {[...Array(5)].map((_, index) => (
                  <th key={index} className="py-3 px-6 text-right">
                    <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[...Array(3)].map((_, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  {[...Array(5)].map((_, colIndex) => (
                    <td key={colIndex} className="py-4 px-6">
                      <div className="h-5 w-28 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
