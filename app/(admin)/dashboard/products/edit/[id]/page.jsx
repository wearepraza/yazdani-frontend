"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Save, X, Upload, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

// Sample products data for editing
const sampleProducts = [
  {
    id: 1,
    title: "گوشی موبایل سامسونگ گلکسی S23 Ultra",
    description: "گوشی موبایل سامسونگ مدل Galaxy S23 Ultra با ظرفیت 256 گیگابایت و رم 12 گیگابایت",
    price: "45900000",
    discountPrice: "43500000",
    category: "موبایل",
    stock: "15",
    features: [
      "صفحه نمایش 6.8 اینچی",
      "دوربین 200 مگاپیکسلی",
      "باتری 5000 میلی‌آمپر ساعت",
      "پردازنده Snapdragon 8 Gen 2",
    ],
    status: "published",
  },
  {
    id: 2,
    title: "لپ تاپ اپل مک‌بوک پرو M2",
    description: "لپ تاپ 14 اینچی اپل مدل MacBook Pro با تراشه M2 Pro و حافظه 16 گیگابایت",
    price: "85500000",
    discountPrice: "",
    category: "لپ تاپ",
    stock: "8",
    features: ["صفحه نمایش 14 اینچی Liquid Retina XDR", "تراشه M2 Pro", "حافظه 16 گیگابایت", "512 گیگابایت SSD"],
    status: "published",
  },
  {
    id: 3,
    title: "هدفون بی سیم سونی WH-1000XM5",
    description: "هدفون روگوشی بی‌سیم سونی با قابلیت حذف نویز و کیفیت صدای Hi-Res",
    price: "12800000",
    discountPrice: "11500000",
    category: "صوتی",
    stock: "20",
    features: ["حذف نویز پیشرفته", "کیفیت صدای Hi-Res", "30 ساعت عمر باتری", "میکروفون با کیفیت برای تماس"],
    status: "published",
  },
  {
    id: 4,
    title: "ساعت هوشمند اپل واچ سری ۸",
    description: "ساعت هوشمند اپل واچ سری 8 با قابلیت‌های سلامتی پیشرفته و نمایشگر همیشه روشن",
    price: "22500000",
    discountPrice: "",
    category: "پوشیدنی",
    stock: "0",
    features: ["نمایشگر همیشه روشن", "سنسور اکسیژن خون", "نوار قلب الکتریکی", "مقاوم در برابر آب تا عمق 50 متر"],
    status: "published",
  },
  {
    id: 5,
    title: "تبلت سامسونگ گلکسی Tab S8",
    description: "تبلت سامسونگ مدل Galaxy Tab S8 با صفحه نمایش 11 اینچی و قلم S Pen",
    price: "18500000",
    discountPrice: "17200000",
    category: "تبلت",
    stock: "5",
    features: ["صفحه نمایش 11 اینچی", "پردازنده Snapdragon 8 Gen 1", "باتری 8000 میلی‌آمپر ساعت", "قلم S Pen همراه"],
    status: "published",
  },
]

export default function EditProductPage() {
  const params = useParams()
  const router = useRouter()
  const productId = Number.parseInt(params.id)

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    discountPrice: "",
    category: "",
    stock: "",
    features: [""],
    status: "published",
  })

  // Load product data
  useEffect(() => {
    const product = sampleProducts.find((p) => p.id === productId)
    if (product) {
      setProductData(product)
    } else {
      // Product not found, redirect to products list
      router.push("/dashboard/products")
    }
  }, [productId, router])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...productData.features]
    newFeatures[index] = value
    setProductData((prev) => ({
      ...prev,
      features: newFeatures,
    }))
  }

  const addFeature = () => {
    setProductData((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }))
  }

  const removeFeature = (index) => {
    const newFeatures = [...productData.features]
    newFeatures.splice(index, 1)
    setProductData((prev) => ({
      ...prev,
      features: newFeatures,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
        // Redirect to products list after successful update
        router.push("/dashboard/products")
      }, 1500)
    }, 1500)
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">ویرایش محصول</h1>
          <p className="text-gray-500 mt-1">ویرایش اطلاعات محصول {productData.title}</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link href="/dashboard/products">
            <Button variant="outline" className="flex items-center gap-2">
              <X size={16} />
              <span>انصراف</span>
            </Button>
          </Link>
        </div>
      </div>

      {success && (
        <div className="mb-6 bg-green-50 text-green-700 p-4 rounded-lg border border-green-200 flex items-center">
          <div className="mr-2 bg-green-100 p-1 rounded-full">
            <Save size={16} className="text-green-600" />
          </div>
          <p>محصول با موفقیت بروزرسانی شد.</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold mb-4">اطلاعات اصلی</h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    عنوان محصول <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="title"
                    name="title"
                    value={productData.title}
                    onChange={handleChange}
                    placeholder="عنوان محصول را وارد کنید"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    توضیحات <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={productData.description}
                    onChange={handleChange}
                    rows={5}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="توضیحات محصول را وارد کنید"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    دسته‌بندی <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={productData.category}
                    onChange={handleChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  >
                    <option value="">انتخاب دسته‌بندی</option>
                    <option value="موبایل">موبایل</option>
                    <option value="لپ تاپ">لپ تاپ</option>
                    <option value="تبلت">تبلت</option>
                    <option value="صوتی">صوتی</option>
                    <option value="پوشیدنی">پوشیدنی</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold mb-4">قیمت‌گذاری</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    قیمت (تومان) <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="price"
                    name="price"
                    value={productData.price}
                    onChange={handleChange}
                    placeholder="مثال: ۱۲۵۰۰۰۰۰"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="discountPrice" className="block text-sm font-medium text-gray-700 mb-1">
                    قیمت با تخفیف (تومان)
                  </label>
                  <Input
                    id="discountPrice"
                    name="discountPrice"
                    value={productData.discountPrice}
                    onChange={handleChange}
                    placeholder="در صورت وجود تخفیف"
                  />
                </div>

                <div>
                  <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                    موجودی <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    value={productData.stock}
                    onChange={handleChange}
                    placeholder="تعداد موجودی"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">ویژگی‌های محصول</h2>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addFeature}
                  className="flex items-center gap-1"
                >
                  <Plus size={14} />
                  <span>افزودن ویژگی</span>
                </Button>
              </div>

              <div className="space-y-3">
                {productData.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      placeholder={`ویژگی ${index + 1}`}
                    />
                    {productData.features.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFeature(index)}
                        className="h-10 w-10 p-0 flex items-center justify-center"
                      >
                        <Minus size={14} className="text-red-500" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold mb-4">تصویر محصول</h2>

              <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                <div className="flex flex-col items-center justify-center">
                  <Upload className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 mb-4">فایل تصویر را اینجا رها کنید یا کلیک کنید</p>
                  <input type="file" className="hidden" id="product-image" />
                  <label
                    htmlFor="product-image"
                    className="bg-primary text-white px-4 py-2 rounded-lg text-sm cursor-pointer hover:bg-primary/90 transition-colors"
                  >
                    انتخاب فایل
                  </label>
                </div>
              </div>

              <div className="mt-4 text-xs text-gray-500">
                <p>فرمت‌های مجاز: JPG، PNG، WebP</p>
                <p>حداکثر حجم: ۲ مگابایت</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold mb-4">وضعیت انتشار</h2>

              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="status-published"
                    name="status"
                    value="published"
                    checked={productData.status === "published"}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                  />
                  <label htmlFor="status-published" className="mr-2 block text-sm text-gray-700">
                    منتشر شده
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="status-draft"
                    name="status"
                    value="draft"
                    checked={productData.status === "draft"}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                  />
                  <label htmlFor="status-draft" className="mr-2 block text-sm text-gray-700">
                    پیش‌نویس
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button type="submit" className="flex items-center gap-2" disabled={loading}>
            <Save size={16} />
            <span>{loading ? "در حال ذخیره..." : "بروزرسانی محصول"}</span>
          </Button>
        </div>
      </form>
    </div>
  )
}
