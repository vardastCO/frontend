"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { notFound } from "next/navigation"
import { BookmarkIcon, ShareIcon } from "@heroicons/react/24/outline"
import { CheckBadgeIcon } from "@heroicons/react/24/solid"
import clsx from "clsx"
import copy from "copy-to-clipboard"
import { setDefaultOptions } from "date-fns"
import { faIR } from "date-fns/locale"

import {
  EventTrackerSubjectTypes,
  EventTrackerTypes,
  GetBrandQuery,
  GetSellerQuery,
  IndexProductInput,
  useCreateEventTrackerMutation
} from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import { Button } from "@core/components/ui/button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@core/components/ui/tabs"
import { toast } from "@core/hooks/use-toast"
import SellerContactModal from "@/app/(public)/(pages)/product/components/seller-contact-modal"
import BuyBoxNavigation from "@/app/(public)/components/BuyBoxNavigation"
import PdfViewer from "@/app/(public)/components/PdfViewer"
import ProductList from "@/app/(public)/components/product-list"

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

// type ContentComponent<T> = React.FC<T>

const BrandOrSellerProfile = ({
  isMobileView,
  args,
  type,
  data,
  slug
}: BrandOrSellerProfile) => {
  if (!data) notFound()
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false)

  const [imageContainerHeight, setImageContainerHeight] = useState(80)
  // const [categoriesCount, setCategoriesCount] = useState(0)
  // const [imageSellerContainerHeight, setImageSellerContainerHeight] =
  //   useState(80)
  const productContainerRef = useRef<HTMLDivElement>(null)
  // const sellerContainerRef = useRef<HTMLAnchorElement>(null)

  // const phoneNumbers = data.contacts.map(
  //   ({ number, code }, index) =>
  //     number &&
  //     (index === 0
  //       ? (code ? digitsEnToFa(code) : "") + digitsEnToFa(number)
  //       : " - " + (code ? digitsEnToFa(code) : "") + digitsEnToFa(number))
  // )

  const handleOnClick = async () => {
    if (navigator?.share) {
      try {
        await navigator.share({
          url: window.location.href,
          text: data.name,
          title: "وردست"
        })
      } catch (err) {
        // toast({
        //   description: `${err}`,
        //   duration: 5000,
        //   variant: "danger"
        // })
      }
    } else {
      copy(window.location.href)
      toast({
        description: "کپی شد!",
        duration: 5000,
        variant: "success"
      })
    }
  }

  const showSellerContact = () => {
    createEventTrackerMutation.mutate({
      createEventTrackerInput: {
        type: EventTrackerTypes.ViewBuyBox,
        subjectType: EventTrackerSubjectTypes.ContactInfo,
        subjectId: data.contacts?.at(0)?.id || 0,
        url: window.location.href
      }
    })
  }

  const buyBoxVariants = {
    [BrandOrSellerEnum.BRAND]: {
      onClick: showSellerContact,
      title: "اطلاعات تماس برترین فروشنده"
    },
    [BrandOrSellerEnum.SELLER]: {
      onClick: showSellerContact,
      title: "اطلاعات تماس"
    }
  }

  const createEventTrackerMutation = useCreateEventTrackerMutation(
    graphqlRequestClient,
    {
      onSuccess: () => {
        setContactModalOpen(true)
      }
    }
  )
  setDefaultOptions({
    locale: faIR,
    weekStartsOn: 6
  })

  useEffect(() => {
    const div = productContainerRef.current
    if (div) {
      setImageContainerHeight(div.clientWidth)
    }
    // const sellerDiv = sellerContainerRef.current
    // if (sellerDiv) {
    //   setImageSellerContainerHeight(sellerDiv.clientWidth)
    // }
  }, [])

  const isSellerQuery = () => type === BrandOrSellerEnum.SELLER

  console.log(data)

  const _tabs: Record<
    BrandOrSellerEnum,
    Array<{
      value: string
      title: string
      Content: React.FC
    }>
  > = {
    [BrandOrSellerEnum.SELLER]: [
      {
        value: "product",
        title: "کالا‌ها",
        Content: () => (
          <ProductList
            args={args}
            hasFilter={false}
            isMobileView={isMobileView}
            selectedCategoryIds={args["categoryIds"] || undefined}
            sellerId={+slug[0]}
          />
        )
      },
      {
        value: "category",
        title: "دسته‌بندی‌ها",
        Content: () => <></>
      },
      {
        value: "brand",
        title: "برند‌ها",
        Content: () => <></>
      }
    ],
    [BrandOrSellerEnum.BRAND]: [
      {
        value: "product",
        title: "کالاها",
        Content: () => (
          <ProductList
            args={args}
            hasFilter={false}
            isMobileView={isMobileView}
            selectedCategoryIds={args["categoryIds"] || undefined}
            sellerId={+slug[0]}
          />
        )
      },
      {
        value: "category",
        title: "دسته‌بندی‌ها",
        Content: () => <></>
      },
      {
        value: "price-list",
        title: "لیست قیمت",
        Content: () => (
          <div className="h-full w-full">
            <PdfViewer url={(data as BrandQuery).priceList?.presignedUrl.url} />
          </div>
        )
      },
      {
        value: "catalog",
        title: "کاتالوگ",
        Content: () => (
          <div className="h-full w-full">
            <PdfViewer
              url={
                (data as BrandQuery).catalog?.presignedUrl.url
                // "/pdf.pdf"
              }
            />
          </div>
        )
      }
    ]
  }

  return (
    <>
      <SellerContactModal
        data={data}
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
      />
      {/* <div className="flex flex-col bg-alpha-white">
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
      </div> */}
      <div
        className="flex h-full flex-col gap-y-0.5"
        style={{
          paddingBottom:
            document.getElementById("bottom-navigation-buy-box")
              ?.clientHeight ?? 0,
          paddingTop:
            document.getElementById("mobile-header-navbar")?.clientHeight ?? 0
        }}
      >
        <div className="flex flex-col gap-y bg-alpha-white px py-5">
          <div className="grid grid-cols-9 items-center justify-center">
            <div></div>
            <div className="col-span-7 flex justify-center py-5">
              <div className="relative w-[35vw] rounded-full border-2 border-alpha-400 p-0.5 shadow-lg">
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
            </div>
            <div className="flex h-full flex-col justify-start">
              <Button id="header-back-button" variant={"ghost"} iconOnly>
                <BookmarkIcon className="h-6 w-6 text-alpha" />
              </Button>
              <Button variant={"ghost"} iconOnly onClick={handleOnClick}>
                <ShareIcon className="h-6 w-6 text-alpha" />
              </Button>
            </div>
            {/* {!isSellerQuery() && (
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
            )} */}
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
        {/* <div className="grid auto-cols-fr grid-flow-col items-center bg-alpha-white p">
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
        </div> */}
        {/* {isSellerQuery() && (
          <div className="grid grid-cols-5 items-center bg-alpha-white px-6 py">
            <ul className="col-span-4 flex list-disc flex-col gap-y">
              <li className="flex">
                <span className="text-sm text-alpha-500">آدرس:</span>
                <span className="pr text-sm">
                  {data.addresses.at(0)?.address ?? "-"}
                </span>
              </li>
              <li className="flex items-center">
                <span className="text-sm text-alpha-500">تلفن:</span>
                <span className="pr font-semibold">
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
        )} */}

        {data.bio && (
          <div className="flex flex-col items-start bg-alpha-white p-6">
            <h4>معرفی</h4>
            {<p className="pt-6 text-justify">{data.bio}</p>}
          </div>
        )}
        <Tabs defaultValue={_tabs[type][0].value} className="bg-alpha-white">
          <TabsList className="w-full">
            {_tabs[type].map(({ title, value }) => (
              <TabsTrigger
                key={value}
                className={clsx("bg-alpha-white !py-4 font-semibold")}
                style={{
                  width: `${100 / _tabs[type].length}%`
                }}
                value={value}
              >
                {title}
              </TabsTrigger>
            ))}
          </TabsList>
          {_tabs[type].map(({ Content, ...props }) => (
            <TabsContent key={props.value} value={props.value}>
              <Content />
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <BuyBoxNavigation
        title={buyBoxVariants[type].title}
        actionButtonProps={{
          onClick: buyBoxVariants[type].onClick,
          disabled: createEventTrackerMutation.isLoading,
          loading: createEventTrackerMutation.isLoading
        }}
      />
    </>
  )
}

export default BrandOrSellerProfile
