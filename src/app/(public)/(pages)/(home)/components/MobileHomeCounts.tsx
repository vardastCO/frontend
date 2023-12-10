import { digitsEnToFa } from "@persian-tools/persian-tools"
import { UseQueryResult } from "@tanstack/react-query"

import { GetBannerHomePageQuery } from "@/generated"

import MobileHomeImage from "@/app/(public)/(pages)/(home)/components/MobileHomeImage"
import MobileHomeSection from "@/app/(public)/(pages)/(home)/components/MobileHomeSection"

// const _images = [
//   {
//     url: "/images/1.1.png",
//     id: "0"
//   },
//   {
//     url: "/images/1.1.png",
//     id: "1"
//   }
// ]

const MobileHomeCounts = ({
  query,
  counts
}: {
  query: UseQueryResult<GetBannerHomePageQuery, unknown>
  counts: {
    brands?: number
    sellers?: number
  }
}) => {
  return (
    <MobileHomeSection height="FORTY_SIX" itemsCount="TWO">
      <MobileHomeImage
        images={
          query.data?.getBannerHomePage.map(
            ({ id, presignedUrl, originalName }) => ({
              url: presignedUrl.url || "/images/5.2.png",
              id: id ? String(id) : "0",
              Title: (
                <div className="flex flex-col items-center pt font-semibold text-alpha-white">
                  {originalName === "sellers.png" ? (
                    <>
                      <h4>فروشندگان:</h4>
                      <h4>
                        {counts?.sellers ? digitsEnToFa(counts.sellers) : ""}
                      </h4>
                    </>
                  ) : (
                    <>
                      <h4>برندها:</h4>
                      <h4>
                        {counts?.brands ? digitsEnToFa(counts.brands) : ""}
                      </h4>
                    </>
                  )}
                </div>
              )
            })
          ) || []
        }
      />
    </MobileHomeSection>
  )
}

export default MobileHomeCounts
