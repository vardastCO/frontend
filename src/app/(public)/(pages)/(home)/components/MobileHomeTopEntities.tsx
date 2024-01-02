"use client"

import { Swiper, SwiperSlide } from "swiper/react"

import { Brand, Seller } from "@/generated"

import BigSliderItem from "@/app/(public)/(pages)/(home)/components/BigSliderItem"
import MobileHomeSection from "@/app/(public)/(pages)/(home)/components/MobileHomeSection"

export type QueryTypes = Seller[] | Brand[]

type Props<T extends QueryTypes> = {
  query?: T
  title: string
  width: number
  __typename: "Seller" | "Brand"
  slidesPerView?: number
  centeredSlides?: boolean
}

const MobileHomeTopEntities = <T extends QueryTypes>({
  query,
  title,
  width,
  slidesPerView,
  centeredSlides,
  __typename
}: Props<T>) => {
  return (
    <MobileHomeSection
      viewAllHref={`/${__typename?.toLowerCase()}s`}
      bgWhite
      title={title}
      block
    >
      <div className="overflow-hidden">
        <Swiper
          centeredSlides={centeredSlides ?? true}
          slidesPerView={slidesPerView ?? 1.2}
          spaceBetween={16}
          className="h-full w-full pb-12"
        >
          {query?.map(({ id, bannerFile, logoFile, name, total }) => (
            <SwiperSlide key={id}>
              <BigSliderItem
                autoWidth
                width={width - 16}
                data={{
                  id,
                  name,
                  imageUrl: bannerFile?.presignedUrl.url ?? "",
                  avatarUrl: logoFile?.presignedUrl.url ?? "",
                  total,
                  href: `/${__typename?.toLowerCase()}/${id}`
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </MobileHomeSection>
  )
}

export default MobileHomeTopEntities
