"use client";
import Link from "next/link";
import { useState } from "react";
import { updatePages } from '../../../../lib/api/admin/pages/updatePages';

export default function AdminEditTermsPage() {
  const [content, setContent] =
    useState(`<h2 class='text-xl font-bold mb-4'>قوانین و مقررات فروشگاه</h2>
<ul class='list-disc list-inside space-y-2'>
  <li>این فقط متن تستی است.</li>
  <li>شما می‌توانید این متن را از این قسمت ویرایش کنید.</li>
</ul>`);

  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [pageData, setPageData] = useState({
    title: "قوانین و مقررات",
    description: "متن قوانین و مقررات فروشگاه"
  });

  const handleSave = () => {
    alert("✅ متن قوانین ذخیره شد");
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await updatePages('agreement', pageData.title, pageData.description);
      if (response.error) {
        setMessage({ text: response.message, type: "error" });
      } else {
        setMessage({ text: "تغییرات با موفقیت ذخیره شد", type: "success" });
      }
    } catch (error) {
      setMessage({ text: "خطا در ذخیره تغییرات", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">مدیریت صفحه قوانین و مقررات</h1>
        <Link
          href="/terms"
          target="_blank"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          مشاهده صفحه
        </Link>
      </div>
      {message.text && (
        <div
          className={`mb-4 p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">اطلاعات اصلی</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              عنوان صفحه
            </label>
            <input
              type="text"
              value={pageData.title}
              onChange={(e) =>
                setPageData({ ...pageData, title: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              توضیحات کوتاه
            </label>
            <input
              type="text"
              value={pageData.description}
              onChange={(e) =>
                setPageData({ ...pageData, description: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">تنظیمات فرم ارسال سوال</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              عنوان بخش
            </label>
            <input
              type="text"
              defaultValue="سوال دیگری دارید؟"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              توضیحات
            </label>
            <textarea
              rows="3"
              defaultValue="اگر پاسخ سوال خود را در این صفحه پیدا نکردید، می‌توانید از طریق فرم زیر سوال خود را مطرح کنید. کارشناسان ما در اسرع وقت به سوال شما پاسخ خواهند داد."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              نمایش فرم
            </label>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="show_form"
                defaultChecked
                className="mr-2"
              />
              <label htmlFor="show_form" className="text-sm text-gray-700">
                نمایش فرم ارسال سوال در صفحه
              </label>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
