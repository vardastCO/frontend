import request from "graphql-request"
import { getServerSession } from "next-auth"
import { getSession } from "next-auth/react"

import { GetAllBrandsDocument, GetAllBrandsQuery } from "@/generated"

import { authOptions } from "@core/lib/authOptions"

export const getAllBrandsQueryFn = async (): Promise<GetAllBrandsQuery> => {
  const session =
    typeof window === "undefined"
      ? await getServerSession(authOptions)
      : await getSession()

  return await request(
    process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT as string,
    GetAllBrandsDocument,
    {},
    {
      authorization: `Bearer ${session?.user?.token}`
    }
  )
}
