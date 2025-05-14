"use client"

import { useState } from "react"
import { Save, X, Upload, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { createProduct } from "@/lib/api/admin/product/addProduct"

export default function AddProductPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    discount_price: "",
    category_id: "",
    inventory: "",
    status: "published",
    features: [""],
    image: null
  })

  const categories = [
    { id: 1, name: "موبایل" },
    { id: 2, name: "لپ تاپ" },
    { id: 3, name: "هدفون" },
    { id: 4, name: "تبلت" },
    { id: 5, name: "صوتی" },
    { id: 6, name: "پوشیدنی" }
  ]

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

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProductData(prev => ({
        ...prev,
        image: file
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await createProduct(productData)
      if (response.error) {
        throw new Error(response.message)
      }
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      console.error('Error creating product:', error)
      // اینجا می‌تونید یک state برای نمایش خطا اضافه کنید
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">افزودن محصول جدید</h1>
          <p className="text-gray-500 mt-1">اطلاعات محصول جدید را وارد کنید</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link href="/dashboard/admin/products">
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
          <p>محصول با موفقیت ذخیره شد.</p>
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
                    name="category_id"
                    value={productData.category_id}
                    onChange={handleChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  >
                    <option value="">انتخاب دسته‌بندی</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
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
                    name="discount_price"
                    value={productData.discount_price}
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
                    name="inventory"
                    type="number"
                    value={productData.inventory}
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
                  <input 
                    type="file" 
                    className="hidden" 
                    id="product-image" 
                    onChange={handleImageChange}
                    accept="image/*"
                  />
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
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                    defaultChecked
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
            <span>{loading ? "در حال ذخیره..." : "ذخیره محصول"}</span>
          </Button>
        </div>
      </form>
    </div>
  )
}
