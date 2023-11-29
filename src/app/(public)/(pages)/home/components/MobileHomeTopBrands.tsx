"use client"

import { UseQueryResult } from "@tanstack/react-query"

import { GetAllBrandsCountQuery } from "@/generated"

import MobileHomeImage from "@/app/(public)/(pages)/home/components/MobileHomeImage"
import MobileHomeSection from "@/app/(public)/(pages)/home/components/MobileHomeSection"

type Props = {
  allBrandsCount: UseQueryResult<GetAllBrandsCountQuery, unknown>
}

const MobileHomeTopBrands = ({ allBrandsCount }: Props) => {
  return (
    <MobileHomeSection
      height="EIGHTY_EIGHT"
      itemsCount="THREE"
      title="برترین برندها"
    >
      <MobileHomeImage
        images={
          allBrandsCount.data?.brands.data
            .filter((_, index) => index <= 8)
            .map((brand) => ({
              url: brand?.logoFile?.presignedUrl.url || "/images/1.1.png",
              id: brand?.logoFile?.id ? String(brand?.logoFile?.id) : "8"
            })) || []
        }
      />
    </MobileHomeSection>
  )
}

export default MobileHomeTopBrands
