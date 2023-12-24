"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowDownOnSquareIcon } from "@heroicons/react/24/outline"
import { CheckBadgeIcon } from "@heroicons/react/24/solid"
import { digitsEnToFa } from "@persian-tools/persian-tools"
import { UseQueryResult } from "@tanstack/react-query"
import clsx from "clsx"
import { setDefaultOptions } from "date-fns"
import { faIR } from "date-fns/locale"
import { Session } from "next-auth"

import {
  Brand,
  EntityTypeEnum,
  EventTrackerSubjectTypes,
  EventTrackerTypes,
  GetBrandQuery,
  GetIsFavoriteQuery,
  GetSellerQuery,
  IndexProductInput,
  Seller,
  useCreateEventTrackerMutation
} from "@/generated"

import axiosApis from "@core/clients/axiosApis"
import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import { Button } from "@core/components/ui/button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@core/components/ui/tabs"
import SellerContactModal from "@/app/(public)/(pages)/product/components/seller-contact-modal"
import BuyBoxNavigation from "@/app/(public)/components/BuyBoxNavigation"
import FavoriteIcon from "@/app/(public)/components/FavoriteIcon"
import ProductList from "@/app/(public)/components/product-list"
import ShareIcon from "@/app/(public)/components/ShareIcon"

export type SellerQuery = GetSellerQuery["seller"]
export type BrandQuery = GetBrandQuery["brand"]

interface IBrandOrSellerProfile {
  isMobileView: boolean
  slug: Array<string | number>
  type: EntityTypeEnum.Brand | EntityTypeEnum.Seller
  args: IndexProductInput
  data?: SellerQuery | BrandQuery
  isFavoriteQuery: UseQueryResult<GetIsFavoriteQuery, unknown>
  session: Session | null
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
  slug,
  isFavoriteQuery,
  session
}: IBrandOrSellerProfile) => {
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
    [EntityTypeEnum.Brand]: {
      onClick: showSellerContact,
      title: "اطلاعات تماس برترین فروشنده"
    },
    [EntityTypeEnum.Seller]: {
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

  const showPdfInNewTab = useCallback(
    async ({ uuid = "" }: { uuid: string }) => {
      const response = await axiosApis.servePdf({
        access_token: session?.accessToken,
        uuid
      })
      if (response.data) {
        const pdfBlob = new Blob([response.data], {
          type: "application/pdf"
        })
        const pdfUrl = URL.createObjectURL(pdfBlob)
        if (isMobileView) {
          window.location.href = pdfUrl
        } else {
          window.open(pdfUrl, "_blank")
        }
        URL.revokeObjectURL(pdfUrl)
      }
    },
    [isMobileView, session?.accessToken]
  )

  const isSellerQuery = () => type === EntityTypeEnum.Seller

  const _tabs = useMemo(() => {
    // Your object creation logic here
    const _tabs: Record<
      EntityTypeEnum.Seller | EntityTypeEnum.Brand,
      Array<{
        value: string
        title: string
        Content: React.FC
      }>
    > = {
      [EntityTypeEnum.Seller]: [
        {
          value: "product",
          title: `کالا‌ها${
            (data as Brand)?.total
              ? ` (${digitsEnToFa((data as Brand).total as number)})`
              : ""
          }`,
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
      [EntityTypeEnum.Brand]: [
        {
          value: "product",
          title: `کالا‌ها${
            (data as Seller)?.total
              ? ` (${digitsEnToFa((data as Seller).total as number)})`
              : ""
          }`,
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
            <div className="flex h-full w-full flex-col items-center justify-center gap-y bg-alpha-white py">
              {session?.accessToken ? (
                <>
                  {(data as BrandQuery).catalog?.uuid ? (
                    <Button
                      className="btn btn-primary flex items-center justify-center rounded-2xl"
                      onClick={() => {
                        const uuid = (data as BrandQuery).priceList?.uuid
                        if (!!uuid) {
                          showPdfInNewTab({ uuid })
                        }
                      }}
                    >
                      <span>مشاهده قیمت</span>
                      <ArrowDownOnSquareIcon className="h-4 w-4 text-alpha-white" />{" "}
                    </Button>
                  ) : (
                    <h5>لیست قیمت برای این برند ثبت نشده است</h5>
                  )}
                </>
              ) : (
                <h5>
                  برای مشاهده لیست قیمت لطفا ابتدا وارد حساب کاربری خود شوید
                </h5>
              )}
            </div>
          )
        },
        {
          value: "catalog",
          title: "کاتالوگ",
          Content: () => (
            <div className="flex h-full w-full flex-col items-center justify-center gap-y bg-alpha-white py">
              {/* <p>برای مشاهده کاتالوگ این محصول دکمه زیر را لمس کنید</p> */}
              {/* <PdfViewer
              url={
                // (data as BrandQuery).catalog?.presignedUrl.url
                "/pdf.pdf"
              }
            /> */}
              {/* <Link
                className="btn btn-primary flex items-center justify-center rounded-2xl"
                href={(data as BrandQuery).catalog?.presignedUrl.url ?? ""}
                target="_blank"
                referrerPolicy="no-referrer"
              >
                <span>مشاهده کاتالوگ</span>
                <ArrowDownOnSquareIcon className="h-4 w-4 text-alpha-white" />
              </Link> */}
              {session?.accessToken ? (
                <>
                  {(data as BrandQuery).catalog?.uuid ? (
                    <Button
                      className="btn btn-primary flex items-center justify-center rounded-2xl"
                      onClick={() => {
                        const uuid = (data as BrandQuery).catalog?.uuid
                        if (!!uuid) {
                          showPdfInNewTab({ uuid })
                        }
                      }}
                    >
                      <span>مشاهده کاتالوگ</span>
                      <ArrowDownOnSquareIcon className="h-4 w-4 text-alpha-white" />{" "}
                    </Button>
                  ) : (
                    <h5>کاتالوگ برای این برند ثبت نشده است</h5>
                  )}
                </>
              ) : (
                <h5>
                  برای مشاهده کاتالوگ لطفا ابتدا وارد حساب کاربری خود شوید
                </h5>
              )}
            </div>
          )
        }
      ]
    }
    return _tabs
  }, [args, data, isMobileView, session?.accessToken, showPdfInNewTab, slug])

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
      <div className="flex h-full flex-col gap-y-0.5">
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
              <FavoriteIcon
                entityId={+slug[0]}
                isFavoriteQuery={isFavoriteQuery}
                type={type}
              />
              <ShareIcon name={data.name} />
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
        <Tabs
          defaultValue={_tabs[type][0].value}
          className=""
          style={{
            paddingBottom:
              typeof window !== "undefined" &&
              document.getElementById("bottom-navigation-buy-box")?.clientHeight
                ? document.getElementById("bottom-navigation-buy-box")
                    ?.clientHeight
                : 0
            // paddingTop:
            //   document.getElementById("mobile-header-navbar")?.clientHeight ?? 0
          }}
        >
          <TabsList className="w-full bg-alpha-white">
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
