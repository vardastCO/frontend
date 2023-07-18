import { Metadata, ResolvingMetadata } from "next"
import { dehydrate } from "@tanstack/react-query"

import { IndexProductInput } from "@/generated"

import getQueryClient from "@core/clients/getQueryClient"
import { CheckIsMobileView } from "@core/actions/checkIsMobileView"
import { ReactQueryHydrate } from "@core/providers/ReactQueryHydrate"
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
  { params }: BrandIndexProps,
  parent: ResolvingMetadata
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
  searchParams: { page, query }
}: BrandIndexProps) => {
  const isMobileView = CheckIsMobileView()
  const queryClient = getQueryClient()

  const args: IndexProductInput = {}
  args["page"] = page && +page[0] > 0 ? +page[0] : 1
  if (slug && slug.length) args["brandId"] = +slug[0]
  if (query && query.length) args["query"] = query as string

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

export default BrandIndex
