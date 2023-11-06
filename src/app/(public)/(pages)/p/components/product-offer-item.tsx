"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPinIcon } from "@heroicons/react/24/outline"
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools"
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
import { Button } from "@core/components/ui/button"
import SellerContactModal from "@/app/(public)/(pages)/p/components/seller-contact-modal"
import Rating from "@/app/(public)/components/Rating"

type Props = {
  offer: Offer
  uom: Uom
}

const ProductOfferItem = ({ offer }: Props) => {
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
        seller={offer.seller}
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
      />
      <div className="flex flex-col items-start p">
        {offer.seller.rating && offer.seller.rating > 0 ? (
          <Rating rating={offer.seller.rating} />
        ) : (
          ""
        )}
        <div className="flex items-center gap-x-3">
          <div className="flex flex-1 items-center gap-3">
            <div className="relative">
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
              {offer.lastPublicConsumerPrice && (
                <div className="flex gap-x">
                  <h2 className="font-bold">
                    {digitsEnToFa(
                      addCommas(offer.lastPublicConsumerPrice.amount)
                    )}
                    <span className="text-sm font-medium">تومان</span>
                  </h2>
                  <Button
                    size="small"
                    variant="secondary"
                    block
                    onClick={() => showSellerContact()}
                    disabled={createEventTrackerMutation.isLoading}
                    loading={createEventTrackerMutation.isLoading}
                  >
                    اطلاعات تماس
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col flex-wrap items-start gap-3 rounded-md p-4 md:flex-row lg:items-center">
        <div className="flex items-center gap-2.5 py-3">
          <LucideWarehouse
            className="hidden h-8 w-8 text-alpha-400 md:block"
            strokeWidth={1.5}
          />
          <div className="flex flex-col items-start gap-1.5">
            <Link
              href={`/seller/${offer.seller.id}/${slugify(offer.seller.name)}`}
              prefetch={false}
            >
              <div className="font-bold text-alpha-700">
                {offer.seller.name}
              </div>
            </Link>
            <div className="flex items-center gap-6 text-sm">
              {offer.seller.addresses && offer.seller.addresses.length > 0 && (
                <div className="flex items-center gap-1 text-alpha-500">
                  <LucideMapPin
                    className="h-4 w-4 text-alpha-400"
                    strokeWidth={1.5}
                  />
                  {offer.seller.addresses.at(0)?.city.name}
                </div>
              )}
            </div>
          </div>
        </div>
        {offer.lastPublicConsumerPrice && (
          <div className="flex w-full flex-col gap-2 md:mr-auto lg:w-auto">
            <div className="flex w-full flex-wrap items-end gap-3 md:mr-auto md:gap-5 lg:w-auto">
              <div className="flex flex-col items-stretch justify-between text-alpha-800">
                <div className="flex flex-col items-start gap-1 md:flex-row md:gap-2">
                  {hasDiscount && (
                    <div className="rounded bg-red-500 px-2 py-1.5 text-center text-sm font-semibold leading-none text-white md:mt-2">
                      {digitsEnToFa(15)}%
                    </div>
                  )}
                  <div>
                    <span className="text-xs leading-none text-alpha-600">
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
                        <span className="text-sm text-alpha-500 line-through">
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
            <div className="mt-2 text-xs text-alpha-600 lg:text-left">
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
      </div> */}
    </>
  )
}

export default ProductOfferItem
