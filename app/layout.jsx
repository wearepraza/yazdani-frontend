import 'swiper/css'
import 'swiper/css/navigation'
import 'react-image-lightbox/style.css'
import 'react-medium-image-zoom/dist/styles.css'

import "./globals.css"
import { Vazirmatn } from "next/font/google"
import { UserProvider } from "@/context/user-context/UserContext"
import { Providers } from '@/lib/providers'
import { Toaster } from "react-hot-toast"
const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
})

export const metadata = {
  title: "فونیکسو",
}

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirmatn.variable} font-sans bg-gray-50`}>
        <Providers>
          <UserProvider>
            {children}
            <Toaster position="bottom-center" />

          </UserProvider>
        </Providers>
      </body>
    </html>
  )
}
