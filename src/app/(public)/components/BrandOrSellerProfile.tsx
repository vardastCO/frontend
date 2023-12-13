"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline"
import { CheckBadgeIcon } from "@heroicons/react/24/solid"
import { digitsEnToFa } from "@persian-tools/persian-tools"

import { GetBrandQuery, GetSellerQuery, IndexProductInput } from "@/generated"

import Breadcrumb from "@core/components/shared/Breadcrumb"
import { Button } from "@core/components/ui/button"
import ProductList from "@/app/(public)/components/product-list"
import Rating from "@/app/(public)/components/Rating"

export enum BrandOrSellerEnum {
  // eslint-disable-next-line no-unused-vars
  SELLER = "seller",
  // eslint-disable-next-line no-unused-vars
  BRAND = "brand"
}

export type SellerQuery = GetSellerQuery["seller"]
export type BrandQuery = GetBrandQuery["brand"]

interface BrandOrSellerProfile {
  isMobileView: boolean
  slug: Array<string | number>
  type: BrandOrSellerEnum
  args: IndexProductInput
  data?: SellerQuery | BrandQuery
}

// function isTypeSellerQuery(data: any): data is SellerQuery {
//   return data instanceof Object
// }

const BrandOrSellerProfile = ({
  isMobileView,
  args,
  type,
  data,
  slug
}: BrandOrSellerProfile) => {
  if (!data) notFound()

  const [imageContainerHeight, setImageContainerHeight] = useState(80)
  const [categoriesCount, setCategoriesCount] = useState(0)
  const [imageSellerContainerHeight, setImageSellerContainerHeight] =
    useState(80)
  const productContainerRef = useRef<HTMLDivElement>(null)
  const sellerContainerRef = useRef<HTMLAnchorElement>(null)

  const phoneNumbers = data.contacts.map(
    ({ number, code }, index) =>
      code &&
      number &&
      (index === 0
        ? digitsEnToFa(code) + digitsEnToFa(number)
        : " - " + digitsEnToFa(code) + digitsEnToFa(number))
  )

  useEffect(() => {
    const div = productContainerRef.current
    if (div) {
      setImageContainerHeight(div.clientWidth)
    }
    const sellerDiv = sellerContainerRef.current
    if (sellerDiv) {
      setImageSellerContainerHeight(sellerDiv.clientWidth)
    }
  }, [])

  const isSellerQuery = () => type === BrandOrSellerEnum.SELLER

  return (
    <>
      <div className="flex flex-col bg-alpha-white">
        <Breadcrumb
          dynamic={false}
          items={[
            {
              label: "فروشندگان",
              path: `/${data.name}s`,
              isCurrent: false
            },
            {
              label: data.name,
              path: `/${type}/${data.id}/${data.name}`,
              isCurrent: true
            }
          ]}
        />
        <hr className="h-px w-full bg-alpha-200" />
      </div>
      <div className="flex flex-col gap-y-1">
        <div className="flex flex-col gap-y bg-alpha-white p">
          <div className="flex items-center justify-center">
            <div className="relative w-1/4 rounded-full border-2 border-alpha-400 p-0.5 shadow-lg">
              {isSellerQuery() && (data as SellerQuery).isBlueTik && (
                <>
                  <CheckBadgeIcon className="w-h-7 absolute right-1 top-0 z-20 h-7 -translate-y-1 translate-x-1 text-info" />
                  <span className="absolute right-2 top-1 h-3 w-3 rounded-full bg-alpha-white"></span>
                </>
              )}
              <div
                ref={productContainerRef}
                style={{
                  height: imageContainerHeight
                }}
                className="relative z-10 h-full"
              >
                {data?.logoFile?.presignedUrl.url ? (
                  <Image
                    src={data?.logoFile?.presignedUrl.url as string}
                    alt="seller"
                    fill
                    className="rounded-full object-contain"
                  />
                ) : (
                  <Image
                    src={"/images/seller-user.png"}
                    alt="seller"
                    fill
                    className="rounded-full object-contain"
                  />
                )}
              </div>
            </div>
            {!isSellerQuery() && (
              <div className="grid w-3/4 grid-rows-2 gap-x">
                <div className=""></div>
                <div className="flex justify-end gap-x">
                  <Button
                    variant="ghost"
                    className="rounded-xl border border-primary !p-2"
                  >
                    کاتالوگ
                    <ArrowDownTrayIcon className="h-5 w-5 text-primary" />
                  </Button>
                  <Button
                    variant="ghost"
                    className="rounded-xl border border-primary !p-2"
                  >
                    لیست قیمت
                    <ArrowDownTrayIcon className="h-5 w-5 text-primary" />
                  </Button>
                </div>
              </div>
            )}
            {/* <div className="col-span-3 grid grid-cols-2">
              <div className="flex flex-col items-center gap-y-2">
                <h4 className="font-semibold">
                  {digitsEnToFa(categoriesCount)}
                </h4>
                <p className="text-xs text-alpha-500">محصولات</p>
              </div>
              <div className="flex flex-col items-center gap-y-2 border-r border-alpha-200">
                <h4 className="font-semibold">{digitsEnToFa(10)}</h4>
                <p className="text-xs text-alpha-500">دسته‌بندی‌ها</p>
              </div>
            </div> */}
            {/* <div className="flex flex-col items-center gap-y-2">
            <h4 className="font-semibold">{digitsEnToFa(250)}</h4>
            <p className="text-xs text-alpha-400">دنبال شوندگان</p>
          </div> */}
          </div>
        </div>
        <div className="grid auto-cols-fr grid-flow-col items-center bg-alpha-white p">
          <div className="flex flex-col items-center gap-y-2 border-l border-alpha-200">
            <p className="text-xs text-alpha-500">کالا</p>
            <h4 className="">{digitsEnToFa(categoriesCount)}</h4>
          </div>
          <div className="flex flex-col items-center gap-y-2 border-l border-alpha-200">
            <p className="text-xs text-alpha-500">دسته‌بندی</p>
            <h4 className="">{digitsEnToFa(10)}</h4>
          </div>
          <div className="flex flex-col items-center gap-y-2 border-l border-alpha-200">
            <p className="text-xs text-alpha-500">{digitsEnToFa(250)} نظر</p>
            <Rating rating={data.rating ?? 0} size="xs" />
          </div>
          <div className="flex flex-col items-center gap-y-2">
            <p className="text-xs text-alpha-500">عملکرد</p>
            <h4 className="">عالی</h4>
          </div>
        </div>
        <div className="grid grid-cols-5 items-center bg-alpha-white p">
          <ul className="col-span-4 flex list-disc flex-col gap-y">
            <li className="flex">
              <span className="text-sm text-alpha-500">آدرس:</span>
              <span className="pr text-sm">
                {data.addresses.at(0)?.address ?? "-"}
              </span>
            </li>
            <li className="flex">
              <span className="text-sm text-alpha-500">تلفن:</span>
              <span className="pr text-sm">
                {phoneNumbers.length ? phoneNumbers : "-"}
              </span>
            </li>
          </ul>
          <Link
            href={`https://www.google.com/maps/search/?api=1&data=${data.addresses.at(
              0
            )?.latitude},${data.addresses.at(0)?.longitude}`}
            ref={sellerContainerRef}
            style={{
              height: imageSellerContainerHeight
            }}
            target="_blank"
            prefetch={false}
            className="relative w-full overflow-hidden rounded-xl"
          >
            <Image
              src={"/images/map.png"}
              alt={"seller"}
              fill
              className="object-contain"
            />
          </Link>
        </div>
        {data.bio && (
          <div className="flex flex-col items-start bg-alpha-white p-6">
            <h4>معرفی</h4>
            {<p className="pt-6 text-justify">{data.bio}</p>}
          </div>
        )}
        {/* <Tabs defaultValue="products" className="bg-alpha-white">
          <TabsList className="w-full">
            <TabsTrigger className="w-1/2 bg-alpha-white" value="products">
              محصولات
            </TabsTrigger>
            <TabsTrigger className="w-1/2 bg-alpha-white" value="comments">
            نظرات
          </TabsTrigger>
          </TabsList>
          <TabsContent value="products">
            <ProductList
              setCategoriesCount={setCategoriesCount}
              // containerType={ProductContainerType.PHOTO}
              args={args}
              hasFilter={false}
              isMobileView={isMobileView}
              selectedCategoryIds={args["categoryIds"] || undefined}
              sellerId={+slug[0]}
            />
          </TabsContent> 
           <TabsContent value="comments">
        </TabsContent> 
          </Tabs>
        */}
        <ProductList
          setCategoriesCount={setCategoriesCount}
          args={args}
          hasFilter={false}
          isMobileView={isMobileView}
          selectedCategoryIds={args["categoryIds"] || undefined}
          sellerId={+slug[0]}
        />
      </div>
    </>
  )
}

export default BrandOrSellerProfile
