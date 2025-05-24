import 'swiper/css'
import 'swiper/css/navigation'
import 'react-image-lightbox/style.css'
import 'react-medium-image-zoom/dist/styles.css'

import "./globals.css"
import { Vazirmatn } from "next/font/google"
import { UserProvider } from "@/context/user-context/UserContext"
import { Providers } from '@/lib/providers'
import Script from 'next/script'
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

        {/* ✅ Raychat Widget */}
        <Script
          id="raychat-widget"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.RAYCHAT_TOKEN = "1291ba81-b228-440f-9c7f-08428394b859";
              (function () {
                var d = document;
                var s = d.createElement("script");
                s.src = "https://widget-react.raychat.io/install/widget.js";
                s.async = true;
                d.getElementsByTagName("head")[0].appendChild(s);
              })();
            `,
          }}
        />
      </body>
    </html>
  )
}
