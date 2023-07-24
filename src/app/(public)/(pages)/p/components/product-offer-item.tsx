"use client"

import { useState } from "react"
import Link from "next/link"
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools"
import { formatDistanceToNow, setDefaultOptions } from "date-fns"
import { faIR } from "date-fns/locale"
import { LucideMapPin, LucideWarehouse } from "lucide-react"

import {
  EventTrackerSubjectTypes,
  EventTrackerTypes,
  Offer,
  Uom,
  useCreateEventTrackerMutation
} from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import { Button } from "@core/components/ui/button"
import SellerContactModal from "@/app/(public)/(pages)/p/components/seller-contact-modal"

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
  const hasDiscount = false
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
    <div className="flex flex-col flex-wrap items-start gap-3 rounded-md p-4 md:flex-row lg:items-center">
      <SellerContactModal
        seller={offer.seller}
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
      />
      <div className="flex items-center gap-2.5 py-3">
        <LucideWarehouse
          className="hidden h-8 w-8 text-gray-400 md:block"
          strokeWidth={1.5}
        />
        <div className="flex flex-col items-start gap-1.5">
          <Link
            href={`/seller/${offer.seller.id}/${offer.seller.name}`}
            prefetch={false}
          >
            <div className="font-bold text-gray-700">{offer.seller.name}</div>
          </Link>
          <div className="flex items-center gap-6 text-sm">
            {offer.seller.addresses && offer.seller.addresses.length > 0 && (
              <div className="flex items-center gap-1 text-gray-500">
                <LucideMapPin
                  className="h-4 w-4 text-gray-400"
                  strokeWidth={1.5}
                />
                {offer.seller.addresses.at(0)?.city.name}
              </div>
            )}

            {/* TODO */}
            {/* <div className="flex items-center gap-1">
              <span className="text-gray-500">عملکرد</span>
              <span className="font-bold text-emerald-500">عالی</span>
            </div> */}
          </div>
        </div>
      </div>
      {offer.lastPublicConsumerPrice && (
        <div className="flex w-full flex-col gap-2 md:mr-auto lg:w-auto">
          <div className="flex w-full flex-wrap items-end gap-3 md:mr-auto md:gap-5 lg:w-auto">
            <div className="flex flex-col items-stretch justify-between text-gray-800">
              <div className="flex flex-col items-start gap-1 md:flex-row md:gap-2">
                {hasDiscount && (
                  <div className="rounded bg-red-500 px-2 py-1.5 text-center text-sm font-semibold leading-none text-white md:mt-2">
                    {digitsEnToFa(15)}%
                  </div>
                )}
                <div>
                  <span className="text-xs leading-none text-gray-600">
                    قیمت هر {uom.name}
                  </span>
                  <div className="flex items-center gap-1 leading-none">
                    <span className="text-lg font-semibold leading-none">
                      {digitsEnToFa(
                        addCommas(offer.lastPublicConsumerPrice.amount)
                      )}
                    </span>
                    <span className="text-sm leading-none">تومان</span>
                  </div>
                  {hasDiscount && (
                    <div className="mt-2 flex-1">
                      <span className="text-sm text-gray-500 line-through">
                        {digitsEnToFa(
                          addCommas(offer.lastPublicConsumerPrice.amount)
                        )}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Button
              onClick={() => showSellerContact()}
              className="mr-auto md:mr-0"
              disabled={createEventTrackerMutation.isLoading}
              loading={createEventTrackerMutation.isLoading}
            >
              خرید از این فروشنده
            </Button>
          </div>
          <div className="mt-2 text-xs text-gray-600 lg:text-left">
            <span>آخرین به‌روز رسانی قیمت:</span>{" "}
            <span>
              {digitsEnToFa(
                formatDistanceToNow(
                  new Date(offer.lastPublicConsumerPrice.createdAt).getTime(),
                  {
                    addSuffix: true
                  }
                )
              )}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductOfferItem
