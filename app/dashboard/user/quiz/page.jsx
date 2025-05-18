"use client"

import { useState, useEffect } from "react"
import { CheckCircle, Clock, Award, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Sample single daily question
const dailyQuestion = {
  id: 1,
  question: "کدام یک از موارد زیر از مزایای خرید از فروشگاه فونیکسو است؟",
  options: ["گارانتی اصالت کالا", "ارسال سریع", "پشتیبانی ۲۴ ساعته", "همه موارد"],
  correctAnswer: 3,
}

export default function DailyQuizPage() {
  const [answer, setAnswer] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds
  const [isActive, setIsActive] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    let interval = null
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000)
    } else if (timeLeft === 0 && isActive) {
      clearInterval(interval)
      handleSubmit()
    }
    return () => clearInterval(interval)
  }, [isActive, timeLeft])

  const startQuiz = () => {
    setIsActive(true)
    setHasStarted(true)
  }

  const handleAnswerChange = (optionIndex) => {
    setAnswer(optionIndex)
  }

  const handleSubmit = () => {
    const isCorrect = answer === dailyQuestion.correctAnswer
    setScore(isCorrect ? 10 : 0)
    setSubmitted(true)
    setIsActive(false)
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }

  if (!hasStarted) {
    return (
      <div className="text-center max-w-md mx-auto p-6 bg-white rounded-xl shadow-sm border">
        <h1 className="text-2xl font-bold mb-2">آزمون روزانه</h1>
        <p className="text-gray-500 mb-6">با پاسخ به سوال روزانه امتیاز کسب کنید!</p>

        <div className="bg-blue-50 p-4 rounded-full w-fit mx-auto mb-4">
          <HelpCircle className="h-12 w-12 text-blue-500" />
        </div>

        <p className="text-gray-600 mb-6">
          امروز تنها یک سوال برای شما آماده شده است. با پاسخ صحیح امتیاز بگیرید.
        </p>

        <Button onClick={startQuiz} className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg">
          شروع آزمون
        </Button>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="text-center max-w-md mx-auto p-6 bg-white rounded-xl shadow-sm border">
        <h1 className="text-2xl font-bold mb-2">نتیجه آزمون</h1>
        <p className="text-gray-500 mb-6">امتیاز امروز شما</p>

        <div className="bg-green-50 p-4 rounded-full w-fit mx-auto mb-4">
          <Award className="h-12 w-12 text-green-500" />
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-primary text-white rounded-xl p-6 mb-6">
          <p className="text-lg mb-2">امتیاز کسب شده:</p>
          <p className="text-4xl font-bold">{score} امتیاز</p>
        </div>

        <Link href="/dashboard/user/club">
          <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg">
            بازگشت به باشگاه مشتریان
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-sm border">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-amber-500" />
          <span className="text-sm text-gray-600">زمان باقی‌مانده: {formatTime(timeLeft)}</span>
        </div>
        <span className="text-sm text-gray-600">سوال 1 از 1</span>
      </div>

      <div className="border rounded-lg p-5 shadow-sm mb-6">
        <h3 className="font-medium text-lg mb-4">{dailyQuestion.question}</h3>
        <div className="space-y-3">
          {dailyQuestion.options.map((option, index) => (
            <label
              key={index}
              className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer border ${
                answer === index ? "bg-primary/10 border-primary" : "bg-gray-50 border-gray-200"
              }`}
            >
              <input
                type="radio"
                name="daily-question"
                checked={answer === index}
                onChange={() => handleAnswerChange(index)}
                className="hidden"
              />
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  answer === index ? "border-primary" : "border-gray-300"
                }`}
              >
                {answer === index && <div className="w-3 h-3 rounded-full bg-primary"></div>}
              </div>
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={answer === null}
        className={`w-full px-6 py-2.5 rounded-lg flex items-center justify-center ${
          answer !== null ? "bg-primary text-white hover:bg-primary/90" : "bg-gray-100 text-gray-400 cursor-not-allowed"
        }`}
      >
        ثبت پاسخ
      </Button>
    </div>
  )
}
