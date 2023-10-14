import request from "graphql-request"

// import { getServerSession } from "next-auth"
// import { getSession } from "next-auth/react"

import { GetAllSellersDocument, GetAllSellersQuery } from "@/generated"

// import { authOptions } from "@core/lib/authOptions"

export const getAllSellersQueryFn = async (): Promise<GetAllSellersQuery> => {
  // const session =
  //   typeof window === "undefined"
  //     ? await getServerSession(authOptions)
  //     : await getSession()

  return await request(
    process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT as string,
    GetAllSellersDocument,
    {}
    // {
    //   authorization: `Bearer ${session?.accessToken}`
    // }
  )
}
