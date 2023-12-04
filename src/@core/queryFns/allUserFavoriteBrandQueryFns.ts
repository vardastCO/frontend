import request from "graphql-request"

import {
  GetUserFavoriteBrandDocument,
  GetUserFavoriteBrandQuery
} from "@/generated"

export const allUserFavoriteBrandQueryFns = async (
  accessToken = ""
): Promise<GetUserFavoriteBrandQuery> => {
  return await request(
    process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT as string,
    GetUserFavoriteBrandDocument,
    {
      type: "brand"
    },
    {
      authorization: `Bearer ${accessToken}`
    }
  )
}
