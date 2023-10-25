import { Metadata } from "next"
import { dehydrate } from "@tanstack/react-query"

import { IndexProductInput, ProductSortablesEnum } from "@/generated"

import getQueryClient from "@core/clients/getQueryClient"
import { CheckIsMobileView } from "@core/actions/checkIsMobileView"
import withMobileHeader from "@core/middlewares/withMobileHeader"
import { ReactQueryHydrate } from "@core/providers/ReactQueryHydrate"
import { getAllCategoriesQueryFn } from "@core/queryFns/allCategoriesQueryFns"
import { getAllProductsQueryFn } from "@core/queryFns/allProductsQueryFns"
import { getBrandQueryFn } from "@core/queryFns/brandQueryFns"
import BrandPage from "@/app/(public)/(pages)/brand/components/brand-page"

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
}

const BrandIndex = async ({
  params: { slug },
  searchParams
}: BrandIndexProps) => {
  const isMobileView = CheckIsMobileView()
  const queryClient = getQueryClient()

  const args: IndexProductInput = {}
  args["page"] =
    searchParams.page && +searchParams.page[0] > 0 ? +searchParams.page[0] : 1
  if (slug && slug.length) args["brandId"] = +slug[0]
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

  await queryClient.prefetchQuery(["categories", { brandId: +slug[0] }], () =>
    getAllCategoriesQueryFn({ brandId: +slug[0] })
  )

  await queryClient.prefetchQuery(["brand", { id: +slug[0] }], () =>
    getBrandQueryFn(+slug[0])
  )

  await queryClient.prefetchQuery(["products", args], () =>
    getAllProductsQueryFn(args)
  )

  const dehydratedState = dehydrate(queryClient)

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <BrandPage isMobileView={isMobileView} args={args} slug={slug} />
    </ReactQueryHydrate>
  )
}

export default withMobileHeader(BrandIndex, {
  shareIcon: {}
})
