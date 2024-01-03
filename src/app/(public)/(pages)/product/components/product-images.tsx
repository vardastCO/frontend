"use client"

import { useCallback, useRef, useState } from "react"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import { Session } from "next-auth"
import { Thumbs } from "swiper/modules"
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react"

import {
  EntityTypeEnum,
  GetIsFavoriteQuery,
  Product,
  Image as ProductImage
} from "@/generated"

import { getIsFavoriteQueryFns } from "@core/queryFns/getIsFavoriteQueryFns"
import QUERY_FUNCTIONS_KEY from "@core/queryFns/queryFunctionsKey"
import { BulletSwiper } from "@/app/(public)/(pages)/(home)/components/MobileHomeSlider"
import FavoriteIcon from "@/app/(public)/components/FavoriteIcon"
import ShareIcon from "@/app/(public)/components/ShareIcon"

interface ProductImagesProps {
  isMobileView: boolean
  images: ProductImage[]
  product: Product
  session: Session | null
}

const ProductImages = ({
  images,
  isMobileView,
  product,
  session
}: ProductImagesProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const sliderRef = useRef<SwiperRef>(null)

  const handleSlideTo = useCallback((index: number) => {
    if (!sliderRef.current) return
    sliderRef.current?.swiper.slideTo(index)
  }, [])

  const isFavoriteQuery = useQuery<GetIsFavoriteQuery>(
    [
      QUERY_FUNCTIONS_KEY.GET_IS_FAVORITE,
      { entityId: product.id, type: EntityTypeEnum.Product }
    ],
    () =>
      getIsFavoriteQueryFns({
        accessToken: session?.accessToken,
        entityId: product.id,
        type: EntityTypeEnum.Product
      }),
    {
      keepPreviousData: true
    }
  )

  return (
    <div className="relative overflow-hidden">
      <div className="absolute left top z-30 flex flex-col justify-end gap-x rounded-xl bg-alpha-white">
        <FavoriteIcon
          entityId={product.id}
          isFavoriteQuery={isFavoriteQuery}
          type={EntityTypeEnum.Product}
        />
        <ShareIcon name={product.name} />
      </div>
      <div className="overflow-hidden">
        <Swiper
          ref={sliderRef}
          dir="rtl"
          spaceBetween={50}
          onSlideChange={(swiper) => {
            setActiveSlide(swiper.realIndex)
          }}
          onAutoplay={(swiper) => {
            setActiveSlide(swiper.realIndex)
          }}
          slidesPerView={1}
          loop={true}
          // pagination={
          //   isMobileView
          //     ? {
          //         enabled: true,
          //         // el: ".swiper-pagination",
          //         dynamicBullets: true,
          //         dynamicMainBullets: 4
          //       }
          //     : false
          // }
          thumbs={{ swiper: thumbsSwiper }}
          // modules={[Pagination, Thumbs]}
          modules={[Thumbs]}
        >
          {images.map((image, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative h-96">
                <Image
                  src={image.file.presignedUrl.url}
                  alt={image.file.name}
                  fill
                  priority={idx === 0}
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <BulletSwiper
        className={"pt-8"}
        activeSlide={activeSlide}
        contentSize={images.length}
        handleSlideTo={handleSlideTo}
      />

      {!isMobileView && images.length > 1 && (
        <div className="overflow-hidden">
          <Swiper
            //   @ts-ignore
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[Thumbs]}
          >
            {images.map((image, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative h-20 w-20">
                  <Image
                    src={image.file.presignedUrl.url}
                    alt={image.file.name}
                    fill
                    sizes="10vw"
                    className="object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  )
}

export default ProductImages
