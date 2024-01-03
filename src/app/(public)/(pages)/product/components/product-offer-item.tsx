"use client"

import { useContext, useEffect } from "react"
import Image from "next/image"
import { MapPinIcon } from "@heroicons/react/24/outline"
import { digitsEnToFa } from "@persian-tools/persian-tools"
import { formatDistanceToNow, setDefaultOptions } from "date-fns"
import { faIR } from "date-fns/locale"
import { useSetAtom } from "jotai"

import { EventTrackerTypes, Offer, Uom } from "@/generated"

import Link from "@core/components/shared/Link"
import PriceTitle from "@/app/(public)/components/PriceTitle"
import { PublicContext } from "@/app/(public)/components/public-provider"
import Rating from "@/app/(public)/components/Rating"

type Props = {
  offer: Offer
  uom: Uom
}

const ProductOfferItem = ({ offer, uom }: Props) => {
  const { contactModalDataAtom } = useContext(PublicContext)
  const setContactModalData = useSetAtom(contactModalDataAtom)
  setDefaultOptions({
    locale: faIR,
    weekStartsOn: 6
  })

  useEffect(() => {
    setContactModalData({
      data: offer.seller,
      type: EventTrackerTypes.ViewOffer,
      title: "اطلاعات تماس"
    })
  }, [offer.seller, setContactModalData])

  return (
    <>
      <div className="flex flex-col items-start p">
        {offer.seller.rating && offer.seller.rating > 0 ? (
          <Rating rating={offer.seller.rating} />
        ) : (
          ""
        )}
        <div className="flex w-full items-center gap-x-3">
          <div className="flex flex-1 items-center gap-3">
            <div className="relative h-28 w-28">
              <Image
                src={offer?.seller.logoFile?.presignedUrl.url as string}
                // src="/images/frame.png"
                fill
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
              <div className="flex justify-between gap-x">
                <div>
                  {/* {hasContactButton && (
                        <Button
                          onClick={showSellerContact}
                          loading={createEventTrackerMutation.isLoading}
                          disabled={createEventTrackerMutation.isLoading}
                          size="small"
                          variant="secondary"
                        >
                          اطلاعات تماس
                        </Button>
                      )} */}
                </div>
                {offer.lastPublicConsumerPrice?.amount && (
                  <PriceTitle price={offer.lastPublicConsumerPrice?.amount} />
                )}
              </div>
              {offer.lastPublicConsumerPrice?.amount && uom.name && (
                <div className="flex justify-between text-xs text-alpha-500">
                  <span>
                    {digitsEnToFa(
                      formatDistanceToNow(new Date(offer.createdAt).getTime(), {
                        addSuffix: true
                      })
                    )}
                  </span>
                  <span>هر {uom.name}</span>
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
