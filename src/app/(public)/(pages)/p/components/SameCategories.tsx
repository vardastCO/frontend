"use client"

import { Product } from "@/generated"

import ProductSectionContainer from "@/app/(public)/(pages)/p/components/ProductSectionContainer"
import ProductSlider from "@/app/(public)/components/ProductSlider"

type SameCategoriesProps = {
  products: Array<Product>
}

const SameCategories = ({ products }: SameCategoriesProps) => {
  return (
    <ProductSectionContainer spaceless title="کالاهای مشابه">
      <ProductSlider products={products} />
    </ProductSectionContainer>
  )
}

export default SameCategories
