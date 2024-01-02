"use client"

import Image from "next/image"

import { Brand, Category, Seller } from "@/generated"

import useWindowSize from "@core/hooks/use-window-size"
import { IHomeProps } from "@/app/(public)/(pages)/(home)/components/HomeIndex"
import MobileHomeNewestProducts from "@/app/(public)/(pages)/(home)/components/MobileHomeNewestProducts"
import MobileHomeSection from "@/app/(public)/(pages)/(home)/components/MobileHomeSection"
import MobileHomeTopBlogs from "@/app/(public)/(pages)/(home)/components/MobileHomeTopBlogs"
import MobileHomeTopEntities from "@/app/(public)/(pages)/(home)/components/MobileHomeTopEntities"
import CategoryCircleItem from "@/app/(public)/(pages)/categories/components/CategoryCircleItem"

import logoHorizontal from "@/assets/desktop-home-top-banner.svg"

const DesktopHomeIndex = ({
  getVocabularyQueryFcQuery,
  allSellersCount,
  allBrandsCount,
  allProductsQuery
}: IHomeProps) => {
  const { width } = useWindowSize()

  return (
    <>
      <div className="mx-auto w-[76vw]">
        <div className="relative py-9">
          <Image
            src={logoHorizontal}
            alt={`${process.env.NEXT_PUBLIC_TITLE} - ${process.env.NEXT_PUBLIC_SLOGAN}`}
            className="w-full object-contain"
            priority
          />
        </div>
        <div className="py-9">
          <MobileHomeSection viewAllHref="/categories" title="دسته بندی‌ها">
            <div className="grid grid-cols-7">
              {(
                getVocabularyQueryFcQuery.data?.vocabulary
                  .categories as Category[]
              )
                ?.filter((item) => item?.title !== "سایر")
                ?.map((props) => (
                  <CategoryCircleItem
                    key={props.id}
                    width={width ? width * 0.07 : 100}
                    data={props}
                  />
                ))}
            </div>
          </MobileHomeSection>
        </div>
        <div className="py-9">
          <MobileHomeTopEntities
            centeredSlides={false}
            slidesPerView={width > 1366 ? 4.4 : 3.4}
            width={width * (width > 1366 ? 0.18 : 0.22)}
            __typename="Seller"
            title="جدیدترین فروشنده‌ها"
            query={allSellersCount.data?.sellers.data.slice(0, 5) as Seller[]}
          />
        </div>
        <div className="py-9">
          <MobileHomeTopEntities
            centeredSlides={false}
            slidesPerView={width > 1366 ? 4.4 : 3.4}
            width={width * (width > 1366 ? 0.18 : 0.22)}
            // square
            __typename="Brand"
            title="جدیدترین برندها"
            query={allBrandsCount.data?.brands.data.slice(0, 5) as Brand[]}
          />
        </div>
        <div className="py-9">
          <MobileHomeNewestProducts allProductsQuery={allProductsQuery} />
        </div>
        <div className="py-9">
          <MobileHomeTopBlogs slidesPerView={4.3} centeredSlides={false} />
        </div>
      </div>
    </>
  )
}

export default DesktopHomeIndex
