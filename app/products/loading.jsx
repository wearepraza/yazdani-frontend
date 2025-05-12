export default function ProductsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="h-6 w-64 bg-gray-200 rounded-md animate-pulse mb-6"></div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar Skeleton */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="h-6 w-24 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="h-4 w-20 bg-gray-200 rounded-md animate-pulse"></div>
            </div>

            {/* Category Filter Skeleton */}
            <div className="p-4 border-b border-gray-100">
              <div className="h-5 w-20 bg-gray-200 rounded-md animate-pulse mb-3"></div>
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center">
                    <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded-md animate-pulse mr-2"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Brand Filter Skeleton */}
            <div className="p-4 border-b border-gray-100">
              <div className="h-5 w-16 bg-gray-200 rounded-md animate-pulse mb-3"></div>
              <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center">
                    <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-20 bg-gray-200 rounded-md animate-pulse mr-2"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range Filter Skeleton */}
            <div className="p-4">
              <div className="h-5 w-28 bg-gray-200 rounded-md animate-pulse mb-3"></div>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
              <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Products Grid Skeleton */}
        <div className="lg:w-3/4">
          {/* Sort Bar Skeleton */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6 p-4 flex justify-between items-center">
            <div className="h-8 w-48 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="h-4 w-24 bg-gray-200 rounded-md animate-pulse"></div>
          </div>

          {/* Products Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-4">
                  <div className="h-5 w-full bg-gray-200 rounded-md animate-pulse mb-2"></div>
                  <div className="h-5 w-2/3 bg-gray-200 rounded-md animate-pulse mb-4"></div>
                  <div className="flex items-center justify-between">
                    <div className="h-6 w-24 bg-gray-200 rounded-md animate-pulse"></div>
                    <div className="flex gap-1">
                      <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                      <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Skeleton */}
          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
