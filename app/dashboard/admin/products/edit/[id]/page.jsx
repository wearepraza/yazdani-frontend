"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Save, X, Upload, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { detailsProducts } from "@/lib/api/main/detailsProducts";
import { updateProduct } from "@/lib/api/admin/product/updateProduct";
import { uploadGallery } from "@/lib/api/admin/product/gallery/uploadGallery";
import { listGallery } from "@/lib/api/admin/product/gallery/listGallery";
import { deleteGallery as deleteGalleryImage } from "@/lib/api/admin/product/gallery/deleteGallery";
import Image from "next/image";
import { STORAGE, STORAGE_GALLERY } from "@/lib/api/config";
import  Loading  from "./loading";
import { listCategory } from "@/lib/api/main/listCategory";

export default function EditProductPage() {
  const params = useParams();
  const productId = Number.parseInt(params.id);

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

const [productData, setProductData] = useState({
  title: "",
  description: "",
  price: "",
  discount_price: "",
  max_discount: "", 
  category: {
    id: "",
    name: "",
    parent_id: null
  },
  category_id: "",
  inventory: "",
  features: [],
  status: "published",
  image_path: "",
  image_url: "",
});


  const [gallery, setGallery] = useState([]);
  const [newGallery, setNewGallery] = useState([{ file: null, label: "" }]);
  const [uploading, setUploading] = useState([]);
  const [categories, setCategories] = useState([]);
  const [parentCategories, setParentCategories] = useState([]);
  const [childCategories, setChildCategories] = useState({});

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await detailsProducts(productId);
        if (response.error) {
          setError(response.message || "خطا در دریافت اطلاعات محصول");
          return;
        }
        setProductData({
          title: response.data.title || "",
          description: response.data.description || "",
          price: response.data.price || "",
          discount_price: response.data.discount_price || "",
          category: response.data.category || { id: "", name: "", parent_id: null },
          category_id: response.data.category_id || "",
          inventory: response.data.inventory || "",
          features: response.data.features?.map(feature => feature.value) || [],
          status: response.data.status || "published",
          image_path: response.data.image_path || "",
          image_url: response.data.image_url || "",
          max_discount: response.data.max_discount || "",
        });
      } catch (err) {
        setError("خطا در دریافت اطلاعات محصول");
      }
      setLoading(false);
    };

    const fetchGallery = async () => {
      const response = await listGallery(productId);
      if (!response.error) {
        setGallery(response.data.gallery);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await listCategory();
        console.log(response)
        if (!response.error) {
          const allCategories = response.data.categories;
          
          // جداسازی دسته‌بندی‌های اصلی و زیرمجموعه‌ها
          const parents = allCategories.filter(cat => !cat.parent_id);
          const children = allCategories.filter(cat => cat.parent_id);
          
          // گروه‌بندی زیرمجموعه‌ها بر اساس parent_id
          const childrenByParent = children.reduce((acc, child) => {
            if (!acc[child.parent_id]) {
              acc[child.parent_id] = [];
            }
            acc[child.parent_id].push(child);
            return acc;
          }, {});

          setParentCategories(parents);
          setChildCategories(childrenByParent);
          setCategories(allCategories);
        } else {
          setError(response.message || "خطا در دریافت دسته‌بندی‌ها");
        }
      } catch (err) {
        setError("خطا در دریافت دسته‌بندی‌ها");
      }
    };

    fetchProductData();
    fetchGallery();
    fetchCategories();
  }, [productId]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeatureChange = (index, value) => {
    const updated = [...productData.features];
    updated[index] = value;
    setProductData((prev) => ({ ...prev, features: updated }));
  };

  const addFeature = () => {
    setProductData((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }));
  };

  const removeFeature = (index) => {
    const updated = [...productData.features];
    updated.splice(index, 1);
    setProductData((prev) => ({ ...prev, features: updated }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductData((prev) => ({
        ...prev,
        image: file,
        image_url: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formattedFeatures = productData.features
        .filter((f) => f.trim() !== "")
        .map(feature => ({
          value: feature
        }));

      const response = await updateProduct({
        product_id: productId,
        title: productData.title,
        description: productData.description,
        price: productData.price,
        discount_price: productData.discount_price,
        max_discount: productData.max_discount,
        category_id: productData.category_id,
        inventory: productData.inventory,
        features: formattedFeatures,
        status: productData.status,
        image: productData.image,
      });

      if (response.error) {
        setError(response.message || "خطا در بروزرسانی محصول");
        return;
      }

      setSuccess(true);
    } catch (err) {
      setError("خطا در بروزرسانی محصول");
    } finally {
      setLoading(false);
    }
  };
  const handleNewGalleryFileChange = (index, e) => {
    const file = e.target.files[0];
    const updated = [...newGallery];
    updated[index].file = file;
    setNewGallery(updated);
  };

  const handleNewGalleryLabelChange = (index, value) => {
    const updated = [...newGallery];
    updated[index].label = value;
    setNewGallery(updated);
  };

  const addGalleryField = () => {
    setNewGallery([...newGallery, { file: null, label: "" }]);
    setUploading([...uploading, false]);
  };

  const uploadGalleryImage = async (index) => {
    const image = newGallery[index].file;
    const label = newGallery[index].label;
    if (!image || !productId) return;

    const up = [...uploading];
    up[index] = true;
    setUploading(up);

    const result = await uploadGallery(productId, image, label);

    up[index] = false;
    setUploading([...up]);

    if (result?.data?.success) {
      const galleryResponse = await listGallery(productId);
      if (!galleryResponse.error) {
        setGallery(galleryResponse.data.gallery);
      }
      
      const updatedNewGallery = [...newGallery];
      updatedNewGallery[index] = { file: null, label: "" };
      setNewGallery(updatedNewGallery);
    } else {
      // alert("خطا در آپلود تصویر");
      setError(result.message || "خطا در آپلود تصویر");
    }
  };

  const handleDeleteGalleryImage = async (id) => {
    const confirm = window.confirm("آیا از حذف این تصویر مطمئن هستید؟");
    if (!confirm) return;

    const res = await deleteGalleryImage(id);
    if (res?.data?.success) {
      setGallery((prev) => prev.filter((img) => img.id !== id));
    }
  };

  if (loading) return <Loading />;
  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4">
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

                {/* Categories Display */}
                <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                  <h2 className="text-lg font-bold mb-4">دسته‌بندی محصول</h2>
                  
                  <div className="mb-6">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                      دسته‌بندی فعلی
                    </label>
                    <div className="p-3 rounded-lg border border-blue-500 bg-blue-50 mb-4">
                      <p className="font-medium">{productData.category?.name || "بدون دسته‌بندی"}</p>
                      {productData.category?.parent_id && (
                        <p className="text-sm text-gray-500 mt-1">
                          زیرمجموعه {categories.find(c => c.id === productData.category.parent_id)?.name || productData.category.parent_id}
                        </p>
                      )}
                    </div>

                    <label htmlFor="new_category" className="block text-sm font-medium text-gray-700 mb-1">
                      تغییر دسته‌بندی
                    </label>
                    <select
                      id="new_category"
                      name="category_id"
                      value={productData.category_id}
                      onChange={handleChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      <option value="">انتخاب دسته‌بندی</option>
                      {parentCategories.map(parent => (
                        <optgroup key={parent.id} label={parent.name}>
                          <option value={parent.id}>{parent.name}</option>
                          {childCategories[parent.id]?.map(child => (
                            <option key={child.id} value={child.id}>
                              └─ {child.name}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>

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
                 <div>
                  <label htmlFor="discountPrice" className="block text-sm font-medium text-gray-700 mb-1">
                    حداکثر تخفیف (تومان)
                  </label>
                  <Input
                    id="maxDiscountPrice"
                    name="max_discount"
                    value={productData.max_discount}
                    onChange={handleChange}
                    placeholder="در صورت وجود تخفیف"
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

        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 border shadow-sm">
            <h2 className="text-lg font-bold mb-4">تصویر محصول</h2>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
              {productData.image_url ? (
                <img src={`${STORAGE}${productData.image_path}`} alt="پیش‌نمایش" className="w-full h-48 object-contain mb-4" />
              ) : (
                <>
                  <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500 mb-4">فایل تصویر را انتخاب کنید</p>
                </>
              )}
              <input
                type="file"
                className="hidden"
                id="product-image"
                onChange={handleImageChange}
                accept="image/*"
              />
              <label
                htmlFor="product-image"
                className="bg-blue-600 text-white px-4 py-2 rounded text-sm cursor-pointer hover:bg-blue-700"
              >
                {productData.image_url ? "تغییر تصویر" : "انتخاب فایل"}
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border shadow-sm">
        <h3 className="font-bold mb-4">گالری تصاویر</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {gallery.map((img) => (
            <div key={img.id || img.image_url} className="relative group border rounded-lg overflow-hidden">
              <div className="w-full h-36 relative p-2">
              <img src={`${STORAGE_GALLERY}${img.image_path}`} className="h-full object-cover w-full " />
                </div>
              <button
                type="button"
                onClick={() => handleDeleteGalleryImage(img.id)}
                className="absolute top-2 left-2 bg-white p-1 rounded-full shadow group-hover:opacity-100 opacity-0 transition"
              >
                <X size={16} className="text-red-500" />
              </button>
              <div className="text-xs text-center text-gray-500 mt-1">{img.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          {newGallery.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input type="file" onChange={(e) => handleNewGalleryFileChange(index, e)} />
              <Input
                placeholder="برچسب تصویر"
                value={item.label}
                onChange={(e) => handleNewGalleryLabelChange(index, e.target.value)}
              />
              <Button
                type="button"
                onClick={() => uploadGalleryImage(index)}
                disabled={uploading[index]}
              >
                {uploading[index] ? "در حال آپلود..." : "آپلود"}
              </Button>
            </div>
          ))}
          {/* <Button type="button" onClick={addGalleryField} variant="ghost" size="sm">
            <Plus size={14} className="ml-1" />
            افزودن تصویر دیگر
          </Button> */}
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Button type="submit" disabled={loading}>
          {loading ? "در حال ذخیره..." : "ذخیره محصول"}
        </Button>
      </div>
    </form>
  );
}
