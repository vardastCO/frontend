import request from "graphql-request"

import {
  GetBannerHomePageDocument,
  GetBannerHomePageQuery,
  IndexBannerInput
} from "@/generated"

interface GetBannerHomePageQueryFnArgs extends IndexBannerInput {}

export const bannerHomePageQueryFns = async ({
  type
}: GetBannerHomePageQueryFnArgs): Promise<GetBannerHomePageQuery> => {
  return await request(
    process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT as string,
    GetBannerHomePageDocument,
    {
      IndexBannerInput: {
        type
      }
    }
  )
}
