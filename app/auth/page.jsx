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

// First, import the SearchableSelect component and the Iran states and cities data
import { SearchableSelect } from "@/components/ui/searchable-select"
import { iranStatesAndCities } from "@/lib/iran-states-cities"

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
  const [nationalCode, setNationalCode] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [buildingNumber, setBuildingNumber] = useState("")
  const [postalCode, setPostalCode] = useState("")

  // Add state and city to the form data
  const [state, setState] = useState(null)
  const [city, setCity] = useState(null)

  // Form errors
  const [phoneError, setPhoneError] = useState(null)
  const [codeError, setCodeError] = useState(null)
  const [firstNameError, setFirstNameError] = useState(null)
  const [lastNameError, setLastNameError] = useState(null)
  const [nationalCodeError, setNationalCodeError] = useState(null)
  const [emailError, setEmailError] = useState(null)
  const [addressError, setAddressError] = useState(null)
  const [buildingNumberError, setBuildingNumberError] = useState(null)
  const [postalCodeError, setPostalCodeError] = useState(null)

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
      // Simulate API call to send verification code
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Move to verification step
      setStep(2)
    } catch (err) {
      setError("خطا در ارسال کد تایید. لطفا دوباره تلاش کنید.")
    } finally {
      setLoading(false)
    }
  }

  const handleVerificationSubmit = async (e) => {
    e.preventDefault()

    // Get full verification code
    const fullCode = getFullVerificationCode()

    // Validate verification code
    const error = validateVerificationCode(fullCode)
    setCodeError(error)
    if (error) return

    setLoading(true)
    setError(null)

    try {
      // Simulate API call to verify code
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulate user check - if user exists, go to home, else go to registration
      const userExists = false // This would be determined by your API

      if (userExists) {
        // Redirect to home page
        window.location.href = "/home"
      } else {
        // Start registration process
        setIsRegistering(true)
        setRegistrationStep(1)
      }
    } catch (err) {
      setError("کد تایید نامعتبر است. لطفا دوباره تلاش کنید.")
    } finally {
      setLoading(false)
    }
  }

  const handleRegistrationStep1Submit = (e) => {
    e.preventDefault()

    // Validate first name, last name, national code, and email
    const fnError = validateName(firstName)
    const lnError = validateName(lastName)
    const ncError = validateNationalCode(nationalCode)
    const emError = validateEmail(email)

    setFirstNameError(fnError)
    setLastNameError(lnError)
    setNationalCodeError(ncError)
    setEmailError(emError)

    if (fnError || lnError || ncError || emError) return

    // Move to registration step 2
    setRegistrationStep(2)
  }

  const handleRegistrationStep2Submit = async (e) => {
    e.preventDefault()

    // Validate address, building number, postal code, state, and city
    let hasError = false

    if (!address) {
      setAddressError("آدرس الزامی است")
      hasError = true
    } else {
      setAddressError(null)
    }

    if (!buildingNumber) {
      setBuildingNumberError("پلاک الزامی است")
      hasError = true
    } else {
      setBuildingNumberError(null)
    }

    if (!state) {
      setStateError("انتخاب استان الزامی است")
      hasError = true
    } else {
      setStateError(null)
    }

    if (!city) {
      setCityError("انتخاب شهر الزامی است")
      hasError = true
    } else {
      setCityError(null)
    }

    const pcError = validatePostalCode(postalCode)
    setPostalCodeError(pcError)

    if (hasError || pcError) return

    setLoading(true)
    setError(null)

    try {
      // Simulate API call to register user
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirect to home page after successful registration
      window.location.href = "/dashboard/user"
    } catch (err) {
      setError("خطا در ثبت اطلاعات. لطفا دوباره تلاش کنید.")
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
        <div className="space-y-2">
          <div className="flex justify-center gap-2 py-6">
            {/* Reverse the array to display inputs from left to right in RTL context */}
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
              />
            ))}
          </div>
          {codeError && <p className="text-sm text-destructive">{codeError}</p>}
          <p className="text-sm text-muted-foreground text-center">کد تایید به شماره {phone} ارسال شد</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-3 pt-2">
        <Button type="submit" className="w-full shadow-sm hover:shadow-md transition-all" disabled={loading}>
          {loading ? (
            "در حال بررسی..."
          ) : (
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
          onClick={() => setStep(1)}
          disabled={loading}
        >
          تغییر شماره موبایل
        </Button>
      </CardFooter>
    </form>
  )

  const renderRegistrationStep1 = () => (
    <form onSubmit={handleRegistrationStep1Submit}>
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
          <label htmlFor="nationalCode" className="text-sm font-medium">
            کد ملی
          </label>
          <Input
            id="nationalCode"
            type="text"
            placeholder="کد ملی ۱۰ رقمی"
            value={nationalCode}
            onChange={handleNationalCodeChange}
            className={nationalCodeError ? "border-destructive" : ""}
            maxLength={10}
            dir="ltr"
          />
          {nationalCodeError && <p className="text-sm text-destructive">{nationalCodeError}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            ایمیل
          </label>
          <Input
            id="email"
            type="email"
            placeholder="example@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={emailError ? "border-destructive" : ""}
            dir="ltr"
          />
          {emailError && <p className="text-sm text-destructive">{emailError}</p>}
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full">
          <ArrowLeft className="h-4 w-4 ml-2" />
          مرحله بعد
        </Button>
      </CardFooter>
    </form>
  )

  const renderRegistrationStep2 = () => {
    // Get cities for the selected state
    const selectedState = iranStatesAndCities.find((s) => s.id === state)
    const cities = selectedState ? selectedState.cities : []

    return (
      <form onSubmit={handleRegistrationStep2Submit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="address" className="text-sm font-medium">
              آدرس
            </label>
            <Input
              id="address"
              type="text"
              placeholder="آدرس کامل"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={addressError ? "border-destructive" : ""}
            />
            {addressError && <p className="text-sm text-destructive">{addressError}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="state" className="text-sm font-medium">
                استان
              </label>
              <SearchableSelect
                options={iranStatesAndCities}
                value={state}
                onChange={setState}
                placeholder="انتخاب استان"
                error={!!stateError}
              />
              {stateError && <p className="text-sm text-destructive">{stateError}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="city" className="text-sm font-medium">
                شهر
              </label>
              <SearchableSelect
                options={cities}
                value={city}
                onChange={setCity}
                placeholder="انتخاب شهر"
                disabled={!state}
                error={!!cityError}
              />
              {cityError && <p className="text-sm text-destructive">{cityError}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="buildingNumber" className="text-sm font-medium">
                پلاک
              </label>
              <Input
                id="buildingNumber"
                type="text"
                placeholder="پلاک"
                value={buildingNumber}
                onChange={(e) => setBuildingNumber(e.target.value)}
                className={buildingNumberError ? "border-destructive" : ""}
              />
              {buildingNumberError && <p className="text-sm text-destructive">{buildingNumberError}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="postalCode" className="text-sm font-medium">
                کد پستی
              </label>
              <Input
                id="postalCode"
                type="text"
                placeholder="کد پستی ۱۰ رقمی"
                value={postalCode}
                onChange={handlePostalCodeChange}
                className={postalCodeError ? "border-destructive" : ""}
                maxLength={10}
                dir="ltr"
              />
              {postalCodeError && <p className="text-sm text-destructive">{postalCodeError}</p>}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
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
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => setRegistrationStep(1)}
            disabled={loading}
          >
            بازگشت به مرحله قبل
          </Button>
        </CardFooter>
      </form>
    )
  }

  // Determine what content to show
  const renderContent = () => {
    if (!isRegistering) {
      // Login flow
      if (step === 1) return renderPhoneStep()
      if (step === 2) return renderVerificationStep()
    } else {
      // Registration flow
      if (registrationStep === 1) return renderRegistrationStep1()
      if (registrationStep === 2) return renderRegistrationStep2()
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
        description:
          registrationStep === 1 ? "لطفا اطلاعات شخصی خود را وارد کنید" : "لطفا اطلاعات آدرس خود را وارد کنید",
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
