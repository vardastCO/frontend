"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { notFound } from "next/navigation"
import { CheckBadgeIcon } from "@heroicons/react/24/solid"
import { digitsEnToFa } from "@persian-tools/persian-tools"
import { UseQueryResult } from "@tanstack/react-query"
import clsx from "clsx"
import { setDefaultOptions } from "date-fns"
import { faIR } from "date-fns/locale"
import { ClientError } from "graphql-request"
import { useQueryState } from "next-usequerystate"

import {
  EntityTypeEnum,
  EventTrackerSubjectTypes,
  EventTrackerTypes,
  GetBrandQuery,
  GetIsFavoriteQuery,
  GetSellerQuery,
  useCreateEventTrackerMutation
} from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import convertToPersianDate from "@core/utils/convertToPersianDate"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@core/components/ui/tabs"
import { toast } from "@core/hooks/use-toast"
import SellerContactModal from "@/app/(public)/(pages)/product/components/seller-contact-modal"
import BuyBoxNavigation from "@/app/(public)/components/BuyBoxNavigation"
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
  type,
  data,
  slug,
  isFavoriteQuery,
  tabs
}: IBrandOrSellerProfile) => {
  if (!data) notFound()
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false)
  const [imageContainerHeight, setImageContainerHeight] = useState(80)
  const [openTabName, setOpenTabName] = useQueryState("tab")
  const productContainerRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState<string>("")

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
      },
      onError: (errors: ClientError) => {
        if (
          errors.response.errors?.find(
            (error) => error.extensions?.code === "FORBIDDEN"
          )
        ) {
          toast({
            description:
              "لطفا برای مشاهده اطلاعات تماس، ابتدا وارد حساب کاربری خود شوید.",
            duration: 8000,
            variant: "default"
          })
        } else {
          toast({
            description: (
              errors.response.errors?.at(0)?.extensions
                .displayErrors as string[]
            ).map((error) => error),
            duration: 8000,
            variant: "default"
          })
        }
      }
    }
  )
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
    <>
      <SellerContactModal
        data={data}
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
      />
      <div className="flex h-full flex-col gap-y-0.5">
        <div className="flex flex-col gap-y bg-alpha-white px py-5">
          <div className="grid grid-cols-9 items-center justify-center">
            <div className="flex h-full flex-col justify-start">
              <FavoriteIcon
                entityId={+slug[0]}
                isFavoriteQuery={isFavoriteQuery}
                type={type}
              />
              <ShareIcon name={data.name} />
            </div>
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
            <div></div>
          </div>
        </div>
        {data.bio && (
          <div className="flex flex-col items-start bg-alpha-white p-6">
            <h4>معرفی</h4>
            {<p className="pt-6 text-justify">{data.bio}</p>}
          </div>
        )}
        <Tabs
          value={activeTab}
          onValueChange={(value) => {
            if (value === tabs[0].value) {
              setOpenTabName(null)
              setActiveTab(value)
              return
            }
            setOpenTabName(value)
          }}
          className="h-full"
        >
          <TabsList className="w-full bg-alpha-white">
            {tabs.map(({ title, value }) => (
              <TabsTrigger
                key={value}
                className={clsx("bg-alpha-white !pb-2 !pt-4 font-semibold ")}
                style={{
                  width: `${100 / tabs.length}%`
                }}
                value={value}
              >
                {title}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map(({ Content, className, ...props }) => (
            <TabsContent
              className={clsx("flex-1", className)}
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
