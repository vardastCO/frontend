"use client"

import { notFound } from "next/navigation"
import { useInfiniteQuery } from "@tanstack/react-query"

import { Brand, GetAllBrandsQuery, IndexBrandInput } from "@/generated"

import { getAllBrandsQueryFn } from "@core/queryFns/allBrandsQueryFns"
import QUERY_FUNCTIONS_KEY from "@core/queryFns/queryFunctionsKey"
import BrandOrSellerCard, {
  BrandOrSellerCardSkeleton
} from "@/app/(public)/components/BrandOrSellerCard"
import BrandsOrSellersContainer from "@/app/(public)/components/BrandsOrSellersContainer"
import InfiniteScrollPagination from "@/app/(public)/components/InfiniteScrollPagination"
import { checkLimitPageByCondition } from "@/app/(public)/components/product-list"

interface BrandsPageProps {
  isMobileView: boolean
  args: IndexBrandInput
  limitPage?: number
}

const BrandsPage = ({ args, limitPage }: BrandsPageProps) => {
  // const { t } = useTranslation()
  const allBrandsQuery = useInfiniteQuery<GetAllBrandsQuery>(
    [
      QUERY_FUNCTIONS_KEY.GET_ALL_BRANDS_QUERY_KEY,
      {
        ...args,
        page: args.page || 1
      }
    ],
    ({ pageParam = 1 }) =>
      getAllBrandsQueryFn({
        ...args,
        page: pageParam
      }),
    {
      keepPreviousData: true,
      getNextPageParam(lastPage, allPages) {
        return limitPage
          ? checkLimitPageByCondition(
              lastPage.brands.currentPage <= limitPage,
              allPages
            )
          : checkLimitPageByCondition(
              lastPage.brands.currentPage < lastPage.brands.lastPage,
              allPages
            )
      }
    }
  )

  if (!allBrandsQuery?.data) notFound()

  return (
    <>
      {/* <div className="border-b bg-alpha-white">
        <Breadcrumb
          dynamic={false}
          items={[
            {
              label: t("common:brands_vardast"),
              path: "/brands",
              isCurrent: true
            }
          ]}
        />
      </div> */}

      <BrandsOrSellersContainer>
        <InfiniteScrollPagination
          CardLoader={BrandOrSellerCardSkeleton}
          infiniteQuery={allBrandsQuery}
        >
          {(page, ref) => (
            <>
              {page.brands.data.map(
                (brand, index) =>
                  brand && (
                    <BrandOrSellerCard
                      ref={
                        page.brands.data.length - 1 === index ? ref : undefined
                      }
                      key={brand.id}
                      content={{ ...(brand as Brand), __typename: "Brand" }}
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

export default BrandsPage
