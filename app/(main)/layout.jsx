"use client"
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import {
  Search,
  ShoppingCart,
  User,
  Heart,
  Menu,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation"

export default function MainLayout({ children }) {
  const pathname = usePathname()

  const generateBreadcrumbs = () => {
    const paths = pathname.split('/').filter(Boolean)
    const breadcrumbs = []
    
    breadcrumbs.push({
      label: 'خانه',
      href: '/',
    })

    // Build up the path and add each segment
    let currentPath = ''
    paths.forEach((path, index) => {
      currentPath += `/${path}`
      
      // Convert path to readable label with Persian translations
      let label = path
      switch (path) {
        case 'about':
          label = 'درباره ما'
          break
        case 'faq':
          label = 'سوالات متداول'
          break
        case 'contact':
          label = 'تماس با ما'
          break
        case 'terms':
          label = 'قوانین و مقررات'
          break
        default:
          label = path
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
      }
      
      breadcrumbs.push({
        label,
        href: currentPath,
        isLast: index === paths.length - 1
      })
    })

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  return (
    <div className="min-h-screen flex flex-col">
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
            <Link
              href="/auth"
              className="hover:text-amber-400 transition-colors"
            >
              ورود / ثبت نام
            </Link>
            <span className="text-gray-600">|</span>
            <Link
              href="/dashboard/user"
              className="hover:text-amber-400 transition-colors"
            >
              پنل کاربری
            </Link>
          </div>
        </div>
      </div>
      <Navigation />
      <div className="bg-white py-4 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-600">
            {breadcrumbs.map((item, index) => (
              <div key={item.href} className="flex items-center">
                {index > 0 && <span className="mx-2">/</span>}
                {item.isLast ? (
                  <span className="font-medium text-gray-900">{item.label}</span>
                ) : (
                  <Link href={item.href} className="hover:text-blue-600">
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
