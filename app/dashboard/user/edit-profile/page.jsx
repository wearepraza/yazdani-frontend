"use client"

import { useState, useRef } from "react"
import { User, Camera, Mail, Phone, MapPin, Lock, Eye, EyeOff, Save, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function EditProfilePage() {
  // Profile data state
  const [profileData, setProfileData] = useState({
    firstName: "کاربر",
    lastName: "فونیکسو",
    email: "example@email.com",
    phone: "۰۹۱۲۳۴۵۶۷۸۹",
    nationalCode: "۱۲۳۴۵۶۷۸۹۰",
    address: "تهران، خیابان ولیعصر، پلاک ۱۲۳",
    postalCode: "۱۲۳۴۵۶۷۸۹۰",
  })

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Verification code state for password change
  const [verificationStep, setVerificationStep] = useState(false)
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", ""])
  const codeInputRefs = useRef([])

  // UI state
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("personal")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)

  // Handle profile image change
  const handleImageClick = () => {
    fileInputRef.current.click()
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Here you would typically upload the file to your server
      // For now, we'll just show a success message
      setSuccess("تصویر پروفایل با موفقیت بروزرسانی شد")
      setTimeout(() => setSuccess(null), 3000)
    }
  }

  // Handle profile data change
  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle password data change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle verification code input
  const handleVerificationCodeChange = (index, value) => {
    if (value.length > 1) {
      // Only take the first character
      value = value.charAt(0)
    }

    // Check if input is a number
    if (value && !/^\d+$/.test(value)) {
      return
    }

    // Update verification code state
    const newCode = [...verificationCode]
    newCode[index] = value
    setVerificationCode(newCode)

    // Move to next input if a number was entered
    if (value && index < 4) {
      codeInputRefs.current[index + 1].focus()
    }
  }

  // Handle backspace in verification code inputs
  const handleVerificationCodeKeyDown = (index, e) => {
    // If backspace and empty, move to previous input
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      codeInputRefs.current[index - 1].focus()
    }
  }

  // Handle profile form submission
  const handleProfileSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSuccess("اطلاعات پروفایل با موفقیت بروزرسانی شد")
      setTimeout(() => setSuccess(null), 3000)
    }, 1000)
  }

  // Handle password change request
  const handlePasswordRequest = (e) => {
    e.preventDefault()

    // Validate passwords
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

    // Simulate API call to send verification code
    setTimeout(() => {
      setLoading(false)
      setVerificationStep(true)
    }, 1000)
  }

  // Handle verification code submission
  const handleVerificationSubmit = (e) => {
    e.preventDefault()

    // Validate verification code
    const fullCode = verificationCode.join("")
    if (fullCode.length !== 5) {
      setError("کد تایید باید ۵ رقم باشد")
      return
    }

    setLoading(true)
    setError(null)

    // Simulate API call to verify code and change password
    setTimeout(() => {
      setLoading(false)
      setVerificationStep(false)
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      setSuccess("رمز عبور با موفقیت تغییر یافت")
      setTimeout(() => setSuccess(null), 3000)
    }, 1500)
  }

  return (
    <div>
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

      {/* Success message */}
      {success && (
        <div className="mb-6 bg-green-50 text-green-700 p-4 rounded-lg border border-green-200 flex items-center">
          <div className="mr-2 bg-green-100 p-1 rounded-full">
            <Save size={16} className="text-green-600" />
          </div>
          <p>{success}</p>
        </div>
      )}

      {/* Error message */}
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
            onClick={handleImageClick}
          >
            <Camera size={20} className="text-gray-700" />
          </button>
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
        </div>
        <p className="text-sm text-gray-500">برای تغییر تصویر پروفایل کلیک کنید</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "personal" ? "text-primary border-b-2 border-primary" : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("personal")}
        >
          اطلاعات شخصی
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "address" ? "text-primary border-b-2 border-primary" : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("address")}
        >
          آدرس
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "password" ? "text-primary border-b-2 border-primary" : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("password")}
        >
          تغییر رمز عبور
        </button>
      </div>

      {/* Personal Information Form */}
      {activeTab === "personal" && (
        <form onSubmit={handleProfileSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                نام
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <User size={16} className="text-gray-400" />
                </div>
                <Input
                  id="firstName"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleProfileChange}
                  className="pr-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                نام خانوادگی
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <User size={16} className="text-gray-400" />
                </div>
                <Input
                  id="lastName"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleProfileChange}
                  className="pr-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
                  onChange={handleProfileChange}
                  className="pr-10"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
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
                  onChange={handleProfileChange}
                  className="pr-10"
                  dir="ltr"
                  disabled
                />
              </div>
              <p className="text-xs text-gray-500">برای تغییر شماره موبایل با پشتیبانی تماس بگیرید</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="nationalCode" className="block text-sm font-medium text-gray-700">
                کد ملی
              </label>
              <Input
                id="nationalCode"
                name="nationalCode"
                value={profileData.nationalCode}
                onChange={handleProfileChange}
                dir="ltr"
              />
            </div>
          </div>

          <div className="mt-8">
            <Button type="submit" className="w-full md:w-auto" disabled={loading}>
              {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </Button>
          </div>
        </form>
      )}

      {/* Address Form */}
      {activeTab === "address" && (
        <form onSubmit={handleProfileSubmit}>
          <div className="grid grid-cols-1 gap-6">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>
          </div>

          <div className="mt-8">
            <Button type="submit" className="w-full md:w-auto" disabled={loading}>
              {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </Button>
          </div>
        </form>
      )}

      {/* Password Change Form */}
      {activeTab === "password" && !verificationStep && (
        <form onSubmit={handlePasswordRequest}>
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                رمز عبور فعلی
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Lock size={16} className="text-gray-400" />
                </div>
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="pr-10"
                  dir="ltr"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 left-0 flex items-center pl-3"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <EyeOff size={16} className="text-gray-400" />
                  ) : (
                    <Eye size={16} className="text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                رمز عبور جدید
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Lock size={16} className="text-gray-400" />
                </div>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="pr-10"
                  dir="ltr"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 left-0 flex items-center pl-3"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff size={16} className="text-gray-400" />
                  ) : (
                    <Eye size={16} className="text-gray-400" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500">رمز عبور باید حداقل ۸ کاراکتر باشد</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                تکرار رمز عبور جدید
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Lock size={16} className="text-gray-400" />
                </div>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="pr-10"
                  dir="ltr"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 left-0 flex items-center pl-3"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={16} className="text-gray-400" />
                  ) : (
                    <Eye size={16} className="text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Button type="submit" className="w-full md:w-auto" disabled={loading}>
              {loading ? "در حال ارسال..." : "درخواست تغییر رمز عبور"}
            </Button>
          </div>
        </form>
      )}

      {/* Verification Code Form */}
      {activeTab === "password" && verificationStep && (
        <form onSubmit={handleVerificationSubmit}>
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">تایید کد ارسال شده</h3>
              <p className="text-gray-500 mb-4">کد تایید به شماره موبایل شما ارسال شد. لطفا آن را وارد کنید.</p>

              <div className="flex flex-row-reverse justify-center gap-2 mb-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Input
                    key={index}
                    type="text"
                    value={verificationCode[4 - index]} // Reverse the index to start from left
                    onChange={(e) => handleVerificationCodeChange(4 - index, e.target.value)} // Reverse the index
                    onKeyDown={(e) => handleVerificationCodeKeyDown(4 - index, e)} // Reverse the index
                    className="w-12 h-12 text-center text-lg"
                    maxLength={1}
                    ref={(el) => (codeInputRefs.current[4 - index] = el)} // Reverse the index
                    inputMode="numeric"
                  />
                ))}
              </div>

              <p className="text-sm text-gray-500">
                کد را دریافت نکردید؟{" "}
                <button type="button" className="text-primary hover:text-primary/80">
                  ارسال مجدد
                </button>
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col md:flex-row gap-4">
            <Button type="submit" className="w-full md:w-auto" disabled={loading}>
              {loading ? "در حال بررسی..." : "تایید و تغییر رمز عبور"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full md:w-auto"
              onClick={() => setVerificationStep(false)}
              disabled={loading}
            >
              بازگشت
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
