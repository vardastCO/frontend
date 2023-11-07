"use client"

import Image from "next/image"
import Link from "next/link"
import { Pagination, Thumbs } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import { Product } from "@/generated"

import slugify from "@core/utils/persian-slugify"
import ProductSectionContainer from "@/app/(public)/(pages)/p/components/ProductSectionContainer"
import PriceTitle from "@/app/(public)/components/PriceTitle"
import Rating from "@/app/(public)/components/Rating"

type SameProductsProps = {
  sameCategories: Array<Product>
}

const SameProducts = ({ sameCategories }: SameProductsProps) => {
  return (
    <ProductSectionContainer title="کالاهای مشابه">
      <div className="overflow-hidden">
        <Swiper
          dir="rtl"
          slidesPerView={1.4}
          loop={false}
          pagination={false}
          modules={[Pagination, Thumbs]}
        >
          {sameCategories.map((product, index) => (
            <SwiperSlide
              className={`${
                index + 1 < sameCategories.length ? "border-l" : ""
              } px`}
              key={product.id}
            >
              <Link
                href={`/p/${product.id}/${slugify(product.name)}${
                  product.title ? `?title=${product.title}` : ""
                }`}
                className="flex flex-col gap-y"
              >
                <div>
                  <Image
                    // src={"/images/blank.png"}
                    src={product.images.at(0)?.file.presignedUrl.url as string}
                    alt={product.name}
                    className="object-contain"
                    width={1600}
                    height={1600}
                    loading="eager"
                  />
                </div>
                <h5 className="line-clamp-2 font-semibold">{product.name}</h5>
                <div className="flex">
                  {product.rating && product.rating > 0 ? (
                    <Rating rating={product.rating} />
                  ) : (
                    ""
                  )}
                </div>
                {product.lowestPrice && (
                  <PriceTitle size="xs" price={product.lowestPrice?.amount} />
                )}
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </ProductSectionContainer>
  )
}

export default SameProducts
