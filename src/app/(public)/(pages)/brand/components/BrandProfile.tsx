"use client"

import { useQuery } from "@tanstack/react-query"

import { GetBrandQuery, IndexProductInput } from "@/generated"

import { getBrandQueryFn } from "@core/queryFns/brandQueryFns"
import QUERY_FUNCTIONS_KEY from "@core/queryFns/queryFunctionsKey"
import BrandOrSellerProfile, {
  BrandOrSellerEnum
} from "@/app/(public)/components/BrandOrSellerProfile"

interface BrandProfile {
  isMobileView: boolean
  slug: Array<string | number>
  args: IndexProductInput
}

const BrandProfile = ({ isMobileView, args, slug }: BrandProfile) => {
  const query = useQuery<GetBrandQuery>(
    [QUERY_FUNCTIONS_KEY.BRAND_QUERY_KEY, { id: +slug[0] }],
    () => getBrandQueryFn(+slug[0]),
    {
      keepPreviousData: true
    }
  )

  return (
    <BrandOrSellerProfile
      type={BrandOrSellerEnum.BRAND}
      isMobileView={isMobileView}
      data={query.data?.brand}
      args={args}
      slug={slug}
    />
  )
}

export default BrandProfile
