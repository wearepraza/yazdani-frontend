"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  validatePhoneNumber,
  validateVerificationCode,
  validateName,
  validateNationalCode,
  validateEmail,
  validatePostalCode,
} from "@/lib/validation"
import { ArrowLeft, User } from "lucide-react"
import Cookies from "js-cookie"

// First, import the SearchableSelect component and the Iran states and cities data
import { SearchableSelect } from "@/components/ui/searchable-select"
import { iranStatesAndCities } from "@/lib/iran-states-cities"
import { sendCode } from "@/lib/api/auth/sendCode"
import { verifyCode } from "@/lib/api/auth/verifyCode"
import { register } from "@/lib/api/auth/register"
import { Playwrite_BE_VLG } from "next/font/google"

export default function AuthPage() {
  // Main flow steps: 1 = phone, 2 = verification code
  const [step, setStep] = useState(1)

  // Registration steps: 1 = personal info, 2 = address info
  const [registrationStep, setRegistrationStep] = useState(1)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isRegistering, setIsRegistering] = useState(false)

  // Form data
  const [phone, setPhone] = useState("")
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", ""])
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [password, setPassword] = useState("")
  const [invitationCode, setInvitationCode] = useState("")

  // Add state and city to the form data
  const [state, setState] = useState(null)
  const [city, setCity] = useState(null)

  // Form errors
  const [phoneError, setPhoneError] = useState(null)
  const [codeError, setCodeError] = useState(null)
  const [firstNameError, setFirstNameError] = useState(null)
  const [lastNameError, setLastNameError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  const [invitationCodeError, setInvitationCodeError] = useState(null)

  // Add state and city errors
  const [stateError, setStateError] = useState(null)
  const [cityError, setCityError] = useState(null)

  // Refs for verification code inputs
  const codeInputRefs = useRef([])

  // Helper function to combine verification code array into a string
  const getFullVerificationCode = () => verificationCode.join("")

  // Reset city when state changes
  useEffect(() => {
    if (state) {
      setCity(null)
    }
  }, [state])

  const handlePhoneSubmit = async (e) => {
    e.preventDefault()

    // Validate phone
    const error = validatePhoneNumber(phone)
    setPhoneError(error)
    if (error) return

    setLoading(true)
    setError(null)

    try {
      const response = await sendCode(phone)

      if (response.status === 200) {
        // Move to verification step
        setStep(2)
      } else {
        setError(response.message || "خطا در ارسال کد تایید. لطفا دوباره تلاش کنید.")
      }
    } catch (err) {
      setError("خطا در ارسال کد تایید. لطفا دوباره تلاش کنید.")
    } finally {
      setLoading(false)
    }
  }

  const handleVerificationSubmit = async (e) => {
    e.preventDefault()

    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "dashboardPath=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    const fullCode = getFullVerificationCode()

    const error = validateVerificationCode(fullCode)
    setCodeError(error)
    if (error) return

    setLoading(true)
    setError(null)

    try {
      const response = await verifyCode(phone, fullCode)
console.log(response)
      if (response.status === 200 && response.data) {
        if (response.data.status === "new") {
          setIsRegistering(true)
        } else if (response.data.status === "existing") {
          const token = response.data.token
          if (token) {
              Cookies.set("authToken", token, { expires: 30 })
              Cookies.set("dashboardPath", "/dashboard/admin", { expires: 30 });
              if(response.data.user.is_admin===1) {
                window.location.href = "/dashboard/admin"
              }else{
                window.location.href = "/dashboard/user"

              }
          } else {
            setError("توکن دریافت نشد. لطفا دوباره تلاش کنید.")
          }
        } else {
          setError("وضعیت کاربر نامشخص است.")
        }
      } else {
        setError(response.message || "کد تایید نامعتبر است. لطفا دوباره تلاش کنید.")
      }
    } catch (err) {
      setError("کد تایید نامعتبر است. لطفا دوباره تلاش کنید.")
    } finally {
      setLoading(false)
    }
  }

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault()
  
    const fnError = validateName(firstName)
    const lnError = validateName(lastName)
    const pwError = !password ? "رمز عبور الزامی است" : null
    const icError = !invitationCode ? "کد دعوت الزامی است" : null
  
    setFirstNameError(fnError)
    setLastNameError(lnError)
    setPasswordError(pwError)
    setInvitationCodeError(icError)
  
    if (fnError || lnError || pwError || icError) return
  
    setLoading(true)
    setError(null)
  
    try {
      const response = await register(phone, firstName, lastName, password, invitationCode)
  
      if (response.error || !response.data || !(response.status >= 200 && response.status < 300)) {
        setError(response.message || "خطا در ثبت نام. لطفا دوباره تلاش کنید.")
        return
      }
  
      if (response.data.token) {
        const token = response.data.token
        Cookies.set("authToken", token, { expires: 30 })
        Cookies.set("dashboardPath", "/dashboard/user", { expires: 30 })
        window.location.href = "/dashboard/user"
      } else {
        setError(response.data.message || "خطا در ثبت نام. لطفا دوباره تلاش کنید.")
      }
    } catch (err) {
      setError("خطا در ثبت نام. لطفا دوباره تلاش کنید.")
    } finally {
      setLoading(false)
    }
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

  // Handle national code input to ensure only numbers
  const handleNationalCodeChange = (e) => {
    const value = e.target.value

    // Only allow numbers
    if (value && !/^\d*$/.test(value)) {
      return
    }

    setNationalCode(value)

    // Show error if more than 10 digits
    if (value.length > 10) {
      setNationalCodeError("کد ملی نمی‌تواند بیشتر از ۱۰ رقم باشد")
    } else {
      setNationalCodeError(null)
    }
  }

  // Handle postal code input to ensure only numbers
  const handlePostalCodeChange = (e) => {
    const value = e.target.value

    // Only allow numbers
    if (value && !/^\d*$/.test(value)) {
      return
    }

    setPostalCode(value)

    // Show error if more than 10 digits
    if (value.length > 10) {
      setPostalCodeError("کد پستی نمی‌تواند بیشتر از ۱۰ رقم باشد")
    } else {
      setPostalCodeError(null)
    }
  }

  const renderPhoneStep = () => (
    <form onSubmit={handlePhoneSubmit}>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium">
            شماره موبایل
          </label>
          <Input
            id="phone"
            type="tel"
            placeholder="۰۹۱۲۳۴۵۶۷۸۹"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={phoneError ? "border-destructive" : ""}
            dir="ltr"
          />
          {phoneError && <p className="text-sm text-destructive">{phoneError}</p>}
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            "در حال ارسال..."
          ) : (
            <>
              <ArrowLeft className="h-4 w-4 ml-2" />
              دریافت کد تایید
            </>
          )}
        </Button>
      </CardFooter>
    </form>
  )

  const renderVerificationStep = () => (
    <form onSubmit={handleVerificationSubmit}>
      <CardContent className="space-y-4">
        <div
          className="flex justify-center gap-2 py-6"
          dir="ltr"               // ← force left-to-right here
        >
          {[0, 1, 2, 3, 4].map((index) => (
            <Input
              key={index}
              type="text"
              value={verificationCode[index]}
              onChange={(e) => handleVerificationCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleVerificationCodeKeyDown(index, e)}
              className={`w-12 h-12 text-center text-lg shadow-sm transition-all focus:shadow-md ${codeError ? "border-destructive" : ""}`}
              maxLength={1}
              ref={(el) => (codeInputRefs.current[index] = el)}
              inputMode="numeric"
              dir="ltr"           // ← ensure each box is also LTR
            />
          ))}
        </div>
        {codeError && <p className="text-sm text-destructive">{codeError}</p>}
        <p className="text-sm text-muted-foreground text-center">
          کد تایید به شماره {phone} ارسال شد
        </p>
      </CardContent>
      <CardFooter className="flex flex-col space-y-3 pt-2">
        <Button type="submit" className="w-full shadow-sm hover:shadow-md transition-all" disabled={loading}>
          {loading ? "در حال بررسی..." : (
            <>
              <ArrowLeft className="h-4 w-4 ml-2" />
              تایید
            </>
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full border-gray-200 hover:bg-gray-50 transition-all"
          onClick={() => {
            setStep(1)
            setPhone("")
            setVerificationCode(["", "", "", "", ""])
            setCodeError(null)
            setError(null)
          }}
          disabled={loading}
        >
          تغییر شماره موبایل
        </Button>
      </CardFooter>
    </form>
  )

  const renderRegistration = () => (
    <form onSubmit={handleRegistrationSubmit}>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="firstName" className="text-sm font-medium">
            نام
          </label>
          <Input
            id="firstName"
            type="text"
            placeholder="نام"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={firstNameError ? "border-destructive" : ""}
          />
          {firstNameError && <p className="text-sm text-destructive">{firstNameError}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="lastName" className="text-sm font-medium">
            نام خانوادگی
          </label>
          <Input
            id="lastName"
            type="text"
            placeholder="نام خانوادگی"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={lastNameError ? "border-destructive" : ""}
          />
          {lastNameError && <p className="text-sm text-destructive">{lastNameError}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            رمز عبور
          </label>
          <Input
            id="password"
            type="password"
            placeholder="رمز عبور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={passwordError ? "border-destructive" : ""}
          />
          {passwordError && <p className="text-sm text-destructive">{passwordError}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="invitationCode" className="text-sm font-medium">
            کد دعوت
          </label>
          <Input
            id="invitationCode"
            type="text"
            placeholder="کد دعوت"
            value={invitationCode}
            onChange={(e) => setInvitationCode(e.target.value)}
            className={invitationCodeError ? "border-destructive" : ""}
          />
          {invitationCodeError && <p className="text-sm text-destructive">{invitationCodeError}</p>}
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            "در حال ثبت..."
          ) : (
            <>
              <User className="h-4 w-4 ml-2" />
              ثبت نام
            </>
          )}
        </Button>
      </CardFooter>
    </form>
  )

  // Determine what content to show
  const renderContent = () => {
    if (!isRegistering) {
      // Login flow
      if (step === 1) return renderPhoneStep()
      if (step === 2) return renderVerificationStep()
    } else {
      // Registration flow
      return renderRegistration()
    }
  }

  // Determine title and description
  const getHeaderContent = () => {
    if (!isRegistering) {
      // Login flow
      if (step === 1) {
        return {
          title: "ورود به سامانه",
          description: "لطفا شماره موبایل خود را وارد کنید",
        }
      }
      if (step === 2) {
        return {
          title: "تایید شماره موبایل",
          description: "کد تایید ارسال شده را وارد کنید",
        }
      }
    } else {
      // Registration flow
      return {
        title: "ثبت نام",
        description: "لطفا اطلاعات خود را وارد کنید",
      }
    }
  }

  const headerContent = getHeaderContent()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-center text-xl">{headerContent.title}</CardTitle>
          <CardDescription className="text-center">{headerContent.description}</CardDescription>
        </CardHeader>

        {/* Progress indicator - only show for registration */}
        {isRegistering && (
          <div className="px-6 mb-4">
            <div className="w-full bg-muted h-1 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-300 ease-in-out"
                style={{ width: `${(registrationStep / 2) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {error && (
          <div className="px-6 mt-4">
            <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">{error}</p>
          </div>
        )}

        {renderContent()}
      </Card>
      <p className="text-xs text-gray-400 mt-4">فونیکسو - نسخه ۱.۰.۰</p>
    </div>
  )
}
