import request from "graphql-request"

import {
  GetBannerHomePageDocument,
  GetBannerHomePageQuery,
  IndexBannerInput
} from "@/generated"

interface GetBannerHomePageQueryFnArgs extends IndexBannerInput {
  type: "slider" | "shortBanner"
}

export const bannerHomePageQueryFns = async (
  { type }: GetBannerHomePageQueryFnArgs = { type: "slider" }
): Promise<GetBannerHomePageQuery> => {
  return await request(
    process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT as string,
    GetBannerHomePageDocument,
    {
      indexBannerInput: {
        type
      }
    }
  )
}
