import request from "graphql-request"

// import { getServerSession } from "next-auth"
// import { getSession } from "next-auth/react"

import {
  GetAllSellersDocument,
  GetAllSellersQuery,
  IndexSellerInput
} from "@/generated"

interface getAllSellersFnArgs extends IndexSellerInput {}

// import { authOptions } from "@core/lib/authOptions"

export const getAllSellersQueryFn = async ({
  page
}: getAllSellersFnArgs = {}): Promise<GetAllSellersQuery> => {
  // const session =
  //   typeof window === "undefined"
  //     ? await getServerSession(authOptions)
  //     : await getSession()

  return await request(
    process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT as string,
    GetAllSellersDocument,
    {
      indexSellerInput: {
        page
      }
    }
    // {
    //   authorization: `Bearer ${session?.accessToken}`
    // }
  )
}
