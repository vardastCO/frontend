"use client"

import { notFound } from "next/navigation"
import { useInfiniteQuery } from "@tanstack/react-query"

import { GetAllSellersQuery, IndexSellerInput, Seller } from "@/generated"

import Breadcrumb from "@core/components/shared/Breadcrumb"
import { getAllSellersQueryFn } from "@core/queryFns/allSellersQueryFns"
import QUERY_FUNCTIONS_KEY from "@core/queryFns/queryFunctionsKey"
import BrandOrSellerCard, {
  BrandOrSellerCardSkeleton
} from "@/app/(public)/components/BrandOrSellerCard"
import BrandsOrSellersContainer from "@/app/(public)/components/BrandsOrSellersContainer"
import InfiniteScrollPagination from "@/app/(public)/components/InfiniteScrollPagination"
import { checkLimitPageByCondition } from "@/app/(public)/components/product-list"

interface SellersPageProps {
  isMobileView: boolean
  args: IndexSellerInput
  limitPage?: number
}

const SellersPage = ({ limitPage, args }: SellersPageProps) => {
  const allSellersQuery = useInfiniteQuery<GetAllSellersQuery>(
    [
      QUERY_FUNCTIONS_KEY.ALL_SELLERS_QUERY_KEY,
      {
        ...args,
        page: args.page || 1
      }
    ],
    ({ pageParam = 1 }) =>
      getAllSellersQueryFn({
        ...args,
        page: pageParam
      }),
    {
      keepPreviousData: true,
      getNextPageParam(lastPage, allPages) {
        return limitPage
          ? checkLimitPageByCondition(
              lastPage.sellers.currentPage <= limitPage,
              allPages
            )
          : checkLimitPageByCondition(
              lastPage.sellers.currentPage < lastPage.sellers.lastPage,
              allPages
            )
      }
    }
  )

  if (!allSellersQuery.data) notFound()

  return (
    <>
      <div className="bg-alpha-white">
        <Breadcrumb
          dynamic={false}
          items={[
            { label: "فروشندگان وردست", path: "/sellers", isCurrent: true }
          ]}
        />
      </div>

      <BrandsOrSellersContainer>
        <InfiniteScrollPagination
          CardLoader={BrandOrSellerCardSkeleton}
          infiniteQuery={allSellersQuery}
        >
          {(page, ref) => (
            <>
              {page.sellers.data.map(
                (seller, index) =>
                  seller && (
                    <BrandOrSellerCard
                      ref={
                        page.sellers.data.length - 1 === index ? ref : undefined
                      }
                      key={seller.id}
                      content={{ ...(seller as Seller), __typename: "Seller" }}
                    />
                  )
              )}
            </>
          )}
        </InfiniteScrollPagination>
      </BrandsOrSellersContainer>
    </>
  )
}

export default SellersPage
