"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import clsx from "clsx"
import { FreeMode } from "swiper/modules"
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react"

import { Category } from "@/generated"

import Link from "@core/components/shared/Link"
import MobileHomeSection from "@/app/(public)/(pages)/(home)/components/MobileHomeSection"
import { ICategoryListLoader } from "@/app/(public)/(pages)/categories/components/CategoryListLoader"

const MobileHomeCategory = ({ categories }: { categories?: Category[] }) => {
  const [selectedItemId, setSelectedItemId] =
    useState<ICategoryListLoader>(null)
  const sliderRef = useRef<SwiperRef>(null)
  const [slideWidth, setSlideWidth] = useState(0)

  useEffect(() => {
    const slide = sliderRef.current?.swiper.slides[0]
    if (sliderRef.current) {
      setSlideWidth((slide as any)?.swiperSlideSize)
    }
  }, [])

  return (
    <MobileHomeSection bgWhite block title="دسته‌بندی‌ها">
      <div className="overflow-hidden ">
        <Swiper
          slidesPerView={3.2}
          modules={[FreeMode]}
          ref={sliderRef}
          freeMode={{
            enabled: true,
            momentumBounce: false,
            sticky: true,
            minimumVelocity: 1
          }}
          spaceBetween={16}
          className="h-full w-full px-2 py"
        >
          {categories?.map(({ title, id, imageCategory }) => (
            <SwiperSlide key={id}>
              <Link
                onClick={() => {
                  setSelectedItemId(id)
                }}
                href={`/categories/${id}/${title}`}
                className={clsx("flex h-full flex-col justify-start gap-y-2")}
                style={{
                  width: slideWidth
                }}
              >
                <div
                  style={{
                    height: slideWidth
                  }}
                  className={clsx(
                    "relative  w-full rounded-full bg-alpha-50 p-1",
                    selectedItemId === id ? "border-2 border-primary" : ""
                  )}
                >
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
                <h5 className="relative z-20 bg-opacity-60 text-center font-semibold">
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
