import Link from "next/link"
import { Logo } from "./logo"
import { Suspense } from "react"
import { MapPin, Phone, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <Logo size="large" />
            <p className="mt-4 text-gray-400">
              فونیکسو، فروشگاه آنلاین محصولات دیجیتال با بیش از ۱۰ سال سابقه درخشان در ارائه محصولات با کیفیت و خدمات
              پس از فروش عالی.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 3584.55 3673.6">
                  <path d="M1071.43,2.75H2607.66C3171,2.75,3631.82,462.91,3631.82,1026.2v493.93c-505,227-1014.43,1348.12-1756.93,1104.51-61.16,43.46-202.11,222.55-212,358.43-257.11-34.24-553.52-328.88-517.95-646.62C717,2026.91,1070.39,1455.5,1409.74,1225.51c727.32-492.94,1737.05-69,1175.39,283.45-341.52,214.31-1071.84,355.88-995.91-170.24-200.34,57.78-328.58,431.34-87.37,626-223.45,219.53-180.49,623.07,58.36,755.57,241.56-625.87,1082.31-544.08,1422-1291.2,255.57-562-123.34-1202.37-880.91-1104C1529.56,399.34,993.64,881.63,725.62,1453.64,453.68,2034,494.15,2811.15,1052.55,3202.82c657.15,460.92,1356.78,34.13,1780.52-523.68,249.77-328.78,468-693,798.75-903.37v875.72c0,563.28-460.88,1024.86-1024.16,1024.86H1071.43c-563.29,0-1024.16-460.87-1024.16-1024.16V1026.9C47.27,463.61,508.14,2.74,1071.43,2.74Z" transform="translate(-47.27 -2.74)" fillRule="evenodd"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              دسترسی سریع
              <span className="absolute -bottom-2 right-0 w-12 h-1 bg-amber-500"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/home" className="text-gray-400 hover:text-amber-400 transition-colors">
                  صفحه اصلی
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-amber-400 transition-colors">
                  محصولات
                </Link>
              </li>
              {/* <li>
                <Link href="/products/discounts" className="text-gray-400 hover:text-amber-400 transition-colors">
                  تخفیف‌ها
                </Link>
              </li> */}
              <li>
                <Link href="/about" className="text-gray-400 hover:text-amber-400 transition-colors">
                  درباره ما
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-amber-400 transition-colors">
                  تماس با ما
                </Link>
              </li>
                {/* <li>
                  <Link href="/faq" className="text-gray-400 hover:text-amber-400 transition-colors">
                    سوالات متداول
                  </Link>
                </li> */}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              خدمات مشتریان
              <span className="absolute -bottom-2 right-0 w-12 h-1 bg-amber-500"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-amber-400 transition-colors">
                  سوالات متداول
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-400 hover:text-amber-400 transition-colors">
                  شیوه‌های ارسال
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-400 hover:text-amber-400 transition-colors">
                  شرایط بازگشت کالا
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="text-gray-400 hover:text-amber-400 transition-colors">
                  گارانتی محصولات
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-amber-400 transition-colors">
                  حریم خصوصی
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              تماس با ما
              <span className="absolute -bottom-2 right-0 w-12 h-1 bg-amber-500"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-amber-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">تهران، خیابان ولیعصر، پلاک ۱۲۳، طبقه دوم</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={20} className="text-amber-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">۰۲۱-۱۲۳۴۵۶۷۸</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={20} className="text-amber-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">info@phonixo.com</span>
              </li>
            </ul>

            {/* <div className="mt-8">
              <h4 className="font-medium mb-3">عضویت در خبرنامه</h4>
              <div className="flex">
                <Suspense
                  fallback={<div className="bg-gray-800 border border-gray-700 rounded-r-lg py-2 px-4 flex-1"></div>}
                >
                  <input
                    type="email"
                    placeholder="ایمیل خود را وارد کنید"
                    className="bg-gray-800 border border-gray-700 rounded-r-lg py-2 px-4 flex-1 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </Suspense>
                <button className="bg-amber-500 text-white px-4 py-2 rounded-l-lg hover:bg-amber-600 transition-colors">
                  عضویت
                </button>
              </div>
            </div> */}
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© ۱۴۰۲ فونیکسو. تمامی حقوق محفوظ است.</p>
            {/* <div className="flex items-center gap-4 mt-4 md:mt-0">
              <img src="/placeholder.svg?height=30&width=50" alt="پرداخت" className="h-8" />
              <img src="/placeholder.svg?height=30&width=50" alt="پرداخت" className="h-8" />
              <img src="/placeholder.svg?height=30&width=50" alt="پرداخت" className="h-8" />
              <img src="/placeholder.svg?height=30&width=50" alt="پرداخت" className="h-8" />
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  )
}
