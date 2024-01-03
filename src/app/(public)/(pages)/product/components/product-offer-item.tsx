"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { MapPinIcon } from "@heroicons/react/24/outline"
import { DevicePhoneMobileIcon, PhoneIcon } from "@heroicons/react/24/solid"
import { digitsEnToFa } from "@persian-tools/persian-tools"
import { formatDistanceToNow } from "date-fns"
import { ClientError } from "graphql-request"
import { useSession } from "next-auth/react"

import {
  ContactInfoTypes,
  EventTrackerSubjectTypes,
  EventTrackerTypes,
  Offer,
  Uom,
  useCreateEventTrackerMutation
} from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import CardAvatar from "@core/components/shared/CardAvatar"
import Link from "@core/components/shared/Link"
import { Button } from "@core/components/ui/button"
import { Dialog, DialogContent, DialogHeader } from "@core/components/ui/dialog"
import { toast } from "@core/hooks/use-toast"
import { AddressItem } from "@/app/(public)/(pages)/product/components/seller-contact-modal"
import PriceTitle from "@/app/(public)/components/PriceTitle"
import Rating from "@/app/(public)/components/Rating"

type Props = {
  offer: Offer
  uom: Uom
  hasContactButton?: boolean
}

const ProductOfferItem = ({ hasContactButton, offer, uom }: Props) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const session = useSession()

  const tel = offer.seller?.contacts.find(
    (phone) => phone.type === ContactInfoTypes.Tel
  )
  const mobile = offer.seller?.contacts.find(
    (phone) => phone.type === ContactInfoTypes.Mobile
  )

  const createEventTrackerMutation = useCreateEventTrackerMutation(
    graphqlRequestClient,
    {
      onSuccess: () => {
        setOpen(true)
      },
      onError: (errors: ClientError) => {
        if (
          errors.response.errors?.find(
            (error) => error.extensions?.code === "FORBIDDEN"
          )
        ) {
          // toast({
          //   description:
          //     "لطفا برای مشاهده اطلاعات تماس، ابتدا وارد حساب کاربری خود شوید.",
          //   duration: 8000,
          //   variant: "default"
          // })
          console.log("redirect to login for FORBIDDEN contact visit")

          router.push("/auth/signin")
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

  const showSellerContact = () => {
    if (!!session.data) {
      createEventTrackerMutation.mutate({
        createEventTrackerInput: {
          type: EventTrackerTypes.ViewOffer,
          subjectType: EventTrackerSubjectTypes.ContactInfo,
          subjectId: offer.seller?.contacts?.at(0)?.id || 0,
          url: window.location.href
        }
      })
      return
    }
    router.push("/auth/signin")
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader className="border-b pb">
            <CardAvatar
              url={offer.seller?.logoFile?.presignedUrl.url as string}
              name={offer.seller?.name || ""}
            />
          </DialogHeader>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 py-4">
              <div className="flex items-center justify-center rounded-lg bg-alpha-100 p">
                <DevicePhoneMobileIcon className="h-6 w-6 text-primary" />
              </div>
              <div className="flex divide-x divide-alpha-200">
                {mobile ? (
                  <Link
                    href={`tel:+98${mobile.code ? +mobile.code : ""}${
                      mobile.number
                    }`}
                    dir="ltr"
                    className="font-semibold"
                  >
                    {mobile?.country?.phonePrefix &&
                      mobile?.code &&
                      mobile?.number &&
                      // mobile?.ext &&
                      digitsEnToFa(`${mobile.code}-${mobile.number}`)}
                  </Link>
                ) : (
                  "-"
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 py-4">
              <div className="flex items-center justify-center rounded-lg bg-alpha-100 p">
                <PhoneIcon className="h-6 w-6 text-primary" />
              </div>
              <div className="flex divide-x divide-alpha-200">
                {tel ? (
                  <Link
                    href={`tel:+98${tel.code ? +tel.code : ""}${tel.number}`}
                    dir="ltr"
                    className="font-semibold"
                  >
                    {tel?.country?.phonePrefix &&
                      tel?.code &&
                      tel?.number &&
                      // tel?.ext &&
                      digitsEnToFa(`${tel.code}-${tel.number}`)}
                  </Link>
                ) : (
                  "-"
                )}
              </div>
            </div>

            {offer.seller?.addresses &&
              offer.seller?.addresses.length > 0 &&
              offer.seller?.addresses.map(
                ({ address, latitude, longitude, id }) => (
                  <AddressItem
                    key={id}
                    address={{
                      address,
                      latitude,
                      longitude
                    }}
                  />
                )
              )}
          </div>
        </DialogContent>
      </Dialog>
      <div className="flex flex-col items-start py">
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
                  {!hasContactButton && (
                    <Button
                      onClick={showSellerContact}
                      size="small"
                      variant="secondary"
                    >
                      اطلاعات تماس
                    </Button>
                  )}
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
