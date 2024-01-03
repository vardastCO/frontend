"use client"

import { Product } from "@/generated"

import slugify from "@core/utils/persian-slugify"
import Link from "@core/components/shared/Link"
import ProductSectionContainer from "@/app/(public)/(pages)/product/components/ProductSectionContainer"
import PriceTitle from "@/app/(public)/components/PriceTitle"
import Rating from "@/app/(public)/components/Rating"

interface IProductIntroduce {
  product: Product
}

const ProductIntroduce = ({ product }: IProductIntroduce) => {
  return (
    <ProductSectionContainer>
      <h3 className="font-semibold">{product.name}</h3>

      <Link
        className=""
        href={`/brand/${product.brand.id}/${slugify(product.brand.name)}`}
        prefetch={false}
      >
        <span className="text-alpha-500">برند:</span>
        <span className="px-2 text-info">{product.brand.name}</span>
      </Link>
      <div className="flex justify-between">
        {product.rating && product.rating > 0 ? (
          <Rating rating={product.rating} />
        ) : (
          ""
        )}
        {product.lowestPrice && (
          <div className="flex justify-between gap-x">
            <PriceTitle price={product.lowestPrice.amount} />
          </div>
        )}
      </div>
      {product.lowestPrice && product.uom.name && (
        <div className="mr-auto flex justify-between text-xs text-alpha-500">
          <span>هر {product.uom.name}</span>
        </div>
      )}
    </ProductSectionContainer>
  )
}

export default ProductIntroduce
