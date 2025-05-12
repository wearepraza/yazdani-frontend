"use client"

import { useState } from "react"
import { Bell, Mail, ShoppingBag, Shield, Moon, Sun, Save } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: {
      pushNotifications: true,
      emailNotifications: false,
      orderUpdates: true,
      marketingEmails: false,
      securityAlerts: true,
    },
    appearance: {
      darkMode: false,
    },
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleToggle = (category, setting) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting],
      },
    }))
  }

  const handleSave = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }, 1000)
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">تنظیمات</h1>
          <p className="text-gray-500 mt-1">تنظیمات حساب کاربری خود را در این بخش مدیریت کنید.</p>
        </div>
      </div>

      {success && (
        <div className="mb-6 bg-green-50 text-green-700 p-4 rounded-lg border border-green-200 flex items-center">
          <div className="mr-2 bg-green-100 p-1 rounded-full">
            <Save size={16} className="text-green-600" />
          </div>
          <p>تنظیمات با موفقیت ذخیره شد.</p>
        </div>
      )}

      <div className="space-y-8">
        {/* Notification Settings */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Bell size={18} className="text-primary" />
            <span>تنظیمات اعلان‌ها</span>
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <Bell size={18} className="text-blue-500" />
                </div>
                <div>
                  <p className="font-medium">اعلان‌های پوش</p>
                  <p className="text-sm text-gray-500">دریافت اعلان‌های پوش در مرورگر</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.notifications.pushNotifications}
                  onChange={() => handleToggle("notifications", "pushNotifications")}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-purple-50 p-2 rounded-lg">
                  <Mail size={18} className="text-purple-500" />
                </div>
                <div>
                  <p className="font-medium">اعلان‌های ایمیلی</p>
                  <p className="text-sm text-gray-500">دریافت اعلان‌ها از طریق ایمیل</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.notifications.emailNotifications}
                  onChange={() => handleToggle("notifications", "emailNotifications")}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-green-50 p-2 rounded-lg">
                  <ShoppingBag size={18} className="text-green-500" />
                </div>
                <div>
                  <p className="font-medium">به‌روزرسانی سفارش‌ها</p>
                  <p className="text-sm text-gray-500">دریافت اعلان برای تغییر وضعیت سفارش‌ها</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.notifications.orderUpdates}
                  onChange={() => handleToggle("notifications", "orderUpdates")}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-amber-50 p-2 rounded-lg">
                  <Mail size={18} className="text-amber-500" />
                </div>
                <div>
                  <p className="font-medium">ایمیل‌های بازاریابی</p>
                  <p className="text-sm text-gray-500">دریافت پیشنهادات و تخفیف‌های ویژه</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.notifications.marketingEmails}
                  onChange={() => handleToggle("notifications", "marketingEmails")}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="bg-red-50 p-2 rounded-lg">
                  <Shield size={18} className="text-red-500" />
                </div>
                <div>
                  <p className="font-medium">هشدارهای امنیتی</p>
                  <p className="text-sm text-gray-500">دریافت هشدار برای فعالیت‌های مشکوک</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.notifications.securityAlerts}
                  onChange={() => handleToggle("notifications", "securityAlerts")}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Sun size={18} className="text-primary" />
            <span>تنظیمات ظاهری</span>
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-50 p-2 rounded-lg">
                  <Moon size={18} className="text-indigo-500" />
                </div>
                <div>
                  <p className="font-medium">حالت تاریک</p>
                  <p className="text-sm text-gray-500">تغییر ظاهر برنامه به حالت تاریک</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.appearance.darkMode}
                  onChange={() => handleToggle("appearance", "darkMode")}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={loading} className="px-6">
            {loading ? "در حال ذخیره..." : "ذخیره تنظیمات"}
          </Button>
        </div>
      </div>
    </div>
  )
}
