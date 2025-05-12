import { Navigation } from "@/components/navigation"

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">{children}</main>
      <footer className="bg-gray-100 py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">© ۱۴۰۲ فونیکسو. تمامی حقوق محفوظ است.</p>
            <div className="flex items-center space-x-4 space-x-reverse mt-4 md:mt-0">
              <a href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                درباره ما
              </a>
              <a href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                تماس با ما
              </a>
              <a href="/faq" className="text-gray-600 hover:text-blue-600 transition-colors">
                سوالات متداول
              </a>
              <a href="/privacy" className="text-gray-600 hover:text-blue-600 transition-colors">
                حریم خصوصی
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
