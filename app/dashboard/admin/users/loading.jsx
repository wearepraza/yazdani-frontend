export default function Loading() {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-48 bg-gray-200 rounded mt-1 animate-pulse"></div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <div className="w-full h-10 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
        <div className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {[...Array(5)].map((_, i) => (
                  <th key={i} className="px-4 py-3">
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(3)].map((_, rowIndex) => (
                <tr key={rowIndex} className="border-b border-gray-100">
                  {[...Array(5)].map((_, colIndex) => (
                    <td key={colIndex} className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        {colIndex === 0 && (
                          <>
                            <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
                            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                          </>
                        )}
                        {colIndex !== 0 && (
                          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between items-center mt-6">
        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
