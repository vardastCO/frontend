"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import clsx from "clsx"
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react"

import { Brand, Seller } from "@/generated"

import Link from "@core/components/shared/Link"
import MobileHomeSection from "@/app/(public)/(pages)/(home)/components/MobileHomeSection"
import { ICategoryListLoader } from "@/app/(public)/(pages)/categories/components/CategoryListLoader"

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
      viewAllHref={`/${__typename?.toLowerCase()}s`}
      bgWhite
      title={title}
      block
    >
      <div className="overflow-hidden">
        <Swiper
          ref={sliderRef}
          centeredSlides
          slidesPerView={1.2}
          spaceBetween={16}
          className="h-full w-full pb-12"
        >
          {query?.map(({ id, bannerFile, logoFile, name }) => (
            <SwiperSlide
              key={id}
              className={clsx(
                "overflow-hidden rounded-2xl border bg-alpha-white shadow-lg",
                selectedItemId === id
                  ? "border-2 border-primary"
                  : "border-alpha-50"
              )}
            >
              <Link
                onClick={() => {
                  setSelectedItemId(id)
                }}
                style={{
                  width: slideWidth
                }}
                className={clsx("h-full")}
                href={`/${__typename?.toLowerCase()}/${id}`}
              >
                <div
                  style={{
                    height: (slideWidth * 5) / 4
                  }}
                  className="relative"
                >
                  <Image
                    src={bannerFile?.presignedUrl.url as string}
                    alt="category"
                    fill
                    className="h-full object-fill"
                  />
                </div>
                <div className="relative z-20 flex items-center justify-between bg-alpha-50 bg-opacity-60 px py-6 text-center font-semibold">
                  <div className="flex items-center justify-between gap-x-2">
                    <div className="relative h-11 w-11 overflow-hidden rounded-full border border-alpha-400">
                      <Image
                        src={logoFile?.presignedUrl.url as string}
                        alt="category"
                        fill
                        className="h-full w-full rounded-full object-fill"
                      />
                    </div>
                    <h5 className="text-right">{name}</h5>
                  </div>
                  {/* <h5 className="text-primary">
                    {`${
                      __typename === "Brand"
                        ? digitsEnToFa((query as Brand).products?.length ?? 0)
                        : digitsEnToFa((query as Seller).offers?.length) ?? 0
                    } کالا`}
                  </h5> */}
                </div>
                {/* <div className="relative z-20 flex flex-col bg-alpha-50 bg-opacity-60 px py-3 text-center font-semibold">
                  <h5 className="text-right">{name}</h5>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-primary">
                      {`${
                        __typename === "Brand"
                          ? digitsEnToFa((props as Brand).products?.length ?? 0)
                          : digitsEnToFa((props as Seller).offers?.length) ?? 0
                      } کالا`}
                    </p>
                    <Rating rating={rating ?? 0} size="xs" />
                  </div>
                </div> */}
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </MobileHomeSection>
  )
}

export default MobileHomeTopEntities
