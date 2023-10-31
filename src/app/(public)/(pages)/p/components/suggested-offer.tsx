"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPinIcon } from "@heroicons/react/24/outline"
import { CheckBadgeIcon, StarIcon } from "@heroicons/react/24/solid"
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools"
import { setDefaultOptions } from "date-fns"
import { faIR } from "date-fns/locale"

import {
  EventTrackerSubjectTypes,
  EventTrackerTypes,
  Price,
  Uom,
  useCreateEventTrackerMutation
} from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import { Button } from "@core/components/ui/button"
import SellerContactModal from "@/app/(public)/(pages)/p/components/seller-contact-modal"

type SuggestedOfferProps = {
  offersCount: number
  offer: Price
  uom: Uom
}

const SuggestedOffer = ({ offer }: SuggestedOfferProps) => {
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false)
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

  const isBLueTick = false

  return (
    <>
      <SellerContactModal
        seller={offer.seller}
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
      />

      <div className="flex flex-col gap-y bg-alpha-white p">
        <h4 className="py">برترین فروشنده</h4>
        <div className="flex flex-col rounded-2xl border bg-alpha-100 p">
          <div className="flex gap-x-2 pb">
            {offer.seller.rating !== undefined &&
              offer.seller.rating !== null &&
              +offer.seller.rating > 0 &&
              digitsEnToFa(+`${offer.seller.rating}`)}
            <StarIcon className="h-5 w-5 text-warning-500" />
          </div>
          <div className="flex items-center gap-x-3">
            <div className="flex flex-1 items-center gap-3">
              <div className="relative">
                {isBLueTick && (
                  <CheckBadgeIcon className="absolute right-0 top-0 h-6 w-6 -translate-y-1 translate-x-1 text-info" />
                )}
                <Image
                  src={
                    !!offer?.seller.logoFile?.presignedUrl
                      ? `${offer?.seller.logoFile?.presignedUrl}`
                      : ""
                  }
                  // src="/images/frame.png"
                  width={100}
                  height={100}
                  alt={offer?.seller.name}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col gap-y-3">
                <Link
                  className="text-info underline"
                  href={`/seller/${offer?.seller.id}/${offer?.seller.name}?title=${offer?.seller.name}`}
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
              </div>
            </div>
            <h2 className="font-bold">
              {digitsEnToFa(addCommas(offer?.amount))}{" "}
              <span className="text-sm font-medium">ریال</span>
            </h2>
          </div>
          <br className="h-1 w-full bg-alpha" />
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
      </div>
    </>
  )
}

export default SuggestedOffer
