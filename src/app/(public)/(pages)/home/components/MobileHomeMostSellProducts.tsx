import { Product } from "@/generated"

import MobileHomeSection from "@/app/(public)/(pages)/home/components/MobileHomeSection"
import ProductSlider from "@/app/(public)/components/ProductSlider"

const MobileHomeMostSellProducts = ({ products }: { products: Product[] }) => {
  return (
    <MobileHomeSection title="پرفروش ترین کالاها">
      <ProductSlider products={products} />
    </MobileHomeSection>
  )
}

export default MobileHomeMostSellProducts
