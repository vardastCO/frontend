import request from "graphql-request"
import { getServerSession } from "next-auth"
import { getSession } from "next-auth/react"

import {
  GetAllProductsDocument,
  GetAllProductsQuery,
  IndexProductInput
} from "@/generated"

import { authOptions } from "@core/lib/authOptions"

interface getAllProductsQueryFnArgs extends IndexProductInput {}

export const getAllProductsQueryFn = async ({
  page,
  categoryId
}: getAllProductsQueryFnArgs = {}): Promise<GetAllProductsQuery> => {
  const session =
    typeof window === "undefined"
      ? await getServerSession(authOptions)
      : await getSession()

  return await request(
    process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT as string,
    GetAllProductsDocument,
    {
      indexProductInput: {
        page,
        categoryId: categoryId || null
      }
    },
    {
      authorization: `Bearer ${session?.user?.token}`
    }
  )
}
