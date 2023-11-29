"use client"

import Image from "next/image"
import { UseQueryResult } from "@tanstack/react-query"
import { Autoplay, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import { GetBannerHomePageQuery } from "@/generated"

const MobileHomeSlider = ({
  homeSlidersQuery
}: {
  homeSlidersQuery: UseQueryResult<GetBannerHomePageQuery, unknown>
}) => {
  return (
    <Swiper
      pagination={{
        clickable: true
      }}
      loop
      centeredSlides
      slidesPerView={1.2}
      modules={[Pagination, Autoplay]}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false
      }}
      className="h-[43vw] w-full"
      spaceBetween={16}
    >
      {homeSlidersQuery.data?.getBannerHomePage.map(({ id, presignedUrl }) => (
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
  )
}

export default MobileHomeSlider
