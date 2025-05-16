import Link from "next/link"
import { Search, ShoppingCart, User, Heart, Menu, ChevronDown, Phone, Mail, MapPin } from "lucide-react"
import { Logo } from "@/components/logo"
import { Suspense } from "react"

export default function ProductsLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-2 text-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Phone size={14} className="text-amber-400" />
              <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail size={14} className="text-amber-400" />
              <span>info@phonixo.com</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth" className="hover:text-amber-400 transition-colors">
              ورود / ثبت نام
            </Link>
            <span className="text-gray-600">|</span>
            <Link href="/dashboard/user" className="hover:text-amber-400 transition-colors">
              پنل کاربری
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        <Suspense>{children}</Suspense>
      </main>
    </div>
  )
}
