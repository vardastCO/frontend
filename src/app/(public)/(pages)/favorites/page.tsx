import { Metadata } from "next"
import { redirect } from "next/navigation"
import { dehydrate } from "@tanstack/react-query"
import { getServerSession } from "next-auth"

import { EntityTypeEnum } from "@/generated"

import getQueryClient from "@core/clients/getQueryClient"
import { authOptions } from "@core/lib/authOptions"
import withMobileHeader from "@core/middlewares/withMobileHeader"
import { ReactQueryHydrate } from "@core/providers/ReactQueryHydrate"
import { allUserFavoriteBrandsQueryFns } from "@core/queryFns/allUserFavoriteBrandsQueryFns"
import { allUserFavoriteProductsQueryFns } from "@core/queryFns/allUserFavoriteProductsQueryFns"
import { allUserFavoriteSellersQueryFns } from "@core/queryFns/allUserFavoriteSellersQueryFns"
import QUERY_FUNCTIONS_KEY from "@core/queryFns/queryFunctionsKey"
import FavoritesPageIndex from "@/app/(public)/(pages)/favorites/components/FavoritesPageIndex"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "علاقه مندی ها"
  }
}

const FavoritePage = async () => {
  const queryClient = getQueryClient()
  const session = await getServerSession(authOptions)

  await queryClient.prefetchQuery(
    [QUERY_FUNCTIONS_KEY.GET_ALL_USER_FAVORITE_PRODUCT, EntityTypeEnum.Product],
    () =>
      allUserFavoriteProductsQueryFns({
        accessToken: session?.accessToken
      })
  )

  await queryClient.prefetchQuery(
    [QUERY_FUNCTIONS_KEY.GET_ALL_USER_FAVORITE_SELLER, EntityTypeEnum.Seller],
    () =>
      allUserFavoriteSellersQueryFns({
        accessToken: session?.accessToken
      })
  )

  await queryClient.prefetchQuery(
    [QUERY_FUNCTIONS_KEY.GET_ALL_USER_FAVORITE_BRAND, EntityTypeEnum.Brand],
    () =>
      allUserFavoriteBrandsQueryFns({
        accessToken: session?.accessToken
      })
  )

  if (!session) redirect("/auth/signin")

  const dehydratedState = dehydrate(queryClient)

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <FavoritesPageIndex session={session} />
    </ReactQueryHydrate>
  )
}

export default withMobileHeader(FavoritePage, { title: "علاقه مندی ها" })
