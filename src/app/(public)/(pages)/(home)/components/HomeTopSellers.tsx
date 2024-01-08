"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { MapPinIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react"

import { GetAllSellersCountQuery } from "@/generated"

import Link from "@core/components/shared/Link"
import MobileHomeSection from "@/app/(public)/(pages)/(home)/components/MobileHomeSection"
import { ICategoryListLoader } from "@/app/(public)/(pages)/category/components/CategoryListLoader"

type Props = {
  query?: GetAllSellersCountQuery["sellers"]["data"]
  title: string
  isMobileView?: boolean
}

const HomeTopSellers = ({ query, isMobileView = true, title }: Props) => {
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
    <MobileHomeSection viewAllHref="/sellers" bgWhite title={title} block>
      <div className="overflow-hidden">
        <Swiper
          ref={sliderRef}
          slidesPerView={!!isMobileView ? 1.5 : 4.5}
          spaceBetween={16}
          className="h-full w-full px-5 pb-12"
        >
          {query?.map((seller) => {
            if (seller) {
              const { id, brands, logoFile, name, addresses } = seller
              return (
                <SwiperSlide key={id} className="">
                  <Link
                    onClick={() => {
                      setSelectedItemId(id)
                    }}
                    href={`/seller/${id}`}
                    className=""
                    // style={{
                    //   width
                    // }}
                  >
                    <div
                      style={{
                        paddingTop: slideWidth / 4 + 2
                      }}
                      className="h-full"
                    >
                      <div
                        className={clsx(
                          "relative flex h-full flex-col justify-between rounded-2xl border-2 bg-alpha-white shadow-lg",
                          selectedItemId === id
                            ? "border-2 border-primary"
                            : "border-alpha-200"
                        )}
                      >
                        <div
                          className={clsx(
                            "absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-2 bg-alpha-white",
                            selectedItemId === id
                              ? "border-2 border-primary"
                              : ""
                          )}
                        >
                          <div
                            style={{
                              width: slideWidth / 2,
                              height: slideWidth / 2
                            }}
                            className={clsx("relative")}
                          >
                            <Image
                              src={logoFile?.presignedUrl.url ?? ""}
                              alt="category"
                              fill
                              className="h-full w-full object-fill"
                            />
                          </div>
                        </div>

                        <div
                          style={{
                            paddingTop: slideWidth / 4
                          }}
                          className="mt-6 flex flex-col items-center gap-y-2"
                        >
                          <p className="text-center">{name}</p>
                          {addresses?.length > 0 && addresses[0].city.name && (
                            <p className="flex h-4 items-center gap-x-1 py-1 text-xs text-alpha-600">
                              <MapPinIcon className="h-3 w-3 text-alpha-600" />
                              {addresses[0].city.name}
                            </p>
                          )}
                        </div>
                        <div className="p pt-0">
                          <p className="border-t py pt-6">فروشنده برندهای:</p>
                          <div
                            className={clsx(
                              "grid flex-1 grid-cols-3 items-center gap-y py"
                            )}
                          >
                            {brands.slice(0, 3).map((brand) => (
                              <div
                                key={brand?.id}
                                className="relative z-20 flex flex-col items-center justify-between bg-alpha-50 bg-opacity-60 text-center font-semibold"
                              >
                                <div
                                  style={{
                                    width: slideWidth / 4,
                                    height: slideWidth / 4
                                  }}
                                  className="relative overflow-hidden rounded-full border border-alpha-400"
                                >
                                  <Image
                                    src={
                                      brand?.logoFile?.presignedUrl.url ??
                                      "/images/seller-blank.png"
                                    }
                                    alt="category"
                                    fill
                                    className="h-full w-full rounded-full object-fill"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              )
            }
          })}
        </Swiper>
      </div>
    </MobileHomeSection>
  )
}

export default HomeTopSellers
