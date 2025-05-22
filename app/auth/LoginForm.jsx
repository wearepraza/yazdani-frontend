"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import Cookies from "js-cookie"
import { loginWithPassword } from "@/lib/api/auth/loginWithPassword"

export default function LoginForm({ onSwitchMode, setError }) {
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [phoneError, setPhoneError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!/^09\d{9}$/.test(phone)) {
      setPhoneError("شماره موبایل معتبر نیست.")
      return
    } else {
      setPhoneError(null)
    }

    if (!password) {
      setPasswordError("رمز عبور الزامی است.")
      return
    } else {
      setPasswordError(null)
    }

    setLoading(true)
    setError(null)

    try {
      const response = await loginWithPassword(phone, password)
console.log(response)
      if (response?.status === 200 && response.data?.token) {
        Cookies.set("authToken", response.data.token, { expires: 30 })
        Cookies.set("dashboardPath", "/dashboard/user", { expires: 30 })

        if (response.data.user?.is_admin) {
          window.location.href = "/dashboard/admin"
        } else {
          window.location.href = "/dashboard/user"
        }
      } else {
        setError(response.error || "ورود ناموفق بود. لطفا دوباره تلاش کنید.")
      }
    } catch (err) {
      setError("خطا در برقراری ارتباط با سرور.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="px-6 space-y-2 pb-6">
      <div className="space-y-1">
        <label className="text-sm font-medium">شماره موبایل</label>
        <Input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="۰۹۱۲۳۴۵۶۷۸۹"
          className={phoneError ? "border-destructive" : ""}
          dir="ltr"
        />
        {phoneError && <p className="text-sm text-destructive">{phoneError}</p>}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">رمز عبور</label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="رمز عبور"
            className={passwordError ? "border-destructive" : ""}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        {passwordError && <p className="text-sm text-destructive">{passwordError}</p>}
      </div>

      <Button type="submit" className="w-full mt-5" disabled={loading}>
        {loading ? "در حال ورود..." : (
          <>
            <ArrowLeft className="h-4 w-4 ml-2" />
            ورود
          </>
        )}
      </Button>
    </form>
  )
}
