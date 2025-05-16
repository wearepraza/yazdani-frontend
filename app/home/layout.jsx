import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"
import { Footer } from '@/components/footer'
import { Suspense } from "react"
import { Navigation } from "@/components/navigation"

export default function HomeLayout({ children }) {
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

      {/* Header - Using the shared Navigation component */}
      <Navigation />

      {/* Main Content */}
      <main className="flex-1">
        <Suspense>{children}</Suspense>
      </main>

      <Footer />
    </div>
  )
}
