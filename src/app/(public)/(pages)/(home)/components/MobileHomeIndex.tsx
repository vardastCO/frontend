"use client"

import { useQuery } from "@tanstack/react-query"

import {
  Brand,
  Category,
  FileModelTypeEnum,
  GetAllBrandsCountQuery,
  GetAllProductsQuery,
  GetAllSellersCountQuery,
  GetBannerHomePageQuery,
  GetVocabularyQuery,
  Seller
} from "@/generated"

import { getAllBrandsCountQueryFn } from "@core/queryFns/allBrandsCountQueryFns"
import { getAllProductsQueryFn } from "@core/queryFns/allProductsQueryFns"
import { getAllSellersCountQueryFn } from "@core/queryFns/allSellersCountQueryFns"
import { bannerHomePageQueryFns } from "@core/queryFns/bannerHomePageQueryFns"
import QUERY_FUNCTIONS_KEY from "@core/queryFns/queryFunctionsKey"
import { getVocabularyQueryFn } from "@core/queryFns/vocabularyQueryFns"
import MobileHomeCategory from "@/app/(public)/(pages)/(home)/components/MobileHomeCategory"
import MobileHomeNewestProducts from "@/app/(public)/(pages)/(home)/components/MobileHomeNewestProducts"
import MobileHomeSlider from "@/app/(public)/(pages)/(home)/components/MobileHomeSlider"
import MobileHomeTopEntities from "@/app/(public)/(pages)/(home)/components/MobileHomeTopEntities"

const MobileHomeIndex = () => {
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
      keepPreviousData: true
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

  return (
    <>
      <MobileHomeSlider query={homeSlidersQuery} />
      <MobileHomeCategory
        categories={
          getVocabularyQueryFcQuery.data?.vocabulary.categories as Category[]
        }
      />
      <MobileHomeTopEntities
        __typename="Seller"
        title="جدیدترین فروشنده‌ها"
        query={allSellersCount.data?.sellers.data.slice(0, 7) as Seller[]}
      />
      <MobileHomeTopEntities
        __typename="Brand"
        title="جدیدترین برندها"
        query={allBrandsCount.data?.brands.data.slice(0, 7) as Brand[]}
      />
      <MobileHomeNewestProducts allProductsQuery={allProductsQuery} />
    </>
  )
}

export default MobileHomeIndex
