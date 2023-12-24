"use client"

import { useQuery } from "@tanstack/react-query"
import { Session } from "next-auth"

import {
  EntityTypeEnum,
  GetIsFavoriteQuery,
  GetSellerQuery,
  IndexProductInput
} from "@/generated"

import { getIsFavoriteQueryFns } from "@core/queryFns/getIsFavoriteQueryFns"
import QUERY_FUNCTIONS_KEY from "@core/queryFns/queryFunctionsKey"
import { getSellerQueryFn } from "@core/queryFns/sellerQueryFns"
import BrandOrSellerProfile from "@/app/(public)/components/BrandOrSellerProfile"

interface SellerProfile {
  isMobileView: boolean
  session: Session | null
  slug: Array<string | number>
  args: IndexProductInput
}

const SellerProfile = ({
  isMobileView,
  args,
  slug,
  session
}: SellerProfile) => {
  const query = useQuery<GetSellerQuery>(
    [QUERY_FUNCTIONS_KEY.SELLER_QUERY_KEY, { id: +slug[0] }],
    () => getSellerQueryFn(+slug[0]),
    {
      keepPreviousData: true
    }
  )

  const isFavoriteQuery = useQuery<GetIsFavoriteQuery>(
    [
      QUERY_FUNCTIONS_KEY.GET_IS_FAVORITE,
      { entityId: +slug[0], type: EntityTypeEnum.Seller }
    ],
    () =>
      getIsFavoriteQueryFns({
        accessToken: session?.accessToken,
        entityId: +slug[0],
        type: EntityTypeEnum.Seller
      }),
    {
      keepPreviousData: true
    }
  )

  return (
    <BrandOrSellerProfile
      isFavoriteQuery={isFavoriteQuery}
      type={EntityTypeEnum.Seller}
      isMobileView={isMobileView}
      data={query.data?.seller}
      args={args}
      slug={slug}
    />
  )
}

export default SellerProfile
