"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import EnhancedProductCard from "./enhanced-product-card";
import Link from "next/link";

export default function ProductCarousel({ products, title, categoryId }) {
  return (
    <section className="py-12 md:px-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          {categoryId && (
            <Link
              href={`/products?category=${categoryId}`}
              className="text-blue-600 hover:text-blue-800"
            >
              مشاهده همه
            </Link>
          )}
        </div>

        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true, // ✅ توقف در صورت قرار گرفتن موس
          }}
          loop={true}
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} className="py-2">
              <EnhancedProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
