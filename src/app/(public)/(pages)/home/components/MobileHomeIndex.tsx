"use client"

import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"

import {
  Category,
  GetAllBrandsCountQuery,
  GetAllProductsQuery,
  GetVocabularyQuery,
  Product
} from "@/generated"

import { getAllBrandsCountQueryFn } from "@core/queryFns/allBrandsCountQueryFns"
import { getAllProductsQueryFn } from "@core/queryFns/allProductsQueryFns"
import QUERY_FUNCTIONS_KEY from "@core/queryFns/queryFunctionsKey"
import { getVocabularyQueryFn } from "@core/queryFns/vocabularyQueryFns"
import Services from "@core/Services"
import { IHomeGetResponse } from "@core/Services/Home/model"
import MobileHomeBanner from "@/app/(public)/(pages)/home/components/MobileHomeBanner"
import MobileHomeBannerFirst from "@/app/(public)/(pages)/home/components/MobileHomeBannerFirst"
import MobileHomeBannerSecond from "@/app/(public)/(pages)/home/components/MobileHomeBannerSecond"
import MobileHomeBannerThird from "@/app/(public)/(pages)/home/components/MobileHomeBannerThird"
import MobileHomeCategory from "@/app/(public)/(pages)/home/components/MobileHomeCategory"
import MobileHomeMostSellProducts from "@/app/(public)/(pages)/home/components/MobileHomeMostSellProducts"
import MobileHomeNewestProducts from "@/app/(public)/(pages)/home/components/MobileHomeNewestProducts"
import MobileHomeSlider from "@/app/(public)/(pages)/home/components/MobileHomeSlider"
import MobileHomeTopBrands from "@/app/(public)/(pages)/home/components/MobileHomeTopBrands"
import MobileHomeTopCategoryFirst from "@/app/(public)/(pages)/home/components/MobileHomeTopCategoryFirst"
import MobileHomeTopCategorySecond from "@/app/(public)/(pages)/home/components/MobileHomeTopCategorySecond"

const MobileHomeIndex = () => {
  const session = useSession()
  const token = session.data?.accessToken

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
      keepPreviousData: true,
      staleTime: 999999999
    }
  )

  const homeSlidersQuery = useQuery<IHomeGetResponse>(
    [QUERY_FUNCTIONS_KEY.HOME_SERVICE_GET_FILES],
    async () => {
      const bib = await Services.Home.getFiles(`Bearer ${token}`)
      console.log("====================================")
      console.log(bib)
      console.log("====================================")
      return await bib
    },
    {
      keepPreviousData: true,
      staleTime: 999999999
    }
  )

  // console.log("====================================", { homeSlidersQuery })

  return (
    <>
      <MobileHomeSlider homeSlidersQuery={homeSlidersQuery} />
      <MobileHomeBanner />
      <MobileHomeCategory
        categories={
          getVocabularyQueryFcQuery.data?.vocabulary.categories as Category[]
        }
      />
      <MobileHomeMostSellProducts
        products={allProductsQuery.data?.products.data as Product[]}
      />
      <MobileHomeBannerFirst />
      <MobileHomeTopBrands allBrandsCount={allBrandsCount} />
      <MobileHomeTopCategoryFirst />
      <MobileHomeTopCategorySecond />
      <MobileHomeBannerSecond />
      <MobileHomeBannerThird />
      <MobileHomeNewestProducts
        products={allProductsQuery.data?.products.data as Product[]}
      />
    </>
  )
}

export default MobileHomeIndex
