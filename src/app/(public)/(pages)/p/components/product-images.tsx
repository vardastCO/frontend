"use client"

import { useState } from "react"
import Image from "next/image"
import { Pagination, Thumbs } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import { Image as ProductImage } from "@/generated"

interface ProductImagesProps {
  isMobileView: boolean
  images: ProductImage[]
}

const ProductImages = ({ images, isMobileView }: ProductImagesProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  return (
    <div className="overflow-hidden">
      <div className="overflow-hidden">
        <Swiper
          dir="rtl"
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          pagination={isMobileView ? true : false}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Pagination, Thumbs]}
        >
          {images.map((image, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative h-96">
                <Image
                  src={image.file.presignedUrl.url}
                  alt={image.file.name}
                  fill
                  priority={idx === 0}
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {!isMobileView && images.length > 1 && (
        <div className="overflow-hidden">
          <Swiper
            //   @ts-ignore
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[Thumbs]}
          >
            {images.map((image, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative h-20 w-20">
                  <Image
                    src={image.file.presignedUrl.url}
                    alt={image.file.name}
                    fill
                    sizes="10vw"
                    className="object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  )
}

export default ProductImages
