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

const ProductCard = ({ product }: ProductCardProps) => {
  const onLoadingCompletedImage = () => {
    const div = document.getElementById(`product-image-${product.id}`)
    if (div) {
      div.className = div.className + " opacity-100"
    }
  }

  const hasDiscount = true

  return (
    <div className="relative px transition hover:z-10 md:py md:hover:shadow-lg">
      <Link
        href={`/p/${product.id}/${slugify(product.name)}${
          product.title ? `?title=${product.title}` : ""
        }`}
        className="grid h-full w-full flex-1 grid-cols-3 gap-2 border-b bg-alpha-white py md:border-none lg:flex lg:flex-col lg:px-4"
        prefetch={false}
      >
        <div
          id={`product-image-${product.id}`}
          className={`relative flex w-32 flex-shrink-0 flex-col items-center justify-center bg-center bg-no-repeat align-middle duration-1000 ease-out lg:h-48 lg:w-full ${
            product.images.at(0)?.file.presignedUrl.url ? "opacity-0" : ""
          }`}
        >
          {product.images.at(0)?.file.presignedUrl.url ? (
            <Image
              src={product.images.at(0)?.file.presignedUrl.url as string}
              alt={product.name}
              width={600}
              height={600}
              // fill
              // sizes="(max-width: 640px) 33vw, 10vw"
              className="object-contain"
              // loading="eager"
              onLoadingComplete={onLoadingCompletedImage}
              onError={onLoadingCompletedImage}
            />
          ) : (
            <Image
              src={"/images/blank.png"}
              alt={product.name}
              width={600}
              height={600}
              // fill
              // sizes="(max-width: 640px) 33vw, 10vw"
              className="object-contain"
              // loading="eager"
            />
          )}
        </div>
        <div className="lg:col-span1 col-span-2 flex flex-1 flex-col gap-y-12">
          <h5 title={product.name} className="line-clamp-2 h-11 font-semibold">
            {product.name}
            {product.name}
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
          {/* {product.lowestPrice && (
              <div className="flex flex-col items-stretch justify-between text-alpha-800">
                <div className="flex items-start gap-2">
                  {hasDiscount && (
                    <div className="mt-2 rounded bg-red-500 px-2 py-1.5 text-center text-sm font-semibold leading-none text-white">
                      {digitsEnToFa(15)}%
                    </div>
                  )}
                  <div>
                    <span className="text-xs leading-none text-alpha-600">
                      قیمت
                      {product.uom && ` هر ${product.uom.name}`}
                    </span>
                    <div className="flex items-center gap-1 leading-none">
                      <PriceTitle price={product.lowestPrice.amount} />
                    </div>

                    <div className="mt-2 flex-1">
                      {hasDiscount && (
                        <span className="text-sm text-alpha-500 line-through">
                          {digitsEnToFa(
                            addCommas(`${product.lowestPrice.amount}`)
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )} */}
        </div>
      </Link>
    </div>
  )
}

export default ProductCard
