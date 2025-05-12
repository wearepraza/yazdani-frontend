"use client"

import { useState } from "react"
import { CreditCard, Plus, Edit, Trash, Eye, Search, Filter, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Updated credit cards data based on the new requirements
const sampleCreditCards = [
  {
    id: 1,
    title: "کارت اعتباری ۱۰۰,۰۰۰ تومانی",
    price: "۱۰۰,۰۰۰",
    credit: "۳۰۰,۰۰۰",
    rewardCeiling: "۱,۰۰۰,۰۰۰",
    rewardMultiplier: "۱۰",
    duration: "۱۰۰ روز",
    features: ["شارژ ۳ برابری اعتبار", "سقف پاداش ۱۰ برابر", "مشارکت در خرید"],
    status: "فعال",
    sales: 124,
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
    status: "فعال",
    sales: 87,
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
    status: "فعال",
    sales: 215,
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
    status: "فعال",
    sales: 76,
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
    status: "فعال",
    sales: 142,
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
    status: "فعال",
    sales: 68,
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
    status: "فعال",
    sales: 54,
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
    status: "فعال",
    sales: 42,
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
    status: "فعال",
    sales: 31,
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
    status: "فعال",
    sales: 25,
  },
]

export default function CreditCardsAdminPage() {
  const [creditCards, setCreditCards] = useState(sampleCreditCards)
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [newCard, setNewCard] = useState({
    title: "",
    price: "",
    credit: "",
    rewardCeiling: "",
    rewardMultiplier: "",
    duration: "۱۰۰ روز",
    features: ["شارژ ۳ برابری اعتبار", "مشارکت در خرید"],
    status: "فعال",
  })

  const filteredCards = creditCards.filter((card) => card.title.includes(searchTerm) || card.price.includes(searchTerm))

  const handleDeleteCard = (id) => {
    setCreditCards(creditCards.filter((card) => card.id !== id))
  }

  const handleAddFeature = () => {
    setNewCard({
      ...newCard,
      features: [...newCard.features, ""],
    })
  }

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...newCard.features]
    updatedFeatures[index] = value
    setNewCard({
      ...newCard,
      features: updatedFeatures,
    })
  }

  const handleRemoveFeature = (index) => {
    const updatedFeatures = [...newCard.features]
    updatedFeatures.splice(index, 1)
    setNewCard({
      ...newCard,
      features: updatedFeatures,
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewCard({
      ...newCard,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newId = Math.max(...creditCards.map((card) => card.id)) + 1
    setCreditCards([
      ...creditCards,
      {
        ...newCard,
        id: newId,
        sales: 0,
      },
    ])
    setShowAddModal(false)
    setNewCard({
      title: "",
      price: "",
      credit: "",
      rewardCeiling: "",
      rewardMultiplier: "",
      duration: "۱۰۰ روز",
      features: ["شارژ ۳ برابری اعتبار", "مشارکت در خرید"],
      status: "فعال",
    })
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">کارت‌های اعتباری</h1>
          <p className="text-gray-500 mt-1">مدیریت کارت‌های اعتباری قابل خرید توسط کاربران</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button className="flex items-center gap-2" onClick={() => setShowAddModal(true)}>
            <Plus size={16} />
            <span>افزودن کارت جدید</span>
          </Button>
        </div>
      </div>

      {/* Credit Card Info Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="bg-blue-100 p-2 rounded-full mt-1">
            <CreditCard className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-blue-800 mb-2">قوانین کارت‌های اعتباری</h3>
            <ul className="space-y-2 text-sm text-blue-700">
              <li className="flex items-start gap-2">
                <Check size={16} className="text-blue-500 mt-1 flex-shrink-0" />
                <span>هر کارت بعد از خرید باعث شارژ کارت اعتباری به اندازه ۳ برابر مبلغ خرید می‌شود.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-blue-500 mt-1 flex-shrink-0" />
                <span>سقف خرید کارت برای هر کاربر ۱,۰۰۰,۰۰۰ تومان است.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-blue-500 mt-1 flex-shrink-0" />
                <span>هر کارت اعتباری ۱۰۰ روز مهلت استفاده دارد.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="جستجو در کارت‌های اعتباری..."
            className="w-full bg-white border border-gray-200 rounded-lg py-2 pr-10 pl-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Button variant="outline" className="flex items-center gap-2">
          <Filter size={16} />
          <span>فیلتر</span>
        </Button>
      </div>

      {/* Credit Cards Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">عنوان</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">قیمت</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">اعتبار</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">ضریب پاداش</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">سقف پاداش</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">تعداد فروش</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">وضعیت</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filteredCards.length > 0 ? (
                filteredCards.map((card) => (
                  <tr key={card.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <CreditCard size={20} className="text-primary" />
                        </div>
                        <span className="font-medium text-gray-900">{card.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">{card.price} تومان</td>
                    <td className="px-4 py-4 text-sm text-gray-600">{card.credit} تومان</td>
                    <td className="px-4 py-4 text-sm text-gray-600">{card.rewardMultiplier} برابر</td>
                    <td className="px-4 py-4 text-sm text-gray-600">{card.rewardCeiling} تومان</td>
                    <td className="px-4 py-4 text-sm text-gray-600">{card.sales} عدد</td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          card.status === "فعال" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}
                      >
                        {card.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Link href={`/dashboard/admin/credit-cards/${card.id}`}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Eye size={16} className="text-gray-500" />
                          </Button>
                        </Link>
                        <Link href={`/dashboard/admin/credit-cards/edit/${card.id}`}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit size={16} className="text-blue-500" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleDeleteCard(card.id)}
                        >
                          <Trash size={16} className="text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                    هیچ کارت اعتباری یافت نشد.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Card Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">افزودن کارت اعتباری جدید</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    عنوان کارت <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newCard.title}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    قیمت (تومان) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={newCard.price}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="credit" className="block text-sm font-medium text-gray-700 mb-1">
                    اعتبار (تومان) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="credit"
                    name="credit"
                    value={newCard.credit}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="rewardMultiplier" className="block text-sm font-medium text-gray-700 mb-1">
                    ضریب پاداش <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="rewardMultiplier"
                    name="rewardMultiplier"
                    value={newCard.rewardMultiplier}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="rewardCeiling" className="block text-sm font-medium text-gray-700 mb-1">
                    سقف پاداش (تومان) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="rewardCeiling"
                    name="rewardCeiling"
                    value={newCard.rewardCeiling}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                    مدت اعتبار <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    value={newCard.duration}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    وضعیت <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="status-active"
                        name="status"
                        value="فعال"
                        checked={newCard.status === "فعال"}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                      />
                      <label htmlFor="status-active" className="mr-2 text-sm text-gray-700">
                        فعال
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="status-inactive"
                        name="status"
                        value="غیرفعال"
                        checked={newCard.status === "غیرفعال"}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                      />
                      <label htmlFor="status-inactive" className="mr-2 text-sm text-gray-700">
                        غیرفعال
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">ویژگی‌های کارت</label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddFeature}
                    className="flex items-center gap-1"
                  >
                    <Plus size={14} />
                    <span>افزودن ویژگی</span>
                  </Button>
                </div>

                <div className="space-y-3">
                  {newCard.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        className="w-full border border-gray-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        placeholder={`ویژگی ${index + 1}`}
                      />
                      {newCard.features.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveFeature(index)}
                          className="h-10 w-10 p-0 flex items-center justify-center"
                        >
                          <Trash size={14} className="text-red-500" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>
                  انصراف
                </Button>
                <Button type="submit" className="bg-primary text-white">
                  ذخیره کارت
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
