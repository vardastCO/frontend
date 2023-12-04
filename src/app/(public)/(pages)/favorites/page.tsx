import { Metadata } from "next"
import { redirect } from "next/navigation"
import { dehydrate } from "@tanstack/react-query"
import { getServerSession } from "next-auth"

import getQueryClient from "@core/clients/getQueryClient"
import { CheckIsMobileView } from "@core/actions/checkIsMobileView"
import { authOptions } from "@core/lib/authOptions"
import withMobileHeader from "@core/middlewares/withMobileHeader"
import { ReactQueryHydrate } from "@core/providers/ReactQueryHydrate"
import { allUserFavoriteBrandQueryFns } from "@core/queryFns/allUserFavoriteBrandQueryFns"
import { allUserFavoriteProductQueryFns } from "@core/queryFns/allUserFavoriteProductQueryFns"
import { allUserFavoriteSellerQueryFns } from "@core/queryFns/allUserFavoriteSellerQueryFns"
import QUERY_FUNCTIONS_KEY from "@core/queryFns/queryFunctionsKey"
import FavoritesPageIndex from "@/app/(public)/(pages)/favorites/components/FavoritesPageIndex"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "علاقه مندی ها"
  }
}

const FavoritePage = async () => {
  const isMobileView = CheckIsMobileView()
  const queryClient = getQueryClient()
  const session = await getServerSession(authOptions)

  await queryClient.prefetchQuery(
    [QUERY_FUNCTIONS_KEY.GET_ALL_USER_FAVORITE_PRODUCT],
    () => allUserFavoriteProductQueryFns(session?.accessToken)
  )

  await queryClient.prefetchQuery(
    [QUERY_FUNCTIONS_KEY.GET_ALL_USER_FAVORITE_SELLER],
    () => allUserFavoriteSellerQueryFns(session?.accessToken)
  )

  await queryClient.prefetchQuery(
    [QUERY_FUNCTIONS_KEY.GET_ALL_USER_FAVORITE_BRAND],
    () => allUserFavoriteBrandQueryFns(session?.accessToken)
  )

  if (!isMobileView) {
    redirect("/home")
  }

  if (!session) redirect("/auth/signin")

  const dehydratedState = dehydrate(queryClient)

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <FavoritesPageIndex session={session} />
    </ReactQueryHydrate>
  )
}

export default withMobileHeader(FavoritePage, { title: "علاقه مندی ها" })
