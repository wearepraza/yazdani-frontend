export default function ProductLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="h-6 w-64 bg-gray-200 rounded-md animate-pulse mb-6"></div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
          {/* Product Images Skeleton */}
          <div className="col-span-1">
            <div className="border border-gray-100 rounded-lg p-4 mb-4">
              <div className="w-full h-[400px] bg-gray-200 rounded-md animate-pulse"></div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((_, index) => (
                <div key={index} className="border border-gray-100 rounded-lg p-2">
                  <div className="w-full h-16 bg-gray-200 rounded-md animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="col-span-1">
            <div className="h-8 w-3/4 bg-gray-200 rounded-md animate-pulse mb-4"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded-md animate-pulse mb-6"></div>

            <div className="border-t border-b border-gray-100 py-4 mb-4">
              <div className="h-4 w-1/3 bg-gray-200 rounded-md animate-pulse mb-3"></div>
              <div className="space-y-2">
                {[1, 2, 3, 4].map((_, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse mt-0.5"></div>
                    <div className="h-4 w-full bg-gray-200 rounded-md animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <div className="h-4 w-1/4 bg-gray-200 rounded-md animate-pulse mb-3"></div>
              <div className="flex items-center gap-2">
                {[1, 2, 3].map((_, index) => (
                  <div key={index} className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <div className="h-4 w-1/3 bg-gray-200 rounded-md animate-pulse mb-3"></div>
              <div className="flex flex-wrap items-center gap-2">
                {[1, 2, 3, 4].map((_, index) => (
                  <div key={index} className="h-10 w-20 bg-gray-200 rounded-lg animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Price and Add to Cart Skeleton */}
          <div className="col-span-1 bg-gray-50 rounded-xl p-6">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="h-4 w-1/4 bg-gray-200 rounded-md animate-pulse"></div>
                <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
              <div className="h-4 w-1/2 bg-gray-200 rounded-md animate-pulse mb-2"></div>
              <div className="h-8 w-2/3 bg-gray-200 rounded-md animate-pulse"></div>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-4 w-full bg-gray-200 rounded-md animate-pulse"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-4 w-2/3 bg-gray-200 rounded-md animate-pulse"></div>
              </div>
            </div>

            <div className="mb-6">
              <div className="h-4 w-1/3 bg-gray-200 rounded-md animate-pulse"></div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="h-12 w-full bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="h-12 w-full bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Description and Specs Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
            <div className="p-6">
              <div className="h-6 w-1/4 bg-gray-200 rounded-md animate-pulse mb-4"></div>
              <div className="border-t border-gray-100 pt-4">
                <div className="h-4 w-full bg-gray-200 rounded-md animate-pulse mb-2"></div>
                <div className="h-4 w-full bg-gray-200 rounded-md animate-pulse mb-2"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded-md animate-pulse mb-6"></div>

                <div className="h-6 w-1/3 bg-gray-200 rounded-md animate-pulse mb-4"></div>
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5, 6].map((_, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse mt-0.5"></div>
                      <div className="h-4 w-full bg-gray-200 rounded-md animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="h-6 w-1/2 bg-gray-200 rounded-md animate-pulse mb-4"></div>
              <div className="border-t border-gray-100 pt-4">
                <div className="space-y-4">
                  {[1, 2, 3].map((_, index) => (
                    <div key={index} className="flex items-center gap-3 p-2">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse"></div>
                      <div className="flex-1">
                        <div className="h-4 w-full bg-gray-200 rounded-md animate-pulse mb-2"></div>
                        <div className="h-4 w-1/2 bg-gray-200 rounded-md animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
