import request from "graphql-request"
import { getServerSession } from "next-auth"
import { getSession } from "next-auth/react"

import { GetVocabularyDocument, GetVocabularyQuery } from "@/generated"

import { authOptions } from "@core/lib/authOptions"

export const getVocabularyQueryFn = async (
  slug: string
): Promise<GetVocabularyQuery> => {
  const session =
    typeof window === "undefined"
      ? await getServerSession(authOptions)
      : await getSession()

  return await request(
    process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT as string,
    GetVocabularyDocument,
    {
      slug
    },
    {
      authorization: `Bearer ${session?.accessToken}`
    }
  )
}
