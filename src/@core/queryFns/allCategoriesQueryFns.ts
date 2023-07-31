import request from "graphql-request"
import { getServerSession } from "next-auth"
import { getSession } from "next-auth/react"

import {
  GetAllCategoriesDocument,
  GetAllCategoriesQuery,
  IndexCategoryInput
} from "@/generated"

import { authOptions } from "@core/lib/authOptions"

export const getAllCategoriesQueryFn = async ({
  brandId,
  sellerId
}: IndexCategoryInput = {}): Promise<GetAllCategoriesQuery> => {
  const session =
    typeof window === "undefined"
      ? await getServerSession(authOptions)
      : await getSession()

  return await request(
    process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT as string,
    GetAllCategoriesDocument,
    {
      indexCategoryInput: {
        brandId,
        sellerId
      }
    },
    {
      authorization: `Bearer ${session?.accessToken}`
    }
  )
}
