import { UseQueryResult } from "@tanstack/react-query"

import { GetAllProductsQuery, Product } from "@/generated"

import MobileHomeSection from "@/app/(public)/(pages)/(home)/components/MobileHomeSection"
import ProductCard from "@/app/(public)/components/product-card"
import ProductListContainer from "@/app/(public)/components/ProductListContainer"

const MobileHomeNewestProducts = ({
  allProductsQuery
}: {
  allProductsQuery: UseQueryResult<GetAllProductsQuery, unknown>
}) => {
  return (
    <MobileHomeSection
      viewAllHref="/products"
      bgWhite
      block
      title="جدیدترین کالاها"
    >
      <ProductListContainer>
        {({ selectedItemId, setSelectedItemId }) => (
          <>
            {allProductsQuery.data?.products?.data.map((product) => (
              <ProductCard
                selectedItemId={selectedItemId}
                setSelectedItemId={setSelectedItemId}
                key={product?.id}
                product={product as Product}
              />
            ))}
          </>
        )}
      </ProductListContainer>
    </MobileHomeSection>
  )
}

export default MobileHomeNewestProducts
