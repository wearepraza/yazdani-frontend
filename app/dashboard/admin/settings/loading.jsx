export default function SettingsLoading() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="h-8 w-40 bg-gray-200 rounded animate-pulse mb-2"></div>
        <div className="h-5 w-64 bg-gray-200 rounded animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Theme Settings Skeleton */}
        <div className="col-span-1 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div className="space-y-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="h-6 w-12 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Settings Skeleton */}
        <div className="col-span-1 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div className="space-y-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <div className="h-5 w-36 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 w-52 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="h-6 w-12 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>

        {/* System Settings Skeleton */}
        <div className="col-span-1 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-6 w-36 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div className="space-y-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <div className="h-5 w-40 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 w-56 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="h-6 w-12 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
    </div>
  )
}
