"use client"

import Image from "next/image"

import { Product } from "@/generated"

import ProductVerticalCard from "@/app/(public)/components/ProductVerticalCard"

export type ProductSliderProps = {
  products: Array<Product>
  hasExtraItem?:
    | {
        title: string
      }
    | undefined
}

const ProductSlider = ({ products, hasExtraItem }: ProductSliderProps) => {
  return (
    <div className="h-full overflow-hidden">
      <div className="hide-scrollbar flex h-full w-full overflow-x-auto pr-5">
        {hasExtraItem && (
          <div
            className={`h-full w-[37vw] flex-shrink-0 cursor-pointer pl-5 md:w-60`}
          >
            <div className="flex h-full flex-col items-center justify-center gap-y-8">
              <h3 className="font-semibold text-alpha-white">
                {hasExtraItem.title}
              </h3>
              <Image
                src={"/images/same-product.png"}
                alt={"same-product"}
                width={120}
                height={120}
                className="object-contain"
              />
            </div>
          </div>
        )}
        {products.map((product) => (
          <div
            className={`ml-2 h-full w-[37vw] flex-shrink-0 cursor-pointer rounded-xl bg-alpha-white md:w-60`}
            key={product.id}
          >
            <ProductVerticalCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductSlider
