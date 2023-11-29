"use client"

import { Pagination, Thumbs } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import { Product } from "@/generated"

import ProductVerticalCard from "@/app/(public)/components/ProductVerticalCard"

type ProductSliderProps = {
  products: Array<Product>
}

const ProductSlider = ({ products }: ProductSliderProps) => {
  return (
    <div className="overflow-hidden">
      <Swiper
        dir="rtl"
        slidesPerView={2.5}
        loop={false}
        pagination={false}
        modules={[Pagination, Thumbs]}
      >
        {products.map((product, index) => (
          <SwiperSlide
            className={`${
              index + 1 < products.length ? "border-l" : ""
            } h-full`}
            key={product.id}
          >
            <ProductVerticalCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ProductSlider
