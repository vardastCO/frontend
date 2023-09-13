import { Metadata } from "next"
import { dehydrate } from "@tanstack/react-query"

import getQueryClient from "@core/clients/getQueryClient"
import { CheckIsMobileView } from "@core/actions/checkIsMobileView"
import { ReactQueryHydrate } from "@core/providers/ReactQueryHydrate"
import { getAllBrandsQueryFn } from "@core/queryFns/allBrandsQueryFns"
import BrandsPage from "@/app/(public)/(pages)/brands/components/brands-page"

interface BrandsIndexProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "تولید کننده‌ها"
  }
}

const BrandsIndex = async (_: BrandsIndexProps) => {
  const isMobileView = CheckIsMobileView()
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(["brands"], () => getAllBrandsQueryFn())

  const dehydratedState = dehydrate(queryClient)

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <BrandsPage isMobileView={isMobileView} />
    </ReactQueryHydrate>
  )
}

export default BrandsIndex
