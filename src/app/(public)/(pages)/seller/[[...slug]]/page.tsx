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
import { getAllProductsQueryFn } from "@core/queryFns/allProductsQueryFns"
import { brandsOfSellerQueryFns } from "@core/queryFns/brandsOfSellerQueryFns"
import { getIsFavoriteQueryFns } from "@core/queryFns/getIsFavoriteQueryFns"
import QUERY_FUNCTIONS_KEY from "@core/queryFns/queryFunctionsKey"
import { getSellerQueryFn } from "@core/queryFns/sellerQueryFns"
import SellerProfile from "@/app/(public)/(pages)/seller/components/SellerProfile"

interface SellerIndexProps {
  params: {
    slug: Array<string | number>
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params }: SellerIndexProps
  // parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const sellerId = params.slug[0] as number
    const seller = await getSellerQueryFn(sellerId)

    return {
      title: seller.seller.name,
      alternates: {
        canonical: encodeURI(
          `${process.env.NEXT_PUBLIC_URL}/seller/${seller.seller.id}/${seller.seller.name}`
        )
      }
    }
  } catch (error) {
    console.log("generateMetadata seller")
  }

  return {
    title: "فروشنده یافت نشد"
  }
}

const SellerIndex = async ({
  params: { slug },
  searchParams
}: SellerIndexProps) => {
  const isMobileView = CheckIsMobileView()
  const queryClient = getQueryClient()
  const session = await getServerSession(authOptions)

  const args: IndexProductInput = {}
  args["page"] =
    searchParams.page && +searchParams.page[0] > 0 ? +searchParams.page[0] : 1
  if (slug && slug.length) args["sellerId"] = +slug[0]
  if (searchParams.query && searchParams.query.length)
    args["query"] = searchParams.query as string

  if (searchParams.categoryId && searchParams.categoryId.length)
    args["categoryIds"] = Array.isArray(searchParams.categoryId)
      ? searchParams.categoryId.map((item) => +item)
      : [+searchParams.categoryId]

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
    [QUERY_FUNCTIONS_KEY.SELLER_QUERY_KEY, { id: +slug[0] }],
    () => getSellerQueryFn(+slug[0])
  )

  if (session) {
    await queryClient.prefetchQuery(
      [
        QUERY_FUNCTIONS_KEY.GET_IS_FAVORITE,
        {
          entityId: +slug[0],
          type: EntityTypeEnum.Seller
        }
      ],
      () =>
        getIsFavoriteQueryFns({
          accessToken: session?.accessToken,
          entityId: +slug[0],
          type: EntityTypeEnum.Seller
        })
    )
  }

  await queryClient.prefetchInfiniteQuery(
    [
      QUERY_FUNCTIONS_KEY.ALL_PRODUCTS_QUERY_KEY,
      {
        sellerId: +slug[0],
        categoryIds: []
      }
    ],
    () =>
      getAllProductsQueryFn({
        sellerId: +slug[0],
        categoryIds: []
      })
  )

  await queryClient.prefetchInfiniteQuery(
    [
      QUERY_FUNCTIONS_KEY.GET_BRANDS_OF_SELLER,
      {
        sellerId: +slug[0],
        page: 1
      }
    ],
    () =>
      brandsOfSellerQueryFns({
        sellerId: +slug[0],
        page: 1
      })
  )

  const dehydratedState = dehydrate(queryClient)

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <SellerProfile
        isMobileView={isMobileView}
        args={args}
        slug={slug}
        session={session}
      />
    </ReactQueryHydrate>
  )
}

export default withMobileHeader(SellerIndex, {
  hasLogo: true
  // hasFavorite: {}
  // hasShare: true
})
