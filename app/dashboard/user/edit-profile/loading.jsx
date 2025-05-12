export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 w-48 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 w-64 bg-gray-200 rounded mb-6"></div>

      <div className="flex justify-center mb-8">
        <div className="w-32 h-32 bg-gray-200 rounded-full"></div>
      </div>

      <div className="flex border-b border-gray-200 mb-6">
        <div className="h-10 w-24 bg-gray-200 rounded mr-2"></div>
        <div className="h-10 w-24 bg-gray-200 rounded mr-2"></div>
        <div className="h-10 w-24 bg-gray-200 rounded"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-2">
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>

      <div className="h-10 w-32 bg-gray-200 rounded"></div>
    </div>
  )
}
