"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { notFound } from "next/navigation"
import { digitsEnToFa } from "@persian-tools/persian-tools"
import { TabsContent } from "@radix-ui/react-tabs"
import { useQuery } from "@tanstack/react-query"

import { GetBrandQuery, IndexProductInput } from "@/generated"

import Breadcrumb from "@core/components/shared/Breadcrumb"
import { Tabs, TabsList, TabsTrigger } from "@core/components/ui/tabs"
import { getBrandQueryFn } from "@core/queryFns/brandQueryFns"
import QUERY_FUNCTIONS_KEY from "@core/queryFns/queryFunctionsKey"
import ProductList from "@/app/(public)/components/product-list"
import Rating from "@/app/(public)/components/Rating"

interface BrandProfile {
  isMobileView: boolean
  slug: Array<string | number>
  args: IndexProductInput
}

const BrandProfile = ({ isMobileView, args, slug }: BrandProfile) => {
  const [imageContainerHeight, setImageContainerHeight] = useState(80)
  const [categoriesCount, setCategoriesCount] = useState(0)
  // const [imageBrandContainerHeight, setImageBrandContainerHeight] = useState(80)
  const productContainerRef = useRef<HTMLDivElement>(null)
  // const brandContainerRef = useRef<HTMLAnchorElement>(null)

  const { data } = useQuery<GetBrandQuery>(
    [QUERY_FUNCTIONS_KEY.BRAND_QUERY_KEY, { id: +slug[0] }],
    () => getBrandQueryFn(+slug[0]),
    {
      keepPreviousData: true
    }
  )

  useEffect(() => {
    const div = productContainerRef.current
    if (div) {
      setImageContainerHeight(div.clientWidth)
    }
    // const brandDiv = brandContainerRef.current
    // if (brandDiv) {
    //   setImageBrandContainerHeight(brandDiv.clientWidth)
    // }
  }, [])

  if (!data) notFound()

  return (
    <>
      <div className="flex flex-col bg-alpha-white">
        <Breadcrumb
          dynamic={false}
          items={[
            { label: "فروشندگان", path: "/brands", isCurrent: false },
            {
              label: data.brand.name,
              path: `/brand/${data.brand.id}/${data.brand.name}`,
              isCurrent: true
            }
          ]}
        />
        <hr className="h-px w-full bg-alpha-200" />
      </div>
      <div className="flex flex-col gap-y-1">
        <div className="flex flex-col gap-y bg-alpha-white p">
          <div className="grid grid-cols-4 items-center">
            <div className="relative rounded-full border-2 border-alpha-400 p-0.5 shadow-lg">
              {/* {data.brand.isBlueTik && (
                <>
                  <CheckBadgeIcon className="w-h-7 absolute right-1 top-0 z-20 h-7 -translate-y-1 translate-x-1 text-info" />
                  <span className="absolute right-2 top-1 h-3 w-3 rounded-full bg-alpha-white"></span>
                </>
              )} */}
              <div
                ref={productContainerRef}
                style={{
                  height: imageContainerHeight
                }}
                className="relative z-10 h-full"
              >
                {data.brand?.logoFile?.presignedUrl.url ? (
                  <Image
                    src={data.brand?.logoFile?.presignedUrl.url as string}
                    alt="brand"
                    fill
                    className="rounded-full object-contain"
                  />
                ) : (
                  <Image
                    src={"/images/brand-user.png"}
                    alt="brand"
                    fill
                    className="rounded-full object-contain"
                  />
                )}
              </div>
            </div>
            <div className="col-span-3 grid grid-cols-2">
              <div className="flex flex-col items-center gap-y-2">
                <h4 className="font-semibold">
                  {digitsEnToFa(categoriesCount)}
                </h4>
                <p className="text-xs text-alpha-400">محصولات</p>
              </div>
              <div className="flex flex-col items-center gap-y-2 border-r border-alpha-200">
                <h4 className="font-semibold">{digitsEnToFa(10)}</h4>
                <p className="text-xs text-alpha-400">دسته‌بندی‌ها</p>
              </div>
            </div>
            {/* <div className="flex flex-col items-center gap-y-2">
            <h4 className="font-semibold">{digitsEnToFa(250)}</h4>
            <p className="text-xs text-alpha-400">دنبال شوندگان</p>
          </div> */}
          </div>
          {/* <div>
            <p className="text-justify">{data.brand.}</p>
          </div> */}
        </div>
        {/* <div className="grid grid-cols-5 items-center bg-alpha-white p">
          <ul className="col-span-4 flex list-disc flex-col gap-y">
            <li className="flex">
              <span className="text-sm text-alpha-500">آدرس:</span>
              <span className="pr text-sm">
                {data.brand.addresses.at(0)?.address}
              </span>
            </li>
            <li className="flex">
              <span className="text-sm text-alpha-500">تلفن:</span>
              <span className="pr text-sm">
                {data.brand.contacts.map(({ number, code }, index) =>
                  index === 0
                    ? digitsEnToFa(code || "") + digitsEnToFa(number)
                    : " - " + digitsEnToFa(code || "") + digitsEnToFa(number)
                )}
              </span>
            </li>
          </ul>
          <Link
            href={`https://www.google.com/maps/search/?api=1&query=${data.brand.addresses.at(
              0
            )?.latitude},${data.brand.addresses.at(0)?.longitude}`}
            ref={brandContainerRef}
            style={{
              height: imageBrandContainerHeight
            }}
            target="_blank"
            prefetch={false}
            className="relative w-full overflow-hidden rounded-xl"
          >
            <Image
              src={"/images/map.png"}
              alt={"brand"}
              fill
              className="object-contain"
            />
          </Link>
        </div> */}
        <div className="grid grid-cols-3 items-center gap-y bg-alpha-white p">
          <div className="flex flex-col items-center gap-y-2">
            <h4 className="font-semibold">
              <Rating rating={data.brand.rating ?? 0} size="xs" />
            </h4>
            <p className="text-xs text-alpha-500">{digitsEnToFa(250)} نظر</p>
          </div>
          <div className="flex flex-col items-center gap-y-2 border-x border-alpha-200">
            <h4 className="text-success">{digitsEnToFa(80)}%</h4>
            <p className="text-xs text-alpha-500">رضایت مشتری</p>
          </div>
          <div className="flex flex-col items-center gap-y-2">
            <h4 className="text-success">عالی</h4>
            <p className="text-xs text-alpha-500">عملکرد</p>
          </div>
        </div>
        <Tabs defaultValue="products" className="bg-alpha-white">
          <TabsList className="w-full">
            <TabsTrigger className="w-1/2 bg-alpha-white" value="products">
              محصولات
            </TabsTrigger>
            {/* <TabsTrigger className="w-1/2 bg-alpha-white" value="comments">
            نظرات
          </TabsTrigger> */}
          </TabsList>
          <TabsContent value="products">
            <ProductList
              setCategoriesCount={setCategoriesCount}
              // containerType={ProductContainerType.PHOTO}
              args={args}
              hasFilter={false}
              isMobileView={isMobileView}
              selectedCategoryIds={args["categoryIds"] || undefined}
              brandId={+slug[0]}
            />
          </TabsContent>
          {/* <TabsContent value="comments">
          <ProductList
            containerType={ProductContainerType.PHOTO}
            args={args}
            hasFilter={false}
            isMobileView={isMobileView}
            selectedCategoryIds={args["categoryIds"] || undefined}
            brandId={+slug[0]}
          />
        </TabsContent> */}
        </Tabs>
      </div>
    </>
  )
}

export default BrandProfile
