"use client"

import Image from "next/image"
import { Autoplay } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import { Category } from "@/generated"

import Link from "@core/components/shared/Link"
import MobileHomeSection from "@/app/(public)/(pages)/(home)/components/MobileHomeSection"

const MobileHomeCategory = ({ categories }: { categories: Category[] }) => {
  return (
    <MobileHomeSection
      bgWhite
      block
      title="دسته بندی ها"
      height={"FORTY_THREE"}
    >
      <div className="overflow-hidden">
        <Swiper
          loop
          slidesPerView={3.5}
          modules={[Autoplay]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false
          }}
          className="h-[43vw] w-full"
        >
          {categories.map(({ title, id, imageCategory }) => (
            <SwiperSlide className="px" key={id}>
              <Link href={`/categories/${id}/?title=${title}`}>
                <div className="relative rounded-full bg-alpha-100">
                  <Image
                    src={
                      (imageCategory &&
                        (imageCategory[0]?.file.presignedUrl?.url as string)) ??
                      "" ??
                      `/images/categories/${id}.png`
                    }
                    alt="category"
                    // fill
                    width={200}
                    height={200}
                    className="rounded-xl object-cover"
                  />
                </div>
                <h4 className="relative z-20 bg-opacity-60 py-3 text-center font-semibold">
                  {title}
                </h4>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </MobileHomeSection>
  )
}

export default MobileHomeCategory
