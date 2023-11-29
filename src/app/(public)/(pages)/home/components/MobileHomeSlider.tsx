"use client"

import Image from "next/image"
import { UseQueryResult } from "@tanstack/react-query"
import { Autoplay, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import { IHomeGetResponse } from "@core/Services/Home/model"

// const _images = [
//   {
//     url: "/images/2.1.png",
//     id: 0
//   },
//   {
//     url: "/images/2.1.png",
//     id: 1
//   },
//   {
//     url: "/images/2.1.png",
//     id: 2
//   },
//   {
//     url: "/images/2.1.png",
//     id: 3
//   },
//   {
//     url: "/images/2.1.png",
//     id: 4
//   }
// ]

const MobileHomeSlider = ({
  homeSlidersQuery
}: {
  homeSlidersQuery: UseQueryResult<IHomeGetResponse, unknown>
}) => {
  // console.log("====================================")
  // console.log({ homeSlidersQuery: homeSlidersQuery.data?.data })
  // console.log("====================================")
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
      {homeSlidersQuery.data?.data.bannerData.map(({ url, id }) => (
        <SwiperSlide key={id}>
          <Image
            src={url}
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
