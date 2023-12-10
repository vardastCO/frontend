"use client"

import { useCallback, useRef, useState } from "react"
import Image from "next/image"
import { UseQueryResult } from "@tanstack/react-query"
import { Autoplay } from "swiper/modules"
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react"

import { GetBannerHomePageQuery } from "@/generated"

const MobileHomeSlider = ({
  query
}: {
  query: UseQueryResult<GetBannerHomePageQuery, unknown>
}) => {
  const [activeSlide, setActiveSlide] = useState(0)
  const sliderRef = useRef<SwiperRef>(null)

  // const handleNext = useCallback(() => {
  //   if (!sliderRef.current) return
  //   sliderRef.current?.swiper.slideNext()
  // }, [])

  const handleSlideTo = useCallback((index: number) => {
    if (!sliderRef.current) return
    sliderRef.current?.swiper.slideTo(index)
  }, [])

  return (
    <div className="bg-alpha-white pt-6">
      <Swiper
        ref={sliderRef}
        loop
        centeredSlides
        slidesPerView={1.2}
        onSlideChange={(swiper) => {
          setActiveSlide(swiper.activeIndex)
        }}
        onAutoplay={(swiper) => {
          setActiveSlide(swiper.activeIndex)
        }}
        modules={[Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false
        }}
        className="h-[43vw] w-full"
        spaceBetween={16}
      >
        {query.data?.getBannerHomePage.map(({ id, presignedUrl }) => (
          <SwiperSlide key={id}>
            <Image
              src={presignedUrl.url}
              alt="slider"
              fill
              className="rounded-xl object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex w-full items-center justify-center gap-x-1.5 py-6">
        {query.data?.getBannerHomePage?.map((_, index) => (
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
    </div>
  )
}

export default MobileHomeSlider
