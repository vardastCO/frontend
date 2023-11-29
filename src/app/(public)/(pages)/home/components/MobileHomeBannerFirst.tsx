import { UseQueryResult } from "@tanstack/react-query"

import { GetBannerHomePageQuery } from "@/generated"

import MobileHomeImage from "@/app/(public)/(pages)/home/components/MobileHomeImage"
import MobileHomeSection from "@/app/(public)/(pages)/home/components/MobileHomeSection"

const MobileHomeBannerFirst = ({
  homeShortBannerQuery,
  turn = 0
}: {
  homeShortBannerQuery: UseQueryResult<GetBannerHomePageQuery, unknown>
  turn: number
}) => {
  return (
    <MobileHomeSection height="THIRTY_FOUR">
      <MobileHomeImage
        images={
          homeShortBannerQuery.data?.getBannerHomePage
            .filter((_, index) => index === turn)
            .map(({ id, presignedUrl }) => ({
              url: presignedUrl.url || "/images/5.2.png",
              id: id ? String(id) : "0"
            })) || []
        }
      />
    </MobileHomeSection>
  )
}

export default MobileHomeBannerFirst
