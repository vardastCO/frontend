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
    <div className="flex flex-col gap-y bg-alpha-white p">
      <div className="flex flex-col gap-y-3">
        <Link
          className=""
          href={`/brand/${product.brand.id}/${slugify(
            product.brand.name
          )}?title=${product.brand.name}`}
          prefetch={false}
        >
          {product.brand.name}
        </Link>
        <h2>{product.name}</h2>
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
      {product.description && (
        <p className="text-justify text-alpha-500">{product.description}</p>
      )}
    </div>
  )
}

export default ProductIntroduce
