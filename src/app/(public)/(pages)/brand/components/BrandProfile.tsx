"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { notFound } from "next/navigation"
import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useQuery,
  UseQueryResult
} from "@tanstack/react-query"
import clsx from "clsx"
import { Session } from "next-auth"
import { useQueryState } from "next-usequerystate"

import {
  EntityTypeEnum,
  GetAllCategoriesQuery,
  GetAllProductsQuery,
  GetBrandQuery,
  GetBrandToSellerQuery,
  GetIsFavoriteQuery,
  IndexProductInput,
  Product,
  Seller
} from "@/generated"

import axiosApis from "@core/clients/axiosApis"
import Link from "@core/components/shared/Link"
import { Button } from "@core/components/ui/button"
import {
  Segments,
  SegmentsContent,
  SegmentsList,
  SegmentsListItem
} from "@core/components/ui/segment"
import { getAllCategoriesQueryFn } from "@core/queryFns/allCategoriesQueryFns"
import { getAllProductsQueryFn } from "@core/queryFns/allProductsQueryFns"
import { getBrandQueryFn } from "@core/queryFns/brandQueryFns"
import { getBrandToSellerQueryFns } from "@core/queryFns/getBrandToSellerQueryFns"
import { getIsFavoriteQueryFns } from "@core/queryFns/getIsFavoriteQueryFns"
import QUERY_FUNCTIONS_KEY from "@core/queryFns/queryFunctionsKey"
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

interface BrandProfile {
  isMobileView: boolean
  slug: Array<string | number>
  args: IndexProductInput
  session: Session | null
}

export enum BrandProfileTabEnum {
  // eslint-disable-next-line no-unused-vars
  PRODUCT = "PRODUCT",
  // eslint-disable-next-line no-unused-vars
  CATEGORY = "CATEGORY",
  // eslint-disable-next-line no-unused-vars
  SELLERS = "SELLERS",
  // eslint-disable-next-line no-unused-vars
  PRICE_LIST = "PRICE_LIST",
  // eslint-disable-next-line no-unused-vars
  CATALOG = "CATALOG"
}

type PdfTabItemProps = {
  uuid?: string
  access_token?: string
  isMobileView?: boolean
  title: string
}

const SellersTab = ({
  brandToSellerQuery
}: {
  brandToSellerQuery: UseInfiniteQueryResult<GetBrandToSellerQuery, unknown>
}) => {
  if (!brandToSellerQuery.data) notFound()

  return (
    <BrandsOrSellersContainer>
      {({ selectedItemId, setSelectedItemId }) => (
        <InfiniteScrollPagination
          CardLoader={BrandOrSellerCardSkeleton}
          infiniteQuery={brandToSellerQuery}
        >
          {(page, ref) => (
            <>
              {page.takeBrandToSeller.data.map(
                (seller, index) =>
                  seller && (
                    <BrandOrSellerCard
                      ref={
                        page.takeBrandToSeller.data.length - 1 === index
                          ? ref
                          : undefined
                      }
                      key={seller.id}
                      selectedItemId={selectedItemId}
                      setSelectedItemId={setSelectedItemId}
                      content={{
                        ...(seller as Seller),
                        __typename: "Seller"
                      }}
                    />
                  )
              )}
            </>
          )}
        </InfiniteScrollPagination>
      )}
    </BrandsOrSellersContainer>
  )
}

const CategoriesTab = ({
  query,
  productsProps
}: {
  query: UseQueryResult<GetAllCategoriesQuery, unknown>
  productsProps: BrandProfile
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
        brandId: +productsProps.slug[0],
        categoryIds: activeTab ? [+activeTab] : []
      }
    ],
    ({ pageParam = 1 }) => {
      return getAllProductsQueryFn({
        page: pageParam,
        brandId: +productsProps.slug[0],
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
      <SegmentsList className="border-b p">
        {query.data?.categories?.map(({ title, id, imageCategory }) => (
          <SegmentsListItem
            noStyle
            className="h-full pl"
            key={id}
            value={String(id)}
          >
            <>
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
                          (imageCategory[0]?.file.presignedUrl
                            ?.url as string)) ??
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
            </>
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
            <ProductListContainer>
              {({ selectedItemId, setSelectedItemId }) => (
                <InfiniteScrollPagination
                  CardLoader={() => <ProductCardSkeleton />}
                  infiniteQuery={allProductsQuery}
                >
                  {(page, ref) => (
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
                </InfiniteScrollPagination>
              )}
            </ProductListContainer>
          )}
        </SegmentsContent>
      ))}
    </Segments>
  )
}

const ProductsTab = ({ productsProps }: { productsProps: BrandProfile }) => {
  const allProductsQuery = useInfiniteQuery<GetAllProductsQuery>(
    [
      QUERY_FUNCTIONS_KEY.ALL_PRODUCTS_QUERY_KEY,
      {
        page: 1,
        brandId: +productsProps.slug[0]
      }
    ],
    ({ pageParam = 1 }) => {
      return getAllProductsQueryFn({
        page: pageParam,
        brandId: +productsProps.slug[0]
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
    <>
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
    </>
  ) : (
    <ProductListContainer>
      {({ selectedItemId, setSelectedItemId }) => (
        <InfiniteScrollPagination
          CardLoader={() => <ProductCardSkeleton />}
          infiniteQuery={allProductsQuery}
        >
          {(page, ref) => (
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
        </InfiniteScrollPagination>
      )}
    </ProductListContainer>
  )
}

const PdfTabItem = ({
  uuid,
  access_token,
  isMobileView,
  title
}: PdfTabItemProps) => {
  const [pdfViewLoading, setPdfViewLoading] = useState(false)

  const showPdfInNewTab = useCallback(
    async ({ uuid = "" }: { uuid: string }) => {
      setPdfViewLoading(true)
      const response = await axiosApis.servePdf({
        access_token,
        uuid
      })
      if (response.data) {
        setPdfViewLoading(false)
        const pdfBlob = new Blob([response.data], {
          type: "application/pdf"
        })
        const pdfUrl = URL.createObjectURL(pdfBlob)
        if (isMobileView) {
          window.location.href = pdfUrl
        } else {
          window.open(pdfUrl, "_blank")
        }
        URL.revokeObjectURL(pdfUrl)
      }
    },
    [isMobileView, access_token]
  )

  return (
    <div className="flex h-full w-full flex-col items-center justify-start gap-y-7 px pt-14">
      {uuid ? (
        access_token ? (
          <>
            <h4 className="px-6 text-center">
              فایل PDF {title} را می توانید از گزینه زیر مشاهده نمایید.
            </h4>
            <Button
              loading={pdfViewLoading}
              className="btn btn-primary flex items-center justify-center"
              onClick={() => {
                showPdfInNewTab({ uuid })
              }}
            >
              <span>مشاهده {title}</span>
            </Button>
          </>
        ) : (
          <>
            <h4 className="px-6 text-center">
              برای مشاهده {title}، لطفا ابتدا وارد حساب کاربری خود شوید.
            </h4>
            <Link
              href="/auth/signin"
              className="btn btn-md btn-primary block px"
            >
              ورود به حساب کاربری
            </Link>
          </>
        )
      ) : (
        <h4 className="px-6 text-center">
          در حال حاضر، {title}ی آپلود نشده است.
        </h4>
      )}
    </div>
  )
}

const BrandProfile = ({ isMobileView, args, slug, session }: BrandProfile) => {
  const brandQuery = useQuery<GetBrandQuery>(
    [QUERY_FUNCTIONS_KEY.BRAND_QUERY_KEY, { id: +slug[0] }],
    () => getBrandQueryFn(+slug[0]),
    {
      keepPreviousData: true
    }
  )

  const allCategoriesQuery = useQuery<GetAllCategoriesQuery>({
    queryKey: [
      QUERY_FUNCTIONS_KEY.ALL_CATEGORIES_QUERY_KEY,
      { brandId: +slug[0] }
    ],
    queryFn: () => getAllCategoriesQueryFn({ brandId: +slug[0] })
  })

  const isFavoriteQuery = useQuery<GetIsFavoriteQuery>(
    [
      QUERY_FUNCTIONS_KEY.GET_IS_FAVORITE,
      {
        accessToken: session?.accessToken,
        entityId: +slug[0],
        type: EntityTypeEnum.Brand
      }
    ],
    () =>
      getIsFavoriteQueryFns({
        accessToken: session?.accessToken,
        entityId: +slug[0],
        type: EntityTypeEnum.Brand
      }),
    {
      keepPreviousData: true,
      enabled: !!session
    }
  )

  const brandToSellerQuery = useInfiniteQuery<GetBrandToSellerQuery>(
    [
      QUERY_FUNCTIONS_KEY.TAKE_BRAND_TO_SELLER,
      {
        page: 1,
        brandId: +slug[0]
      }
    ],
    ({ pageParam = 1 }) =>
      getBrandToSellerQueryFns({
        page: pageParam,
        brandId: +slug[0]
      }),
    {
      keepPreviousData: true,
      getNextPageParam(lastPage, allPages) {
        return checkLimitPageByCondition(
          lastPage.takeBrandToSeller.currentPage <
            lastPage.takeBrandToSeller.lastPage,
          allPages
        )
      }
    }
  )

  const tabs: BrandOrSellerProfileTab[] = useMemo(
    () => [
      {
        value: BrandProfileTabEnum.PRODUCT,
        title: (
          <TabTitleWithExtraData
            title="کالاها"
            total={brandQuery.data?.brand.total as number}
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
        value: BrandProfileTabEnum.CATEGORY,
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
        value: BrandProfileTabEnum.SELLERS,
        className: "!bg-alpha-100 h-full",
        title: (
          <TabTitleWithExtraData
            title="فروشندگان"
            total={brandToSellerQuery.data?.pages[0].takeBrandToSeller.total}
          />
        ),
        Content: () => <SellersTab brandToSellerQuery={brandToSellerQuery} />
      },
      {
        value: BrandProfileTabEnum.PRICE_LIST,
        title: (
          <TabTitleWithExtraData
            title="لیست قیمت"
            createdDate={brandQuery.data?.brand.priceList?.createdAt}
          />
        ),
        Content: () => (
          <PdfTabItem
            access_token={session?.accessToken}
            isMobileView={isMobileView}
            title="لیست قیمت"
            uuid={brandQuery.data?.brand.priceList?.uuid}
          />
        )
      },
      {
        value: BrandProfileTabEnum.CATALOG,
        title: (
          <TabTitleWithExtraData
            title="کاتالوگ"
            createdDate={brandQuery.data?.brand.catalog?.createdAt}
          />
        ),
        Content: () => (
          <PdfTabItem
            access_token={session?.accessToken}
            isMobileView={isMobileView}
            title="کاتالوگ"
            uuid={brandQuery.data?.brand.catalog?.uuid}
          />
        )
      }
    ],
    [
      allCategoriesQuery,
      args,
      brandQuery.data?.brand.catalog?.createdAt,
      brandQuery.data?.brand.catalog?.uuid,
      brandQuery.data?.brand.priceList?.createdAt,
      brandQuery.data?.brand.priceList?.uuid,
      brandQuery.data?.brand.total,
      brandToSellerQuery,
      isMobileView,
      session,
      slug
    ]
  )

  return (
    <BrandOrSellerProfile
      isMobileView={isMobileView}
      isFavoriteQuery={isFavoriteQuery}
      type={EntityTypeEnum.Brand}
      data={brandQuery.data?.brand}
      slug={slug}
      tabs={tabs}
    />
  )
}

export default BrandProfile
