import request from "graphql-request"

import {
  GetAllSellersCountDocument,
  GetAllSellersCountQuery
} from "@/generated"

export const getAllSellersCountQueryFn =
  async (): Promise<GetAllSellersCountQuery> => {
    return await request(
      process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT as string,
      GetAllSellersCountDocument,
      {}
    )
  }
