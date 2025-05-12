export default function CreditCardsLoading() {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <div className="h-8 w-48 bg-gray-200 rounded-md animate-pulse mb-2"></div>
          <div className="h-5 w-72 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
      </div>

      {/* User's Credit Cards Loading */}
      <div className="mb-8">
        <div className="h-7 w-40 bg-gray-200 rounded-md animate-pulse mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="h-64 bg-gray-200 rounded-xl animate-pulse"></div>
        </div>
      </div>

      {/* Available Credit Cards Loading */}
      <div>
        <div className="h-7 w-56 bg-gray-200 rounded-md animate-pulse mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="h-96 bg-gray-200 rounded-xl animate-pulse"></div>
          ))}
        </div>
      </div>

      {/* Benefits Section Loading */}
      <div className="mt-12">
        <div className="h-7 w-48 bg-gray-200 rounded-md animate-pulse mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="h-40 bg-gray-200 rounded-xl animate-pulse"></div>
          ))}
        </div>
      </div>

      {/* FAQ Section Loading */}
      <div className="mt-12">
        <div className="h-7 w-36 bg-gray-200 rounded-md animate-pulse mb-6"></div>
        <div className="h-64 bg-gray-200 rounded-xl animate-pulse"></div>
      </div>
    </div>
  )
}
