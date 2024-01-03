"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { UseQueryResult } from "@tanstack/react-query"
import clsx from "clsx"
import { Autoplay } from "swiper/modules"
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react"

import { GetBannerHomePageQuery } from "@/generated"

import Link from "@core/components/shared/Link"
import { ICategoryListLoader } from "@/app/(public)/(pages)/categories/components/CategoryListLoader"

export const BulletSwiper = ({
  contentSize = 0,
  handleSlideTo = () => {},
  activeSlide = 0,
  className = "py-6"
}: {
  contentSize?: number
  handleSlideTo: (_: number) => void
  activeSlide: number
  className?: string
}) => {
  return (
    <div
      className={clsx(
        "flex w-full items-center justify-center gap-x-1.5",
        className && className
      )}
    >
      {[...Array(contentSize)]?.map((_, index) => (
        <span
          key={`dot-${index}`}
          onClick={() => {
            handleSlideTo(index)
          }}
          className={`h-2 w-2 cursor-pointer rounded-full ${
            activeSlide === index ? "bg-primary" : "bg-alpha-400"
          }`}
        ></span>
      ))}
    </div>
  )
}

const MobileHomeSlider = ({
  query
}: {
  query: UseQueryResult<GetBannerHomePageQuery, unknown>
}) => {
  const [selectedItemId, setSelectedItemId] =
    useState<ICategoryListLoader>(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const sliderRef = useRef<SwiperRef>(null)
  const [slideWidth, setSlideWidth] = useState(0)

  // const handleNext = useCallback(() => {
  //   if (!sliderRef.current) return
  //   sliderRef.current?.swiper.slideNext()
  // }, [])

  const handleSlideTo = useCallback((index: number) => {
    if (!sliderRef.current) return
    sliderRef.current?.swiper.slideTo(index)
  }, [])

  useEffect(() => {
    const slide = sliderRef.current?.swiper.slides[0]
    if (sliderRef.current) {
      setSlideWidth((slide as any)?.swiperSlideSize)
      setActiveSlide(sliderRef.current?.swiper.realIndex)
    }
  }, [])

  return (
    <div className="bg-alpha-white pt-6">
      <div className="container overflow-hidden">
        <Swiper
          ref={sliderRef}
          loop
          centeredSlides
          slidesPerView={1.2}
          onSlideChange={(swiper) => {
            setActiveSlide(swiper.realIndex)
          }}
          onAutoplay={(swiper) => {
            setActiveSlide(swiper.realIndex)
          }}
          modules={[Autoplay]}
          autoplay={{
            delay: 7000,
            disableOnInteraction: false
          }}
          className="h-full w-full"
          spaceBetween={15}
        >
          {query.data?.getBannerHomePage.map(({ id, presignedUrl, url }) => (
            <SwiperSlide
              style={{
                width: slideWidth,
                height: (slideWidth * 10) / 16
              }}
              key={id}
            >
              <Link
                onClick={() => {
                  url && setSelectedItemId(id)
                }}
                href={url as string}
              >
                <Image
                  src={presignedUrl.url}
                  alt="slider"
                  fill
                  className={clsx(
                    "rounded-xl border-2 object-cover",
                    selectedItemId === id ? "border-primary" : "border-alpha-50"
                  )}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <BulletSwiper
        activeSlide={activeSlide}
        contentSize={query.data?.getBannerHomePage.length}
        handleSlideTo={handleSlideTo}
      />
    </div>
  )
}

export default MobileHomeSlider
