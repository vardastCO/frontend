"use client"

import { useMemo } from "react"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { Session } from "next-auth"

import {
  Brand,
  EntityTypeEnum,
  GetBrandsOfSellerQuery,
  GetIsFavoriteQuery,
  GetSellerQuery,
  IndexProductInput
} from "@/generated"

import { brandsOfSellerQueryFns } from "@core/queryFns/brandsOfSellerQueryFns"
import { getIsFavoriteQueryFns } from "@core/queryFns/getIsFavoriteQueryFns"
import QUERY_FUNCTIONS_KEY from "@core/queryFns/queryFunctionsKey"
import { getSellerQueryFn } from "@core/queryFns/sellerQueryFns"
import BrandOrSellerCard, {
  BrandOrSellerCardSkeleton
} from "@/app/(public)/components/BrandOrSellerCard"
import BrandOrSellerProfile, {
  BrandOrSellerProfileTab,
  TabTitleWithExtraData
} from "@/app/(public)/components/BrandOrSellerProfile"
import BrandsOrSellersContainer from "@/app/(public)/components/BrandsOrSellersContainer"
import InfiniteScrollPagination from "@/app/(public)/components/InfiniteScrollPagination"
import ProductList, {
  checkLimitPageByCondition
} from "@/app/(public)/components/product-list"

export enum SellerProfileTabEnum {
  // eslint-disable-next-line no-unused-vars
  PRODUCT = "PRODUCT",
  // eslint-disable-next-line no-unused-vars
  CATEGORY = "CATEGORY",
  // eslint-disable-next-line no-unused-vars
  BRAND = "BRAND"
}

interface SellerProfile {
  isMobileView: boolean
  session: Session | null
  slug: Array<string | number>
  args: IndexProductInput
}

const SellerProfile = ({
  isMobileView,
  args,
  slug,
  session
}: SellerProfile) => {
  const query = useQuery<GetSellerQuery>(
    [QUERY_FUNCTIONS_KEY.SELLER_QUERY_KEY, { id: +slug[0] }],
    () => getSellerQueryFn(+slug[0]),
    {
      keepPreviousData: true
    }
  )

  const isFavoriteQuery = useQuery<GetIsFavoriteQuery>(
    [
      QUERY_FUNCTIONS_KEY.GET_IS_FAVORITE,
      { entityId: +slug[0], type: EntityTypeEnum.Seller }
    ],
    () =>
      getIsFavoriteQueryFns({
        accessToken: session?.accessToken,
        entityId: +slug[0],
        type: EntityTypeEnum.Seller
      }),
    {
      keepPreviousData: true,
      enabled: !!session
    }
  )

  const brandsOfQuery = useInfiniteQuery<GetBrandsOfSellerQuery>(
    [
      QUERY_FUNCTIONS_KEY.GET_BRANDS_OF_SELLER,
      {
        sellerId: +slug[0],
        page: args.page || 1
      }
    ],
    ({ pageParam = 1 }) => {
      return brandsOfSellerQueryFns({
        sellerId: +slug[0],
        page: pageParam
      })
    },
    {
      keepPreviousData: true,
      getNextPageParam(lastPage, allPages) {
        return checkLimitPageByCondition(
          lastPage.brandsOfSeller.currentPage <
            lastPage.brandsOfSeller.lastPage,
          allPages
        )
      }
    }
  )

  const totalBrands = brandsOfQuery.data?.pages.reduce(
    (prev, item) => prev + item.brandsOfSeller.total,
    0
  )

  const tabs: BrandOrSellerProfileTab[] = useMemo(
    () => [
      {
        value: SellerProfileTabEnum.PRODUCT,
        title: (
          <TabTitleWithExtraData
            title="کالاها"
            total={query.data?.seller.total as number}
          />
        ),
        Content: () => (
          <ProductList
            args={args}
            hasFilter={false}
            isMobileView={isMobileView}
            selectedCategoryIds={args["categoryIds"] || undefined}
            sellerId={+slug[0]}
          />
        )
      },
      {
        value: SellerProfileTabEnum.CATEGORY,
        title: <TabTitleWithExtraData title="دسته‌بندی‌ها" />,

        Content: () => <></>
      },
      {
        value: SellerProfileTabEnum.BRAND,
        title: <TabTitleWithExtraData title="برند‌ها" total={totalBrands} />,
        Content: () => {
          return (
            <InfiniteScrollPagination
              CardLoader={BrandOrSellerCardSkeleton}
              infiniteQuery={brandsOfQuery}
            >
              {(page, ref) => (
                <BrandsOrSellersContainer>
                  {({ selectedItemId, setSelectedItemId }) => (
                    <>
                      {page.brandsOfSeller.data.map(
                        (brandsOfSeller, index) =>
                          brandsOfSeller && (
                            <BrandOrSellerCard
                              selectedItemId={selectedItemId}
                              setSelectedItemId={setSelectedItemId}
                              ref={
                                page.brandsOfSeller.data.length - 1 === index
                                  ? ref
                                  : undefined
                              }
                              key={brandsOfSeller.id}
                              content={{
                                ...(brandsOfSeller as Brand),
                                __typename: "Brand"
                              }}
                            />
                          )
                      )}
                    </>
                  )}
                </BrandsOrSellersContainer>
              )}
            </InfiniteScrollPagination>
          )
        }
      }
    ],
    [
      args,
      brandsOfQuery,
      isMobileView,
      query.data?.seller.total,
      slug,
      totalBrands
    ]
  )

  return (
    <BrandOrSellerProfile
      isFavoriteQuery={isFavoriteQuery}
      type={EntityTypeEnum.Seller}
      data={query.data?.seller}
      slug={slug}
      tabs={tabs}
    />
  )
}

export default SellerProfile
