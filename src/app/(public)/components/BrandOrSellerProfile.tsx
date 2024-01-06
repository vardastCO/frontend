"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { notFound } from "next/navigation"
import { MapPinIcon } from "@heroicons/react/24/outline"
import { CheckBadgeIcon } from "@heroicons/react/24/solid"
import { digitsEnToFa } from "@persian-tools/persian-tools"
import { UseQueryResult } from "@tanstack/react-query"
import clsx from "clsx"
import { setDefaultOptions } from "date-fns"
import { faIR } from "date-fns/locale"
import { useQueryState } from "next-usequerystate"

import {
  EntityTypeEnum,
  GetBrandQuery,
  GetIsFavoriteQuery,
  GetSellerQuery
} from "@/generated"

import convertToPersianDate from "@core/utils/convertToPersianDate"
import {
  Segments,
  SegmentsContent,
  SegmentsList,
  SegmentsListItem
} from "@core/components/ui/segment"
import FavoriteIcon from "@/app/(public)/components/FavoriteIcon"
import ShareIcon from "@/app/(public)/components/ShareIcon"

export type BrandOrSellerProfileTab = {
  value: string
  title: JSX.Element
  Content: () => JSX.Element
  className?: string | undefined
}
export type SellerQuery = GetSellerQuery["seller"]
export type BrandQuery = GetBrandQuery["brand"]

interface IBrandOrSellerProfile {
  slug: Array<string | number>
  type: EntityTypeEnum.Brand | EntityTypeEnum.Seller
  data?: SellerQuery | BrandQuery
  isFavoriteQuery: UseQueryResult<GetIsFavoriteQuery, unknown>
  tabs: BrandOrSellerProfileTab[]
  isMobileView: boolean
}

export const TabTitleWithExtraData = ({
  total,
  title = "",
  createdDate
}: {
  total?: number
  createdDate?: string
  title: string
}) => {
  return (
    <div className="flex items-center justify-center gap-x-2">
      <span className="font-semibold">{title}</span>
      {total ? (
        <span className="text-xs">({digitsEnToFa(total)})</span>
      ) : createdDate ? (
        <span className="text-xs">
          ({digitsEnToFa(convertToPersianDate(createdDate))})
        </span>
      ) : (
        <span className="text-xs">{"(-)"}</span>
      )}
    </div>
  )
}

const BrandOrSellerProfile = ({
  type,
  data,
  slug,
  isFavoriteQuery,
  tabs,
  isMobileView
}: IBrandOrSellerProfile) => {
  if (!data) notFound()
  const [imageContainerHeight, setImageContainerHeight] = useState(80)
  const [openTabName, setOpenTabName] = useQueryState("tab")
  const productContainerRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState<string>("")

  setDefaultOptions({
    locale: faIR,
    weekStartsOn: 6
  })

  useEffect(() => {
    setActiveTab(openTabName || tabs[0].value)
    const div = productContainerRef.current
    if (div) {
      setImageContainerHeight(div.clientWidth)
    }
  }, [openTabName, tabs])

  const isSellerQuery = () => type === EntityTypeEnum.Seller

  return (
    <div className="flex h-full flex-col md:flex-row">
      <div className="flex flex-col justify-start md:w-1/3">
        <div className="flex flex-col gap-y bg-alpha-white px py-5">
          <div className="grid grid-cols-9 items-center justify-center">
            <div></div>
            <div className="col-span-7 flex flex-col items-center justify-center py-5">
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
              <div className="flex flex-col items-center py">
                <p>{data.name}</p>
                <p className="flex h-4 items-center gap-x-1 py-1 text-xs text-alpha-600">
                  {data?.addresses?.length > 0 &&
                    data.addresses[0].city.name && (
                      <>
                        <MapPinIcon className="h-3 w-3 text-alpha-600" />
                        {data.addresses[0].city.name}
                      </>
                    )}
                </p>
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
      </div>
      {data.bio && (
        <div className="flex flex-col items-start bg-alpha-white p-6">
          <h4>معرفی</h4>
          <p className="pt-6 text-justify">{data.bio}</p>
        </div>
      )}
      <Segments
        value={activeTab}
        onValueChange={(value) => {
          if (value === tabs[0].value) {
            setOpenTabName(null)
            setActiveTab(value)
            return
          }
          setOpenTabName(value)
        }}
        className="sticky left-0 right-0 top-0 h-full bg-alpha-white md:mt md:w-full"
      >
        <SegmentsList className="border-b px pb">
          {tabs.map(({ title, value }) => (
            <SegmentsListItem
              key={value}
              noStyle
              className={clsx("no-select")}
              value={value}
              style={{
                width:
                  !isMobileView || tabs.length > 3
                    ? "auto"
                    : `${100 / tabs.length}%`
              }}
            >
              <>
                <div
                  className={clsx(
                    "mx-1 cursor-pointer rounded-full border bg-alpha-white px-4 py-2.5 text-sm",
                    value === activeTab
                      ? "border-primary bg-primary text-alpha-white"
                      : "border-alpha-300"
                  )}
                >
                  {title}
                </div>
              </>
            </SegmentsListItem>
          ))}
        </SegmentsList>
        {tabs.map(({ Content, className, ...props }) => (
          <SegmentsContent
            className={clsx("flex-1", className)}
            key={props.value}
            value={props.value}
          >
            <Content />
          </SegmentsContent>
        ))}
      </Segments>
    </div>
  )
}

export default BrandOrSellerProfile
