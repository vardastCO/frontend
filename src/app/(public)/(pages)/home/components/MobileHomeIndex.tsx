"use client"

import { useInfiniteQuery, useQuery } from "@tanstack/react-query"

import {
  Category,
  GetAllBrandsCountQuery,
  GetAllProductsQuery,
  GetBannerHomePageQuery,
  GetVocabularyQuery,
  Product
} from "@/generated"

import { getAllBrandsCountQueryFn } from "@core/queryFns/allBrandsCountQueryFns"
import { getAllProductsQueryFn } from "@core/queryFns/allProductsQueryFns"
import { bannerHomePageQueryFns } from "@core/queryFns/bannerHomePageQueryFns"
import QUERY_FUNCTIONS_KEY from "@core/queryFns/queryFunctionsKey"
import { getVocabularyQueryFn } from "@core/queryFns/vocabularyQueryFns"
import MobileHomeBannerFirst from "@/app/(public)/(pages)/home/components/MobileHomeBannerFirst"
import MobileHomeCategory from "@/app/(public)/(pages)/home/components/MobileHomeCategory"
import MobileHomeMostSellProducts from "@/app/(public)/(pages)/home/components/MobileHomeMostSellProducts"
import MobileHomeNewestProducts from "@/app/(public)/(pages)/home/components/MobileHomeNewestProducts"
import MobileHomeSlider from "@/app/(public)/(pages)/home/components/MobileHomeSlider"
import MobileHomeTopBrands from "@/app/(public)/(pages)/home/components/MobileHomeTopBrands"

const MobileHomeIndex = () => {
  const allProductsQuery = useInfiniteQuery<GetAllProductsQuery>(
    [
      QUERY_FUNCTIONS_KEY.ALL_PRODUCTS_QUERY_KEY,
      {
        page: 1
      }
    ],
    ({ pageParam = 1 }) =>
      getAllProductsQueryFn({
        page: pageParam
      }),
    {
      keepPreviousData: true,
      getNextPageParam(lastPage, allPages) {
        return lastPage.products.currentPage < lastPage.products.lastPage
          ? allPages.length + 1
          : undefined
      }
    }
  )

  const getVocabularyQueryFcQuery = useQuery<GetVocabularyQuery>({
    queryKey: [
      QUERY_FUNCTIONS_KEY.VOCABULARY_QUERY_KEY,
      { slug: "product_categories" }
    ],
    queryFn: () => getVocabularyQueryFn("product_categories")
  })

  const allBrandsCount = useQuery<GetAllBrandsCountQuery>(
    [QUERY_FUNCTIONS_KEY.GET_ALL_BRANDS_COUNT_QUERY_KEY],
    getAllBrandsCountQueryFn,
    {
      keepPreviousData: true
    }
  )

  const homeSlidersQuery = useQuery<GetBannerHomePageQuery>(
    [QUERY_FUNCTIONS_KEY.BANNER_HOME_PAGE_KEY, "slider"],
    () => bannerHomePageQueryFns({ type: "slider" }),
    {
      keepPreviousData: true,
      staleTime: 999999999
    }
  )

  const homeShortBannerQuery = useQuery<GetBannerHomePageQuery>(
    [QUERY_FUNCTIONS_KEY.BANNER_HOME_PAGE_KEY, "shortBanner"],
    () => bannerHomePageQueryFns({ type: "shortBanner" }),
    {
      keepPreviousData: true,
      staleTime: 999999999
    }
  )

  return (
    <>
      <MobileHomeSlider homeSlidersQuery={homeSlidersQuery} />
      {/* <MobileHomeBanner /> */}
      <MobileHomeCategory
        categories={
          getVocabularyQueryFcQuery.data?.vocabulary.categories as Category[]
        }
      />
      <MobileHomeMostSellProducts
        products={allProductsQuery.data?.pages[0].products.data as Product[]}
      />
      <MobileHomeBannerFirst
        turn={0}
        homeShortBannerQuery={homeShortBannerQuery}
      />
      <MobileHomeTopBrands allBrandsCount={allBrandsCount} />
      <MobileHomeBannerFirst
        turn={1}
        homeShortBannerQuery={homeShortBannerQuery}
      />
      <MobileHomeBannerFirst
        turn={2}
        homeShortBannerQuery={homeShortBannerQuery}
      />
      {/* <MobileHomeTopCategoryFirst />
      <MobileHomeTopCategorySecond /> */}
      {/* <MobileHomeBannerSecond />
      <MobileHomeBannerThird /> */}
      <MobileHomeNewestProducts allProductsQuery={allProductsQuery} />
    </>
  )
}

export default MobileHomeIndex
