"use client"

import { useState } from "react"
import { setDefaultOptions } from "date-fns"
import { faIR } from "date-fns/locale"
import { ClientError } from "graphql-request"

import {
  EventTrackerSubjectTypes,
  EventTrackerTypes,
  Price,
  Uom,
  useCreateEventTrackerMutation
} from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import { toast } from "@core/hooks/use-toast"
import SellerContactModal from "@/app/(public)/(pages)/product/components/seller-contact-modal"
import BuyBoxNavigation from "@/app/(public)/components/BuyBoxNavigation"

type SuggestedOfferProps = {
  offersCount: number
  offer: Price
  uom: Uom
}

// eslint-disable-next-line no-unused-vars
const SuggestedOffer = ({ offer, uom }: SuggestedOfferProps) => {
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false)
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

  const showSellerContact = () => {
    createEventTrackerMutation.mutate({
      createEventTrackerInput: {
        type: EventTrackerTypes.ViewBuyBox,
        subjectType: EventTrackerSubjectTypes.ContactInfo,
        subjectId: offer.seller.contacts?.at(0)?.id || 0,
        url: window.location.href
      }
    })
  }

  return (
    <>
      <SellerContactModal
        data={offer.seller}
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
      />
      <BuyBoxNavigation
        title="اطلاعات تماس برترین فروشنده"
        actionButtonProps={{
          onClick: showSellerContact,
          disabled: createEventTrackerMutation.isLoading,
          loading: createEventTrackerMutation.isLoading
        }}
      />
      {/* <ProductSectionContainer title="برترین فروشنده">
        <div className="flex w-full flex-col gap-y-4 rounded-2xl border bg-alpha-50 p">
          <div className="flex">
            {offer.seller.rating && offer.seller.rating > 0 ? (
              <Rating rating={offer.seller.rating} />
            ) : (
              ""
            )}
          </div>
          <div className="grid grid-cols-3 items-center">
            <div className="relative flex h-full flex-col justify-start">
              {offer.seller?.isBlueTik && (
                <CheckBadgeIcon className="absolute right-0 top-0 h-6 w-6 -translate-y-1 translate-x-1 text-info" />
              )}
              <Image
                src={
                  !!offer?.seller.logoFile?.presignedUrl.url
                    ? `${offer?.seller.logoFile?.presignedUrl.url}`
                    : ""
                }
                // src="/images/frame.png"
                width={100}
                height={100}
                alt={offer?.seller.name}
                className="rounded-xl bg-white object-contain shadow-md"
              />
            </div>
            <div className="col-span-2 flex flex-col">
              <Link
                className="h-8 truncate text-info"
                href={`/seller/${offer?.seller.id}/${offer?.seller.name}`}
              >
                {offer?.seller.name}
              </Link>
              <div className="flex justify-between">
                <p className="flex h-8 items-center gap-x-2 text-alpha-600">
                  {offer?.seller?.addresses &&
                    offer?.seller?.addresses.length > 0 && (
                      <>
                        <MapPinIcon className="h-4 w-4 text-alpha-600" />
                        {offer?.seller?.addresses[0].province.name}
                      </>
                    )}
                </p>
                <h2 className="h-8 font-bold"></h2>
              </div>
              <div className="flex justify-between">
                <h2 className="h-8 font-bold"></h2>
                <PriceTitle price={offer?.amount} />
              </div>
              {uom.name && (
                <div className="flex justify-end text-xs text-alpha-500">
                  هر {uom.name}
                </div>
              )}
            </div>
          </div>
          <hr className="h-px w-full rounded-full bg-alpha-200" />
          <Button
            size="large"
            block
            onClick={() => showSellerContact()}
            disabled={createEventTrackerMutation.isLoading}
            loading={createEventTrackerMutation.isLoading}
          >
            اطلاعات تماس
          </Button>
        </div>
      </ProductSectionContainer> */}
    </>
  )
}

export default SuggestedOffer
