"use client"

import { useState, useEffect } from "react"
import Lightbox from "react-image-lightbox"
import 'react-image-lightbox/style.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

export default function ProductGallery({ images = [], title }) {
  const hasImages = images.length > 0
  const [selected, setSelected] = useState(hasImages ? images[0] : null)
  const [isOpen, setIsOpen] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  useEffect(() => {
    if (isOpen && selected) {
      const img = new Image()
      img.src = selected
      img.onload = () => setIsImageLoaded(true)
    }
  }, [isOpen, selected])

  if (!hasImages) return null

  return (
    <div className="space-y-4">
      {/* تصویر اصلی */}
      {selected && (
        <div
          className="overflow-hidden rounded-xl border border-gray-200 shadow-sm cursor-zoom-in"
          onClick={() => {
            setIsImageLoaded(false)
            setIsOpen(true)
          }}
        >
          <img
            src={selected}
            alt={title}
            className="h-[400px] w-full object-contain transition duration-300 hover:scale-105"
          />
        </div>
      )}

      {/* گالری بندانگشتی با Swiper */}
      <div className="relative">
        <Swiper
          slidesPerView={5}
          spaceBetween={10}
          navigation
          modules={[Navigation]}
          className="!pr-10"
          breakpoints={{
            0: { slidesPerView: 3 },
            640: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <button
                onClick={() => setSelected(img)}
                className={`w-full overflow-hidden rounded-md border-2 ${
                  selected === img
                    ? "border-blue-500 ring-2 ring-blue-200"
                    : "border-gray-200 hover:border-blue-400"
                }`}
              >
                <img
                  src={img}
                  alt={`${title} - ${index + 1}`}
                  className="h-20 w-full object-cover"
                />
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Lightbox برای نمایش بزرگ‌تر */}
      {isOpen && selected && (
        <Lightbox
          mainSrc={selected}
          nextSrc={images[(images.indexOf(selected) + 1) % images.length]}
          prevSrc={images[(images.indexOf(selected) + images.length - 1) % images.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() => {
            const prev = images[(images.indexOf(selected) + images.length - 1) % images.length]
            setIsImageLoaded(false)
            setSelected(prev)
          }}
          onMoveNextRequest={() => {
            const next = images[(images.indexOf(selected) + 1) % images.length]
            setIsImageLoaded(false)
            setSelected(next)
          }}
          imageTitle={title}
          loader={
            isImageLoaded ? null : (
              <div className="flex items-center justify-center h-full">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )
          }
        />
      )}
    </div>
  )
}
