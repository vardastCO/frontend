"use client"

import { Pagination, Thumbs } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import { Product } from "@/generated"

import ProductSectionContainer from "@/app/(public)/(pages)/p/components/ProductSectionContainer"
import ProductVerticalCard from "@/app/(public)/components/ProductVerticalCard"

type SameProductsProps = {
  sameCategories: Array<Product>
}

const SameProducts = ({ sameCategories }: SameProductsProps) => {
  return (
    <ProductSectionContainer spaceless title="کالاهای مشابه">
      <div className="overflow-hidden">
        <Swiper
          dir="rtl"
          slidesPerView={2.5}
          loop={false}
          autoHeight
          pagination={false}
          modules={[Pagination, Thumbs]}
        >
          {sameCategories.map((product, index) => (
            <SwiperSlide
              className={`${
                index + 1 < sameCategories.length ? "border-l" : ""
              }`}
              key={product.id}
            >
              <ProductVerticalCard product={product} />
              {/* <Link
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
              </Link> */}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </ProductSectionContainer>
  )
}

export default SameProducts
