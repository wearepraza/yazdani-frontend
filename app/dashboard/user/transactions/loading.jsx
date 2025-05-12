export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 w-48 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 w-64 bg-gray-200 rounded mb-6"></div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="h-10 bg-gray-200 rounded flex-1"></div>
        <div className="h-10 w-32 bg-gray-200 rounded"></div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="h-12 bg-gray-100 w-full"></div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 border-b border-gray-100 flex">
            <div className="w-1/5 p-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
            <div className="w-1/5 p-4">
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="w-2/5 p-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
            <div className="w-1/5 p-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
            <div className="w-1/5 p-4">
              <div className="h-6 bg-gray-200 rounded-full w-16"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
