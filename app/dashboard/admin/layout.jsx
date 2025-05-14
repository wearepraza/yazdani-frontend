"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  User,
  Package,
  ShoppingBag,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  Users,
  ChevronDown,
  BarChart,
  PlusCircle,
  CreditCard,
} from "lucide-react"

export default function AdminDashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById("admin-sidebar")
      const menuButton = document.getElementById("admin-menu-button")

      if (sidebar && !sidebar.contains(event.target) && menuButton && !menuButton.contains(event.target)) {
        setIsSidebarOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setIsSidebarOpen(false)
  }, [pathname])

  const navItems = [
    {
      title: "داشبورد",
      href: "/dashboard/admin",
      icon: Home,
    },
    {
      title: "محصولات",
      href: "/dashboard/admin/products",
      icon: ShoppingBag,
    },
    // {
    //   title: "کارت‌های اعتباری",
    //   icon: CreditCard,
    //   href: "/dashboard/admin/credit-cards",
    // },
    {
      title: "افزودن محصول",
      href: "/dashboard/admin/products/add",
      icon: PlusCircle,
    },
    {
      title: "سفارش‌ها",
      href: "/dashboard/admin/orders",
      icon: Package,
    },
    {
      title: "کاربران",
      href: "/dashboard/admin/users",
      icon: Users,
    },
    {
      title: "گزارش‌ها",
      href: "/dashboard/admin/reports",
      icon: BarChart,
    },
    {
      title: "تنظیمات",
      href: "/dashboard/admin/settings",
      icon: Settings,
    },
  ]

  const handleLogout = () => {
    // In a real app, you would handle logout logic here
    window.location.href = "/auth"
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation */}
      <header className="bg-white shadow-md py-3 px-4 md:px-6 flex justify-between items-center sticky top-0 z-30">
        <div className="flex items-center">
          <button
            id="admin-menu-button"
            className="md:hidden p-2 mr-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center gap-1.5">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              پنل مدیریت فونیکسو
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <button className="flex items-center gap-2 py-1 px-2 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium">مدیر سیستم</span>
                <span className="text-xs text-gray-500">admin@example.com</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white shadow-sm">
                <User size={18} />
              </div>
              <ChevronDown size={16} className="text-gray-400" />
            </button>

            <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              <div className="py-2">
                <Link href="/dashboard/admin/profile" className="block px-4 py-2 text-sm hover:bg-gray-50">
                  پروفایل مدیر
                </Link>
                <Link href="/dashboard/admin/settings" className="block px-4 py-2 text-sm hover:bg-gray-50">
                  تنظیمات
                </Link>
                <hr className="my-1 border-gray-100" />
                <Link href="/dashboard/user" className="block px-4 py-2 text-sm hover:bg-gray-50">
                  پنل کاربری
                </Link>
                <hr className="my-1 border-gray-100" />
                <button
                  className="w-full text-right px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                  onClick={handleLogout}
                >
                  خروج از حساب کاربری
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar - Mobile (Overlay) */}
        <div
          className={`fixed inset-0 bg-black/20 z-40 md:hidden transition-opacity duration-300 ${
            isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsSidebarOpen(false)}
        ></div>

        <aside
          id="admin-sidebar"
          className={`fixed inset-y-0 right-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out md:hidden ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="p-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white shadow-md">
                  <User size={24} />
                </div>
                <div>
                  <p className="font-bold text-lg">مدیر سیستم</p>
                  <p className="text-sm text-gray-500">admin@example.com</p>
                </div>
              </div>
            </div>

            <nav className="flex-1 px-3 py-4 overflow-y-auto">
              <ul className="space-y-1.5">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        pathname === item.href
                          ? "bg-primary text-white shadow-md shadow-primary/20"
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <item.icon size={18} className={pathname === item.href ? "text-white" : "text-gray-500"} />
                      <span className="font-medium">{item.title}</span>
                      {item.badge && (
                        <span
                          className={`mr-auto px-2 py-0.5 rounded-full text-xs ${
                            pathname === item.href ? "bg-white text-primary" : "bg-primary/10 text-primary"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
                {/* Add these links to the sidebar navigation */}
                <li>
                  <Link
                    href="/dashboard/admin/about"
                    className="flex items-center p-2 text-gray-600 rounded-lg hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    مدیریت درباره ما
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/admin/contact"
                    className="flex items-center p-2 text-gray-600 rounded-lg hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    مدیریت تماس با ما
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/admin/faq"
                    className="flex items-center p-2 text-gray-600 rounded-lg hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    مدیریت سوالات متداول
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="p-4 border-t border-gray-100">
              <button
                className="flex items-center gap-3 w-full px-4 py-3 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                onClick={handleLogout}
              >
                <LogOut size={18} className="text-red-400" />
                <span className="font-medium">خروج از حساب کاربری</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Sidebar - Desktop (Fixed) */}
        <aside className="hidden md:block w-72 bg-white shadow-md border-l border-gray-100 overflow-y-auto">
          <div className="flex flex-col h-full">
            <div className="p-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white shadow-md">
                  <User size={24} />
                </div>
                <div>
                  <p className="font-bold text-lg">مدیر سیستم</p>
                  <p className="text-sm text-gray-500">admin@example.com</p>
                </div>
              </div>
            </div>

            <nav className="flex-1 px-3 py-5 overflow-y-auto">
              <ul className="space-y-1.5">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        pathname === item.href
                          ? "bg-primary text-white shadow-md shadow-primary/20"
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <item.icon size={18} className={pathname === item.href ? "text-white" : "text-gray-500"} />
                      <span className="font-medium">{item.title}</span>
                      {item.badge && (
                        <span
                          className={`mr-auto px-2 py-0.5 rounded-full text-xs ${
                            pathname === item.href ? "bg-white text-primary" : "bg-primary/10 text-primary"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
                {/* Add these links to the sidebar navigation */}
                <li>
                  <Link
                    href="/dashboard/admin/about"
                    className="flex items-center p-2 text-gray-600 rounded-lg hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    مدیریت درباره ما
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/admin/contact"
                    className="flex items-center p-2 text-gray-600 rounded-lg hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    مدیریت تماس با ما
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/admin/faq"
                    className="flex items-center p-2 text-gray-600 rounded-lg hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    مدیریت سوالات متداول
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="p-4 mt-auto border-t border-gray-100">
              <button
                className="flex items-center gap-3 w-full px-4 py-3 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                onClick={handleLogout}
              >
                <LogOut size={18} className="text-red-400" />
                <span className="font-medium">خروج از حساب کاربری</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 md:p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
