"use client"

import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, User } from "lucide-react"
import Cookies from "js-cookie"
import { sendCode } from "@/lib/api/auth/sendCode"
import { verifyCode } from "@/lib/api/auth/verifyCode"
import { register } from "@/lib/api/auth/register"
import {
  validateName,
  validatePhoneNumber,
  validateVerificationCode,
} from "@/lib/validation"

export default function RegisterForm({ setError }) {
  const [step, setStep] = useState(1) // 1: phone, 2: code, 3: form
  const [loading, setLoading] = useState(false)

  const [phone, setPhone] = useState("")
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", ""])
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [password, setPassword] = useState("")
  const [invitationCode, setInvitationCode] = useState("")

  const [phoneError, setPhoneError] = useState(null)
  const [codeError, setCodeError] = useState(null)
  const [firstNameError, setFirstNameError] = useState(null)
  const [lastNameError, setLastNameError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  const [invitationCodeError, setInvitationCodeError] = useState(null)

  const inputRefs = useRef([])

  const getCode = () => verificationCode.join("")

  // Step 1: send code
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
        setError(response.message || "ارسال کد با خطا مواجه شد.")
      }
    } catch {
      setError("خطا در ارسال کد.")
    } finally {
      setLoading(false)
    }
  }

  // Step 2: verify code
  const handleVerifyCode = async (e) => {
    e.preventDefault()

    const code = getCode()
    const error = validateVerificationCode(code)
    setCodeError(error)
    if (error) return

    setLoading(true)
    setError(null)

    try {
      const response = await verifyCode(phone, code)
      if (response.status === 200) {
        setStep(3)
      } else {
        setError(response.message || "کد تایید نامعتبر است.")
      }
    } catch {
      setError("تایید کد با خطا مواجه شد.")
    } finally {
      setLoading(false)
    }
  }

  // Step 3: register
  const handleRegister = async (e) => {
    e.preventDefault()

    const fnError = validateName(firstName)
    const lnError = validateName(lastName)
    const pwError = !password ? "رمز عبور الزامی است." : null
    const icError = !invitationCode ? "کد دعوت الزامی است." : null

    setFirstNameError(fnError)
    setLastNameError(lnError)
    setPasswordError(pwError)
    setInvitationCodeError(icError)

    if (fnError || lnError || pwError || icError) return

    setLoading(true)
    setError(null)

    try {
      const response = await register(phone, firstName, lastName, password, invitationCode)

      if (
        response.error ||
        !response.data ||
        !(response.status >= 200 && response.status < 300)
      ) {
        setError(response.message || "ثبت‌نام با خطا مواجه شد.")
        return
      }

      if (response.data.token) {
        Cookies.set("authToken", response.data.token, { expires: 30 })
        Cookies.set("dashboardPath", "/dashboard/user", { expires: 30 })
        window.location.href = "/dashboard/user"
      } else {
        setError(response.data.message || "توکن دریافت نشد.")
      }
    } catch {
      setError("خطا در ثبت‌نام.")
    } finally {
      setLoading(false)
    }
  }

  const handleCodeChange = (index, value) => {
    if (value.length > 1) value = value.charAt(0)
    if (!/^\d*$/.test(value)) return

    const newCode = [...verificationCode]
    newCode[index] = value
    setVerificationCode(newCode)

    if (value && index < 4) inputRefs.current[index + 1]?.focus()
  }

  const handleCodeKeyDown = (index, e) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  return (
    <form onSubmit={
      step === 1 ? handleSendCode :
      step === 2 ? handleVerifyCode :
      handleRegister
    } className="px-6 space-y-4 pb-6">

      {/* Step 1: Phone */}
      {step === 1 && (
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
          <Button type="submit" className="w-full mt-4" disabled={loading}>
            {loading ? "در حال ارسال..." : (
              <>
                <ArrowLeft className="ml-2 h-4 w-4" />
                ارسال کد تایید
              </>
            )}
          </Button>
        </div>
      )}

      {/* Step 2: Code */}
      {step === 2 && (
        <>
          <p className="text-sm text-muted-foreground">کد تایید به شماره {phone} ارسال شد</p>
          <div className="flex gap-2 justify-center" dir="ltr">
            {[0, 1, 2, 3, 4].map((i) => (
              <Input
                key={i}
                type="text"
                value={verificationCode[i]}
                onChange={(e) => handleCodeChange(i, e.target.value)}
                onKeyDown={(e) => handleCodeKeyDown(i, e)}
                ref={(el) => (inputRefs.current[i] = el)}
                maxLength={1}
                className={`w-12 h-12 text-center text-lg ${codeError ? "border-destructive" : ""}`}
              />
            ))}
          </div>
          {codeError && <p className="text-sm text-destructive text-center">{codeError}</p>}
          <Button type="submit" className="w-full mt-4" disabled={loading}>
            {loading ? "در حال تایید..." : (
              <>
                <ArrowLeft className="ml-2 h-4 w-4" />
                تایید کد
              </>
            )}
          </Button>
        </>
      )}

      {/* Step 3: Form */}
      {step === 3 && (
        <>
          <div className="space-y-2">
            <label className="text-sm font-medium">نام</label>
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="نام"
              className={firstNameError ? "border-destructive" : ""}
            />
            {firstNameError && <p className="text-sm text-destructive">{firstNameError}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">نام خانوادگی</label>
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="نام خانوادگی"
              className={lastNameError ? "border-destructive" : ""}
            />
            {lastNameError && <p className="text-sm text-destructive">{lastNameError}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">رمز عبور</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="رمز عبور"
              className={passwordError ? "border-destructive" : ""}
            />
            {passwordError && <p className="text-sm text-destructive">{passwordError}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">کد دعوت</label>
            <Input
              value={invitationCode}
              onChange={(e) => setInvitationCode(e.target.value)}
              placeholder="کد دعوت"
              className={invitationCodeError ? "border-destructive" : ""}
            />
            {invitationCodeError && <p className="text-sm text-destructive">{invitationCodeError}</p>}
          </div>

          <Button type="submit" className="w-full mt-4" disabled={loading}>
            {loading ? "در حال ثبت‌نام..." : (
              <>
                <User className="ml-2 h-4 w-4" />
                ثبت‌نام
              </>
            )}
          </Button>
        </>
      )}
    </form>
  )
}
