"use client"

import Link from "next/link"
import { StarIcon } from "@heroicons/react/24/solid"
import { digitsEnToFa } from "@persian-tools/persian-tools"

import { Product } from "@/generated"

import slugify from "@core/utils/persian-slugify"

interface IProductIntroduce {
  product: Product
}

const ProductIntroduce = ({ product }: IProductIntroduce) => {
  return (
    <div className="flex flex-col gap-y p">
      <div className="flex flex-col gap-y-3">
        <h4 className="font-semibold">{product.name}</h4>
        <Link
          className=""
          href={`/brand/${product.brand.id}/${slugify(
            product.brand.name
          )}?title=${product.brand.name}`}
          prefetch={false}
        >
          <span className="text-alpha-500">تولید کننده:</span>
          <span className="px-2 text-info underline">{product.brand.name}</span>
        </Link>
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
      </div>
    </div>
  )
}

export default ProductIntroduce
