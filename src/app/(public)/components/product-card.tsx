import { useState } from "react"
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

export const ProductCardLoader = () => {
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

const ProductCard = ({ product }: ProductCardProps) => {
  const onLoadingCompletedImage = () => {
    const div = document.getElementById(`product-image-${product.id}`)
    if (div) {
      div.className = div.className + " opacity-100"
    }
  }

  const hasDiscount = false

  return (
    <div className="relative px-6 transition hover:z-10 md:py md:hover:shadow-lg">
      <Link
        href={`/p/${product.id}/${slugify(product.name)}${
          product.title ? `?title=${product.title}` : ""
        }`}
        className="grid h-full w-full flex-1 grid-cols-3 gap-2 border-b bg-alpha-white py md:border-none lg:flex lg:flex-col lg:px-4"
        prefetch={false}
      >
        <div
          id={`product-image-${product.id}`}
          className={`relative flex flex-shrink-0 transform flex-col items-center justify-center bg-center bg-no-repeat align-middle transition-all duration-1000 ease-out ${
            product.images.at(0)?.file.presignedUrl.url ? "opacity-0" : ""
          }`}
        >
          <div className="w-full">
            {product.images.at(0)?.file.presignedUrl.url ? (
              <Image
                src={product.images.at(0)?.file.presignedUrl.url as string}
                alt={product.name}
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "auto"
                }}
                width={125}
                height={125}
                onLoadingComplete={onLoadingCompletedImage}
              />
            ) : (
              <Image
                src={"/images/blank.png"}
                alt={product.name}
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "auto"
                }}
                width={125}
                height={125}
              />
            )}
          </div>
        </div>
        <div className="lg:col-span1 col-span-2 flex flex-1 flex-col">
          <h5 title={product.name} className="line-clamp-2 h-11 font-semibold">
            {product.name}
          </h5>
          <div className="flex h-8 w-full">
            {product.rating && product.rating > 0 ? (
              <Rating rating={product.rating} />
            ) : (
              ""
            )}
          </div>
          <div className="flex h-14  w-full flex-col items-end">
            {product.lowestPrice && (
              <>
                <div className="flex h-1/2 w-full items-center justify-end gap-x">
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
                <div className="flex h-1/2 w-full items-center justify-end gap-x">
                  <PriceTitle size="xs" price={product.lowestPrice.amount} />
                </div>
              </>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard
