
"use client"
import { CreditCard, Check, Info, ShieldCheck, Clock, Zap, AlertCircle, Gift, Percent } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect,useState } from "react"
import { myCards } from "@/lib/api/user/cards/myCards"
import { allCards } from "@/lib/api/user/cards/allCards"
import moment from "moment-jalaali"
// Updated credit cards data based on the new requirements
const creditCards = [
  {
    id: 1,
    title: "کارت اعتباری ۱۰۰,۰۰۰ تومانی",
    price: "۱۰۰,۰۰۰",
    credit: "۳۰۰,۰۰۰",
    rewardCeiling: "۱,۰۰۰,۰۰۰",
    rewardMultiplier: "۱۰",
    duration: "۱۰۰ روز",
    features: ["شارژ ۳ برابری اعتبار", "سقف پاداش ۱۰ برابر", "مشارکت در خرید"],
    color: "from-blue-400 to-blue-600",
    icon: "bg-blue-100 text-blue-600",
  },
  {
    id: 2,
    title: "کارت اعتباری ۲۰۰,۰۰۰ تومانی",
    price: "۲۰۰,۰۰۰",
    credit: "۶۰۰,۰۰۰",
    rewardCeiling: "۴,۰۰۰,۰۰۰",
    rewardMultiplier: "۲۰",
    duration: "۱۰۰ روز",
    features: ["شارژ ۳ برابری اعتبار", "سقف پاداش ۲۰ برابر", "مشارکت در خرید"],
    color: "from-green-400 to-green-600",
    icon: "bg-green-100 text-green-600",
  },
  {
    id: 3,
    title: "کارت اعتباری ۳۰۰,۰۰۰ تومانی",
    price: "۳۰۰,۰۰۰",
    credit: "۹۰۰,۰۰۰",
    rewardCeiling: "۹,۰۰۰,۰۰۰",
    rewardMultiplier: "۳۰",
    duration: "۱۰۰ روز",
    features: ["شارژ ۳ برابری اعتبار", "سقف پاداش ۳۰ برابر", "مشارکت در خرید"],
    color: "from-purple-400 to-purple-600",
    icon: "bg-purple-100 text-purple-600",
  },
  {
    id: 4,
    title: "کارت اعتباری ۴۰۰,۰۰۰ تومانی",
    price: "۴۰۰,۰۰۰",
    credit: "۱,۲۰۰,۰۰۰",
    rewardCeiling: "۱۶,۰۰۰,۰۰۰",
    rewardMultiplier: "۴۰",
    duration: "۱۰۰ روز",
    features: ["شارژ ۳ برابری اعتبار", "سقف پاداش ۴۰ برابر", "مشارکت در خرید"],
    color: "from-pink-400 to-pink-600",
    icon: "bg-pink-100 text-pink-600",
  },
  {
    id: 5,
    title: "کارت اعتباری ۵۰۰,۰۰۰ تومانی",
    price: "۵۰۰,۰۰۰",
    credit: "۱,۵۰۰,۰۰۰",
    rewardCeiling: "۲۵,۰۰۰,۰۰۰",
    rewardMultiplier: "۵۰",
    duration: "۱۰۰ روز",
    features: ["شارژ ۳ برابری اعتبار", "سقف پاداش ۵۰ برابر", "مشارکت در خرید"],
    color: "from-amber-500 to-yellow-500",
    icon: "bg-amber-100 text-amber-600",
    popular: true,
  },
  {
    id: 6,
    title: "کارت اعتباری ۶۰۰,۰۰۰ تومانی",
    price: "۶۰۰,۰۰۰",
    credit: "۱,۸۰۰,۰۰۰",
    rewardCeiling: "۳۶,۰۰۰,۰۰۰",
    rewardMultiplier: "۶۰",
    duration: "۱۰۰ روز",
    features: ["شارژ ۳ برابری اعتبار", "سقف پاداش ۶۰ برابر", "مشارکت در خرید"],
    color: "from-red-400 to-red-600",
    icon: "bg-red-100 text-red-600",
  },
  {
    id: 7,
    title: "کارت اعتباری ۷۰۰,۰۰۰ تومانی",
    price: "۷۰۰,۰۰۰",
    credit: "۲,۱۰۰,۰۰۰",
    rewardCeiling: "۴۹,۰۰۰,۰۰۰",
    rewardMultiplier: "۷۰",
    duration: "۱۰۰ روز",
    features: ["شارژ ۳ برابری اعتبار", "سقف پاداش ۷۰ برابر", "مشارکت در خرید"],
    color: "from-cyan-400 to-cyan-600",
    icon: "bg-cyan-100 text-cyan-600",
  },
  {
    id: 8,
    title: "کارت اعتباری ۸۰۰,۰۰۰ تومانی",
    price: "۸۰۰,۰۰۰",
    credit: "۲,۴۰۰,۰۰۰",
    rewardCeiling: "۶۴,۰۰۰,۰۰۰",
    rewardMultiplier: "۸۰",
    duration: "۱۰۰ روز",
    features: ["شارژ ۳ برابری اعتبار", "سقف پاداش ۸۰ برابر", "مشارکت در خرید"],
    color: "from-indigo-400 to-indigo-600",
    icon: "bg-indigo-100 text-indigo-600",
  },
  {
    id: 9,
    title: "کارت اعتباری ۹۰۰,۰۰۰ تومانی",
    price: "۹۰۰,۰۰۰",
    credit: "۲,۷۰۰,۰۰۰",
    rewardCeiling: "۸۱,۰۰۰,۰۰۰",
    rewardMultiplier: "۹۰",
    duration: "۱۰۰ روز",
    features: ["شارژ ۳ برابری اعتبار", "سقف پاداش ۹۰ برابر", "مشارکت در خرید"],
    color: "from-gray-400 to-gray-600",
    icon: "bg-gray-100 text-gray-600",
  },
  {
    id: 10,
    title: "کارت اعتباری ۱,۰۰۰,۰۰۰ تومانی",
    price: "۱,۰۰۰,۰۰۰",
    credit: "۳,۰۰۰,۰۰۰",
    rewardCeiling: "۱۰۰,۰۰۰,۰۰۰",
    rewardMultiplier: "۱۰۰",
    duration: "۱۰۰ روز",
    features: ["شارژ ۳ برابری اعتبار", "سقف پاداش ۱۰۰ برابر", "مشارکت در خرید"],
    color: "from-gray-700 to-gray-900",
    icon: "bg-gray-100 text-gray-800",
  },
]



export default function CreditCardsPage() {
  const [userCards, setUserCards] = useState([])


  const convertToJalali = (dateString) => {
    return moment(dateString, "YYYY-MM-DD").format("jYYYY/jMM/jDD")
  }
  
  const calcDaysLeft = (dateString) => {
    const today = moment()
    const expiry = moment(dateString, "YYYY-MM-DD")
    return expiry.diff(today, "days")
  }
  
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await myCards()
        const cards = response?.data?.my_cards || []
  
        const formatted = cards.map((card, index) => ({
          id: index + 1,
          title: `کارت اعتباری ${card.amount.toLocaleString()} تومانی`,
          cardNumber: "۶۲۱۹-****-****-۱۲۳۴",
          credit: `${card.credit.toLocaleString()}`,
          remaining: `${card.card_amount.toLocaleString()}`,
          expiry: convertToJalali(card.expires_at), 
          status: "فعال",
          daysLeft: calcDaysLeft(card.expires_at),
          color: "from-amber-500 to-yellow-500", 
        }))
  
        setUserCards(formatted)
      } catch (error) {
        console.error("Error fetching credit cards:", error)
      }
    }
  
    const fetchAllCards = async () => {
      try {
        const response = await allCards()
        // const cards = response?.data?.my_cards || []
  
        // const formatted = cards.map((card, index) => ({
        //   id: index + 1,
        //   title: `کارت اعتباری ${card.amount.toLocaleString()} تومانی`,
        //   cardNumber: "۶۲۱۹-****-****-۱۲۳۴",
        //   credit: `${card.credit.toLocaleString()}`,
        //   remaining: `${card.card_amount.toLocaleString()}`,
        //   expiry: convertToJalali(card.expires_at), 
        //   status: "فعال",
        //   daysLeft: calcDaysLeft(card.expires_at),
        //   color: "from-amber-500 to-yellow-500", 
        // }))
  
        // setUserCards(formatted)
      } catch (error) {
        console.error("Error fetching credit cards:", error)
      }
    }
    
    fetchCards()
    fetchAllCards()

  }, [])


  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">کارت‌های اعتباری</h1>
          <p className="text-gray-500 mt-1">خرید و مدیریت کارت‌های اعتباری</p>
        </div>
      </div>

      {/* Credit Card Info Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4 mb-8">
        <div className="flex items-start gap-3">
          <div className="bg-blue-100 p-2 rounded-full mt-1">
            <Info className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-blue-800 mb-2">اطلاعات کارت‌های اعتباری</h3>
            <ul className="space-y-2 text-sm text-blue-700">
              <li className="flex items-start gap-2">
                <Check size={16} className="text-blue-500 mt-1 flex-shrink-0" />
                <span>هر کارت بعد از خرید باعث شارژ کارت اعتباری به اندازه ۳ برابر مبلغ خرید می‌شود.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-blue-500 mt-1 flex-shrink-0" />
                <span>با کارت اعتباری در فروشگاه می‌توان خرید کرد (بصورت مشارکت در خرید).</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-blue-500 mt-1 flex-shrink-0" />
                <span>با خرید کارت‌های اعتباری میزان سقف پاداش معین می‌شود (هر کارت ضریب پاداش متفاوتی دارد).</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-blue-500 mt-1 flex-shrink-0" />
                <span>چند بار امکان خرید کارت وجود دارد، فقط نباید جمع مبلغ خرید بیش از یک میلیون تومان باشد.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-blue-500 mt-1 flex-shrink-0" />
                <span>هر کارت اعتباری ۱۰۰ روز مهلت خرید دارد. با خرید کارت جدید (در صورت امکان) مهلت تمدید می‌شود.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* User's Credit Cards */}
      {userCards.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">کارت اعتباری من</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userCards.map((card) => (
              <div key={card.id} className="relative overflow-hidden rounded-xl shadow-md">
                <div className={`bg-gradient-to-r ${card.color} p-6 text-white h-full flex flex-col justify-between`}>
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="font-bold text-lg">{card.title}</h3>
                        <p className="text-white/80 text-sm">کارت اعتباری شما</p>
                      </div>
                      <CreditCard className="h-8 w-8" />
                    </div>

                    <div className="mb-6">
                      <p className="text-white/80 text-xs mb-1">شماره کارت</p>
                      <p className="font-mono text-lg tracking-wider">{card.cardNumber}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-white/80 text-xs mb-1">اعتبار باقیمانده</p>
                        <p className="font-bold">{card.remaining} تومان</p>
                      </div>
                      <div>
                        <p className="text-white/80 text-xs mb-1">تاریخ انقضا</p>
                        <p className="font-bold">{card.expiry}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-xs text-white/80">روزهای باقیمانده</span>
                      <span className="font-bold">{card.daysLeft} روز</span>
                    </div>
                    <Link href={`/dashboard/user/credit-cards/${card.id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      >
                        مشاهده جزئیات
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available Credit Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">کارت‌های اعتباری قابل خرید</h2>
          <div className="bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full flex items-center gap-1">
            <AlertCircle size={12} />
            <span>سقف خرید: ۱,۰۰۰,۰۰۰ تومان</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {creditCards.map((card) => (
            <div
              key={card.id}
              className={`bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden relative ${
                card.popular ? "ring-2 ring-primary ring-offset-2" : ""
              }`}
            >
              {card.popular && (
                <div className="absolute top-3 left-3 bg-primary text-white text-xs px-2 py-1 rounded-full z-10">
                  پیشنهاد ویژه
                </div>
              )}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`p-1.5 rounded-full ${card.icon}`}>
                    <CreditCard className="h-4 w-4" />
                  </div>
                  <h3 className="font-bold text-sm">{card.title}</h3>
                </div>

                <div className="mb-3">
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-xl font-bold">{card.price}</span>
                    <span className="text-gray-500 text-xs">تومان</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4 text-xs">
                  <div className="flex items-center gap-1.5">
                    <Zap className="h-3.5 w-3.5 text-primary" />
                    <span className="text-gray-700">اعتبار: {card.credit} تومان</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Gift className="h-3.5 w-3.5 text-primary" />
                    <span className="text-gray-700">سقف پاداش:
                    {`${card.rewardCeiling} تومان`}

                       </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Percent className="h-3.5 w-3.5 text-primary" />
                    <span className="text-gray-700">ضریب پاداش: {card.rewardMultiplier} برابر</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-primary" />
                    <span className="text-gray-700">مدت اعتبار: {card.duration}</span>
                  </div>
                </div>

                <Link href={`/dashboard/user/credit-cards/purchase/${card.id}`}>
                  <Button className="w-full bg-gradient-to-r from-primary to-blue-600 text-white text-xs py-1.5">
                    خرید کارت
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reward Ceiling Table */}
      <div className="mt-12">
        <h2 className="text-lg font-bold mb-4">جدول سقف پاداش کارت‌های اعتباری</h2>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">نوع کارت</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">قیمت</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">ضریب پاداش</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">سقف پاداش</th>
                </tr>
              </thead>
              <tbody>
                {creditCards.map((card) => (
                  <tr key={card.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{card.title}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{card.price} تومان</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{card.rewardMultiplier} برابر</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{card.rewardCeiling} تومان</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mt-12">
        <h2 className="text-lg font-bold mb-6">مزایای استفاده از کارت اعتباری</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-blue-50 p-3 rounded-full w-fit mb-4">
              <Zap className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="font-bold mb-2">شارژ ۳ برابری</h3>
            <p className="text-gray-600 text-sm">
              با خرید هر کارت اعتباری، اعتبار شما به میزان ۳ برابر مبلغ پرداختی شارژ می‌شود.
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-green-50 p-3 rounded-full w-fit mb-4">
              <Gift className="h-6 w-6 text-green-500" />
            </div>
            <h3 className="font-bold mb-2">سقف پاداش بالاتر</h3>
            <p className="text-gray-600 text-sm">
              با خرید کارت‌های با ارزش بالاتر، از سقف پاداش بیشتری بهره‌مند شوید و امتیازات بیشتری کسب کنید.
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-purple-50 p-3 rounded-full w-fit mb-4">
              <ShieldCheck className="h-6 w-6 text-purple-500" />
            </div>
            <h3 className="font-bold mb-2">مشارکت در خرید</h3>
            <p className="text-gray-600 text-sm">
              با استفاده از کارت اعتباری، می‌توانید در فروشگاه به صورت مشارکتی خرید کنید و از مزایای آن بهره‌مند شوید.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-12 mb-8">
        <h2 className="text-lg font-bold mb-6">سوالات متداول</h2>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-100">
            <div className="p-4 hover:bg-gray-50 transition-colors">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Info size={16} className="text-primary" />
                آیا می‌توانم چند کارت اعتباری خریداری کنم؟
              </h3>
              <p className="text-gray-600 text-sm pr-6">
                بله، شما می‌توانید چندین کارت اعتباری خریداری کنید، اما مجموع مبلغ خرید کارت‌ها نباید از یک میلیون تومان
                بیشتر شود.
              </p>
            </div>

            <div className="p-4 hover:bg-gray-50 transition-colors">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Info size={16} className="text-primary" />
                مدت اعتبار کارت‌ها چقدر است؟
              </h3>
              <p className="text-gray-600 text-sm pr-6">
                هر کارت اعتباری ۱۰۰ روز مهلت استفاده دارد. با خرید کارت جدید (در صورت امکان) مهلت تمدید می‌شود.
              </p>
            </div>

            <div className="p-4 hover:bg-gray-50 transition-colors">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Info size={16} className="text-primary" />
                منظور از سقف پاداش چیست؟
              </h3>
              <p className="text-gray-600 text-sm pr-6">
                سقف پاداش، حداکثر میزان پاداشی است که می‌توانید با استفاده از کارت اعتباری دریافت کنید. هر کارت ضریب
                پاداش متفاوتی دارد که در جدول بالا مشخص شده است.
              </p>
            </div>

            <div className="p-4 hover:bg-gray-50 transition-colors">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Info size={16} className="text-primary" />
                مشارکت در خرید به چه معناست؟
              </h3>
              <p className="text-gray-600 text-sm pr-6">
                با استفاده از کارت اعتباری، می‌توانید بخشی از مبلغ خرید خود را از اعتبار کارت و بخشی را به صورت نقدی
                پرداخت کنید. این امکان به شما اجازه می‌دهد تا از اعتبار خود به بهترین شکل استفاده کنید.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
