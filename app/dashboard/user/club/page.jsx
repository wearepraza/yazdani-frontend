"use client"

import { useState } from "react"
import { Gift, Star, ShoppingBag, Users, Info, Lock, CreditCard, Coins, Trophy, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ClubPage() {
  const [isUnlocked, setIsUnlocked] = useState(false)

  const handleUnlock = () => {
    setIsUnlocked(true)
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">باشگاه مشتریان</h1>
          <p className="text-gray-500 mt-1">امتیازات و جوایز باشگاه مشتریان در این بخش نمایش داده می‌شود.</p>
        </div>
      </div>

      {/* Stars Section */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-amber-50 p-2 rounded-full">
            <Star className="h-5 w-5 text-amber-500" />
          </div>
          <h2 className="text-lg font-bold">ستاره‌های شما</h2>
          <div className="relative group">
            <Info className="h-4 w-4 text-gray-400 cursor-help" />
            <div className="absolute bottom-full right-0 mb-2 w-64 p-2 bg-gray-800 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              هر ستاره ۱۰۰۰ سکه را آزاد می‌کند. حداکثر ۱۰ ستاره = ۱۰,۰۰۰ سکه قابل استفاده.
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-500">تعداد ستاره‌های کسب شده</span>
              <span className="font-bold">۳ از ۱۰</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: "30%" }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">هر دعوت مستقیم = ۱ ستاره</p>
          </div>

          <div className="flex-none">
            <div className="flex gap-1">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className={`w-6 h-6 flex items-center justify-center rounded-full border ${
                    i < 3 ? "bg-amber-500 text-white border-amber-600" : "bg-gray-100 border-gray-200"
                  }`}
                >
                  <Star className="h-3 w-3" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Coins Section */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-yellow-50 p-2 rounded-full">
            <Coins className="h-5 w-5 text-yellow-500" />
          </div>
          <h2 className="text-lg font-bold">سکه‌های شما</h2>
          <div className="relative group">
            <Info className="h-4 w-4 text-gray-400 cursor-help" />
            <div className="absolute bottom-full right-0 mb-2 w-64 p-2 bg-gray-800 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              به ازای هر دعوت مستقیم یا غیرمستقیم ۱۰ سکه دریافت کنید. حداکثر: ۱۰,۰۰۰ سکه.
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-500">کل سکه‌های کسب شده</span>
              <span className="font-bold">۴,۵۰۰</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-yellow-500 rounded-full" style={{ width: "45%" }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">از ۵ سطح دعوت‌های شما</p>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-500">سکه‌های قابل استفاده</span>
              <span className="font-bold">۳,۰۰۰</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-yellow-500 rounded-full" style={{ width: "30%" }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">بر اساس ستاره‌های آزاد شده (۳ ستاره)</p>
          </div>
        </div>
      </div>

      {/* Locked Sections Container */}
      <div className="relative mb-6">
        {!isUnlocked && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100/90 to-gray-200/90 backdrop-blur-[2px] flex items-center justify-center rounded-xl z-20">
            <div className="bg-white p-6 rounded-xl shadow-md text-center max-w-md mx-4">
              <div className="bg-blue-50 p-3 rounded-full mx-auto w-fit mb-4">
                <Lock className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="font-bold text-lg mb-3">این بخش قفل است</h3>
              <p className="text-gray-600 mb-4">برای دسترسی به این بخش، یکی از روش‌های زیر را انتخاب کنید:</p>
              <div className="space-y-3">
                <Link href="/dashboard/user/credit-cards" className="block">
                  <Button className="w-full bg-primary text-white hover:bg-primary/90">
                    خرید کارت اعتباری
                    <CreditCard className="mr-2 h-4 w-4" />
                  </Button>
                </Link>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-white px-2 text-gray-500">یا</span>
                  </div>
                </div>
                <button
                  onClick={handleUnlock}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium underline underline-offset-4"
                >
                  وارد کردن کد فعال‌سازی
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Points Section */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-50 p-2 rounded-full">
              <Trophy className="h-5 w-5 text-green-500" />
            </div>
            <h2 className="text-lg font-bold">امتیازات شما</h2>
            <div className="relative group">
              <Info className="h-4 w-4 text-gray-400 cursor-help" />
              <div className="absolute bottom-full right-0 mb-2 w-64 p-2 bg-gray-800 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                ۰.۰۰۱٪ از هر خرید کارت انجام شده توسط شبکه ۵ سطحی خود را دریافت کنید.
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-500">امتیازات کسب شده</span>
              <span className="font-bold">۰ از ۱۰,۰۰۰</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: "0%" }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">بر اساس خریدهای انجام شده توسط شبکه شما</p>
          </div>
        </div>

        {/* Convert Section */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-50 p-2 rounded-full">
              <ArrowRight className="h-5 w-5 text-purple-500" />
            </div>
            <h2 className="text-lg font-bold">تبدیل امتیازات و سکه‌ها به جایزه</h2>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">۱ امتیاز + ۱ سکه = ۱۰,۰۰۰ تومان جایزه</p>
                <p className="text-sm text-gray-500 mt-1">تبدیل‌های در دسترس: ۰</p>
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">تبدیل</Button>
            </div>
          </div>

          <p className="text-sm text-gray-500">با تبدیل امتیازات و سکه‌های خود، می‌توانید جوایز نقدی دریافت کنید.</p>
        </div>

        {/* Reward Section */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-50 p-2 rounded-full">
              <Gift className="h-5 w-5 text-red-500" />
            </div>
            <h2 className="text-lg font-bold">جایزه‌های شما</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-500">کل جایزه کسب شده</span>
                <span className="font-bold">۰ تومان</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: "0%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-500">جایزه قابل استفاده</span>
                <span className="font-bold">۰ تومان</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: "0%" }}></div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <Button className="bg-red-500 hover:bg-red-600 text-white">برداشت</Button>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">استفاده در فروشگاه</Button>
          </div>
        </div>
      </div>

      {/* How to earn more */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4">چگونه بیشتر کسب کنیم؟</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-blue-50 p-3 rounded-full w-fit mb-4">
              <CreditCard className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="font-bold mb-2">خرید کارت اعتباری</h3>
            <p className="text-gray-600 text-sm">با خرید کارت اعتباری، تمام بخش‌های باشگاه مشتریان را آزاد کنید.</p>
            <Link href="/dashboard/user/credit-cards">
              <Button className="mt-4 w-full bg-primary text-white">مشاهده کارت‌ها</Button>
            </Link>
          </div>

          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-green-50 p-3 rounded-full w-fit mb-4">
              <Users className="h-6 w-6 text-green-500" />
            </div>
            <h3 className="font-bold mb-2">دعوت از دوستان</h3>
            <p className="text-gray-600 text-sm">با دعوت هر دوست، ۱ ستاره و ۱۰ سکه دریافت کنید.</p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-purple-50 p-3 rounded-full w-fit mb-4">
              <ShoppingBag className="h-6 w-6 text-purple-500" />
            </div>
            <h3 className="font-bold mb-2">خرید از شبکه</h3>
            <p className="text-gray-600 text-sm">از خریدهای انجام شده توسط شبکه ۵ سطحی خود امتیاز کسب کنید.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
