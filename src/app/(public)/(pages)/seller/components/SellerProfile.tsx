"use client"

import { useContext, useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import {
  useInfiniteQuery,
  useQuery,
  UseQueryResult
} from "@tanstack/react-query"
import clsx from "clsx"
import { useSetAtom } from "jotai"
import { Session } from "next-auth"
import { useQueryState } from "next-usequerystate"

import {
  Brand,
  EntityTypeEnum,
  EventTrackerTypes,
  GetAllCategoriesQuery,
  GetAllProductsQuery,
  GetBrandsOfSellerQuery,
  GetIsFavoriteQuery,
  GetSellerQuery,
  IndexProductInput,
  Product
} from "@/generated"

import {
  Segments,
  SegmentsContent,
  SegmentsList,
  SegmentsListItem
} from "@core/components/ui/segment"
import { getAllCategoriesQueryFn } from "@core/queryFns/allCategoriesQueryFns"
import { getAllProductsQueryFn } from "@core/queryFns/allProductsQueryFns"
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
import ProductCard, {
  ProductCardSkeleton
} from "@/app/(public)/components/product-card"
import { checkLimitPageByCondition } from "@/app/(public)/components/product-list"
import ProductListContainer from "@/app/(public)/components/ProductListContainer"
import { PublicContext } from "@/app/(public)/components/public-provider"

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

const ProductsTab = ({ productsProps }: { productsProps: SellerProfile }) => {
  const allProductsQuery = useInfiniteQuery<GetAllProductsQuery>(
    [
      QUERY_FUNCTIONS_KEY.ALL_PRODUCTS_QUERY_KEY,
      {
        page: 1,
        sellerId: +productsProps.slug[0]
      }
    ],
    ({ pageParam = 1 }) => {
      return getAllProductsQueryFn({
        page: pageParam,
        sellerId: +productsProps.slug[0]
      })
    },
    {
      keepPreviousData: true,
      getNextPageParam(lastPage, allPages) {
        return checkLimitPageByCondition(
          lastPage.products.currentPage < lastPage.products.lastPage,
          allPages
        )
      }
    }
  )

  return (allProductsQuery.isLoading || allProductsQuery.isFetching) &&
    !allProductsQuery.isFetchingNextPage ? (
    <div className="divide flex flex-col gap-y divide-alpha-200 md:grid md:grid-cols-3 lg:grid-cols-4">
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      {productsProps.isMobileView && (
        <>
          <ProductCardSkeleton />
        </>
      )}
    </div>
  ) : (
    <InfiniteScrollPagination
      CardLoader={() => <ProductCardSkeleton />}
      infiniteQuery={allProductsQuery}
    >
      {(page, ref) => (
        <ProductListContainer>
          {({ selectedItemId, setSelectedItemId }) => (
            <>
              {page.products.data.map((product, index) => (
                <ProductCard
                  selectedItemId={selectedItemId}
                  setSelectedItemId={setSelectedItemId}
                  ref={
                    page.products.data.length - 1 === index ? ref : undefined
                  }
                  key={product?.id}
                  product={product as Product}
                />
              ))}
            </>
          )}
        </ProductListContainer>
      )}
    </InfiniteScrollPagination>
  )
}

const CategoriesTab = ({
  query,
  productsProps
}: {
  query: UseQueryResult<GetAllCategoriesQuery, unknown>
  productsProps: SellerProfile
}) => {
  const [activeTab, setActiveTab] = useState<string>("")
  const [openTabName, setOpenTabName] = useQueryState("cat")
  const sliderRef = useRef<HTMLDivElement>(null)
  const [slideWidth, setSlideWidth] = useState(0)

  const allProductsQuery = useInfiniteQuery<GetAllProductsQuery>(
    [
      QUERY_FUNCTIONS_KEY.ALL_PRODUCTS_QUERY_KEY,
      {
        page: 1,
        sellerId: +productsProps.slug[0],
        categoryIds: activeTab ? [+activeTab] : []
      }
    ],
    ({ pageParam = 1 }) => {
      return getAllProductsQueryFn({
        page: pageParam,
        sellerId: +productsProps.slug[0],
        categoryIds: [+activeTab]
      })
    },
    {
      keepPreviousData: true,
      getNextPageParam(lastPage, allPages) {
        return checkLimitPageByCondition(
          lastPage.products.currentPage < lastPage.products.lastPage,
          allPages
        )
      }
    }
  )

  useEffect(() => {
    const slide = sliderRef.current?.children[0]

    if (slide?.clientWidth) {
      setSlideWidth(slide?.clientWidth)
    }
  }, [])

  useEffect(() => {
    setActiveTab(openTabName || String(query.data?.categories[0].id))
  }, [query.data?.categories, openTabName])

  return (
    <Segments
      value={activeTab}
      onValueChange={(value) => {
        if (value === String(query.data?.categories[0].id)) {
          setOpenTabName(null)
          setActiveTab(value)
          return
        }
        setOpenTabName(value)
      }}
      className="h-full bg-alpha-white"
    >
      <SegmentsList className="border-b py">
        {query.data?.categories?.map(({ title, id, imageCategory }) => (
          <SegmentsListItem
            noStyle
            className="mx-2 h-full"
            key={id}
            value={String(id)}
          >
            <div
              ref={sliderRef}
              className={clsx("h-full w-[20vw] flex-shrink-0 cursor-pointer")}
            >
              <div
                className={clsx("flex h-full flex-col justify-start gap-y-4")}
              >
                <div
                  style={{
                    height: slideWidth
                  }}
                  className={clsx(
                    "relative w-full overflow-hidden rounded-full border border-alpha-400 bg-alpha-50",
                    id === +activeTab ? "border-2 border-primary" : ""
                  )}
                >
                  <Image
                    src={
                      (imageCategory &&
                        (imageCategory[0]?.file.presignedUrl?.url as string)) ??
                      "" ??
                      `/images/categories/${id}.png`
                    }
                    alt="category"
                    fill
                    className="rounded-xl object-contain"
                  />
                </div>
                <h5
                  className={clsx(
                    "relative z-20 line-clamp-2 h-10 whitespace-pre-wrap bg-opacity-60 text-center text-sm font-semibold",
                    id === +activeTab ? "text-primary" : ""
                  )}
                >
                  {title}
                </h5>
              </div>
            </div>
          </SegmentsListItem>
        ))}
      </SegmentsList>
      {query.data?.categories?.map(({ id }) => (
        <SegmentsContent className={clsx("flex-1")} value={String(id)} key={id}>
          {(allProductsQuery.isLoading || allProductsQuery.isFetching) &&
          !allProductsQuery.isFetchingNextPage ? (
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          ) : (
            <InfiniteScrollPagination
              CardLoader={() => <ProductCardSkeleton />}
              infiniteQuery={allProductsQuery}
            >
              {(page, ref) => (
                <ProductListContainer>
                  {({ selectedItemId, setSelectedItemId }) => (
                    <>
                      {page.products.data.map((product, index) => (
                        <ProductCard
                          selectedItemId={selectedItemId}
                          setSelectedItemId={setSelectedItemId}
                          ref={
                            page.products.data.length - 1 === index
                              ? ref
                              : undefined
                          }
                          key={product?.id}
                          product={product as Product}
                        />
                      ))}
                    </>
                  )}
                </ProductListContainer>
              )}
            </InfiniteScrollPagination>
          )}
        </SegmentsContent>
      ))}
    </Segments>
  )
}

const SellerProfile = ({
  isMobileView,
  args,
  slug,
  session
}: SellerProfile) => {
  const { contactModalDataAtom } = useContext(PublicContext)
  const setContactModalData = useSetAtom(contactModalDataAtom)
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

  const allCategoriesQuery = useQuery<GetAllCategoriesQuery>({
    queryKey: [
      QUERY_FUNCTIONS_KEY.ALL_CATEGORIES_QUERY_KEY,
      { sellerId: +slug[0] }
    ],
    queryFn: () => getAllCategoriesQueryFn({ sellerId: +slug[0] })
  })

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
        Content: () => {
          return (
            <ProductsTab
              productsProps={{
                args,
                isMobileView,
                session,
                slug
              }}
            />
          )
        }
      },
      {
        value: SellerProfileTabEnum.CATEGORY,
        title: (
          <TabTitleWithExtraData
            title="دسته‌بندی‌ها"
            total={allCategoriesQuery.data?.categories.length}
          />
        ),
        Content: () => (
          <CategoriesTab
            query={allCategoriesQuery}
            productsProps={{
              args,
              isMobileView,
              session,
              slug
            }}
          />
        )
      },
      {
        value: SellerProfileTabEnum.BRAND,
        title: <TabTitleWithExtraData title="برند‌ها" total={totalBrands} />,
        className: "!bg-alpha-100 h-full",
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
      allCategoriesQuery,
      args,
      brandsOfQuery,
      isMobileView,
      query.data?.seller.total,
      session,
      slug,
      totalBrands
    ]
  )

  useEffect(() => {
    setContactModalData({
      data: query.data?.seller,
      type: EventTrackerTypes.ViewOffer,
      title: "اطلاعات تماس"
    })
  }, [query.data?.seller, setContactModalData])

  return (
    <BrandOrSellerProfile
      isMobileView={isMobileView}
      isFavoriteQuery={isFavoriteQuery}
      type={EntityTypeEnum.Seller}
      data={query.data?.seller}
      slug={slug}
      tabs={tabs}
    />
  )
}

export default SellerProfile
