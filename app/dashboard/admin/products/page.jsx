"use client"

import { useState, useEffect } from "react"
import { Search, Filter, Plus, Edit, Trash, Eye, ImageOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { listProducts } from "@/lib/api/main/listProducts"
import { STORAGE } from "@/lib/api/config"
import { deleteProduct } from "@/lib/api/admin/product/deleteProduct"
import Image from "next/image"
import Loading from "./loading"

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      product.category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      const response = await listProducts()
  
      const updated = response.data.map((product) => {
        let status = "نامشخص"
        if (product.stock === 0) status = "ناموجود"
        else if (product.stock < 5) status = "کم موجود"
        else status = "موجود"
        return { ...product, status }
      })
  
      setProducts(updated)
      setLoading(false)
    }
  
    fetchProducts()
  }, [])

  // useEffect(() => {
  //   const fetchGalleries = async () => {
  //     for (const product of products) {
  //       try {
  //         const galleryResponse = await listGallery(product.id)
  //         console.log(`Gallery for product ${product.id}:`, galleryResponse)
  //       } catch (error) {
  //         console.error(`Error fetching gallery for product ${product.id}:`, error)
  //       }
  //     }
  //   }

  //   if (products.length > 0) {
  //     fetchGalleries()
  //   }
  // }, [products])
  

  const getStatusColor = (status) => {
    switch (status) {
      case "موجود":
        return "bg-green-100 text-green-700"
      case "ناموجود":
        return "bg-red-100 text-red-700"
      case "کم موجود":
        return "bg-amber-100 text-amber-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  }

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;
    
    try {
      const response = await deleteProduct(productToDelete.id);
      if (response.error) {
        console.error('Error deleting product:', response.message);
        return;
      }
      setProducts(products.filter((product) => product.id !== productToDelete.id));
      setDeleteModalOpen(false);
      setProductToDelete(null);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setProductToDelete(null);
  }

  if (loading) {
    return <Loading />
  }
  
  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">محصولات</h1>
          <p className="text-gray-500 mt-1">مدیریت محصولات فروشگاه</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link href="/dashboard/admin/products/add">
            <Button className="flex items-center gap-2">
              <Plus size={16} />
              <span>افزودن محصول</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="جستجو در محصولات..."
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

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">تایید حذف محصول</h3>
            <p className="text-gray-600 mb-6">
              آیا از حذف محصول "{productToDelete?.title}" اطمینان دارید؟
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={handleDeleteCancel}
              >
                انصراف
              </Button>
              <Button
                variant="default"
                onClick={handleDeleteConfirm}
              >
                حذف
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Products Table */}
  
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">محصول</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">دسته‌بندی</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">قیمت</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">موجودی</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">وضعیت</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.length > 0 ? (
                  currentProducts.map((product) => (
                    <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded flex items-center overflow-hidden justify-center">
                            <Image src={`${STORAGE}${product.image_path}`} alt="product" width={128} height={128} className="text-gray-400" />
                          </div>
                          <span className="font-medium text-gray-900">{product.title}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">{product.category.name}</td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">{product.price} تومان</td>
                      <td className="px-4 py-4 text-sm text-gray-600">{product.inventory} عدد</td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}
                        >
                          {product.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <Link href={`/dashboard/admin/products/${product.id}`}>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye size={16} className="text-gray-500" />
                            </Button>
                          </Link>
                          <Link href={`/dashboard/admin/products/edit/${product.id}`}>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Edit size={16} className="text-blue-500" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleDeleteClick(product)}
                          >
                            <Trash size={16} className="text-red-500" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                      محصولی موجود نیست.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
    

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-500">
          نمایش {startIndex + 1} تا {Math.min(endIndex, filteredProducts.length)} از {filteredProducts.length} محصول
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            قبلی
          </Button>
          <span className="text-sm text-gray-600">
            صفحه {currentPage} از {totalPages}
          </span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            بعدی
          </Button>
        </div>
      </div>
    </div>
  )
}