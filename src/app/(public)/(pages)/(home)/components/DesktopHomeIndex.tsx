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
      <div className="mx-auto">
        <div className="bg-alpha-100">
          <div className="container relative mx-auto w-[76vw] py-9">
            <Image
              src={logoHorizontal}
              alt={`${process.env.NEXT_PUBLIC_TITLE} - ${process.env.NEXT_PUBLIC_SLOGAN}`}
              className="w-full object-contain"
              priority
            />
          </div>
        </div>
        <div className="border-t-2 border-alpha-100 bg-alpha-white">
          <div className="container mx-auto py-9">
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
        </div>
        <div className="border-t-2 border-alpha-100 bg-alpha-white py-9">
          <div className="container mx-auto ">
            <MobileHomeTopEntities
              centeredSlides={false}
              slidesPerView={width > 1366 ? 4.4 : 3.4}
              width={width * (width > 1366 ? 0.18 : 0.22)}
              __typename="Seller"
              title="جدیدترین فروشنده‌ها"
              query={allSellersCount.data?.sellers.data.slice(0, 5) as Seller[]}
            />
          </div>
        </div>
        <div className="border-t-2 border-alpha-100 bg-alpha-white py-9">
          <div className="container mx-auto ">
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
        </div>
        <div className="border-t-2 border-alpha-100 bg-alpha-white">
          <div className="container mx-auto py-9">
            <MobileHomeNewestProducts allProductsQuery={allProductsQuery} />
          </div>
        </div>
        <div className="border-t-2 border-alpha-100 bg-alpha-white">
          <div className="container mx-auto py-9">
            <MobileHomeTopBlogs slidesPerView={4.3} centeredSlides={false} />
          </div>
        </div>
      </div>
    </>
  )
}

export default DesktopHomeIndex
