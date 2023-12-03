import { Metadata } from "next"
import { dehydrate } from "@tanstack/react-query"
import { getServerSession } from "next-auth"

import getQueryClient from "@core/clients/getQueryClient"
import { authOptions } from "@core/lib/authOptions"
import withMobileHeader from "@core/middlewares/withMobileHeader"
import { ReactQueryHydrate } from "@core/providers/ReactQueryHydrate"
import { getAllProductsQueryFn } from "@core/queryFns/allProductsQueryFns"
import QUERY_FUNCTIONS_KEY from "@core/queryFns/queryFunctionsKey"

import ProfileIndex from "./components"

// set dynamic metadata
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "حساب کاربری"
  }
}

const ProfilePage = async () => {
  const session = await getServerSession(authOptions)
  const queryClient = getQueryClient()

  if (!!session) {
    await queryClient.prefetchInfiniteQuery(
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
  }

  const dehydratedState = dehydrate(queryClient)

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <ProfileIndex session={session} />
    </ReactQueryHydrate>
  )
}

export default withMobileHeader(ProfilePage, { title: "حساب کاربری" })
