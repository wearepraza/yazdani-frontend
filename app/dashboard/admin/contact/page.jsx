"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { updatePages } from "@/lib/api/admin/pages/updatePages"
import { detailsPages } from "@/lib/api/admin/pages/detailsPages"
export default function AdminContactPage() {
  const [pageData, setPageData] = useState({
    title: "",
    description: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    fetchPageData();
  }, []);

  const fetchPageData = async () => {
    try {
      const response = await detailsPages("contact");
      if (response.data) {
        setPageData({
          title: response.data.title || "",
          description: response.data.description || ""
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "خطا در دریافت اطلاعات صفحه"
      });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await updatePages("contact", pageData.title, pageData.description);
      if (response.data) {
        setMessage({
          type: "success",
          text: "تغییرات با موفقیت ذخیره شد"
        });
      } else {
        setMessage({
          type: "error",
          text: "خطا در ذخیره تغییرات"
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "خطا در ذخیره تغییرات"
      });
    }
    setLoading(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">مدیریت صفحه تماس با ما</h1>
        <Link
          href="/contact"
          target="_blank"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          مشاهده صفحه
        </Link>
      </div>

      {message.text && (
        <div className={`mb-4 p-4 rounded-lg ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {message.text}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">اطلاعات اصلی</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">عنوان صفحه</label>
            <input
              type="text"
              value={pageData.title}
              onChange={(e) => setPageData({ ...pageData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">توضیحات کوتاه</label>
            <input
              type="text"
              value={pageData.description}
              onChange={(e) => setPageData({ ...pageData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">اطلاعات تماس</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">شماره تلفن پشتیبانی</label>
            <input
              type="text"
              defaultValue="۰۲۱-۸۸۸۸۸۸۸۸"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">شماره تلفن فروش</label>
            <input
              type="text"
              defaultValue="۰۲۱-۹۹۹۹۹۹۹۹"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ایمیل پشتیبانی</label>
            <input
              type="email"
              defaultValue="support@phonixo.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ایمیل فروش</label>
            <input
              type="email"
              defaultValue="sales@phonixo.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">آدرس</label>
            <textarea
              rows="3"
              defaultValue="تهران، خیابان ولیعصر، بالاتر از میدان ونک، برج آسمان، طبقه ۱۰، واحد ۱۰۰۱"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">ساعات کاری</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">روزهای کاری</label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>شنبه تا چهارشنبه:</span>
                <input
                  type="text"
                  defaultValue="۹ صبح تا ۶ عصر"
                  className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <span>پنجشنبه:</span>
                <input
                  type="text"
                  defaultValue="۹ صبح تا ۱ بعد از ظهر"
                  className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <span>جمعه:</span>
                <input
                  type="text"
                  defaultValue="تعطیل"
                  className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">پشتیبانی آنلاین</label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>شنبه تا پنجشنبه:</span>
                <input
                  type="text"
                  defaultValue="۸ صبح تا ۱۰ شب"
                  className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <span>جمعه:</span>
                <input
                  type="text"
                  defaultValue="۱۰ صبح تا ۶ عصر"
                  className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">تنظیمات فرم تماس</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">عنوان فرم</label>
            <input
              type="text"
              defaultValue="فرم تماس با ما"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">پیام موفقیت</label>
            <input
              type="text"
              defaultValue="پیام شما با موفقیت ارسال شد"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">توضیحات پیام موفقیت</label>
            <input
              type="text"
              defaultValue="کارشناسان ما در اسرع وقت با شما تماس خواهند گرفت."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">فیلدهای فرم</label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input type="checkbox" id="name" defaultChecked className="mr-2" />
                <label htmlFor="name" className="text-sm text-gray-700">
                  نام و نام خانوادگی
                </label>
                <input type="checkbox" id="name_required" defaultChecked className="mr-2 ml-4" />
                <label htmlFor="name_required" className="text-sm text-gray-700">
                  اجباری
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="email" defaultChecked className="mr-2" />
                <label htmlFor="email" className="text-sm text-gray-700">
                  ایمیل
                </label>
                <input type="checkbox" id="email_required" defaultChecked className="mr-2 ml-4" />
                <label htmlFor="email_required" className="text-sm text-gray-700">
                  اجباری
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="phone" defaultChecked className="mr-2" />
                <label htmlFor="phone" className="text-sm text-gray-700">
                  شماره تماس
                </label>
                <input type="checkbox" id="phone_required" className="mr-2 ml-4" />
                <label htmlFor="phone_required" className="text-sm text-gray-700">
                  اجباری
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="subject" defaultChecked className="mr-2" />
                <label htmlFor="subject" className="text-sm text-gray-700">
                  موضوع
                </label>
                <input type="checkbox" id="subject_required" defaultChecked className="mr-2 ml-4" />
                <label htmlFor="subject_required" className="text-sm text-gray-700">
                  اجباری
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="message" defaultChecked className="mr-2" />
                <label htmlFor="message" className="text-sm text-gray-700">
                  پیام
                </label>
                <input type="checkbox" id="message_required" defaultChecked className="mr-2 ml-4" />
                <label htmlFor="message_required" className="text-sm text-gray-700">
                  اجباری
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button 
          onClick={handleSubmit}
          disabled={loading}
          className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
        </button>
      </div>
    </div>
  )
}
