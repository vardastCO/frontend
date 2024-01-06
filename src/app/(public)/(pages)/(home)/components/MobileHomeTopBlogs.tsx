"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { UseQueryResult } from "@tanstack/react-query"
import clsx from "clsx"
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react"

import { GetAllBlogsQuery } from "@/generated"

import Link from "@core/components/shared/Link"
import MobileHomeSection from "@/app/(public)/(pages)/(home)/components/MobileHomeSection"
import { ICategoryListLoader } from "@/app/(public)/(pages)/category/components/CategoryListLoader"

const MobileHomeTopBlogs = ({
  slidesPerView,
  centeredSlides,
  getAllBlogsQuery
}: {
  slidesPerView?: number
  centeredSlides?: boolean
  getAllBlogsQuery: UseQueryResult<GetAllBlogsQuery>
}) => {
  const [selectedItemId, setSelectedItemId] =
    useState<ICategoryListLoader>(null)
  const sliderRef = useRef<SwiperRef>(null)
  const [slideWidth, setSlideHeight] = useState(0)

  useEffect(() => {
    const slide = sliderRef.current?.swiper.slides[0]
    if (sliderRef.current) {
      setSlideHeight((slide as any)?.swiperSlideSize)
    }
  }, [])

  return (
    <MobileHomeSection
      viewAllHref="https://blog.vardast.com/"
      bgWhite
      title="جدیدترین اخبار و مطالب"
      block={true}
    >
      <div className="overflow-hidden">
        <Swiper
          ref={sliderRef}
          slidesPerView={slidesPerView ?? 1.2}
          spaceBetween={15}
          centeredSlides={centeredSlides}
          className="h-full w-full pb-12 pr-4"
        >
          {getAllBlogsQuery?.data?.getAllBlogs?.data?.map((blog) => (
            <SwiperSlide
              key={blog?.id}
              className={clsx(
                "overflow-hidden rounded-2xl border bg-alpha-white shadow-lg",
                selectedItemId === blog?.id
                  ? "border-2 border-primary"
                  : "border-alpha-50"
              )}
            >
              <Link
                onClick={() => {
                  setSelectedItemId(blog?.id || 0)
                }}
                // target="_blank"
                style={{
                  width: slideWidth
                }}
                className={clsx("h-full")}
                href={blog?.url || "/"}
              >
                <div
                  style={{
                    height: (slideWidth * 9) / 16
                  }}
                  className="relative"
                >
                  <Image
                    src={blog?.image_url || "/images/blank.png"}
                    alt="category"
                    fill
                    className="h-full object-fill"
                  />
                </div>
                <div className="relative z-20 flex flex-col items-start justify-between gap-y-2 bg-alpha-50 bg-opacity-60 px py-4 text-center">
                  <h4 className="w-full truncate text-justify font-semibold">
                    {blog?.title}
                  </h4>
                  <div className="w-full truncate text-justify text-sm">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: blog?.description || ""
                      }}
                    ></div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </MobileHomeSection>
  )
}

export default MobileHomeTopBlogs
