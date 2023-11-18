import { forwardRef, Ref, useState } from "react"
import Image from "next/image"
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools"

import { Product } from "@/generated"

import slugify from "@core/utils/persian-slugify"
import Link from "@core/components/shared/Link"
import PriceTitle from "@/app/(public)/components/PriceTitle"
import Rating from "@/app/(public)/components/Rating"

interface ProductCardProps {
  product: Product
}

export const ProductCardSkeleton = () => {
  const [ratio, setRatio] = useState(1 / 1)
  return (
    <div className="relative px-6 hover:z-10 md:py md:hover:shadow-lg">
      <div className="grid h-full w-full flex-1 grid-cols-3 gap-2 border-b bg-alpha-white py md:border-none lg:flex lg:flex-col lg:px-4">
        <div
          className={`relative flex flex-shrink-0 transform flex-col items-center justify-center bg-center bg-no-repeat align-middle transition-all duration-1000 ease-out`}
        >
          <div className="w-full">
            <Image
              src={"/images/frameLess.png"}
              alt="skeleton"
              width={400}
              height={400 / ratio}
              layout="fixed"
              onLoadingComplete={({ naturalWidth, naturalHeight }) => {
                setRatio(naturalWidth / naturalHeight)
              }}
              objectFit="contain"
              className="animated-card"
            />
          </div>
        </div>
        <div className="lg:col-span1 col-span-2 flex flex-1 flex-col">
          <h5 className="animated-card line-clamp-2 h-11 font-semibold"></h5>
          <div className="flex h-8 w-full py-2">
            <div className="animated-card h-full w-8"></div>
          </div>
          <div className="flex h-14  w-full flex-col items-end">
            <div className="flex h-1/2 w-full items-center justify-end gap-x">
              <span className="animated-card h-1/2 w-8 rounded-full p-1 px-1.5 text-center text-sm font-semibold leading-none"></span>
              <span className="animated-card h-1/2 w-8 text-sm line-through"></span>
            </div>
            <div className="flex h-1/2 w-full items-center justify-end">
              <div className="animated-card h-full w-20"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ProductCard = forwardRef(
  ({ product }: ProductCardProps, ref: Ref<HTMLAnchorElement> | undefined) => {
    const onLoadingCompletedImage = () => {
      const div = document.getElementById(`product-image-${product.id}`)
      if (div) {
        div.className = div.className + " opacity-100"
      }
    }

    const hasDiscount = true

    return (
      <Link
        ref={ref}
        href={`/p/${product.id}/${slugify(product.name)}${
          product.title ? `?title=${product.title}` : ""
        }`}
        className="md:h-none relative grid h-[calc((100vw-1.5rem)/2)] max-h-[calc((100vw-1.5rem)/2)] min-h-[calc((100vw-1.5rem)/2)] w-full flex-1 grid-cols-3 gap-2 border-b bg-alpha-white transition hover:z-10 md:max-h-none md:border-none md:py md:hover:shadow-lg lg:flex lg:flex-col lg:px-4"
        prefetch={false}
      >
        <div
          id={`product-image-${product.id}`}
          className={`relative flex flex-shrink-0 transform flex-col items-center justify-center bg-center bg-no-repeat align-middle transition-all duration-1000 ease-out ${
            product.images.at(0)?.file.presignedUrl.url ? "opacity-0" : ""
          }`}
        >
          <div
            id={`product-image-container-${product.id}`}
            className="w-full"
            style={{
              height: document.getElementById(
                `product-image-container-${product.id}`
              )?.clientWidth
            }}
          >
            {product.images.at(0)?.file.presignedUrl.url ? (
              <Image
                src={product.images.at(0)?.file.presignedUrl.url as string}
                alt={product.name}
                layout="fill"
                objectFit="contain"
                onLoadingComplete={onLoadingCompletedImage}
              />
            ) : (
              <Image
                src={"/images/blank.png"}
                alt={product.name}
                layout="fill"
                objectFit="contain"
              />
            )}
          </div>
        </div>
        <div className="lg:col-span1 col-span-2 grid h-full grid-rows-7">
          <div></div>
          <div className="row-span-2">
            <h5
              title={product.name}
              className="my-auto line-clamp-2 max-h-10 overflow-hidden whitespace-pre-wrap font-semibold"
            >
              {product.name}
            </h5>
          </div>
          <div className="flex w-full">
            {product.rating && product.rating > 0 ? (
              <Rating rating={product.rating} />
            ) : (
              ""
            )}
          </div>
          {product.lowestPrice && (
            <>
              <div className="flex w-full items-center justify-end gap-x">
                {hasDiscount && (
                  <span className="rounded-full bg-error p-1 px-1.5 text-center text-sm font-semibold leading-none text-white">
                    {digitsEnToFa(15)}%
                  </span>
                )}
                {hasDiscount && (
                  <span className="text-sm text-alpha-500 line-through">
                    {digitsEnToFa(addCommas(`${product.lowestPrice.amount}`))}
                  </span>
                )}
              </div>
              <div className="flex w-full items-center justify-end">
                <PriceTitle size="xs" price={product.lowestPrice.amount} />
              </div>
            </>
          )}
          <div></div>
        </div>
      </Link>
    )
  }
)

export default ProductCard
