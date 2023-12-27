"use client"

import { useCallback, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Session } from "next-auth"

import {
  EntityTypeEnum,
  GetBrandQuery,
  GetIsFavoriteQuery,
  IndexProductInput
} from "@/generated"

import axiosApis from "@core/clients/axiosApis"
import Link from "@core/components/shared/Link"
import { Button } from "@core/components/ui/button"
import { getBrandQueryFn } from "@core/queryFns/brandQueryFns"
import { getIsFavoriteQueryFns } from "@core/queryFns/getIsFavoriteQueryFns"
import QUERY_FUNCTIONS_KEY from "@core/queryFns/queryFunctionsKey"
import BrandOrSellerProfile, {
  BrandOrSellerProfileTab,
  TabTitleWithExtraData
} from "@/app/(public)/components/BrandOrSellerProfile"
import ProductList from "@/app/(public)/components/product-list"

interface BrandProfile {
  isMobileView: boolean
  slug: Array<string | number>
  args: IndexProductInput
  session: Session | null
}

export enum BrandProfileTabEnum {
  // eslint-disable-next-line no-unused-vars
  PRODUCT = "PRODUCT",
  // eslint-disable-next-line no-unused-vars
  CATEGORY = "CATEGORY",
  // eslint-disable-next-line no-unused-vars
  PRICE_LIST = "PRICE_LIST",
  // eslint-disable-next-line no-unused-vars
  CATALOG = "CATALOG"
}

const BrandProfile = ({ isMobileView, args, slug, session }: BrandProfile) => {
  const [pdfViewLoading, setPdfViewLoading] = useState(false)

  const query = useQuery<GetBrandQuery>(
    [QUERY_FUNCTIONS_KEY.BRAND_QUERY_KEY, { id: +slug[0] }],
    () => getBrandQueryFn(+slug[0]),
    {
      keepPreviousData: true
    }
  )

  const isFavoriteQuery = useQuery<GetIsFavoriteQuery>(
    [
      QUERY_FUNCTIONS_KEY.GET_IS_FAVORITE,
      {
        accessToken: session?.accessToken,
        entityId: +slug[0],
        type: EntityTypeEnum.Brand
      }
    ],
    () =>
      getIsFavoriteQueryFns({
        accessToken: session?.accessToken,
        entityId: +slug[0],
        type: EntityTypeEnum.Brand
      }),
    {
      keepPreviousData: true,
      enabled: !!session
    }
  )

  const showPdfInNewTab = useCallback(
    async ({ uuid = "" }: { uuid: string }) => {
      setPdfViewLoading(true)
      const response = await axiosApis.servePdf({
        access_token: session?.accessToken,
        uuid
      })
      if (response.data) {
        setPdfViewLoading(false)
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

  const tabs: BrandOrSellerProfileTab[] = [
    {
      value: BrandProfileTabEnum.PRODUCT,
      title: (
        <TabTitleWithExtraData
          title="کالاها"
          total={query.data?.brand.total as number}
        />
      ),
      Content: () => {
        return (
          <ProductList
            args={args}
            hasFilter={false}
            isMobileView={isMobileView}
            selectedCategoryIds={args["categoryIds"] || undefined}
            sellerId={+slug[0]}
          />
        )
      }
    },
    {
      value: BrandProfileTabEnum.CATEGORY,
      title: <TabTitleWithExtraData title="دسته‌بندی‌ها" />,
      Content: () => <></>
    },
    {
      value: BrandProfileTabEnum.PRICE_LIST,
      title: (
        <TabTitleWithExtraData
          title="لیست قیمت"
          createdDate={query.data?.brand.priceList?.createdAt}
        />
      ),
      Content: () => (
        <div className="flex h-full w-full flex-col items-center justify-start gap-y-7 px pt-14">
          {query.data?.brand.priceList?.uuid ? (
            <>
              {session?.accessToken ? (
                <>
                  <h4 className="px-6 text-center">
                    فایل PDF لیست قیمت را می توانید از گزینه زیر مشاهده نمایید.
                  </h4>
                  <Button
                    loading={pdfViewLoading}
                    className="btn btn-primary flex items-center justify-center"
                    onClick={() => {
                      const uuid = query.data?.brand.priceList?.uuid
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
                    برای مشاهده لیست قیمت، لطفا ابتدا وارد حساب کاربری خود شوید.
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
      value: BrandProfileTabEnum.CATALOG,
      title: (
        <TabTitleWithExtraData
          title="کاتالوگ"
          createdDate={query.data?.brand.catalog?.createdAt}
        />
      ),
      Content: () => (
        <div className="flex h-full w-full flex-col items-center justify-start gap-y-7 px pt-14">
          {query.data?.brand.catalog?.uuid ? (
            <>
              {session?.accessToken ? (
                <>
                  <h4 className="px-6 text-center">
                    فایل PDF کاتالوگ را می توانید از گزینه زیر مشاهده نمایید.
                  </h4>
                  <Button
                    loading={pdfViewLoading}
                    className="btn btn-primary flex items-center justify-center"
                    onClick={() => {
                      const uuid = query?.data?.brand.catalog?.uuid
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
                    برای مشاهده کاتالوگ، لطفا ابتدا وارد حساب کاربری خود شوید.
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

  return (
    <BrandOrSellerProfile
      isFavoriteQuery={isFavoriteQuery}
      type={EntityTypeEnum.Brand}
      data={query.data?.brand}
      slug={slug}
      tabs={tabs}
    />
  )
}

export default BrandProfile
