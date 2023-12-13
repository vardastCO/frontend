import { Metadata } from "next"
import { dehydrate } from "@tanstack/react-query"

import { IndexBrandInput } from "@/generated"

import getQueryClient from "@core/clients/getQueryClient"
import { CheckIsMobileView } from "@core/actions/checkIsMobileView"
import withMobileHeader from "@core/middlewares/withMobileHeader"
import { ReactQueryHydrate } from "@core/providers/ReactQueryHydrate"
import { getAllBrandsQueryFn } from "@core/queryFns/allBrandsQueryFns"
import QUERY_FUNCTIONS_KEY from "@core/queryFns/queryFunctionsKey"
import BrandsPage from "@/app/(public)/(pages)/brands/components/brands-page"

interface BrandsIndexProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "برندها"
  }
}

const BrandsIndex = async ({ searchParams }: BrandsIndexProps) => {
  const isMobileView = CheckIsMobileView()
  const queryClient = getQueryClient()

  const args: IndexBrandInput = {}

  args["page"] =
    searchParams.page && +searchParams.page[0] > 0 ? +searchParams.page[0] : 1

  await queryClient.prefetchInfiniteQuery(
    [QUERY_FUNCTIONS_KEY.GET_ALL_BRANDS_QUERY_KEY, args],
    () => getAllBrandsQueryFn(args)
  )

  const dehydratedState = dehydrate(queryClient)

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <BrandsPage limitPage={5} args={args} isMobileView={isMobileView} />
    </ReactQueryHydrate>
  )
}

export default withMobileHeader(BrandsIndex, {
  title: "برندها"
})
