"use client"

import Image from "next/image"
import { FreeMode } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import { Category } from "@/generated"

import Link from "@core/components/shared/Link"
import MobileHomeSection from "@/app/(public)/(pages)/(home)/components/MobileHomeSection"

const MobileHomeCategory = ({ categories }: { categories?: Category[] }) => {
  return (
    <MobileHomeSection bgWhite block title="دسته‌بندی‌ها" height={"FORTY_SIX"}>
      <div className="overflow-hidden ">
        <Swiper
          slidesPerView={3.2}
          modules={[FreeMode]}
          // mousewheel={{
          //   releaseOnEdges: true
          // }}
          freeMode={{
            enabled: true,
            momentumBounce: false,
            sticky: true,
            minimumVelocity: 1
            // momentumVelocityRatio: 0.8
          }}
          // modules={[Autoplay]}
          // autoplay={{
          //   delay: 5000,
          //   disableOnInteraction: false
          // }}
          spaceBetween={12}
          className="h-full w-full px-2"
        >
          {categories?.map(({ title, id, imageCategory }) => (
            <SwiperSlide key={id}>
              <Link
                href={`/categories/${id}/?title=${title}`}
                className="flex h-full flex-col justify-start gap-y-2"
              >
                <div className="relative h-[66%] w-full rounded-full bg-alpha-50">
                  <Image
                    src={
                      (imageCategory &&
                        (imageCategory[0]?.file.presignedUrl?.url as string)) ??
                      "" ??
                      `/images/categories/${id}.png`
                    }
                    alt="category"
                    fill
                    // width={90}
                    // height={90}
                    className="rounded-xl object-cover"
                  />
                </div>
                <h5 className="relative z-20 h-[34%] bg-opacity-60 text-center font-semibold">
                  {title}
                </h5>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </MobileHomeSection>
  )
}

export default MobileHomeCategory
