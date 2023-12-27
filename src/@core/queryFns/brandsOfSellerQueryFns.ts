import request from "graphql-request"

import {
  GetBrandsOfSellerDocument,
  GetBrandsOfSellerQuery,
  IndexSellerBrandInput
} from "@/generated"

interface getAllBrandsOfSellerFnArgs extends IndexSellerBrandInput {}
export const brandsOfSellerQueryFns = async ({
  sellerId,
  page
}: getAllBrandsOfSellerFnArgs): Promise<GetBrandsOfSellerQuery> => {
  return await request(
    process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT as string,
    GetBrandsOfSellerDocument,
    {
      indexSellerBrandInput: {
        sellerId,
        page
      }
    }
  )
}
