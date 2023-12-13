"use client"

import { useQuery } from "@tanstack/react-query"

import { GetSellerQuery, IndexProductInput } from "@/generated"

import QUERY_FUNCTIONS_KEY from "@core/queryFns/queryFunctionsKey"
import { getSellerQueryFn } from "@core/queryFns/sellerQueryFns"
import BrandOrSellerProfile, {
  BrandOrSellerEnum
} from "@/app/(public)/components/BrandOrSellerProfile"

interface SellerProfile {
  isMobileView: boolean
  slug: Array<string | number>
  args: IndexProductInput
}

const SellerProfile = ({ isMobileView, args, slug }: SellerProfile) => {
  const query = useQuery<GetSellerQuery>(
    [QUERY_FUNCTIONS_KEY.SELLER_QUERY_KEY, { id: +slug[0] }],
    () => getSellerQueryFn(+slug[0]),
    {
      keepPreviousData: true
    }
  )

  return (
    <BrandOrSellerProfile
      type={BrandOrSellerEnum.SELLER}
      isMobileView={isMobileView}
      data={query.data?.seller}
      args={args}
      slug={slug}
    />
  )
}

export default SellerProfile
