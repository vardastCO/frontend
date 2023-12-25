"use client"

import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react"
import Image from "next/image"
import { notFound } from "next/navigation"
import { CheckBadgeIcon } from "@heroicons/react/24/solid"
import { digitsEnToFa } from "@persian-tools/persian-tools"
import { UseQueryResult } from "@tanstack/react-query"
import clsx from "clsx"
import { setDefaultOptions } from "date-fns"
import { faIR } from "date-fns/locale"
import { Session } from "next-auth"

import {
  EntityTypeEnum,
  EventTrackerSubjectTypes,
  EventTrackerTypes,
  GetBrandQuery,
  GetIsFavoriteQuery,
  GetSellerQuery,
  IndexProductInput,
  useCreateEventTrackerMutation
} from "@/generated"

import axiosApis from "@core/clients/axiosApis"
import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import convertToPersianDate from "@core/utils/convertToPersianDate"
import Link from "@core/components/shared/Link"
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

const TabTitleWithExtraData = ({
  total,
  title = "",
  createdDate
}: {
  total?: number
  createdDate?: string
  title: string
}) => {
  return (
    <div className="flex flex-col items-center gap-y-2">
      <span>{title}</span>
      {total ? (
        <span className="text-xs">({digitsEnToFa(total)})</span>
      ) : createdDate ? (
        <span className="text-xs">
          ({digitsEnToFa(convertToPersianDate(createdDate))})
        </span>
      ) : (
        <span className="text-xs">{"_"}</span>
      )}
    </div>
  )
}

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
  const productContainerRef = useRef<HTMLDivElement>(null)

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
        title: ReactNode
        Content: React.FC
      }>
    > = {
      [EntityTypeEnum.Seller]: [
        {
          value: "product",
          title: (
            <TabTitleWithExtraData
              title="کالاها"
              total={data.total as number}
            />
          ),
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
          title: <TabTitleWithExtraData title="دسته‌بندی‌ها" />,

          Content: () => <></>
        },
        {
          value: "brand",
          title: <TabTitleWithExtraData title="برند‌ها" />,
          Content: () => <></>
        }
      ],
      [EntityTypeEnum.Brand]: [
        {
          value: "product",
          title: (
            <TabTitleWithExtraData
              title="کالاها"
              total={data.total as number}
            />
          ),
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
          title: <TabTitleWithExtraData title="دسته‌بندی‌ها" />,
          Content: () => <></>
        },
        {
          value: "price-list",
          title: (
            <TabTitleWithExtraData
              title="لیست قیمت"
              createdDate={(data as BrandQuery).priceList?.createdAt}
            />
          ),
          Content: () => (
            <div className="flex h-full w-full flex-col items-center justify-start gap-y-7 px pt-14">
              {(data as BrandQuery).priceList?.uuid ? (
                <>
                  {session?.accessToken ? (
                    <>
                      <h4 className="px-6 text-center">
                        فایل PDF لیست قیمت را می توانید از گزینه زیر مشاهده
                        نمایید.
                      </h4>
                      <Button
                        className="btn btn-primary flex items-center justify-center"
                        onClick={() => {
                          const uuid = (data as BrandQuery).priceList?.uuid
                          if (!!uuid) {
                            showPdfInNewTab({ uuid })
                          }
                        }}
                      >
                        <span>مشاهده لیست قیمت</span>
                      </Button>
                    </>
                  ) : (
                    <>
                      <h4 className="px-6 text-center">
                        برای مشاهده لیست قیمت، لطفا ابتدا وارد حساب کاربری خود
                        شوید.
                      </h4>
                      <Link
                        href="/auth/signin"
                        className="btn btn-md btn-secondary block px"
                      >
                        ورود به حساب کاربری
                      </Link>
                    </>
                  )}
                </>
              ) : (
                <>
                  <h4 className="px-6 text-center">
                    در حال حاضر برای این برند، لیست قیمتی آپلود نشده است.
                  </h4>
                </>
              )}
            </div>
          )
        },
        {
          value: "catalog",
          title: (
            <TabTitleWithExtraData
              title="کاتالوگ"
              createdDate={(data as BrandQuery).catalog?.createdAt}
            />
          ),
          Content: () => (
            <div className="flex h-full w-full flex-col items-center justify-start gap-y-7 px pt-14">
              {(data as BrandQuery).catalog?.uuid ? (
                <>
                  {session?.accessToken ? (
                    <>
                      <h4 className="px-6 text-center">
                        فایل PDF لیست قیمت را می توانید از گزینه زیر مشاهده
                        نمایید.
                      </h4>
                      <Button
                        className="btn btn-primary flex items-center justify-center"
                        onClick={() => {
                          const uuid = (data as BrandQuery).catalog?.uuid
                          if (!!uuid) {
                            showPdfInNewTab({ uuid })
                          }
                        }}
                      >
                        <span>مشاهده کاتالوگ</span>
                      </Button>
                    </>
                  ) : (
                    <>
                      <h4 className="px-6 text-center">
                        برای مشاهده کاتالوگ، لطفا ابتدا وارد حساب کاربری خود
                        شوید.
                      </h4>
                      <Link
                        href="/auth/signin"
                        className="btn btn-md btn-secondary block px"
                      >
                        ورود به حساب کاربری
                      </Link>
                    </>
                  )}
                </>
              ) : (
                <h4 className="px-6 text-center">
                  در حال حاضر برای این برند، کاتالوگی آپلود نشده است.
                </h4>
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
          </div>
        </div>
        {data.bio && (
          <div className="flex flex-col items-start bg-alpha-white p-6">
            <h4>معرفی</h4>
            {<p className="pt-6 text-justify">{data.bio}</p>}
          </div>
        )}
        <Tabs
          defaultValue={_tabs[type][0].value}
          className="h-full"
          style={
            {
              // paddingBottom:
              //   typeof window !== "undefined" &&
              //   document.getElementById("bottom-navigation-buy-box")?.clientHeight
              //     ? document.getElementById("bottom-navigation-buy-box")
              //         ?.clientHeight
              //     : 0
              // paddingTop:
              //   document.getElementById("mobile-header-navbar")?.clientHeight ?? 0
            }
          }
        >
          <TabsList className="w-full bg-alpha-white">
            {_tabs[type].map(({ title, value }) => (
              <TabsTrigger
                key={value}
                className={clsx("bg-alpha-white !pb-2 !pt-4 font-semibold ")}
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
            <TabsContent
              className="flex-1 bg-alpha-white"
              key={props.value}
              value={props.value}
            >
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
