import request from "graphql-request"

import {
  EntityTypeEnum,
  GetUserFavoriteProductsDocument,
  GetUserFavoriteProductsQuery
} from "@/generated"

export const allUserFavoriteProductsQueryFns = async ({
  accessToken = ""
}): Promise<GetUserFavoriteProductsQuery> => {
  return await request(
    process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT as string,
    GetUserFavoriteProductsDocument,
    {
      favoritesInput: {
        type: EntityTypeEnum.Product
      }
    },
    {
      authorization: `Bearer ${accessToken}`
    }
  )
}
