"use client"

import Image from "next/image"
import Link from "next/link"
import { StarIcon } from "@heroicons/react/24/solid"
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools"
import { Pagination, Thumbs } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import { Product } from "@/generated"

import slugify from "@core/utils/persian-slugify"

type SameProductsProps = {
  sameCategories: Array<Product>
}

const SameProducts = ({ sameCategories }: SameProductsProps) => {
  return (
    <div id="attributes" className="flex flex-col gap-y bg-alpha-white p">
      <h4 className="py">کالاهای مشابه</h4>
      <div className="overflow-hidden">
        <Swiper
          dir="rtl"
          spaceBetween={50}
          slidesPerView={1.9}
          loop={false}
          pagination={false}
          modules={[Pagination, Thumbs]}
        >
          {sameCategories.map((product) => (
            <SwiperSlide key={product.id}>
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
                <h3>{product.name}</h3>
                <p className="flex items-center gap-x-0.5 text-alpha-600">
                  {product.rating !== undefined &&
                    product.rating !== null &&
                    +product.rating > 0 &&
                    digitsEnToFa(+`${product.rating}`)}
                  {[...Array(5)].map((item, index) => (
                    <StarIcon
                      key={item}
                      className={`h-5 w-5 ${
                        index + 1 <= (product.rating || 0)
                          ? "text-warning-600"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </p>
                {product.lowestPrice && (
                  <h2 className="text-left font-bold">
                    {digitsEnToFa(addCommas(product.lowestPrice?.amount))}{" "}
                    <span className="text-sm font-medium">ریال</span>
                  </h2>
                )}
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default SameProducts
