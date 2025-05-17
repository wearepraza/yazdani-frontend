export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 w-48 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 w-64 bg-gray-200 rounded mb-6"></div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="h-10 bg-gray-200 rounded flex-1"></div>
        <div className="h-10 w-32 bg-gray-200 rounded"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="h-48 bg-gray-100 w-full"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-10 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
