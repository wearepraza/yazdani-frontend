"use client"

import { useState, useEffect } from "react"
import { User, MapPin, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { profileUser } from "@/lib/api/user/profileUser"

export default function AccountPage() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true)
        const resp = await profileUser()
        console.log("profileUser response:", resp)

        if (resp && resp.data) {
          setProfile(resp.data)
        } else {
          setError("پاسخ نامعتبر از سرور")
        }
      } catch (err) {
        console.error(err)
        setError(err.message || "خطا در دریافت اطلاعات پروفایل")
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  if (loading) return <p>در حال بارگذاری...</p>
  if (error)   return <p className="text-destructive">{error}</p>

  return (
    <div>
      {/* header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">اطلاعات حساب</h1>
          <p className="text-gray-500 mt-1">
            در این بخش می‌توانید اطلاعات حساب کاربری خود را مشاهده و ویرایش کنید.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link href="/dashboard/user/edit-profile">
            <Button className="flex items-center gap-2">
              <Edit size={16} />
              <span>ویرایش اطلاعات</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white shadow-md mb-4">
                <User size={40} />
              </div>
              <h2 className="text-xl font-bold">
                {profile.name} {profile.surname}
              </h2>
              <p className="text-gray-500 mt-1">{profile.email || "—"}</p>
              <p className="text-gray-500 mt-1">{profile.mobile_number}</p>

              <div className="mt-6 w-full space-y-2">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-500">شماره ثبت</span>
                  <span className="font-medium">{profile.registration_number}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-500">وضعیت حساب</span>
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
                    فعال
                  </span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-500">تاریخ انقضا</span>
                  <span className="font-medium">
                    {new Date(profile.validity_expiration).toLocaleDateString("fa-IR")}
                  </span>
                </div>
              </div>

              <div className="mt-6 w-full">
                <Link href="/dashboard/user/edit-profile">
                  <Button variant="outline" className="w-full">
                    ویرایش پروفایل
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* details */}
        <div className="lg:col-span-2 space-y-6">
          {/* personal info */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <User size={18} className="text-primary" />
              <span>اطلاعات شخصی</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                ["نام", profile.name],
                ["نام خانوادگی", profile.surname],
                ["شماره موبایل", profile.mobile_number],
                ["ایمیل", profile.email || "—"],
                ["کد دعوت", profile.invitation_code],
                ["دعوت‌کننده", profile.invited_by || "—"],
              ].map(([label, value]) => (
                <div key={label} className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">{label}</p>
                  <p className="font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* address (only if provided) */}
          {profile.address ? (
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <MapPin size={18} className="text-primary" />
                <span>آدرس</span>
              </h3>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <MapPin size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">آدرس اصلی</p>
                    <p className="text-gray-600">{profile.address.line}</p>
                    <div className="flex items-center gap-2 mt-2 text-sm">
                      <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                        کد پستی: {profile.address.postal_code}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Link href="/dashboard/user/edit-profile?tab=address">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Edit size={14} />
                      <span>ویرایش آدرس</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-yellow-50 text-yellow-800 rounded-lg p-4">
              آدرسی برای نمایش وجود ندارد.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
