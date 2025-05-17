"use client"
import Link from "next/link"
import { Logo } from "./logo"
import { Search, ShoppingCart, User, Menu, ChevronDown } from "lucide-react"
import { listCategory } from "@/lib/api/main/listCategory"
import { useState, useEffect } from "react"

export function Navigation() {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await listCategory()
        if (response.data?.categories) {
          // Filter only parent categories (where parent_id is null or 0)
          const parentCategories = response.data.categories.filter(
            category => !category.parent_id || category.parent_id === 0
          )
          setCategories(parentCategories)
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCategories()
  }, [])

  return (
    <header className="bg-white shadow-md sticky top-0 z-30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-8">
            <Logo size="large" />

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/home" className="font-medium hover:text-primary transition-colors">
                صفحه اصلی
              </Link>
              <div className={`relative ${isLoading ? '' : 'group'}`}>
                <button className="flex items-center gap-1 font-medium hover:text-primary transition-colors">
                  <span>دسته بندی محصولات</span>
                  <ChevronDown size={16} />
                </button>
                {!isLoading && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                    <div className="py-2">
                      {categories.map((category) => (
                        <Link 
                          key={category.id} 
                          href={`/products/category/${category.id}`} 
                          className="block px-4 py-2 hover:bg-gray-50"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <Link href="/about" className="font-medium hover:text-primary transition-colors">
                درباره ما
              </Link>
              <Link href="/contact" className="font-medium hover:text-primary transition-colors">
                تماس با ما
              </Link>
              <Link href="/faq" className="font-medium hover:text-primary transition-colors">
                سوالات متداول
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="جستجو در محصولات..."
                className="w-64 bg-gray-50 border border-gray-200 rounded-lg py-2 pr-10 pl-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            {/* Icons */}
            <div className="flex items-center gap-2">
              <Link href="/cart" className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
                <ShoppingCart size={22} className="text-gray-700" />
              </Link>
              <Link href="/dashboard/user" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <User size={22} className="text-gray-700" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
