export default function FAQLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="h-10 bg-gray-200 w-64 mx-auto rounded mb-8 animate-pulse"></div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="flex overflow-x-auto">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="px-6 py-3 bg-gray-200 animate-pulse mx-1 rounded"
                style={{ width: "100px" }}
              ></div>
            ))}
          </div>

          <div className="p-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="border-b border-gray-200 last:border-b-0 py-4">
                <div className="flex justify-between items-center w-full">
                  <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="h-8 bg-gray-200 rounded w-64 mb-4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-4 animate-pulse"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div className="h-32 bg-gray-200 rounded mb-4 animate-pulse"></div>

          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
