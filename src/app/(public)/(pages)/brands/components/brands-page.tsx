"use client"

import { notFound } from "next/navigation"
import { useInfiniteQuery } from "@tanstack/react-query"
import useTranslation from "next-translate/useTranslation"

import { Brand, GetAllBrandsQuery, IndexBrandInput } from "@/generated"

import Breadcrumb from "@core/components/shared/Breadcrumb"
import { getAllBrandsQueryFn } from "@core/queryFns/allBrandsQueryFns"
import QUERY_FUNCTIONS_KEY from "@core/queryFns/queryFunctionsKey"
import BrandOrSellerCard, {
  BrandOrSellerCardSkeleton
} from "@/app/(public)/components/BrandOrSellerCard"
import BrandsOrSellersContainer from "@/app/(public)/components/BrandsOrSellersContainer"
import InfiniteScrollPagination from "@/app/(public)/components/InfiniteScrollPagination"

interface BrandsPageProps {
  isMobileView: boolean
  args: IndexBrandInput
}

const BrandsPage = ({ args }: BrandsPageProps) => {
  const { t } = useTranslation()
  const allBrandsQuery = useInfiniteQuery<GetAllBrandsQuery>(
    [
      QUERY_FUNCTIONS_KEY.GET_ALL_BRANDS_QUERY_KEY,
      {
        ...args,
        page: args.page || 1
      }
    ],
    () =>
      getAllBrandsQueryFn({
        ...args,
        page: args.page || 1
      }),
    {
      keepPreviousData: true,
      getNextPageParam(lastPage, allPages) {
        return lastPage.brands.currentPage < lastPage.brands.lastPage
          ? allPages.length + 1
          : undefined
      }
    }
  )

  if (!allBrandsQuery.data) notFound()

  return (
    <>
      <div className="border-b bg-alpha-white">
        <Breadcrumb
          dynamic={false}
          items={[
            {
              label: t("common:producer_vardast"),
              path: "/brands",
              isCurrent: true
            }
          ]}
        />
      </div>

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
