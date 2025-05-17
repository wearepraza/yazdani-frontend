"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Save, X, Upload, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { detailsProducts } from "@/lib/api/main/detailsProducts"
import { updateProduct } from "@/lib/api/admin/product/updateProduct"

export default function EditProductPage() {
  const params = useParams()
  const router = useRouter()
  const productId = Number.parseInt(params.id)

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    discountPrice: "",
    category: "",
    category_id: "",
    inventory: "",
    features: [{ value: "" }],
    status: "published",
    image_path: "",
    image_url: "",
  })

  // Load product data
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await detailsProducts(productId)
        if (response.error) {
          setError(response.message || "خطا در دریافت اطلاعات محصول")
          return
        }
        
        // Transform API response to match our form structure
        setProductData({
          title: response.data.title || "",
          description: response.data.description || "",
          price: response.data.price || "",
          discountPrice: response.data.discount_price || "",
          category: response.data.category?.name || "",
          category_id: response.data.category_id || "",
          inventory: response.data.inventory || "",
          features: response.data.features || [{ value: "" }],
          status: response.data.status || "published",
          image_path: response.data.image_path || "",
          image_url: response.data.image_url || "",
        })
      } catch (err) {
        setError("خطا در دریافت اطلاعات محصول")
        console.error("Error fetching product:", err)
      }
    }

    fetchProductData()
  }, [productId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...productData.features]
    newFeatures[index] = {
      ...newFeatures[index],
      value: value
    }
    setProductData((prev) => ({
      ...prev,
      features: newFeatures,
    }))
  }

  const addFeature = () => {
    setProductData((prev) => ({
      ...prev,
      features: [...prev.features, { value: "" }],
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // تبدیل ویژگی‌ها به آرایه‌ای از رشته‌ها
      const formattedFeatures = productData.features
        .filter(feature => feature.value && feature.value.trim() !== '') // حذف موارد خالی
        .map(feature => feature.value.trim()) // تبدیل به رشته‌های تمیز

      console.log('Features being sent:', formattedFeatures) // برای اطمینان از فرمت داده‌ها

      const response = await updateProduct({
        product_id: productId,
        title: productData.title,
        description: productData.description,
        price: productData.price,
        discount_price: productData.discountPrice,
        category_id: productData.category_id,
        inventory: productData.inventory,
        features: formattedFeatures, // ارسال آرایه‌ای از رشته‌ها
        status: productData.status,
        image: productData.image
      })

      if (response.error) {
        if (response.errors) {
          // نمایش خطاهای خاص فیلدها
          const errorMessages = Object.values(response.errors).flat()
          setError(errorMessages.join('\n'))
        } else {
          setError(response.message || "خطا در بروزرسانی محصول")
        }
        return
      }

      setSuccess(true)
    } catch (err) {
      setError("خطا در بروزرسانی محصول")
      console.error("Error updating product:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">ویرایش محصول</h1>
          <p className="text-gray-500 mt-1">ویرایش اطلاعات محصول {productData.title}</p>
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

      {error && (
        <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-lg border border-red-200 flex items-center">
          <div className="mr-2 bg-red-100 p-1 rounded-full">
            <X size={16} className="text-red-600" />
          </div>
          <p>{error}</p>
        </div>
      )}

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
                    name="category_id"
                    value={productData.category_id}
                    onChange={handleChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  >
                    <option value="">انتخاب دسته‌بندی</option>
                    <option value="1">موبایل</option>
                    <option value="2">لپ تاپ</option>
                    <option value="3">تبلت</option>
                    <option value="4">صوتی</option>
                    <option value="5">پوشیدنی</option>
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
                  <label htmlFor="inventory" className="block text-sm font-medium text-gray-700 mb-1">
                    موجودی <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="inventory"
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
                      value={feature.value || ""}
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