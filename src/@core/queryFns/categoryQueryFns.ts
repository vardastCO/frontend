import request from "graphql-request"
import { getServerSession } from "next-auth"
import { getSession } from "next-auth/react"

import { Category, GetCategoryDocument } from "@/generated"

import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export const getCategoryQueryFn = async (
  id: number
): Promise<{ category: Category }> => {
  const session =
    typeof window === "undefined"
      ? await getServerSession(authOptions)
      : await getSession()

  return await request(
    process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT as string,
    GetCategoryDocument,
    {
      id: +id
    },
    {
      authorization: `Bearer ${session?.user?.token}`
    }
  )
}
