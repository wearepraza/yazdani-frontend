import { Skeleton } from "@/components/ui/skeleton"

export default function DailyQuizLoading() {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-5 w-64" />
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-9 rounded-full" />
            <div>
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-6 w-16" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-9 rounded-full" />
            <div>
              <Skeleton className="h-4 w-40 mb-2" />
              <Skeleton className="h-6 w-16" />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="border border-gray-100 rounded-lg p-5 shadow-sm">
              <div className="flex items-start gap-3 mb-4">
                <Skeleton className="h-7 w-7 rounded-full flex-shrink-0" />
                <Skeleton className="h-6 w-full max-w-2xl" />
              </div>

              <div className="space-y-3 pr-10">
                {[...Array(4)].map((_, optionIndex) => (
                  <div key={optionIndex} className="flex items-center">
                    <Skeleton className="h-14 w-full rounded-lg" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-between items-center">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-10 w-32 rounded-lg" />
        </div>
      </div>
    </div>
  )
}
