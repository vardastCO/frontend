"use client"

import Link from "next/link"

import { Product } from "@/generated"

import slugify from "@core/utils/persian-slugify"
import ProductSectionContainer from "@/app/(public)/(pages)/p/components/ProductSectionContainer"
import Rating from "@/app/(public)/components/Rating"

interface IProductIntroduce {
  product: Product
}

const ProductIntroduce = ({ product }: IProductIntroduce) => {
  return (
    <ProductSectionContainer title={product.name}>
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
      <div className="flex">
        {product.rating && product.rating > 0 ? (
          <Rating rating={product.rating} />
        ) : (
          ""
        )}
      </div>
    </ProductSectionContainer>
  )
}

export default ProductIntroduce
