import { Metadata } from "next"
// import { dehydrate } from "@tanstack/react-query"
import { getServerSession } from "next-auth"

// import getQueryClient from "@core/clients/getQueryClient"
import { CheckIsMobileView } from "@core/actions/checkIsMobileView"
import { authOptions } from "@core/lib/authOptions"
// import { ReactQueryHydrate } from "@core/providers/ReactQueryHydrate"
import DesktopHomeIndex from "@/app/(public)/(pages)/(home)/components/DesktopHomeIndex"

export const metadata: Metadata = {
  title: "بازار آنلاین مصالح ساختمانی",
  description: "وردست - بازار آنلاین مصالح ساختمانی"
}

const Index = async () => {
  const isMobileView = CheckIsMobileView()
  const session = await getServerSession(authOptions)
  // // const token = session?.accessToken || null
  // const queryClient = getQueryClient()

  // await queryClient.prefetchQuery(
  //   [QUERY_FUNCTIONS_KEY.GET_ALL_BRANDS_COUNT_QUERY_KEY],
  //   getAllBrandsCountQueryFn
  // )
  // await queryClient.prefetchQuery(
  //   [QUERY_FUNCTIONS_KEY.ALL_SELLERS_COUNT_QUERY_KEY],
  //   getAllSellersCountQueryFn
  // )

  // await queryClient.prefetchInfiniteQuery(
  //   [
  //     QUERY_FUNCTIONS_KEY.ALL_PRODUCTS_QUERY_KEY,
  //     {
  //       page: 1
  //     }
  //   ],
  //   () =>
  //     getAllProductsQueryFn({
  //       page: 1
  //     })
  // )

  // await queryClient.prefetchQuery(
  //   [QUERY_FUNCTIONS_KEY.BANNER_HOME_PAGE_KEY, FileModelTypeEnum.Slider],
  //   () => bannerHomePageQueryFns({ type: FileModelTypeEnum.Slider })
  // )

  // await queryClient.prefetchQuery(
  //   [QUERY_FUNCTIONS_KEY.BANNER_HOME_PAGE_KEY, FileModelTypeEnum.ShortBanner],
  //   () => bannerHomePageQueryFns({ type: FileModelTypeEnum.ShortBanner })
  // )

  // await queryClient.prefetchQuery(
  //   [QUERY_FUNCTIONS_KEY.BANNER_HOME_PAGE_KEY, FileModelTypeEnum.LongBanner],
  //   () => bannerHomePageQueryFns({ type: FileModelTypeEnum.LongBanner })
  // )

  // await queryClient.prefetchQuery({
  //   queryKey: [
  //     QUERY_FUNCTIONS_KEY.VOCABULARY_QUERY_KEY,
  //     { slug: "product_categories" }
  //   ],
  //   queryFn: () => getVocabularyQueryFn("product_categories")
  // })

  // const dehydratedState = dehydrate(queryClient)
  return (
    <DesktopHomeIndex session={session} isMobileView={isMobileView} />
    // <ReactQueryHydrate state={dehydratedState}>
    //   {/* {isMobileView ? (
    //     <MobileHomeIndex />
    //   ) : ( */}
    //   {/* )} */}
    // // </ReactQueryHydrate>
  )
}

export default Index
