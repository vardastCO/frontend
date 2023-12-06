"use client"

import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"

import { Category } from "@/generated"

const MobileHomeCategory = ({ categories }: { categories: Category[] }) => {
  return (
    <div className="h-[37vw] bg-alpha-white py">
      <Swiper
        loop
        centeredSlides
        slidesPerView={3.5}
        // modules={[Autoplay]}
        // autoplay={{
        //   delay: 5000,
        //   disableOnInteraction: false
        // }}
        className="h-full w-full"
        spaceBetween={16}
      >
        {categories.map(({ id, imageCategory, title }) => (
          <SwiperSlide key={id}>
            <div className="relative z-10 flex flex-col gap-y">
              <Image
                src={
                  (imageCategory &&
                    (imageCategory[0]?.file.presignedUrl?.url as string)) ??
                  "" ??
                  `/images/categories/${id}.png`
                }
                alt="slider"
                fill
                className="rounded-xl object-cover"
              />
              <h4 className="px-6 py-3 text-center font-bold md:text-base">
                {title}
              </h4>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default MobileHomeCategory
