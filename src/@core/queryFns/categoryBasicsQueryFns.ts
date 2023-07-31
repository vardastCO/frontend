import request from "graphql-request"
import { getServerSession } from "next-auth"
import { getSession } from "next-auth/react"

import { GetCategoryBasicsDocument, GetCategoryBasicsQuery } from "@/generated"

import { authOptions } from "@core/lib/authOptions"

export const getCategoryBasicsQueryFn = async (
  id: number
): Promise<GetCategoryBasicsQuery> => {
  const session =
    typeof window === "undefined"
      ? await getServerSession(authOptions)
      : await getSession()

  return await request(
    process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT as string,
    GetCategoryBasicsDocument,
    {
      id: +id
    },
    {
      authorization: `Bearer ${session?.accessToken}`
    }
  )
}
