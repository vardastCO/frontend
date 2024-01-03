import { Metadata } from "next"
import { dehydrate } from "@tanstack/react-query"
import { getServerSession } from "next-auth"

import {
  EntityTypeEnum,
  IndexProductInput,
  ProductSortablesEnum
} from "@/generated"

import getQueryClient from "@core/clients/getQueryClient"
import { CheckIsMobileView } from "@core/actions/checkIsMobileView"
import { authOptions } from "@core/lib/authOptions"
import withMobileHeader from "@core/middlewares/withMobileHeader"
import { ReactQueryHydrate } from "@core/providers/ReactQueryHydrate"
import { getAllCategoriesQueryFn } from "@core/queryFns/allCategoriesQueryFns"
import { getAllProductsQueryFn } from "@core/queryFns/allProductsQueryFns"
import { getBrandQueryFn } from "@core/queryFns/brandQueryFns"
import { getBrandToSellerQueryFns } from "@core/queryFns/getBrandToSellerQueryFns"
import { getIsFavoriteQueryFns } from "@core/queryFns/getIsFavoriteQueryFns"
import QUERY_FUNCTIONS_KEY from "@core/queryFns/queryFunctionsKey"
import BrandProfile from "@/app/(public)/(pages)/brand/components/BrandProfile"

interface BrandIndexProps {
  params: {
    slug: Array<string | number>
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params }: BrandIndexProps
  // parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const brandId = params.slug[0] as number
    const brand = await getBrandQueryFn(brandId)

    return {
      title: brand.brand.name,
      alternates: {
        canonical: encodeURI(
          `${process.env.NEXT_PUBLIC_URL}/brand/${brand.brand.id}/${brand.brand.name}`
        )
      }
    }
  } catch (error) {
    console.log("generateMetadata product")
  }
  return {
    title: "محصولی یافت نشد"
  }
}

const BrandIndex = async ({
  params: { slug },
  searchParams
}: BrandIndexProps) => {
  const isMobileView = CheckIsMobileView()
  const queryClient = getQueryClient()
  const session = await getServerSession(authOptions)

  const args: IndexProductInput = {}
  args["page"] =
    searchParams.page && +searchParams.page[0] > 0 ? +searchParams.page[0] : 1
  if (slug && slug.length) args["brandId"] = +slug[0]
  if (searchParams.query && searchParams.query.length)
    args["query"] = searchParams.query as string

  // if (searchParams.categoryId && searchParams.categoryId.length)
  //   args["categoryIds"] = Array.isArray(searchParams.categoryId)
  //     ? searchParams.categoryId.map((item) => +item)
  //     : [+searchParams.categoryId]

  if (searchParams.orderBy) {
    args["orderBy"] = searchParams.orderBy as ProductSortablesEnum
  } else {
    args["orderBy"] = ProductSortablesEnum.Newest
  }
  args["attributes"] = []

  if (searchParams) {
    for (const key in searchParams) {
      if (key.includes("attributes[")) {
        const regex = /attributes\[(\d+)\]/
        const match = key.match(regex)

        if (match && match.length === 2) {
          const id = parseInt(match[1], 10)
          const value: string[] = Array.isArray(searchParams[key])
            ? (searchParams[key] as string[])
            : ([searchParams[key]] as string[])

          value.forEach((val) => {
            args["attributes"]?.push({ id, value: val })
          })
        }
      }
    }
  }

  await queryClient.prefetchQuery(
    [QUERY_FUNCTIONS_KEY.ALL_CATEGORIES_QUERY_KEY, { brandId: +slug[0] }],
    () => getAllCategoriesQueryFn({ brandId: +slug[0] })
  )

  await queryClient.prefetchQuery(
    [QUERY_FUNCTIONS_KEY.BRAND_QUERY_KEY, { id: +slug[0] }],
    () => getBrandQueryFn(+slug[0])
  )

  await queryClient.prefetchInfiniteQuery(
    [
      QUERY_FUNCTIONS_KEY.ALL_PRODUCTS_QUERY_KEY,
      {
        brandId: +slug[0],
        categoryIds: []
      }
    ],
    () =>
      getAllProductsQueryFn({
        brandId: +slug[0],
        categoryIds: []
      })
  )

  await queryClient.prefetchQuery(
    [QUERY_FUNCTIONS_KEY.ALL_CATEGORIES_QUERY_KEY, { brandId: +slug[0] }],
    () => getAllCategoriesQueryFn({ brandId: +slug[0] })
  )

  await queryClient.prefetchInfiniteQuery(
    [QUERY_FUNCTIONS_KEY.TAKE_BRAND_TO_SELLER, { page: 1, brandId: +slug[0] }],
    () => getBrandToSellerQueryFns({ page: 1, brandId: +slug[0] })
  )

  if (session) {
    await queryClient.prefetchQuery(
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
        })
    )
  }

  const dehydratedState = dehydrate(queryClient)

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <BrandProfile
        session={session}
        isMobileView={isMobileView}
        args={args}
        slug={slug}
      />
    </ReactQueryHydrate>
  )
}

export default withMobileHeader(BrandIndex, {
  // hasFavorite: {}
  // hasShare: true
})
