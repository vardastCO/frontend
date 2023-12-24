import request from "graphql-request"

import {
  EntityTypeEnum,
  GetIsFavoriteDocument,
  GetIsFavoriteQuery
} from "@/generated"

export const getIsFavoriteQueryFns = async ({
  accessToken = "",
  type,
  entityId
}: {
  accessToken?: string
  type: EntityTypeEnum
  entityId: number
}): Promise<GetIsFavoriteQuery> => {
  return await request(
    process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT as string,
    GetIsFavoriteDocument,
    {
      UpdateFavoriteInput: {
        type,
        entityId
      }
    },
    {
      authorization: `Bearer ${accessToken}`
    }
  )
}
