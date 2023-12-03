"use client"

import { useInfiniteQuery, useQuery } from "@tanstack/react-query"

import {
  Category,
  FileModelTypeEnum,
  GetAllBrandsCountQuery,
  GetAllProductsQuery,
  GetAllSellersCountQuery,
  GetBannerHomePageQuery,
  GetVocabularyQuery,
  Product
} from "@/generated"

import { getAllBrandsCountQueryFn } from "@core/queryFns/allBrandsCountQueryFns"
import { getAllProductsQueryFn } from "@core/queryFns/allProductsQueryFns"
import { getAllSellersCountQueryFn } from "@core/queryFns/allSellersCountQueryFns"
import { bannerHomePageQueryFns } from "@core/queryFns/bannerHomePageQueryFns"
import QUERY_FUNCTIONS_KEY from "@core/queryFns/queryFunctionsKey"
import { getVocabularyQueryFn } from "@core/queryFns/vocabularyQueryFns"
import MobileHomeBanner from "@/app/(public)/(pages)/home/components/MobileHomeBanner"
import MobileHomeCategory from "@/app/(public)/(pages)/home/components/MobileHomeCategory"
import MobileHomeCounts from "@/app/(public)/(pages)/home/components/MobileHomeCounts"
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

  const allSellersCount = useQuery<GetAllSellersCountQuery>(
    [QUERY_FUNCTIONS_KEY.ALL_SELLERS_COUNT_QUERY_KEY],
    getAllSellersCountQueryFn,
    {
      keepPreviousData: true
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

  const homeShortBannerQuery = useQuery<GetBannerHomePageQuery>(
    [QUERY_FUNCTIONS_KEY.BANNER_HOME_PAGE_KEY, FileModelTypeEnum.ShortBanner],
    () => bannerHomePageQueryFns({ type: FileModelTypeEnum.ShortBanner }),
    {
      keepPreviousData: true,
      staleTime: 999999999
    }
  )

  const homeLongBannerQuery = useQuery<GetBannerHomePageQuery>(
    [QUERY_FUNCTIONS_KEY.BANNER_HOME_PAGE_KEY, FileModelTypeEnum.LongBanner],
    () => bannerHomePageQueryFns({ type: FileModelTypeEnum.LongBanner }),
    {
      keepPreviousData: true,
      staleTime: 999999999
    }
  )

  return (
    <>
      <MobileHomeSlider query={homeSlidersQuery} />
      <MobileHomeCounts
        counts={{
          sellers: allSellersCount.data?.sellers.total,
          brands: allBrandsCount.data?.brands.total
        }}
        query={homeShortBannerQuery}
      />
      <MobileHomeCategory
        categories={
          getVocabularyQueryFcQuery.data?.vocabulary.categories as Category[]
        }
      />
      <MobileHomeMostSellProducts
        products={allProductsQuery.data?.pages[0].products.data as Product[]}
      />
      <MobileHomeBanner turn={0} query={homeLongBannerQuery} />
      <MobileHomeTopBrands allBrandsCount={allBrandsCount} />
      <MobileHomeBanner turn={1} query={homeLongBannerQuery} />
      <MobileHomeBanner turn={2} query={homeLongBannerQuery} />
      {/* <MobileHomeTopCategoryFirst />
      <MobileHomeTopCategorySecond /> */}
      {/* <MobileHomeBannerSecond />
      <MobileHomeBannerThird /> */}
      <MobileHomeNewestProducts allProductsQuery={allProductsQuery} />
    </>
  )
}

export default MobileHomeIndex
