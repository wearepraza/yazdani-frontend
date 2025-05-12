export default function PurchaseCreditCardLoading() {
  return (
    <div>
      <div className="flex items-center mb-6">
        <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="h-8 w-48 bg-gray-200 rounded-md animate-pulse mr-2"></div>
      </div>

      {/* Steps Loading */}
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-4 w-16 bg-gray-200 rounded-md animate-pulse mt-2"></div>
          </div>
          <div className="h-1 flex-1 mx-2 bg-gray-200"></div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-4 w-16 bg-gray-200 rounded-md animate-pulse mt-2"></div>
          </div>
          <div className="h-1 flex-1 mx-2 bg-gray-200"></div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-4 w-16 bg-gray-200 rounded-md animate-pulse mt-2"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Loading */}
        <div className="lg:col-span-2">
          <div className="h-[500px] bg-gray-200 rounded-xl animate-pulse"></div>
        </div>

        {/* Sidebar Loading */}
        <div className="lg:col-span-1">
          <div className="h-[400px] bg-gray-200 rounded-xl animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
