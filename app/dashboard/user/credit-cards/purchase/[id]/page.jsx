"use client"

import { useState } from "react"
import { CreditCard, Check, ArrowRight, User, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import React from "react"
import { purchaseCards } from "@/lib/api/user/cards/purchaseCards"

// Sample credit cards data
const creditCards = [
  {
    id: "1",
    title: "کارت اعتباری طلایی",
    price: "۱,۵۰۰,۰۰۰",
    limit: "۵۰,۰۰۰,۰۰۰",
    duration: "۱۲ ماه",
    features: ["کارمزد ۱۸٪", "تقسیط تا ۱۲ ماه", "صدور آنی"],
    color: "from-amber-500 to-yellow-500",
    icon: "bg-amber-100 text-amber-600",
    popular: true,
  },
  {
    id: "2",
    title: "کارت اعتباری نقره‌ای",
    price: "۸۰۰,۰۰۰",
    limit: "۲۵,۰۰۰,۰۰۰",
    duration: "۶ ماه",
    features: ["کارمزد ۲۰٪", "تقسیط تا ۶ ماه", "صدور در ۲۴ ساعت"],
    color: "from-gray-400 to-gray-600",
    icon: "bg-gray-100 text-gray-600",
  },
  {
    id: "3",
    title: "کارت اعتباری برنزی",
    price: "۵۰۰,۰۰۰",
    limit: "۱۰,۰۰۰,۰۰۰",
    duration: "۳ ماه",
    features: ["کارمزد ۲۲٪", "تقسیط تا ۳ ماه", "صدور در ۴۸ ساعت"],
    color: "from-amber-700 to-amber-900",
    icon: "bg-amber-100 text-amber-800",
  },
]

export default function PurchaseCreditCardPage({ params }) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    nationalId: "",
    mobile: "",
    address: "",
    postalCode: "",
    acceptTerms: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const card = creditCards.find((c) => c.id === React.use(params).id) || creditCards[0]

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await purchaseCards(card.id);

      if (response && !response.error) {
        setIsSuccess(true);
        setStep(3);
      } else {
        console.error("Purchase failed:", response.message || "Unknown error");
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <Link href="/dashboard/user/credit-cards" className="text-gray-500 hover:text-primary transition-colors">
          <ArrowRight className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold mr-2">خرید کارت اعتباری</h1>
      </div>

      {/* Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 1 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
              }`}
            >
              <CreditCard className="h-5 w-5" />
            </div>
            <span className="text-xs mt-2">انتخاب کارت</span>
          </div>
          <div className={`h-1 flex-1 mx-2 ${step >= 2 ? "bg-primary" : "bg-gray-200"}`}></div>
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 2 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
              }`}
            >
              <User className="h-5 w-5" />
            </div>
            <span className="text-xs mt-2">اطلاعات شخصی</span>
          </div>
          <div className={`h-1 flex-1 mx-2 ${step >= 3 ? "bg-primary" : "bg-gray-200"}`}></div>
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 3 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
              }`}
            >
              <Check className="h-5 w-5" />
            </div>
            <span className="text-xs mt-2">تأیید نهایی</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            {step === 1 && (
              <div className="p-6">
                <h2 className="text-lg font-bold mb-4">انتخاب کارت اعتباری</h2>
                <div className="border-t border-gray-100 pt-4">
                  <div
                    className={`bg-gradient-to-r ${card.color} p-6 text-white rounded-xl mb-6 relative overflow-hidden`}
                  >
                    <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-black/10 rounded-full translate-x-1/2 translate-y-1/2"></div>

                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="font-bold text-xl">{card.title}</h3>
                          <p className="text-white/80 text-sm">کارت اعتباری</p>
                        </div>
                        <CreditCard className="h-8 w-8" />
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-white/80 text-xs mb-1">سقف اعتبار</p>
                          <p className="font-bold">{card.limit} تومان</p>
                        </div>
                        <div>
                          <p className="text-white/80 text-xs mb-1">مدت اعتبار</p>
                          <p className="font-bold">{card.duration}</p>
                        </div>
                      </div>

                      <div className="mt-6">
                        <p className="text-white/80 text-xs mb-1">هزینه صدور</p>
                        <p className="font-bold text-xl">{card.price} تومان</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <h3 className="font-medium">ویژگی‌های کارت:</h3>
                    <ul className="space-y-2">
                      {card.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-end">
                    <Button className="bg-primary text-white" onClick={() => setStep(2)}>
                      ادامه و تکمیل اطلاعات
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="p-6">
                <h2 className="text-lg font-bold mb-4">تکمیل اطلاعات شخصی</h2>
                <div className="border-t border-gray-100 pt-4">
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                          نام و نام خانوادگی <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="w-full border border-gray-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="nationalId" className="block text-sm font-medium text-gray-700 mb-1">
                          کد ملی <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="nationalId"
                          name="nationalId"
                          value={formData.nationalId}
                          onChange={handleInputChange}
                          className="w-full border border-gray-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                          شماره موبایل <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          id="mobile"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleInputChange}
                          className="w-full border border-gray-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                          کد پستی <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          className="w-full border border-gray-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          required
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                          آدرس <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full border border-gray-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          required
                        ></textarea>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="acceptTerms"
                          name="acceptTerms"
                          checked={formData.acceptTerms}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                          required
                        />
                        <label htmlFor="acceptTerms" className="mr-2 text-sm text-gray-700">
                          <span className="text-red-500 ml-1">*</span>
                          قوانین و مقررات را مطالعه کرده و می‌پذیرم
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={() => setStep(1)}>
                        بازگشت
                      </Button>
                      <Button type="submit" className="bg-primary text-white" disabled={isSubmitting}>
                        {isSubmitting ? "در حال پردازش..." : "تأیید و پرداخت"}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="p-6">
                <div className="text-center py-8">
                  <div className="bg-green-100 p-4 rounded-full w-fit mx-auto mb-4">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold mb-2">درخواست شما با موفقیت ثبت شد</h2>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    درخواست شما برای صدور کارت اعتباری {card.title} با موفقیت ثبت شد. کارشناسان ما در اسرع وقت با شما
                    تماس خواهند گرفت.
                  </p>
                  <div className="flex justify-center gap-4">
                    <Link href="/dashboard/user/credit-cards">
                      <Button className="bg-primary text-white">بازگشت به کارت‌های اعتباری</Button>
                    </Link>
                    <Link href="/dashboard/user">
                      <Button variant="outline">بازگشت به داشبورد</Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden sticky top-24">
            <div className="p-6">
              <h2 className="text-lg font-bold mb-4">خلاصه سفارش</h2>
              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-full ${card.icon}`}>
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">{card.title}</h3>
                    <p className="text-sm text-gray-500">کارت اعتباری</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">هزینه صدور:</span>
                    <span className="font-medium">{card.price} تومان</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">سقف اعتبار:</span>
                    <span className="font-medium">{card.limit} تومان</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">مدت اعتبار:</span>
                    <span className="font-medium">{card.duration}</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 mb-6">
                  <div className="flex justify-between font-bold">
                    <span>مبلغ قابل پرداخت:</span>
                    <span className="text-primary">{card.price} تومان</span>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <Phone size={16} className="text-primary" />
                    پشتیبانی و راهنمایی
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">در صورت نیاز به راهنمایی، با شماره زیر تماس بگیرید:</p>
                  <p className="font-bold text-gray-800 text-center">۰۲۱-۱۲۳۴۵۶۷۸</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
