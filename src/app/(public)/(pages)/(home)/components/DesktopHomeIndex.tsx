"use client"

import { useState } from "react"
import Image from "next/image"
import clsx from "clsx"

import { Brand, Category, Seller } from "@/generated"

import { Button } from "@core/components/ui/button"
import useWindowSize from "@core/hooks/use-window-size"
import { IHomeProps } from "@/app/(public)/(pages)/(home)/components/HomeIndex"
import HomeTopSellers from "@/app/(public)/(pages)/(home)/components/HomeTopSellers"
import MobileHomeNewestProducts from "@/app/(public)/(pages)/(home)/components/MobileHomeNewestProducts"
import MobileHomeSection from "@/app/(public)/(pages)/(home)/components/MobileHomeSection"
import MobileHomeTopBlogs from "@/app/(public)/(pages)/(home)/components/MobileHomeTopBlogs"
import MobileHomeTopEntities from "@/app/(public)/(pages)/(home)/components/MobileHomeTopEntities"
import CategoryCircleItem from "@/app/(public)/(pages)/category/components/CategoryCircleItem"

import logoHorizontal from "@/assets/desktop-home-top-banner.svg"

const DesktopHomeIndex = ({
  getVocabularyQueryFcQuery,
  allSellersCount,
  allBrandsCount,
  allProductsQuery,
  getAllBlogsQuery
}: IHomeProps) => {
  const { width } = useWindowSize()
  const [blogFlag, setBlogFlag] = useState(false)

  const onOpenCategories = () => {
    setBlogFlag((prev) => !prev)
  }

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
            <MobileHomeSection viewAllHref="/category" title="دسته بندی‌ها">
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
            {/* <MobileHomeTopEntities
              centeredSlides={false}
              slidesPerView={width > 1366 ? 4.4 : 3.4}
              width={width * (width > 1366 ? 0.18 : 0.22)}
              __typename="Seller"
              title="جدیدترین فروشنده‌ها"
              query={allSellersCount.data?.sellers.data.slice(0, 8) as Seller[]}
            /> */}
            <HomeTopSellers
              isMobileView={false}
              title="جدیدترین فروشنده‌ها"
              query={allSellersCount.data?.sellers.data.slice(0, 8) as Seller[]}
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
              query={allBrandsCount.data?.brands.data.slice(0, 8) as Brand[]}
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
            <MobileHomeTopBlogs
              getAllBlogsQuery={getAllBlogsQuery}
              slidesPerView={4.3}
              centeredSlides={false}
            />
          </div>
        </div>
        <div className="border-t-2 border-alpha-100">
          <div className="container relative mx-auto py-9">
            <h2 className="py-7 font-semibold">دسته بندی‌های اصلی وردست</h2>
            <div className={clsx("gap-y-6", !blogFlag && "line-clamp-6")}>
              {getVocabularyQueryFcQuery.data?.vocabulary.categories.map(
                (category) => (
                  <div key={category?.id} className="mt-7">
                    <h3 className="font-semibold">{category?.title}</h3>
                    <p className="pt text-justify leading-7">
                      {category?.description}
                    </p>
                  </div>
                )
              )}
            </div>
            {!blogFlag && (
              <div className="absolute bottom-16 left-0 right-0 h-36 bg-opacity-30 bg-gradient-to-t from-alpha-white"></div>
            )}
            <Button
              onClick={onOpenCategories}
              variant="link"
              className="!mt !text-primary"
            >
              {blogFlag ? "بستن" : "مشاهده بیشتر"}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default DesktopHomeIndex
