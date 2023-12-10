"use client"

import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"

import { Brand, Seller } from "@/generated"

import Link from "@core/components/shared/Link"
import MobileHomeSection from "@/app/(public)/(pages)/(home)/components/MobileHomeSection"
import Rating from "@/app/(public)/components/Rating"

type QueryTypes = Seller[] | Brand[]

type Props<T extends QueryTypes> = {
  query?: T
  title: string
  __typename: "Seller" | "Brand"
}

const MobileHomeTopEntities = <T extends QueryTypes>({
  query,
  title,
  __typename
}: Props<T>) => {
  return (
    <MobileHomeSection
      viewAllHref={`/${__typename?.toLowerCase()}s`}
      bgWhite
      height="ONE_TWENTY_FIFE"
      title={title}
      block
    >
      <div className="overflow-hidden">
        <Swiper
          // loop
          centeredSlides
          slidesPerView={1.2}
          // modules={[Autoplay]}
          // autoplay={{
          //   delay: 5000,
          //   disableOnInteraction: false
          // }}
          // modules={[FreeMode]}
          // mousewheel={{
          //   releaseOnEdges: true
          // }}
          // freeMode
          spaceBetween={16}
          className="h-full w-full pb-8"
        >
          {query?.map(
            ({
              id,
              bannerFile,
              name,
              rating
              // ...props
            }) => (
              <SwiperSlide
                key={id}
                className="overflow-hidden rounded-xl bg-alpha-white shadow-lg"
              >
                <Link href={`/${__typename?.toLowerCase()}/${id}`}>
                  <div className="relative h-[85%] ">
                    <Image
                      src={bannerFile?.presignedUrl.url as string}
                      alt="category"
                      fill
                      className="h-full rounded-xl object-fill"
                    />
                  </div>
                  <div className="relative z-20 flex h-[15%] flex-col bg-opacity-60 px py-3 text-center font-semibold">
                    <h5 className="text-right">{name}</h5>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-primary">
                        {/* {`${
                        __typename === "Brand"
                          ? digitsEnToFa((props as Brand).products?.length ?? 0)
                          : digitsEnToFa((props as Seller).offers?.length) ?? 0
                      } کالا`} */}
                      </p>
                      <Rating rating={rating ?? 0} size="xs" />
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            )
          )}
        </Swiper>
      </div>
    </MobileHomeSection>
  )
}

export default MobileHomeTopEntities
