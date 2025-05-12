export default function AboutLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="h-10 bg-gray-200 w-64 mx-auto rounded mb-8 animate-pulse"></div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="h-64 bg-gray-200 animate-pulse"></div>

          <div className="p-6">
            <div className="h-4 bg-gray-200 rounded w-full mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse"></div>
              <div className="h-6 bg-gray-200 w-32 mx-auto rounded mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 w-full rounded mb-1 animate-pulse"></div>
              <div className="h-4 bg-gray-200 w-3/4 mx-auto rounded animate-pulse"></div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="h-8 bg-gray-200 w-48 rounded mb-4 animate-pulse"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse"></div>
                <div className="h-6 bg-gray-200 w-32 mx-auto rounded mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 w-24 mx-auto rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="h-8 bg-gray-200 w-48 rounded mb-4 animate-pulse"></div>

          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index}>
                <div className="h-6 bg-gray-200 w-40 rounded mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 w-full rounded mb-1 animate-pulse"></div>
                <div className="h-4 bg-gray-200 w-full rounded mb-1 animate-pulse"></div>
                <div className="h-4 bg-gray-200 w-3/4 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
