"use client"

import { useQuery } from "@tanstack/react-query"
import { Session } from "next-auth"

import {
  EntityTypeEnum,
  GetBrandQuery,
  GetIsFavoriteQuery,
  IndexProductInput
} from "@/generated"

import { getBrandQueryFn } from "@core/queryFns/brandQueryFns"
import { getIsFavoriteQueryFns } from "@core/queryFns/getIsFavoriteQueryFns"
import QUERY_FUNCTIONS_KEY from "@core/queryFns/queryFunctionsKey"
import BrandOrSellerProfile from "@/app/(public)/components/BrandOrSellerProfile"

interface BrandProfile {
  isMobileView: boolean
  slug: Array<string | number>
  args: IndexProductInput
  session: Session | null
}

const BrandProfile = ({ isMobileView, args, slug, session }: BrandProfile) => {
  const query = useQuery<GetBrandQuery>(
    [QUERY_FUNCTIONS_KEY.BRAND_QUERY_KEY, { id: +slug[0] }],
    () => getBrandQueryFn(+slug[0]),
    {
      keepPreviousData: true
    }
  )

  const isFavoriteQuery = useQuery<GetIsFavoriteQuery>(
    [
      QUERY_FUNCTIONS_KEY.GET_IS_FAVORITE,
      {
        accessToken: session?.accessToken,
        entityId: +slug[0],
        type: EntityTypeEnum.Brand
      }
    ],
    () =>
      getIsFavoriteQueryFns({
        accessToken: session?.accessToken,
        entityId: +slug[0],
        type: EntityTypeEnum.Brand
      }),
    {
      keepPreviousData: true
    }
  )

  return (
    <BrandOrSellerProfile
      session={session}
      isFavoriteQuery={isFavoriteQuery}
      type={EntityTypeEnum.Brand}
      isMobileView={isMobileView}
      data={query.data?.brand}
      args={args}
      slug={slug}
    />
  )
}

export default BrandProfile
