import request from "graphql-request"
import { getServerSession } from "next-auth"
import { getSession } from "next-auth/react"

import { GetProductBasicsDocument, GetProductBasicsQuery } from "@/generated"

import { authOptions } from "@core/lib/authOptions"

export const getProductBasicsQueryFn = async (
  id: number
): Promise<GetProductBasicsQuery> => {
  const session =
    typeof window === "undefined"
      ? await getServerSession(authOptions)
      : await getSession()

  return await request(
    process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT as string,
    GetProductBasicsDocument,
    {
      id: +id
    },
    {
      authorization: `Bearer ${session?.accessToken}`
    }
  )
}
