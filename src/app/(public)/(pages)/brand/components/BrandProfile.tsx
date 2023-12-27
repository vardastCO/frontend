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
import VocabulariesPage from "@/app/(public)/(pages)/categories/components/VocabulariesPage"
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

type PdfTabItemProps = {
  uuid?: string
  access_token?: string
  isMobileView?: boolean
  title: string
}

const PdfTabItem = ({
  uuid,
  access_token,
  isMobileView,
  title
}: PdfTabItemProps) => {
  const [pdfViewLoading, setPdfViewLoading] = useState(false)

  const showPdfInNewTab = useCallback(
    async ({ uuid = "" }: { uuid: string }) => {
      setPdfViewLoading(true)
      const response = await axiosApis.servePdf({
        access_token,
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
    [isMobileView, access_token]
  )

  return (
    <div className="flex h-full w-full flex-col items-center justify-start gap-y-7 px pt-14">
      {uuid ? (
        access_token ? (
          <>
            <h4 className="px-6 text-center">
              فایل PDF {title} را می توانید از گزینه زیر مشاهده نمایید.
            </h4>
            <Button
              loading={pdfViewLoading}
              className="btn btn-primary flex items-center justify-center"
              onClick={() => {
                showPdfInNewTab({ uuid })
              }}
            >
              <span>مشاهده {title}</span>
            </Button>
          </>
        ) : (
          <>
            <h4 className="px-6 text-center">
              برای مشاهده {title}، لطفا ابتدا وارد حساب کاربری خود شوید.
            </h4>
            <Link
              href="/auth/signin"
              className="btn btn-md btn-secondary block px"
            >
              ورود به حساب کاربری
            </Link>
          </>
        )
      ) : (
        <h4 className="px-6 text-center">
          در حال حاضر، {title}ی آپلود نشده است.
        </h4>
      )}
    </div>
  )
}

const BrandProfile = ({ isMobileView, args, slug, session }: BrandProfile) => {
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
      Content: () => <VocabulariesPage />
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
        <PdfTabItem
          access_token={session?.accessToken}
          isMobileView={isMobileView}
          title="لیست قیمت"
          uuid={query.data?.brand.priceList?.uuid}
        />
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
        <PdfTabItem
          access_token={session?.accessToken}
          isMobileView={isMobileView}
          title="کاتالوگ"
          uuid={query.data?.brand.catalog?.uuid}
        />
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
