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
    discountPrice: "",
    category: "",
    category_id: "",
    inventory: "",
    features: [{ value: "" }],
    status: "published",
    image_path: "",
    image_url: "",
  });

  const [gallery, setGallery] = useState([]);
  const [newGallery, setNewGallery] = useState([{ file: null, label: "" }]);
  const [uploading, setUploading] = useState([]);

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
          discountPrice: response.data.discount_price || "",
          category: response.data.category?.name || "",
          category_id: response.data.category_id || "",
          inventory: response.data.inventory || "",
          features: response.data.features || [{ value: "" }],
          status: response.data.status || "published",
          image_path: response.data.image_path || "",
          image_url: response.data.image_url || "",
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

    fetchProductData();
    fetchGallery();
  }, [productId]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeatureChange = (index, value) => {
    const updated = [...productData.features];
    updated[index] = { ...updated[index], value };
    setProductData((prev) => ({ ...prev, features: updated }));
  };

  const addFeature = () => {
    setProductData((prev) => ({
      ...prev,
      features: [...prev.features, { value: "" }],
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
        .filter((f) => f.value.trim() !== "")
        .map((f) => f.value.trim());

      const response = await updateProduct({
        product_id: productId,
        title: productData.title,
        description: productData.description,
        price: productData.price,
        discount_price: productData.discountPrice,
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
          <div className="bg-white rounded-xl p-6 border shadow-sm">
            <label className="block font-bold mb-2">عنوان محصول</label>
            <Input name="title" value={productData.title} onChange={handleChange} />

            <label className="block font-bold mt-4 mb-2">توضیحات</label>
            <textarea
              name="description"
              value={productData.description}
              onChange={handleChange}
              rows={5}
              className="w-full border rounded px-3 py-2"
            />

            <label className="block font-bold mt-4 mb-2">ویژگی‌ها</label>
            {productData.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <Input
                  value={feature.value}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  className="flex-1"
                />
                {productData.features.length > 1 && (
                  <Button type="button" onClick={() => removeFeature(index)} variant="ghost">
                    <Minus size={16} />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" onClick={addFeature} variant="outline" size="sm">
              <Plus size={14} className="ml-1" />
              افزودن ویژگی
            </Button>
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
