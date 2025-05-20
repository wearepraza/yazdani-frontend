"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, Package, CreditCard, Heart, Settings, LogOut, Menu, X, Home, Award, ChevronDown } from "lucide-react"
import { useUserContext } from "@/context/user-context/UserContext"

export default function UserDashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { userData, isLoading } = useUserContext()

  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById("user-sidebar")
      const menuButton = document.getElementById("user-menu-button")

      if (sidebar && !sidebar.contains(event.target) && menuButton && !menuButton.contains(event.target)) {
        setIsSidebarOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    setIsSidebarOpen(false)
  }, [pathname])

  const navItems = [
    {
      title: "صفحه اصلی",
      href: "/",
      icon: Home,
    },
    {
      title: "داشبورد",
      href: "/dashboard/user",
      icon: Home,
    },
    {
      title: "اطلاعات حساب",
      href: "/dashboard/user/account",
      icon: User,
    },
    {
      title: "سفارش‌ها",
      href: "/dashboard/user/orders",
      icon: Package,
    },
    {
      title: "علاقه‌مندی‌ها",
      href: "/dashboard/user/favorites",
      icon: Heart,
    },
    {
      title: "باشگاه مشتریان",
      href: "/dashboard/user/club",
      icon: Award,
    },
        {
      title: "کوییز روزانه",
      href: "/dashboard/user/quiz",
      icon: Award,
    },
    {
      title: "کارت‌های اعتباری",
      icon: CreditCard,
      href: "#",
      disabled: true,
      badge: "به زودی",
    },
    {
      title: "تنظیمات",
      href: "/dashboard/user/settings",
      icon: Settings,
    },
  ]

  const handleLogout = () => {
    // Clear the auth token cookie
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "dashboardPath=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // Redirect to auth page
    window.location.href = "/auth"
  }

  const UserInfoSkeleton = () => (
    <div className="animate-pulse">
      <div className="h-4 w-24 bg-gray-200 rounded mb-1"></div>
      <div className="h-3 w-32 bg-gray-200 rounded"></div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation */}
      <header className="bg-white shadow-md py-3 px-4 md:px-6 flex justify-between items-center sticky top-0 z-30">
        <div className="flex items-center">
          <button
            id="user-menu-button"
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
              فونیکسو
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <button className="flex items-center gap-2 py-1 px-2 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex flex-col items-end">
                {isLoading ? (
                  <UserInfoSkeleton />
                ) : (
                  <>
                    <span className="text-sm font-medium">{userData?.name || 'کاربر فونیکسو'}</span>
                    <span className="text-xs text-gray-500">{userData?.mobile_number || 'شماره موبایل'}</span>
                  </>
                )}
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white shadow-sm">
                <User size={18} />
              </div>
              <ChevronDown size={16} className="text-gray-400" />
            </button>

            <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              <div className="py-2">
                <Link href="/dashboard/user/account" className="block px-4 py-2 text-sm hover:bg-gray-50">
                  مشاهده پروفایل
                </Link>
                <Link href="/dashboard/user/edit-profile" className="block px-4 py-2 text-sm hover:bg-gray-50">
                  ویرایش پروفایل
                </Link>
                <Link href="/dashboard/user/settings" className="block px-4 py-2 text-sm hover:bg-gray-50">
                  تنظیمات
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
          id="user-sidebar"
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
                  {isLoading ? (
                    <UserInfoSkeleton />
                  ) : (
                    <>
                      <p className="font-bold text-lg">{userData?.name || 'کاربر فونیکسو'}</p>
                      <p className="text-sm text-gray-500">{userData?.mobile_number || 'شماره موبایل'}</p>
                    </>
                  )}
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
                          : item.disabled
                          ? "opacity-50 cursor-default bg-gray-50 hover:bg-gray-100"
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                      onClick={(e) => item.disabled && e.preventDefault()}
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
                  {isLoading ? (
                    <UserInfoSkeleton />
                  ) : (
                    <>
                      <p className="font-bold text-lg">{userData?.name || 'کاربر فونیکسو'}</p>
                      <p className="text-sm text-gray-500">{userData?.mobile_number || 'شماره موبایل'}</p>
                    </>
                  )}
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
                          : item.disabled
                          ? "opacity-50 cursor-default bg-gray-50 hover:bg-gray-100"
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                      onClick={(e) => item.disabled && e.preventDefault()}
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
