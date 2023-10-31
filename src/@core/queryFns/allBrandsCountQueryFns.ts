import request from "graphql-request"

import { GetAllBrandsCountDocument, GetAllBrandsCountQuery } from "@/generated"

export const getAllBrandsCountQueryFn =
  async (): Promise<GetAllBrandsCountQuery> => {
    return await request(
      process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT as string,
      GetAllBrandsCountDocument,
      {}
    )
  }
