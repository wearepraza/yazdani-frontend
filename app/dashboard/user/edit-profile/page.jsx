"use client"

import { useState, useRef, useEffect } from "react"
import {
  User,
  Camera,
  Mail,
  Phone,
  MapPin,
  Lock,
  Eye,
  EyeOff,
  Save,
  ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

// API helpers
import { profileUser } from "@/lib/api/user/profileUser.js"
import { updateProfile } from "@/lib/api/user/updateProfileUser.js"
import { updateAddress } from "@/lib/api/user/updateAddressUser"

export default function EditProfilePage() {
  // 1) State for user data
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nationalCode: "",
    address: "",
    postalCode: "",
  })
  const [loadingProfile, setLoadingProfile] = useState(true)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

  // 2) Password & verification state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [verificationStep, setVerificationStep] = useState(false)
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", ""])
  const codeInputRefs = useRef([])

  // 3) UI toggles
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("personal")
  const fileInputRef = useRef(null)

  // 4) Load user on mount and after updates
  const loadProfile = async () => {
    setLoadingProfile(true)
    try {
      const resp = await profileUser()
      console.log("profileUser response:", resp)
      if (resp?.data) {
        const d = resp.data
        setProfileData({
          firstName: d.name || "",
          lastName: d.surname || "",
          email: d.email || "",
          phone: d.mobile_number || "",
          nationalCode: d.national_code || "",
          address: d.address_line || "",
          postalCode: d.postal_code || "",
        })
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingProfile(false)
    }
  }

  useEffect(() => {
    loadProfile()
  }, [])

  // 5) Handlers
  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileData((p) => ({ ...p, [name]: value }))
  }
  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData((p) => ({ ...p, [name]: value }))
  }
  const handleVerificationCodeChange = (i, val) => {
    if (val.length > 1) val = val.charAt(0)
    if (val && !/^\d+$/.test(val)) return
    const next = [...verificationCode]
    next[i] = val
    setVerificationCode(next)
    if (val && i < 4) codeInputRefs.current[i + 1]?.focus()
  }
  const handleVerificationCodeKeyDown = (i, e) => {
    if (e.key === "Backspace" && !verificationCode[i] && i > 0) {
      codeInputRefs.current[i - 1]?.focus()
    }
  }

  // 6) Submit updated profile info
  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const resp = await updateProfile(
        profileData.firstName,
        profileData.lastName,
        profileData.email
      )
      console.log("updateProfile response:", resp)
      if (resp.status === 200 && resp.data?.success !== false) {
        setSuccess("اطلاعات پروفایل با موفقیت ذخیره شد")
      } else {
        setError(resp.data?.message || "خطا در بروزرسانی پروفایل")
      }
    } catch (err) {
      console.error(err)
      setError(err.message || "خطا در بروزرسانی پروفایل")
    } finally {
      setLoading(false)
      setTimeout(() => setSuccess(null), 3000)
    }
  }

  // 7) Submit updated address info, then reload profile
  const handleAddressSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const resp = await updateAddress(
        null,
        "آدرس اصلی",
        profileData.address,
        profileData.postalCode
      )
      console.log("updateAddress response:", resp)
      if (resp.status === 200 && resp.data?.success !== false) {
        setSuccess("آدرس با موفقیت بروزرسانی شد")
        // reload so address_line & postal_code in profileData are refreshed
        await loadProfile()
      } else {
        setError(resp.data?.message || "خطا در بروزرسانی آدرس")
      }
    } catch (err) {
      console.error(err)
      setError(err.message || "خطا در بروزرسانی آدرس")
    } finally {
      setLoading(false)
      setTimeout(() => setSuccess(null), 3000)
    }
  }

  // 8) Password flows (unchanged)
  const handlePasswordRequest = (e) => {
    e.preventDefault()
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("رمز عبور جدید و تکرار آن مطابقت ندارند")
      return
    }
    if (passwordData.newPassword.length < 8) {
      setError("رمز عبور جدید باید حداقل ۸ کاراکتر باشد")
      return
    }
    setLoading(true)
    setError(null)
    setTimeout(() => {
      setLoading(false)
      setVerificationStep(true)
    }, 1000)
  }
  const handleVerificationSubmit = (e) => {
    e.preventDefault()
    const full = verificationCode.join("")
    if (full.length !== 5) {
      setError("کد تایید باید ۵ رقم باشد")
      return
    }
    setLoading(true)
    setError(null)
    setTimeout(() => {
      setLoading(false)
      setVerificationStep(false)
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
      setSuccess("رمز عبور با موفقیت تغییر یافت")
      setTimeout(() => setSuccess(null), 3000)
    }, 1500)
  }

  if (loadingProfile) return <p>در حال بارگذاری اطلاعات کاربر…</p>

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">ویرایش پروفایل</h1>
          <p className="text-gray-500 mt-1">اطلاعات حساب کاربری خود را ویرایش کنید</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link
            href="/dashboard/user/account"
            className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
          >
            <span>بازگشت به پروفایل</span>
            <ArrowLeft size={16} />
          </Link>
        </div>
      </div>

      {/* Success & Error */}
      {success && (
        <div className="mb-6 bg-green-50 text-green-700 p-4 rounded-lg border border-green-200 flex items-center">
          <div className="mr-2 bg-green-100 p-1 rounded-full">
            <Save size={16} className="text-green-600" />
          </div>
          <p>{success}</p>
        </div>
      )}
      {error && (
        <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-lg border border-red-200">
          <p>{error}</p>
        </div>
      )}

      {/* Profile Image */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative mb-4">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white shadow-md">
            <User size={64} />
          </div>
          <button
            className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors"
            onClick={() => fileInputRef.current.click()}
          >
            <Camera size={20} className="text-gray-700" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0]
              if (file) {
                setSuccess("تصویر پروفایل با موفقیت بروزرسانی شد")
                setTimeout(() => setSuccess(null), 3000)
              }
            }}
          />
        </div>
        <p className="text-sm text-gray-500">برای تغییر تصویر پروفایل کلیک کنید</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        {["personal", "address", "password"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === tab
                ? "text-primary border-b-2 border-primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => {
              setActiveTab(tab)
              setError(null)
              setSuccess(null)
              setVerificationStep(false)
            }}
          >
            {{
              personal: "اطلاعات شخصی",
              address: "آدرس",
              password: "تغییر رمز عبور",
            }[tab]}
          </button>
        ))}
      </div>

      {/* Personal Form */}
      {activeTab === "personal" && (
        <form onSubmit={handleProfileSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                id: "firstName",
                name: "firstName",
                label: "نام",
                icon: <User size={16} className="text-gray-400" />,
                value: profileData.firstName,
              },
              {
                id: "lastName",
                name: "lastName",
                label: "نام خانوادگی",
                icon: <User size={16} className="text-gray-400" />,
                value: profileData.lastName,
              },
              {
                id: "email",
                name: "email",
                label: "ایمیل",
                icon: <Mail size={16} className="text-gray-400" />,
                value: profileData.email,
                type: "email",
                dir: "ltr",
              },
            ].map(({ id, name, label, icon, value, type = "text", dir }) => (
              <div key={id} className="space-y-2">
                <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                  {label}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    {icon}
                  </div>
                  <Input
                    id={id}
                    name={name}
                    type={type}
                    value={value}
                    onChange={handleProfileChange}
                    className="pr-10"
                    dir={dir}
                  />
                </div>
              </div>
            ))}
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
          </Button>
        </form>
      )}

      {/* Address Form */}
      {activeTab === "address" && (
        <form onSubmit={handleAddressSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              آدرس
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <MapPin size={16} className="text-gray-400" />
              </div>
              <Input
                id="address"
                name="address"
                value={profileData.address}
                onChange={handleProfileChange}
                className="pr-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
              کد پستی
            </label>
            <Input
              id="postalCode"
              name="postalCode"
              value={profileData.postalCode}
              onChange={handleProfileChange}
              dir="ltr"
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "در حال ذخیره..." : "ذخیره آدرس"}
          </Button>
        </form>
      )}

      {/* Password & Verification Forms */}
      {activeTab === "password" && !verificationStep && (
        <form onSubmit={handlePasswordRequest} className="space-y-6">
          {[
            {
              id: "currentPassword",
              name: "currentPassword",
              label: "رمز عبور فعلی",
              show: showCurrentPassword,
              toggle: () => setShowCurrentPassword(!showCurrentPassword),
            },
            {
              id: "newPassword",
              name: "newPassword",
              label: "رمز عبور جدید",
              show: showNewPassword,
              toggle: () => setShowNewPassword(!showNewPassword),
            },
            {
              id: "confirmPassword",
              name: "confirmPassword",
              label: "تکرار رمز عبور جدید",
              show: showConfirmPassword,
              toggle: () => setShowConfirmPassword(!showConfirmPassword),
            },
          ].map(({ id, name, label, show, toggle }) => (
            <div key={id} className="space-y-2">
              <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Lock size={16} className="text-gray-400" />
                </div>
                <Input
                  id={id}
                  name={name}
                  type={show ? "text" : "password"}
                  value={passwordData[name]}
                  onChange={handlePasswordChange}
                  className="pr-10"
                  dir="ltr"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 left-0 flex items-center pl-3"
                  onClick={toggle}
                >
                  {show ? <EyeOff size={16} className="text-gray-400" /> : <Eye size={16} className="text-gray-400" />}
                </button>
              </div>
              {id === "newPassword" && (
                <p className="text-xs text-gray-500">رمز عبور باید حداقل ۸ کاراکتر باشد</p>
              )}
            </div>
          ))}
          <Button type="submit" disabled={loading}>
            {loading ? "در حال ارسال..." : "درخواست تغییر رمز عبور"}
          </Button>
        </form>
      )}
      {activeTab === "password" && verificationStep && (
        <form onSubmit={handleVerificationSubmit} className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-medium mb-2">تایید کد ارسال شده</h3>
            <p className="text-gray-500 mb-4">
              کد تایید به شماره موبایل شما ارسال شد. لطفا آن را وارد کنید.
            </p>
            <div className="flex justify-center gap-2">
              {verificationCode.map((dig, idx) => (
                <Input
                  key={idx}
                  type="text"
                  value={dig}
                  onChange={(e) => handleVerificationCodeChange(idx, e.target.value)}
                  onKeyDown={(e) => handleVerificationCodeKeyDown(idx, e)}
                  className="w-12 h-12 text-center text-lg"
                  maxLength={1}
                  ref={(el) => (codeInputRefs.current[idx] = el)}
                  inputMode="numeric"
                />
              ))}
            </div>
          </div>
          <div className="flex gap-4">
            <Button type="submit" disabled={loading}>
              {loading ? "در حال بررسی..." : "تایید و تغییر رمز عبور"}
            </Button>
            <Button variant="outline" onClick={() => setVerificationStep(false)} disabled={loading}>
              بازگشت
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
