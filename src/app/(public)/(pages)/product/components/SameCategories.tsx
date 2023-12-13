"use client"

import { Product } from "@/generated"

import ProductSlider from "@/app/(public)/components/ProductSlider"

type SameCategoriesProps = {
  products: Array<Product>
}

const SameCategories = ({ products }: SameCategoriesProps) => {
  return (
    // <ProductSectionContainer spaceless title="کالاهای مشابه">
    <div className="py-6">
      <ProductSlider
        hasExtraItem={{
          title: "کالاهای مشابه"
        }}
        products={products}
      />
    </div>
    // </ProductSectionContainer>
  )
}

export default SameCategories
