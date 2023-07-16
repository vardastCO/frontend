import request from "graphql-request"
import { getServerSession } from "next-auth"
import { getSession } from "next-auth/react"

import { GetProductDocument, GetProductQuery } from "@/generated"

import { authOptions } from "@core/lib/authOptions"

export const getProductQueryFn = async (
  id: number
): Promise<GetProductQuery> => {
  const session =
    typeof window === "undefined"
      ? await getServerSession(authOptions)
      : await getSession()

  return await request(
    process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT as string,
    GetProductDocument,
    {
      id: +id
    },
    {
      authorization: `Bearer ${session?.user?.token}`
    }
  )
}
