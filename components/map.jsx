export default function Map() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">موقعیت ما روی نقشه</h2>
      <div className="w-full h-80 bg-gray-200 rounded-lg overflow-hidden">
        {/* In a real application, you would embed a Google Maps or other map service here */}
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-gray-400 mx-auto mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-gray-600">نقشه گوگل در اینجا نمایش داده می‌شود</p>
            <p className="text-gray-500 text-sm mt-2">تهران، خیابان ولیعصر، بالاتر از میدان ونک</p>
          </div>
        </div>
      </div>
    </div>
  )
}
