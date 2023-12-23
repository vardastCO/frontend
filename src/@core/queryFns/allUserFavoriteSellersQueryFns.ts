import request from "graphql-request"

import {
  EntityTypeEnum,
  GetUserFavoriteSellersDocument,
  GetUserFavoriteSellersQuery
} from "@/generated"

export const allUserFavoriteSellersQueryFns = async ({
  accessToken = ""
}): Promise<GetUserFavoriteSellersQuery> => {
  return await request(
    process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT as string,
    GetUserFavoriteSellersDocument,
    {
      favoritesInput: {
        type: EntityTypeEnum.Seller
      }
    },
    {
      authorization: `Bearer ${accessToken}`
    }
  )
}
