import request from "graphql-request"

import {
  GetUserFavoriteSellerDocument,
  GetUserFavoriteSellerQuery
} from "@/generated"

export const allUserFavoriteSellerQueryFns = async (
  accessToken = ""
): Promise<GetUserFavoriteSellerQuery> => {
  return await request(
    process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT as string,
    GetUserFavoriteSellerDocument,
    {
      type: "seller"
    },
    {
      authorization: `Bearer ${accessToken}`
    }
  )
}
