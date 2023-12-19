import { Metadata } from "next"
import { dehydrate } from "@tanstack/react-query"
import { getServerSession } from "next-auth"

import { FileModelTypeEnum } from "@/generated"

import getQueryClient from "@core/clients/getQueryClient"
import { CheckIsMobileView } from "@core/actions/checkIsMobileView"
import { authOptions } from "@core/lib/authOptions"
import withMobileHeader from "@core/middlewares/withMobileHeader"
import { ReactQueryHydrate } from "@core/providers/ReactQueryHydrate"
import { getAllBrandsCountQueryFn } from "@core/queryFns/allBrandsCountQueryFns"
import { getAllProductsQueryFn } from "@core/queryFns/allProductsQueryFns"
import { getAllSellersCountQueryFn } from "@core/queryFns/allSellersCountQueryFns"
import { bannerHomePageQueryFns } from "@core/queryFns/bannerHomePageQueryFns"
import QUERY_FUNCTIONS_KEY from "@core/queryFns/queryFunctionsKey"
import { getVocabularyQueryFn } from "@core/queryFns/vocabularyQueryFns"
import DesktopHomeIndex from "@/app/(public)/(pages)/(home)/components/DesktopHomeIndex"
import MobileHomeIndex from "@/app/(public)/(pages)/(home)/components/MobileHomeIndex"

export const metadata: Metadata = {
  title: "بازار آنلاین مصالح ساختمانی",
  description: process.env.NEXT_PUBLIC_SLOGAN
}

const Index = async () => {
  const isMobileView = CheckIsMobileView()
  const session = await getServerSession(authOptions)
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(
    [QUERY_FUNCTIONS_KEY.GET_ALL_BRANDS_COUNT_QUERY_KEY],
    getAllBrandsCountQueryFn
  )
  await queryClient.prefetchQuery(
    [QUERY_FUNCTIONS_KEY.ALL_SELLERS_COUNT_QUERY_KEY],
    getAllSellersCountQueryFn
  )

  await queryClient.prefetchQuery(
    [
      QUERY_FUNCTIONS_KEY.ALL_PRODUCTS_QUERY_KEY,
      {
        page: 1
      }
    ],
    () =>
      getAllProductsQueryFn({
        page: 1
      })
  )

  await queryClient.prefetchQuery(
    [QUERY_FUNCTIONS_KEY.BANNER_HOME_PAGE_KEY, FileModelTypeEnum.Slider],
    () => bannerHomePageQueryFns({ type: FileModelTypeEnum.Slider })
  )

  await queryClient.prefetchQuery({
    queryKey: [
      QUERY_FUNCTIONS_KEY.VOCABULARY_QUERY_KEY,
      { slug: "product_categories" }
    ],
    queryFn: () => getVocabularyQueryFn("product_categories")
  })

  const dehydratedState = dehydrate(queryClient)
  return (
    <ReactQueryHydrate state={dehydratedState}>
      <h1 className="hidden">{process.env.NEXT_PUBLIC_SLOGAN}</h1>
      {isMobileView ? (
        <MobileHomeIndex />
      ) : (
        <DesktopHomeIndex session={session} isMobileView={isMobileView} />
      )}
    </ReactQueryHydrate>
  )
}

export default withMobileHeader(Index, {
  hasLogo: true
})
