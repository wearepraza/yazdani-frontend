"use client"
import { useState, useEffect } from "react"
import { detailsPages } from "@/lib/api/admin/pages/detailsPages"
import Loading from "./loading"
// export const metadata = {
//   title: "درباره ما | فونیکسو",
//   description: "درباره فروشگاه فونیکسو و تاریخچه ما",
// }

export default function AboutPage() {
  const [pageData, setPageData] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchPageData = async () => {
      const response = await detailsPages("about")
      setPageData(response.data)
      setLoading(false)
    }
    fetchPageData()
  }, [])

  if (loading) {
    return <Loading />
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="relative rounded-2xl overflow-hidden mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90"></div>
          <div className="relative z-10 py-20 px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{pageData?.title}</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">{pageData?.description}</p>
             
          </div>
        </div>

        {/* Our Story Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">داستان ما</h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  فونیکسو در سال ۱۳۹۵ با هدف ارائه محصولات دیجیتال با کیفیت و قیمت مناسب تأسیس شد. ما با یک تیم کوچک
                  شروع کردیم، اما با تلاش و پشتکار توانستیم به یکی از بزرگترین فروشگاه‌های آنلاین محصولات دیجیتال در
                  ایران تبدیل شویم.
                </p>
                <p className="text-gray-700">
                  در طول این سال‌ها، ما همواره به دنبال بهبود خدمات و محصولات خود بوده‌ایم. با گسترش تیم متخصص خود و
                  همکاری با برندهای معتبر جهانی، توانسته‌ایم اعتماد مشتریان خود را جلب کنیم و به عنوان یک برند معتبر در
                  بازار شناخته شویم.
                </p>
                <p className="text-gray-700">
                  امروز، فونیکسو با بیش از ۵۰ کارمند متخصص و مجرب، به بیش از ۱۰۰,۰۰۰ مشتری در سراسر ایران خدمات ارائه
                  می‌دهد. ما به آینده امیدوار هستیم و همچنان به دنبال نوآوری و بهبود خدمات خود هستیم.
                </p>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-24 w-24 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-transform hover:scale-105">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-center mb-4">کیفیت برتر</h3>
            <p className="text-gray-600 text-center">
              ما متعهد به ارائه محصولات با کیفیت برتر هستیم. تمامی محصولات ما از برندهای معتبر جهانی تهیه می‌شوند و دارای
              گارانتی اصالت و سلامت هستند.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-transform hover:scale-105">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-center mb-4">قیمت مناسب</h3>
            <p className="text-gray-600 text-center">
              ما همواره تلاش می‌کنیم تا محصولات خود را با قیمت‌های مناسب و رقابتی ارائه دهیم. با حذف واسطه‌ها، قیمت‌های ما
              همیشه به نفع مشتریان است.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-transform hover:scale-105">
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-center mb-4">پشتیبانی عالی</h3>
            <p className="text-gray-600 text-center">
              تیم پشتیبانی ما همیشه آماده پاسخگویی به سوالات و مشکلات شما است. ما به ارائه خدمات پس از فروش با کیفیت
              افتخار می‌کنیم.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">تیم ما</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center transform transition-transform hover:scale-105">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold">علی محمدی</h3>
              <p className="text-gray-600">مدیر عامل</p>
            </div>

            <div className="text-center transform transition-transform hover:scale-105">
              <div className="w-32 h-32 bg-gradient-to-br from-green-100 to-green-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold">سارا احمدی</h3>
              <p className="text-gray-600">مدیر فروش</p>
            </div>

            <div className="text-center transform transition-transform hover:scale-105">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold">محمد رضایی</h3>
              <p className="text-gray-600">مدیر فنی</p>
            </div>
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">ماموریت و چشم‌انداز ما</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-blue-600 mb-4">ماموریت ما</h3>
              <p className="text-gray-700">
                ماموریت ما ارائه بهترین محصولات دیجیتال با قیمت مناسب و خدمات پس از فروش عالی است. ما می‌خواهیم تجربه
                خرید آنلاین را برای مشتریان خود لذت‌بخش و اطمینان‌بخش کنیم.
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-purple-600 mb-4">چشم‌انداز ما</h3>
              <p className="text-gray-700">
                چشم‌انداز ما تبدیل شدن به بزرگترین و معتبرترین فروشگاه آنلاین محصولات دیجیتال در ایران است. ما می‌خواهیم
                با نوآوری و ارائه خدمات برتر، استانداردهای جدیدی در تجارت الکترونیک ایران ایجاد کنیم.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
