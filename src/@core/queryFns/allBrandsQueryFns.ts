import request from "graphql-request"

import {
  GetAllBrandsDocument,
  GetAllBrandsQuery,
  IndexBrandInput
} from "@/generated"

interface getAllBrandsFnArgs extends IndexBrandInput {}

export const getAllBrandsQueryFn = async ({
  page
}: getAllBrandsFnArgs = {}): Promise<GetAllBrandsQuery> => {
  // const session =
  //   typeof window === "undefined"
  //     ? await getServerSession(authOptions)
  //     : await getSession()

  return await request(
    process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT as string,
    GetAllBrandsDocument,
    {
      IndexBrandInput: {
        page
      }
    }
    // {
    //   authorization: `Bearer ${session?.accessToken}`
    // }
  )
}
