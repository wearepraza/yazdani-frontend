import { Suspense } from "react"
import CartPageClient from "./CartPageClient"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "سبد خرید | فونیکسو",
  description: "سبد خرید شما در فونیکسو",
}

export default function CartPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50 pb-16">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-8">سبد خرید</h1>
          <Suspense fallback={<div>در حال بارگذاری...</div>}>
            <CartPageClient />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  )
}
