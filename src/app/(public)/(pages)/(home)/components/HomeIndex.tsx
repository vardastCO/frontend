"use client"

import { useMemo } from "react"
import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { Session } from "next-auth"

import {
  FileModelTypeEnum,
  GetAllBlogsQuery,
  GetAllBrandsCountQuery,
  GetAllProductsQuery,
  GetAllSellersCountQuery,
  GetBannerHomePageQuery,
  GetVocabularyQuery
} from "@/generated"

import { getAllBrandsCountQueryFn } from "@core/queryFns/allBrandsCountQueryFns"
import { getAllProductsQueryFn } from "@core/queryFns/allProductsQueryFns"
import { getAllSellersCountQueryFn } from "@core/queryFns/allSellersCountQueryFns"
import { bannerHomePageQueryFns } from "@core/queryFns/bannerHomePageQueryFns"
import { getAllBlogsQueryFn } from "@core/queryFns/getAllBlogsQueryFns"
import QUERY_FUNCTIONS_KEY from "@core/queryFns/queryFunctionsKey"
import { getVocabularyQueryFn } from "@core/queryFns/vocabularyQueryFns"
import DesktopHomeIndex from "@/app/(public)/(pages)/(home)/components/DesktopHomeIndex"
import MobileHomeIndex from "@/app/(public)/(pages)/(home)/components/MobileHomeIndex"

export type IHomeProps = {
  allProductsQuery: UseQueryResult<GetAllProductsQuery, unknown>
  homeSlidersQuery: UseQueryResult<GetBannerHomePageQuery, unknown>
  allSellersCount: UseQueryResult<GetAllSellersCountQuery>
  allBrandsCount: UseQueryResult<GetAllBrandsCountQuery>
  getVocabularyQueryFcQuery: UseQueryResult<GetVocabularyQuery>
  getAllBlogsQuery: UseQueryResult<GetAllBlogsQuery>
  session: Session | null
}

type HomeIndexProps = {
  isMobileView: boolean
  session: Session | null
}

const HomeIndex = ({ isMobileView, session }: HomeIndexProps) => {
  const allProductsQuery = useQuery<GetAllProductsQuery>(
    [
      QUERY_FUNCTIONS_KEY.ALL_PRODUCTS_QUERY_KEY,
      {
        page: 1
      }
    ],
    () =>
      getAllProductsQueryFn({
        page: 1
      }),
    {
      keepPreviousData: true,
      staleTime: 999999999
    }
  )

  const getVocabularyQueryFcQuery = useQuery<GetVocabularyQuery>({
    queryKey: [
      QUERY_FUNCTIONS_KEY.VOCABULARY_QUERY_KEY,
      { slug: "product_categories" }
    ],
    queryFn: () => getVocabularyQueryFn("product_categories"),
    keepPreviousData: true,
    staleTime: 999999999
  })

  const allBrandsCount = useQuery<GetAllBrandsCountQuery>(
    [QUERY_FUNCTIONS_KEY.GET_ALL_BRANDS_COUNT_QUERY_KEY],
    getAllBrandsCountQueryFn,
    {
      keepPreviousData: true,
      staleTime: 999999999
    }
  )

  const allSellersCount = useQuery<GetAllSellersCountQuery>(
    [QUERY_FUNCTIONS_KEY.ALL_SELLERS_COUNT_QUERY_KEY],
    getAllSellersCountQueryFn,
    {
      keepPreviousData: true,
      staleTime: 999999999
    }
  )

  const homeSlidersQuery = useQuery<GetBannerHomePageQuery>(
    [QUERY_FUNCTIONS_KEY.BANNER_HOME_PAGE_KEY, FileModelTypeEnum.Slider],
    () => bannerHomePageQueryFns({ type: FileModelTypeEnum.Slider }),
    {
      keepPreviousData: true,
      staleTime: 999999999
    }
  )

  const getAllBlogsQuery = useQuery<GetAllBlogsQuery>(
    [QUERY_FUNCTIONS_KEY.GET_ALL_BLOGS, { page: 1 }],
    () => getAllBlogsQueryFn({ page: 1 }),
    {
      keepPreviousData: true,
      staleTime: 999999999
    }
  )

  const homeProps: IHomeProps = useMemo(
    () => ({
      session,
      allProductsQuery,
      homeSlidersQuery,
      allSellersCount,
      allBrandsCount,
      getVocabularyQueryFcQuery,
      getAllBlogsQuery
    }),
    [
      allBrandsCount,
      allProductsQuery,
      allSellersCount,
      getVocabularyQueryFcQuery,
      homeSlidersQuery,
      getAllBlogsQuery,
      session
    ]
  )

  return (
    <>
      {isMobileView ? (
        <MobileHomeIndex {...homeProps} />
      ) : (
        <DesktopHomeIndex {...homeProps} />
      )}
    </>
  )
}

export default HomeIndex
