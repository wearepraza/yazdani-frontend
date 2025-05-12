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

      {/* Header */}
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
                <div className="relative group">
                  <button className="flex items-center gap-1 font-medium hover:text-primary transition-colors">
                    <span>محصولات</span>
                    <ChevronDown size={16} />
                  </button>
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                    <div className="py-2">
                      <Link href="/products/category/mobile" className="block px-4 py-2 hover:bg-gray-50">
                        گوشی موبایل
                      </Link>
                      <Link href="/products/category/laptop" className="block px-4 py-2 hover:bg-gray-50">
                        لپ تاپ
                      </Link>
                      <Link href="/products/category/tablet" className="block px-4 py-2 hover:bg-gray-50">
                        تبلت
                      </Link>
                      <Link href="/products/category/audio" className="block px-4 py-2 hover:bg-gray-50">
                        لوازم صوتی
                      </Link>
                      <Link href="/products/category/wearable" className="block px-4 py-2 hover:bg-gray-50">
                        گجت‌های پوشیدنی
                      </Link>
                      <Link href="/products/category/accessories" className="block px-4 py-2 hover:bg-gray-50">
                        لوازم جانبی
                      </Link>
                    </div>
                  </div>
                </div>
                <Link href="/products/discounts" className="font-medium hover:text-primary transition-colors">
                  تخفیف‌ها
                </Link>
                <Link href="/blog" className="font-medium hover:text-primary transition-colors">
                  وبلاگ
                </Link>
                <Link href="/contact" className="font-medium hover:text-primary transition-colors">
                  تماس با ما
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
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
                  <Heart size={22} className="text-gray-700" />
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    3
                  </span>
                </button>
                <Link href="/cart" className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
                  <ShoppingCart size={22} className="text-gray-700" />
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    2
                  </span>
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

      {/* Main Content */}
      <main className="flex-1">
        <Suspense>{children}</Suspense>
      </main>

      {/* Footer */}
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
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    ></path>
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
                <li>
                  <Link href="/products/discounts" className="text-gray-400 hover:text-amber-400 transition-colors">
                    تخفیف‌ها
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-400 hover:text-amber-400 transition-colors">
                    وبلاگ
                  </Link>
                </li>
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

              <div className="mt-8">
                <h4 className="font-medium mb-3">عضویت در خبرنامه</h4>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="ایمیل خود را وارد کنید"
                    className="bg-gray-800 border border-gray-700 rounded-r-lg py-2 px-4 flex-1 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                  <button className="bg-amber-500 text-white px-4 py-2 rounded-l-lg hover:bg-amber-600 transition-colors">
                    عضویت
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">© ۱۴۰۲ فونیکسو. تمامی حقوق محفوظ است.</p>
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                <img src="/placeholder.svg?height=30&width=50" alt="پرداخت" className="h-8" />
                <img src="/placeholder.svg?height=30&width=50" alt="پرداخت" className="h-8" />
                <img src="/placeholder.svg?height=30&width=50" alt="پرداخت" className="h-8" />
                <img src="/placeholder.svg?height=30&width=50" alt="پرداخت" className="h-8" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
