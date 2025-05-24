"use client"

import { useEffect, useState } from "react"
import { detailsPages } from "@/lib/api/admin/pages/detailsPages"
import Loading from "./loading"

export default function TermsClientPage() {
  const [loading, setLoading] = useState(true)
  const [pageData, setPageData] = useState({})

  useEffect(() => {
    const fetchPageData = async () => {
      const response = await detailsPages("faq")
      setPageData(response.data)
      setLoading(false)
    }
    fetchPageData()
  }, [])

  if (loading) return <Loading />

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section (exactly like FAQ) */}
        <div className="relative rounded-2xl overflow-hidden mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90"></div>
          <div className="relative z-10 py-20 px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {pageData?.title || "سوالات متداول"}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {pageData?.description}
            </p>
          </div>
        </div>

        {/* Content Card (exactly like FAQ structure) */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div
            className="leading-7 text-justify"
            dangerouslySetInnerHTML={{
              __html: pageData?.content || "<p>محتوایی برای نمایش وجود ندارد.</p>",
            }}
          />
        </div>
      </div>
    </div>
  )
}
