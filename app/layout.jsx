import "./globals.css"
import { Vazirmatn } from "next/font/google"

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
})

export const metadata = {
  title: "فونیکسو | سامانه ورود",
  description: "سامانه ورود به حساب کاربری فونیکسو",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirmatn.variable} font-sans bg-gray-50`}>{children}</body>
    </html>
  )
}
