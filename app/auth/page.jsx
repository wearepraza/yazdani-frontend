"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"
import OTPLoginForm from "./OTPLoginForm"

export default function AuthPage() {
  const [mode, setMode] = useState("login") // login | register | otp
  const [error, setError] = useState(null)

  const handleModeChange = (newMode) => {
    setError(null)
    setMode(newMode)
  }

  const getHeaderContent = () => {
    switch (mode) {
      case "login":
        return { title: "ورود به حساب", description: "شماره موبایل و رمز عبور خود را وارد کنید" }
      case "otp":
        return { title: "ورود با رمز یک‌بار مصرف", description: "کد تایید را وارد کنید" }
      case "register":
        return { title: "ثبت‌نام", description: "اطلاعات خود را وارد کنید" }
    }
  }

  const header = getHeaderContent()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-center text-xl">{header.title}</CardTitle>
          <CardDescription className="text-center">{header.description}</CardDescription>
        </CardHeader>

        {error && (
          <div className="px-6 mt-2">
            <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">{error}</p>
          </div>
        )}

        {/* Render forms */}
        {mode === "login" && <LoginForm onSwitchMode={handleModeChange} setError={setError} />}
        {mode === "register" && <RegisterForm onSwitchMode={handleModeChange} setError={setError} />}
        {mode === "otp" && <OTPLoginForm onSwitchMode={handleModeChange} setError={setError} />}

        {/* Bottom Switch */}
        <CardFooter className="flex justify-center gap-4 text-sm pt-0">
          {mode !== "login" && (
            <Button variant="link" onClick={() => handleModeChange("login")}>ورود با رمز</Button>
          )}
          {mode !== "otp" && (
            <Button variant="link" onClick={() => handleModeChange("otp")}>رمز را فراموش کرده‌اید؟</Button>
          )}
          {mode !== "register" && (
            <Button variant="link" onClick={() => handleModeChange("register")}>ثبت‌نام</Button>
          )}
        </CardFooter>
      </Card>
      <p className="text-xs text-gray-400 mt-4">فونیکسو - نسخه ۱.۰.۰</p>
    </div>
  )
}
