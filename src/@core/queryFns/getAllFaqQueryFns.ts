import request from "graphql-request"

import { GetAllFaqDocument, GetAllFaqQuery } from "@/generated"

export const getAllFaqQueryFns = async (): Promise<GetAllFaqQuery> => {
  return await request(
    process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT as string,
    GetAllFaqDocument
  )
}
