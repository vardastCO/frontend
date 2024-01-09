"use client"

import ProductSlider, {
  ProductSliderProps
} from "@/app/(public)/components/ProductSlider"

const SameCategories = ({ products, hasExtraItem }: ProductSliderProps) => {
  return (
    // <ProductSectionContainer spaceless title="کالاهای مشابه">
    <div className="bg-secondary py-6">
      <ProductSlider hasExtraItem={hasExtraItem} products={products} />
    </div>
    // </ProductSectionContainer>
  )
}

export default SameCategories
