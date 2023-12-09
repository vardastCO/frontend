"use client"

import Image from "next/image"
import { digitsEnToFa } from "@persian-tools/persian-tools"
import { Autoplay } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import { Brand, Seller } from "@/generated"

import Link from "@core/components/shared/Link"
import MobileHomeSection from "@/app/(public)/(pages)/(home)/components/MobileHomeSection"
import Rating from "@/app/(public)/components/Rating"

type QueryTypes = Seller[] | Brand[]

type Props<T extends QueryTypes> = {
  query: T
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
      height="ONE_FORTY_SEVEN"
      title={title}
      block
    >
      <div className="overflow-hidden">
        <Swiper
          loop
          slidesPerView={1.2}
          modules={[Autoplay]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false
          }}
          spaceBetween={16}
          className="h-full w-full pb-8 pr"
        >
          {query.map(({ id, bannerFile, name, rating, ...props }) => (
            <SwiperSlide
              key={id}
              className="rounded-xl bg-alpha-white shadow-lg"
            >
              <Link href={`/${__typename?.toLowerCase()}/${id}`}>
                <div className="relative h-[85%]">
                  <Image
                    src={bannerFile?.presignedUrl.url as string}
                    alt="category"
                    fill
                    className="h-full rounded-xl object-cover"
                  />
                </div>
                <div className="relative z-20 flex h-[15%] flex-col bg-opacity-60 px py-3 text-center font-semibold">
                  <h4 className="text-right">{name}</h4>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-primary">
                      {`${
                        (query as Brand[])
                          ? digitsEnToFa((props as Brand).products?.length ?? 0)
                          : digitsEnToFa((props as Seller).offers?.length) ?? 0
                      } کالا`}
                    </p>
                    <Rating rating={rating ?? 0} size="xs" />
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

export default MobileHomeTopEntities
