import { Metadata, ResolvingMetadata } from "next"
import { dehydrate } from "@tanstack/react-query"

import { IndexProductInput } from "@/generated"

import getQueryClient from "@core/clients/getQueryClient"
import { CheckIsMobileView } from "@core/actions/checkIsMobileView"
import { ReactQueryHydrate } from "@core/providers/ReactQueryHydrate"
import { getAllProductsQueryFn } from "@core/queryFns/allProductsQueryFns"
import { getSellerQueryFn } from "@core/queryFns/sellerQueryFns"
import SellerPage from "@/app/(public)/(pages)/seller/components/seller-page"

interface SellerIndexProps {
  params: {
    slug: Array<string | number>
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params }: SellerIndexProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
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
}

const SellerIndex = async ({
  params: { slug },
  searchParams: { query, page }
}: SellerIndexProps) => {
  const isMobileView = CheckIsMobileView()
  const queryClient = getQueryClient()

  const args: IndexProductInput = {}
  args["page"] = page && +page[0] > 0 ? +page[0] : 1
  if (slug && slug.length) args["sellerId"] = +slug[0]
  if (query && query.length) args["query"] = query as string

  await queryClient.prefetchQuery(["seller", { id: +slug[0] }], () =>
    getSellerQueryFn(+slug[0])
  )

  await queryClient.prefetchQuery(["products", args], () =>
    getAllProductsQueryFn(args)
  )

  const dehydratedState = dehydrate(queryClient)

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <SellerPage isMobileView={isMobileView} args={args} slug={slug} />
    </ReactQueryHydrate>
  )
}

export default SellerIndex
