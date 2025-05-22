"use client"

import { useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Cookies from "js-cookie"
import { sendCode } from "@/lib/api/auth/sendCode"
import { verifyCode } from "@/lib/api/auth/verifyCode"
import { validatePhoneNumber, validateVerificationCode } from "@/lib/validation"

export default function OTPLoginForm({ onSwitchMode, setError }) {
  const [step, setStep] = useState(1)
  const [phone, setPhone] = useState("")
  const [code, setCode] = useState(["", "", "", "", ""])
  const [loading, setLoading] = useState(false)
  const [phoneError, setPhoneError] = useState(null)
  const [codeError, setCodeError] = useState(null)
  const inputRefs = useRef([])

  const getFullCode = () => code.join("")

  useEffect(() => {
    if (step === 2) inputRefs.current[0]?.focus()
  }, [step])

  const handleSendCode = async (e) => {
    e.preventDefault()
    const error = validatePhoneNumber(phone)
    setPhoneError(error)
    if (error) return

    setLoading(true)
    setError(null)

    try {
      const response = await sendCode(phone)

      if (response.status === 200) {
        setStep(2)
      } else {
        setError(response.message || "خطا در ارسال کد.")
      }
    } catch (err) {
      setError("خطا در برقراری ارتباط.")
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyCode = async (e) => {
    e.preventDefault()

    const fullCode = getFullCode()
    const error = validateVerificationCode(fullCode)
    setCodeError(error)
    if (error) return

    setLoading(true)
    setError(null)

    try {
      const response = await verifyCode(phone, fullCode)

      if (response?.status === 200 && response.data) {
        if (response.data.status === "new") {
          onSwitchMode("register")
        } else if (response.data.status === "existing") {
          const token = response.data.token
          if (token) {
            Cookies.set("authToken", token, { expires: 30 })
            Cookies.set("dashboardPath", "/dashboard/user", { expires: 30 })
            if (response.data.user?.is_admin) {
              window.location.href = "/dashboard/admin"
            } else {
              window.location.href = "/dashboard/user"
            }
          } else {
            setError("توکن دریافت نشد.")
          }
        } else {
          setError("وضعیت کاربر نامشخص است.")
        }
      } else {
        setError(response.message || "کد اشتباه است.")
      }
    } catch (err) {
      setError("خطا در تأیید کد.")
    } finally {
      setLoading(false)
    }
  }

  const handleCodeChange = (index, value) => {
    if (value.length > 1) value = value.charAt(0)
    if (!/^\d*$/.test(value)) return

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    if (value && index < 4) inputRefs.current[index + 1]?.focus()
  }

  const handleCodeKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  return step === 1 ? (
    <form onSubmit={handleSendCode} className="px-6 space-y-4 pb-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">شماره موبایل</label>
        <Input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="۰۹۱۲۳۴۵۶۷۸۹"
          dir="ltr"
          className={phoneError ? "border-destructive" : ""}
        />
        {phoneError && <p className="text-sm text-destructive">{phoneError}</p>}
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "در حال ارسال..." : (
          <>
            <ArrowLeft className="h-4 w-4 ml-2" />
            ارسال کد تایید
          </>
        )}
      </Button>
    </form>
  ) : (
    <form onSubmit={handleVerifyCode} className="px-6 space-y-4 pb-6">
      <div className="flex justify-center gap-2 py-6" dir="ltr">
        {[0, 1, 2, 3, 4].map((index) => (
          <Input
            key={index}
            type="text"
            maxLength={1}
            value={code[index]}
            onChange={(e) => handleCodeChange(index, e.target.value)}
            onKeyDown={(e) => handleCodeKeyDown(index, e)}
            ref={(el) => (inputRefs.current[index] = el)}
            className={`w-12 h-12 text-center text-lg shadow-sm transition-all ${
              codeError ? "border-destructive" : ""
            }`}
            inputMode="numeric"
          />
        ))}
      </div>
      {codeError && <p className="text-sm text-destructive text-center">{codeError}</p>}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "در حال بررسی..." : (
          <>
            <ArrowLeft className="h-4 w-4 ml-2" />
            تایید کد
          </>
        )}
      </Button>
    </form>
  )
}
