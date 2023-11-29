import { Product } from "@/generated"

import MobileHomeSection from "@/app/(public)/(pages)/home/components/MobileHomeSection"
import ProductCard from "@/app/(public)/components/product-card"
import ProductListContainer from "@/app/(public)/components/ProductListContainer"

const MobileHomeNewestProducts = ({ products }: { products: Product[] }) => {
  return (
    <MobileHomeSection block title="جدیدترین کالاها">
      <ProductListContainer>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductListContainer>
    </MobileHomeSection>
  )
}

export default MobileHomeNewestProducts
