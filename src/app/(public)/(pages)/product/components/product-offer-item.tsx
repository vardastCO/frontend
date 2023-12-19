"use client"

import { useState } from "react"
import Image from "next/image"
import { MapPinIcon } from "@heroicons/react/24/outline"
import { setDefaultOptions } from "date-fns"
import { faIR } from "date-fns/locale"

import {
  EventTrackerSubjectTypes,
  EventTrackerTypes,
  Offer,
  Uom,
  useCreateEventTrackerMutation
} from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import Link from "@core/components/shared/Link"
import { Button } from "@core/components/ui/button"
import SellerContactModal from "@/app/(public)/(pages)/product/components/seller-contact-modal"
import PriceTitle from "@/app/(public)/components/PriceTitle"
import Rating from "@/app/(public)/components/Rating"

type Props = {
  offer: Offer
  uom: Uom
}

const ProductOfferItem = ({ offer, uom }: Props) => {
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false)
  setDefaultOptions({
    locale: faIR,
    weekStartsOn: 6
  })
  const createEventTrackerMutation = useCreateEventTrackerMutation(
    graphqlRequestClient,
    {
      onSuccess: () => {
        setContactModalOpen(true)
      }
    }
  )

  const showSellerContact = () => {
    createEventTrackerMutation.mutate({
      createEventTrackerInput: {
        type: EventTrackerTypes.ViewOffer,
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
      <div className="flex flex-col items-start p">
        {offer.seller.rating && offer.seller.rating > 0 ? (
          <Rating rating={offer.seller.rating} />
        ) : (
          ""
        )}
        <div className="flex w-full items-center gap-x-3">
          <div className="flex flex-1 items-center gap-3">
            <div className="relative">
              <Image
                src={offer?.seller.logoFile?.presignedUrl.url as string}
                // src="/images/frame.png"
                width={100}
                height={100}
                alt={offer?.seller.name}
                className="rounded-xl bg-white object-contain shadow-md"
              />
            </div>
            <div className="flex flex-1 flex-col gap-y-3">
              <Link
                className="text-info"
                href={`/seller/${offer?.seller.id}/${offer?.seller.name}`}
              >
                {offer?.seller.name}
              </Link>
              {offer?.seller?.addresses &&
                offer?.seller?.addresses.length > 0 && (
                  <p className="flex items-center gap-x-2 text-alpha-600">
                    <MapPinIcon className="h-4 w-4 text-alpha-600" />
                    {offer?.seller?.addresses[0].province.name}
                  </p>
                )}
              {offer.lastPublicConsumerPrice && (
                <div className="flex justify-between gap-x">
                  <Button
                    size="small"
                    variant="secondary"
                    onClick={() => showSellerContact()}
                    disabled={createEventTrackerMutation.isLoading}
                    loading={createEventTrackerMutation.isLoading}
                  >
                    اطلاعات تماس
                  </Button>
                  <PriceTitle price={offer.lastPublicConsumerPrice.amount} />
                </div>
              )}
              {uom.name && (
                <div className="flex justify-end text-xs text-alpha-500">
                  هر {uom.name}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductOfferItem
