"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { CheckBadgeIcon } from "@heroicons/react/24/solid"
import { digitsEnToFa } from "@persian-tools/persian-tools"
import { useQuery } from "@tanstack/react-query"

import { GetSellerQuery, IndexProductInput } from "@/generated"

import Breadcrumb from "@core/components/shared/Breadcrumb"
import QUERY_FUNCTIONS_KEY from "@core/queryFns/queryFunctionsKey"
import { getSellerQueryFn } from "@core/queryFns/sellerQueryFns"
import ProductList from "@/app/(public)/components/product-list"
import Rating from "@/app/(public)/components/Rating"

interface SellerProfile {
  isMobileView: boolean
  slug: Array<string | number>
  args: IndexProductInput
}

const SellerProfile = ({ isMobileView, args, slug }: SellerProfile) => {
  const [imageContainerHeight, setImageContainerHeight] = useState(80)
  const [categoriesCount, setCategoriesCount] = useState(0)
  const [imageSellerContainerHeight, setImageSellerContainerHeight] =
    useState(80)
  const productContainerRef = useRef<HTMLDivElement>(null)
  const sellerContainerRef = useRef<HTMLAnchorElement>(null)

  const { data } = useQuery<GetSellerQuery>(
    [QUERY_FUNCTIONS_KEY.SELLER_QUERY_KEY, { id: +slug[0] }],
    () => getSellerQueryFn(+slug[0]),
    {
      keepPreviousData: true
    }
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

  if (!data) notFound()

  return (
    <>
      <div className="flex flex-col bg-alpha-white">
        <Breadcrumb
          dynamic={false}
          items={[
            { label: "فروشندگان", path: "/sellers", isCurrent: false },
            {
              label: data.seller.name,
              path: `/seller/${data.seller.id}/${data.seller.name}`,
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
              {data.seller.isBlueTik && (
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
                {data.seller?.logoFile?.presignedUrl.url ? (
                  <Image
                    src={data.seller?.logoFile?.presignedUrl.url as string}
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
            <div className="col-span-3 grid grid-cols-2">
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
            </div>
            {/* <div className="flex flex-col items-center gap-y-2">
            <h4 className="font-semibold">{digitsEnToFa(250)}</h4>
            <p className="text-xs text-alpha-400">دنبال شوندگان</p>
          </div> */}
          </div>
          <div>
            <p className="text-justify">{data.seller.bio}</p>
          </div>
        </div>
        <div className="grid grid-cols-5 items-center bg-alpha-white p">
          <ul className="col-span-4 flex list-disc flex-col gap-y">
            <li className="flex">
              <span className="text-sm text-alpha-500">آدرس:</span>
              <span className="pr text-sm">
                {data.seller.addresses.at(0)?.address}
              </span>
            </li>
            <li className="flex">
              <span className="text-sm text-alpha-500">تلفن:</span>
              <span className="pr text-sm">
                {data.seller.contacts.map(({ number, code }, index) =>
                  index === 0
                    ? digitsEnToFa(code || "") + digitsEnToFa(number)
                    : " - " + digitsEnToFa(code || "") + digitsEnToFa(number)
                )}
              </span>
            </li>
          </ul>
          <Link
            href={`https://www.google.com/maps/search/?api=1&query=${data.seller.addresses.at(
              0
            )?.latitude},${data.seller.addresses.at(0)?.longitude}`}
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
        <div className="grid grid-cols-3 items-center gap-y bg-alpha-white p">
          <div className="flex flex-col items-center gap-y-2">
            <h4 className="font-semibold">
              <Rating rating={data.seller.rating ?? 0} size="xs" />
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
          // containerType={ProductContainerType.PHOTO}
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

export default SellerProfile
