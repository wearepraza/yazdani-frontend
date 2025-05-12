export default function CartLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="h-8 w-48 bg-gray-200 rounded-md animate-pulse mb-8"></div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="hidden md:grid grid-cols-12 bg-gray-50 p-4 border-b">
              <div className="col-span-6 h-6 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="col-span-2 h-6 bg-gray-200 rounded-md animate-pulse mx-auto w-20"></div>
              <div className="col-span-2 h-6 bg-gray-200 rounded-md animate-pulse mx-auto w-20"></div>
              <div className="col-span-2 h-6 bg-gray-200 rounded-md animate-pulse mx-auto w-20"></div>
            </div>

            {[1, 2, 3].map((item) => (
              <div key={item} className="border-b last:border-b-0 p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="col-span-1 md:col-span-6">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-gray-200 rounded-lg animate-pulse"></div>
                      <div className="flex-1">
                        <div className="h-5 bg-gray-200 rounded-md animate-pulse mb-2 w-full"></div>
                        <div className="h-4 bg-gray-200 rounded-md animate-pulse mb-1 w-1/2"></div>
                        <div className="h-4 bg-gray-200 rounded-md animate-pulse w-2/3"></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1 md:col-span-2 flex justify-center">
                    <div className="h-5 bg-gray-200 rounded-md animate-pulse w-20"></div>
                  </div>
                  <div className="col-span-1 md:col-span-2 flex justify-center">
                    <div className="h-8 bg-gray-200 rounded-md animate-pulse w-24"></div>
                  </div>
                  <div className="col-span-1 md:col-span-2 flex justify-center">
                    <div className="h-5 bg-gray-200 rounded-md animate-pulse w-24"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="h-6 bg-gray-200 rounded-md animate-pulse mb-6 w-32"></div>

            <div className="space-y-4 mb-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex justify-between">
                  <div className="h-5 bg-gray-200 rounded-md animate-pulse w-24"></div>
                  <div className="h-5 bg-gray-200 rounded-md animate-pulse w-20"></div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between items-center">
                <div className="h-6 bg-gray-200 rounded-md animate-pulse w-32"></div>
                <div className="h-6 bg-gray-200 rounded-md animate-pulse w-24"></div>
              </div>
            </div>

            <div className="h-12 bg-gray-200 rounded-lg animate-pulse mb-4"></div>
            <div className="h-5 bg-gray-200 rounded-md animate-pulse w-24 mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
