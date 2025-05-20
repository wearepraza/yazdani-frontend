export default function AboutLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section Skeleton */}
        <div className="relative rounded-2xl overflow-hidden mb-16">
          <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
          <div className="relative z-10 py-20 px-8 text-center">
            <div className="h-12 bg-gray-300 w-64 mx-auto rounded mb-6 animate-pulse"></div>
            <div className="h-6 bg-gray-300 w-96 mx-auto rounded animate-pulse"></div>
          </div>
        </div>

        {/* Our Story Section Skeleton */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <div className="h-10 bg-gray-200 w-32 rounded mb-6 animate-pulse"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <div className="aspect-video bg-gray-200 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values Section Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-8">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-6 animate-pulse"></div>
              <div className="h-6 bg-gray-200 w-32 mx-auto rounded mb-4 animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Team Section Skeleton */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="h-10 bg-gray-200 w-32 mx-auto rounded mb-8 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse"></div>
                <div className="h-6 bg-gray-200 w-32 mx-auto rounded mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 w-24 mx-auto rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission & Vision Section Skeleton */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="h-10 bg-gray-200 w-48 mx-auto rounded mb-8 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="h-8 bg-gray-200 w-32 rounded mb-4 animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="h-8 bg-gray-200 w-32 rounded mb-4 animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
