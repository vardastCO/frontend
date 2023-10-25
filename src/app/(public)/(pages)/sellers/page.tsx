import { Metadata } from "next"
import { dehydrate } from "@tanstack/react-query"

import getQueryClient from "@core/clients/getQueryClient"
import { CheckIsMobileView } from "@core/actions/checkIsMobileView"
import withMobileHeader from "@core/middlewares/withMobileHeader"
import { ReactQueryHydrate } from "@core/providers/ReactQueryHydrate"
import { getAllSellersQueryFn } from "@core/queryFns/allSellersQueryFns"
import SellersPage from "@/app/(public)/(pages)/sellers/components/sellers-page"

interface SellersIndexProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "فروشندگان"
  }
}

const SellersIndex = async (_: SellersIndexProps) => {
  const isMobileView = CheckIsMobileView()
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(["sellers"], () => getAllSellersQueryFn())

  const dehydratedState = dehydrate(queryClient)

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <SellersPage isMobileView={isMobileView} />
    </ReactQueryHydrate>
  )
}

export default withMobileHeader(SellersIndex, {
  title: "فروشندگان"
})
