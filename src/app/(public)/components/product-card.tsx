import Image from "next/image"
import Link from "next/link"
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools"

import { Product } from "@/generated"

import slugify from "@core/utils/persian-slugify"

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  console.log(product)

  const hasDiscount = false
  return (
    <div
      className="relative
        border-b
        transition
        hover:z-10
        sm:border-l-0
        md:hover:shadow-lg
        lg:border-l
        lg:[&:nth-of-type(3n)]:border-l-0
        xl:[&:nth-of-type(3n)]:border-l
        xl:[&:nth-of-type(4n)]:border-l-0"
    >
      <Link
        href={`/p/${product.id}/${slugify(product.name)}`}
        className="flex h-full w-full py-2 lg:px-4"
        prefetch={false}
      >
        <div className="flex flex-1 flex-row gap-4 lg:flex-col">
          <div
            id={`product-image-${product.id}`}
            className="relative w-32 flex-shrink-0 bg-[url('/images/blank.png')] bg-[length:2em] bg-center bg-no-repeat align-middle opacity-0 duration-1000 ease-out lg:h-48 lg:w-full"
          >
            {product.images.at(0)?.file.presignedUrl.url && (
              <Image
                src={product.images.at(0)?.file.presignedUrl.url as string}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 33vw, 10vw"
                className="object-contain"
                loading="eager"
                onLoadingComplete={() => {
                  const div = document.getElementById(
                    `product-image-${product.id}`
                  )
                  if (div) {
                    div.className = div.className + " opacity-100"
                  }
                }}
              />
            )}
          </div>
          <div className="flex flex-1 flex-col">
            <h2
              title={product.name}
              className="mb-6 mt-4 line-clamp-2 h-12 text-alpha-800"
            >
              {product.name}
            </h2>
            {product.lowestPrice && (
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
                      <span className="text-lg font-semibold leading-none">
                        {digitsEnToFa(
                          addCommas(`${product.lowestPrice.amount}`)
                        )}
                      </span>
                      <span className="text-sm leading-none">تومان</span>
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
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard
