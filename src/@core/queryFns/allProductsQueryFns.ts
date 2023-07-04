import request from "graphql-request"
import { getServerSession } from "next-auth"
import { getSession } from "next-auth/react"

import { GetAllProductsDocument, Product } from "@/generated"

import { authOptions } from "@core/lib/authOptions"

type getAllProductsQueryFnArgs = {
  take?: number
  categoryId?: number
}

export const getAllProductsQueryFn = async ({
  take = 20,
  categoryId
}: getAllProductsQueryFnArgs = {}): Promise<{
  products: Product[]
}> => {
  const session =
    typeof window === "undefined"
      ? await getServerSession(authOptions)
      : await getSession()

  return await request(
    process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT as string,
    GetAllProductsDocument,
    {
      indexProductInput: {
        take,
        categoryId: categoryId || null
      }
    },
    {
      authorization: `Bearer ${session?.user?.token}`
    }
  )
}
