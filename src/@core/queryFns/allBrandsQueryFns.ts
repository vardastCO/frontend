import request from "graphql-request"

import { GetAllBrandsDocument, GetAllBrandsQuery } from "@/generated"

export const getAllBrandsQueryFn = async (): Promise<GetAllBrandsQuery> => {
  // const session =
  //   typeof window === "undefined"
  //     ? await getServerSession(authOptions)
  //     : await getSession()

  return await request(
    process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT as string,
    GetAllBrandsDocument,
    {}
    // {
    //   authorization: `Bearer ${session?.accessToken}`
    // }
  )
}
