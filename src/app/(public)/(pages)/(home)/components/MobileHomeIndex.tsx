"use client"

import { Brand, Category, Seller } from "@/generated"

import useWindowSize from "@core/hooks/use-window-size"
import { IHomeProps } from "@/app/(public)/(pages)/(home)/components/HomeIndex"
import MobileHomeCategory from "@/app/(public)/(pages)/(home)/components/MobileHomeCategory"
import MobileHomeNewestProducts from "@/app/(public)/(pages)/(home)/components/MobileHomeNewestProducts"
import MobileHomeSlider from "@/app/(public)/(pages)/(home)/components/MobileHomeSlider"
import MobileHomeTopBlogs from "@/app/(public)/(pages)/(home)/components/MobileHomeTopBlogs"
import MobileHomeTopEntities from "@/app/(public)/(pages)/(home)/components/MobileHomeTopEntities"

const MobileHomeIndex = ({
  allBrandsCount,
  allProductsQuery,
  allSellersCount,
  getVocabularyQueryFcQuery,
  homeSlidersQuery,
  getAllBlogsQuery
}: IHomeProps) => {
  const { width } = useWindowSize()

  return (
    <>
      <MobileHomeSlider query={homeSlidersQuery} />
      <MobileHomeCategory
        width={width * 0.3}
        categories={
          getVocabularyQueryFcQuery?.data?.vocabulary.categories.filter(
            (item) => item?.title !== "سایر"
          ) as Category[]
        }
      />
      <MobileHomeTopEntities
        width={width * 0.9}
        __typename="Seller"
        title="جدیدترین فروشنده‌ها"
        query={allSellersCount.data?.sellers.data.slice(0, 8) as Seller[]}
      />
      <MobileHomeTopEntities
        width={width * 0.9}
        // square
        __typename="Brand"
        title="جدیدترین برندها"
        query={allBrandsCount.data?.brands.data.slice(0, 8) as Brand[]}
      />
      <MobileHomeNewestProducts allProductsQuery={allProductsQuery} />
      <MobileHomeTopBlogs
        getAllBlogsQuery={getAllBlogsQuery}
        slidesPerView={1.09}
      />
    </>
  )
}

export default MobileHomeIndex
