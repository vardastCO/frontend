import { forwardRef, Ref, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools"
import clsx from "clsx"

import { Product } from "@/generated"

import slugify from "@core/utils/persian-slugify"
import Link from "@core/components/shared/Link"
import PriceTitle from "@/app/(public)/components/PriceTitle"
import Rating from "@/app/(public)/components/Rating"

interface ProductVerticalCardProps {
  product: Product
}

export const ProductVerticalCardSkeleton = () => {
  const [ratio, setRatio] = useState(1 / 1)
  return (
    <div className="aspect-w-1 relative px-6 hover:z-10 md:py md:hover:shadow-lg">
      <div className="grid h-full w-full flex-1 grid-rows-3 gap-2 border-b bg-alpha-white py md:border-none lg:flex lg:flex-col lg:px-4">
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
        <div className="lg:row-span1 row-span-2 flex flex-1 flex-col">
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

const ProductVerticalCard = forwardRef(
  (
    { product }: ProductVerticalCardProps,
    ref: Ref<HTMLAnchorElement> | undefined
  ) => {
    const productContainerRef = useRef<HTMLDivElement>(null)
    const [imageContainerHeight, setImageContainerHeight] = useState(146)
    const onLoadingCompletedImage = () => {
      const div = productContainerRef.current
      if (div) {
        div.className = div.className + " opacity-100"
      }
    }

    useEffect(() => {
      const div = productContainerRef.current
      if (div) {
        setImageContainerHeight(div.children[0].clientWidth)
      }
    }, [])

    const hasDiscount = false

    return (
      <Link
        ref={ref}
        href={`/p/${product.id}/${slugify(product.name)}`}
        className={clsx("grid h-full px", "grid-rows-12")}
      >
        <div
          ref={productContainerRef}
          className={`relative row-span-5 flex w-full flex-shrink-0 transform flex-col items-center justify-center bg-center bg-no-repeat align-middle opacity-0 transition-all duration-1000 ease-out`}
        >
          <div
            style={{
              height: imageContainerHeight
            }}
            className="w-full"
          >
            {product?.images?.at(0)?.file.presignedUrl.url ? (
              <Image
                src={product.images.at(0)?.file.presignedUrl.url as string}
                alt={product.name}
                fill
                className="object-contain"
                onLoadingComplete={onLoadingCompletedImage}
              />
            ) : (
              <Image
                src={"/images/blank.png"}
                alt={product.name}
                fill
                className="object-contain"
                onLoadingComplete={onLoadingCompletedImage}
              />
            )}
          </div>
        </div>
        <div></div>
        <div className="row-span-2">
          <h6
            title={product.name}
            className="my-auto line-clamp-2 max-h-10 overflow-hidden whitespace-pre-wrap font-semibold"
          >
            {product.name}
          </h6>
        </div>
        <div className="flex w-full">
          {product.rating && product.rating > 0 ? (
            <Rating rating={product.rating} />
          ) : (
            ""
          )}
        </div>

        <div className="flex w-full items-center justify-end gap-x">
          {hasDiscount && (
            <span className="rounded-full bg-error p-1 px-1.5 text-center text-xs font-semibold leading-none text-white">
              {digitsEnToFa(15)}%
            </span>
          )}
          {product.lowestPrice && hasDiscount && (
            <span className="text-xs text-alpha-500 line-through">
              {digitsEnToFa(addCommas(`${product.lowestPrice.amount}`))}
            </span>
          )}
        </div>
        <div className="flex w-full items-center justify-end">
          {product.lowestPrice && (
            <PriceTitle size="2xs" price={product.lowestPrice.amount} />
          )}
        </div>
        {product?.uom?.name && (
          <div className="flex justify-end text-xs text-alpha-500">
            هر {product.uom.name}
          </div>
        )}
      </Link>
    )
  }
)

export default ProductVerticalCard
