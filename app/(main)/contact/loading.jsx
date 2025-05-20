export default function ContactLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
 <div className="bg-white rounded-lg shadow-md p-6  mb-8  ">
          <div className="h-8 bg-gray-200 w-48 rounded mb-6 animate-pulse"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-b md:border-b-0 md:border-l border-gray-200 pb-4 md:pb-0 md:pl-4">
              <div className="h-6 bg-gray-200 w-40 rounded mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 w-full rounded mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 w-3/4 rounded animate-pulse"></div>
            </div>

            <div className="pt-4 md:pt-0 md:pr-4">
              <div className="h-6 bg-gray-200 w-40 rounded mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 w-full rounded mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 w-3/4 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
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
          <div className="h-8 bg-gray-200 w-64 rounded mb-6 animate-pulse"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="h-5 bg-gray-200 w-40 rounded mb-2 animate-pulse"></div>
              <div className="h-10 bg-gray-200 w-full rounded animate-pulse"></div>
            </div>

            <div>
              <div className="h-5 bg-gray-200 w-40 rounded mb-2 animate-pulse"></div>
              <div className="h-10 bg-gray-200 w-full rounded animate-pulse"></div>
            </div>
          </div>

          <div className="mb-6">
            <div className="h-5 bg-gray-200 w-40 rounded mb-2 animate-pulse"></div>
            <div className="h-10 bg-gray-200 w-full rounded animate-pulse"></div>
          </div>

          <div className="mb-6">
            <div className="h-5 bg-gray-200 w-40 rounded mb-2 animate-pulse"></div>
            <div className="h-32 bg-gray-200 w-full rounded animate-pulse"></div>
          </div>

          <div className="h-10 bg-gray-200 w-32 rounded animate-pulse"></div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="h-8 bg-gray-200 w-48 rounded mb-6 animate-pulse"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-b md:border-b-0 md:border-l border-gray-200 pb-4 md:pb-0 md:pl-4">
              <div className="h-6 bg-gray-200 w-40 rounded mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 w-full rounded mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 w-3/4 rounded animate-pulse"></div>
            </div>

            <div className="pt-4 md:pt-0 md:pr-4">
              <div className="h-6 bg-gray-200 w-40 rounded mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 w-full rounded mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 w-3/4 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
