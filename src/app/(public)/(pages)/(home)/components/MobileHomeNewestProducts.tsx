import { UseInfiniteQueryResult } from "@tanstack/react-query"

import { GetAllProductsQuery, Product } from "@/generated"

import MobileHomeSection from "@/app/(public)/(pages)/(home)/components/MobileHomeSection"
import InfiniteScrollPagination from "@/app/(public)/components/InfiniteScrollPagination"
import ProductCard, {
  ProductCardSkeleton
} from "@/app/(public)/components/product-card"
import ProductListContainer from "@/app/(public)/components/ProductListContainer"

const MobileHomeNewestProducts = ({
  allProductsQuery
}: {
  allProductsQuery: UseInfiniteQueryResult<GetAllProductsQuery, unknown>
}) => {
  return (
    <MobileHomeSection block title="جدیدترین کالاها">
      <ProductListContainer>
        <InfiniteScrollPagination
          CardLoader={ProductCardSkeleton}
          infiniteQuery={allProductsQuery}
        >
          {(page, ref) => (
            <>
              {page.products.data.map((product, index) => (
                <ProductCard
                  ref={
                    page.products.data.length - 1 === index ? ref : undefined
                  }
                  key={product?.id}
                  product={product as Product}
                />
              ))}
            </>
          )}
        </InfiniteScrollPagination>
      </ProductListContainer>
    </MobileHomeSection>
  )
}

export default MobileHomeNewestProducts
