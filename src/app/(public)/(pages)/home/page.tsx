import { Metadata } from "next"
import { dehydrate } from "@tanstack/react-query"
import { getServerSession } from "next-auth"

import getQueryClient from "@core/clients/getQueryClient"
import { CheckIsMobileView } from "@core/actions/checkIsMobileView"
import { authOptions } from "@core/lib/authOptions"
import { ReactQueryHydrate } from "@core/providers/ReactQueryHydrate"
import { getAllBrandsCountQueryFn } from "@core/queryFns/allBrandsCountQueryFns"
import { getAllSellersCountQueryFn } from "@core/queryFns/allSellersCountQueryFns"
import HomeIndex from "@/app/(public)/(pages)/home/components/HomeIndex"
import FrontPageHeader from "@/app/(public)/components/front-page-header"

export const metadata: Metadata = {
  title: "بازار آنلاین مصالح ساختمانی",
  description: "وردست - بازار آنلاین مصالح ساختمانی"
}

const Index = async () => {
  const isMobileView = CheckIsMobileView()
  const session = await getServerSession(authOptions)
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(["brands-count"], getAllBrandsCountQueryFn)
  await queryClient.prefetchQuery(["sellers-count"], getAllSellersCountQueryFn)

  const dehydratedState = dehydrate(queryClient)
  return (
    <ReactQueryHydrate state={dehydratedState}>
      {!isMobileView && <FrontPageHeader session={session} />}
      <HomeIndex isMobileView={isMobileView} />
    </ReactQueryHydrate>
  )
}

export default Index
