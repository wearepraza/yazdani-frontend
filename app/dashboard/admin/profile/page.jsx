"use client"

import { useState } from "react"
import { User, Mail, Phone, Save, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AdminProfilePage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "مدیر سیستم",
    email: "admin@example.com",
    phone: "۰۹۱۲۳۴۵۶۷۸۹",
    role: "مدیر کل",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }, 1500)
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">پروفایل مدیر</h1>
          <p className="text-gray-500 mt-1">مدیریت اطلاعات حساب کاربری مدیر</p>
        </div>
      </div>

      {success && (
        <div className="mb-6 bg-green-50 text-green-700 p-4 rounded-lg border border-green-200 flex items-center">
          <div className="mr-2 bg-green-100 p-1 rounded-full">
            <Save size={16} className="text-green-600" />
          </div>
          <p>اطلاعات پروفایل با موفقیت بروزرسانی شد.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white shadow-md">
                  <User size={64} />
                </div>
                <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors">
                  <Camera size={20} className="text-gray-700" />
                </button>
              </div>
              <h2 className="text-xl font-bold">{profileData.name}</h2>
              <p className="text-gray-500 mt-1">{profileData.email}</p>
              <p className="text-gray-500 mt-1">{profileData.phone}</p>

              <div className="mt-4 w-full">
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium inline-block">
                  {profileData.role}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold mb-4">اطلاعات شخصی</h2>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    نام و نام خانوادگی
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <User size={16} className="text-gray-400" />
                    </div>
                    <Input id="name" name="name" value={profileData.name} onChange={handleChange} className="pr-10" />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    ایمیل
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <Mail size={16} className="text-gray-400" />
                    </div>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleChange}
                      className="pr-10"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    شماره موبایل
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <Phone size={16} className="text-gray-400" />
                    </div>
                    <Input
                      id="phone"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleChange}
                      className="pr-10"
                      dir="ltr"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button type="submit" className="flex items-center gap-2" disabled={loading}>
                  <Save size={16} />
                  <span>{loading ? "در حال ذخیره..." : "ذخیره تغییرات"}</span>
                </Button>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mt-6">
            <h2 className="text-lg font-bold mb-4">تغییر رمز عبور</h2>

            <form>
              <div className="space-y-4">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    رمز عبور فعلی
                  </label>
                  <Input id="currentPassword" name="currentPassword" type="password" dir="ltr" />
                </div>

                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    رمز عبور جدید
                  </label>
                  <Input id="newPassword" name="newPassword" type="password" dir="ltr" />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    تکرار رمز عبور جدید
                  </label>
                  <Input id="confirmPassword" name="confirmPassword" type="password" dir="ltr" />
                </div>
              </div>

              <div className="mt-6">
                <Button type="submit" variant="outline" className="flex items-center gap-2">
                  <span>تغییر رمز عبور</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
