import { Metadata } from "next"
import { dehydrate } from "@tanstack/react-query"

import { IndexSellerInput } from "@/generated"

import getQueryClient from "@core/clients/getQueryClient"
import { CheckIsMobileView } from "@core/actions/checkIsMobileView"
import withMobileHeader from "@core/middlewares/withMobileHeader"
import { ReactQueryHydrate } from "@core/providers/ReactQueryHydrate"
import { getAllSellersQueryFn } from "@core/queryFns/allSellersQueryFns"
import QUERY_FUNCTIONS_KEY from "@core/queryFns/queryFunctionsKey"
import SellersPage from "@/app/(public)/(pages)/sellers/components/sellers-page"

interface SellersIndexProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "فروشندگان"
  }
}

const SellersIndex = async ({ searchParams }: SellersIndexProps) => {
  const isMobileView = CheckIsMobileView()
  const queryClient = getQueryClient()

  const args: IndexSellerInput = {}

  args["page"] =
    searchParams.page && +searchParams.page[0] > 0 ? +searchParams.page[0] : 1

  await queryClient.prefetchInfiniteQuery(
    [QUERY_FUNCTIONS_KEY.ALL_SELLERS_QUERY_KEY, args],
    () => getAllSellersQueryFn(args)
  )

  const dehydratedState = dehydrate(queryClient)

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <SellersPage limitPage={5} args={args} isMobileView={isMobileView} />
    </ReactQueryHydrate>
  )
}

export default withMobileHeader(SellersIndex, {
  title: "فروشندگان"
})
