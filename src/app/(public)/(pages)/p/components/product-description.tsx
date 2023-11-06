"use client"

import ProductSectionContainer from "@/app/(public)/(pages)/p/components/ProductSectionContainer"

type ProductDescriptionProps = {
  description: string
}

const ProductDescription = ({ description }: ProductDescriptionProps) => {
  return (
    <ProductSectionContainer title="معرفی">
      <p className="w-full text-justify text-alpha-500">{description}</p>
    </ProductSectionContainer>
  )
}

export default ProductDescription
