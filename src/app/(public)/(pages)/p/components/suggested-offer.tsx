"use client"

import { useState } from "react"
import Link from "next/link"
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools"
import { IconBuildingWarehouse, IconMapPin } from "@tabler/icons-react"
import { formatDistanceToNow, setDefaultOptions } from "date-fns"
import { faIR } from "date-fns/locale"

import { Price, Uom } from "@/generated"

import { Button } from "@core/components/ui/button"
import SellerContactModal from "@/app/(public)/(pages)/p/components/seller-contact-modal"

type SuggestedOfferProps = {
  offersCount: number
  offer: Price
  uom: Uom
}

const SuggestedOffer = ({ offersCount, offer, uom }: SuggestedOfferProps) => {
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false)
  const hasDiscount = false
  setDefaultOptions({
    locale: faIR,
    weekStartsOn: 6
  })

  return (
    <>
      <SellerContactModal
        seller={offer.seller}
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
      />
      <div className="rounded-md border border-gray-200 p-4 lg:mt-auto">
        <div className="mb-2 flex items-center gap-2 md:mb-4">
          <span className="tag tag-warning tag-light text-sm md:text-base">
            بهترین قیمت
          </span>
          {offersCount > 1 && (
            <Link
              href="#sellers"
              scroll={false}
              className="mr-auto text-sm font-semibold text-brand-600"
            >
              +{digitsEnToFa(offersCount - 1)} فروشنده دیگر
            </Link>
          )}
        </div>
        <div className="divide-y divide-gray-200">
          <div className="flex items-start gap-2.5 py-3">
            <IconBuildingWarehouse
              className="h-8 w-8 text-gray-400"
              stroke={1.5}
            />
            <div className="flex flex-col items-start gap-1.5">
              <div className="font-bold text-gray-700">{offer.seller.name}</div>
              <div className="flex items-center gap-6 text-sm">
                {offer.seller.addresses &&
                  offer.seller.addresses.length > 0 && (
                    <div className="flex items-center gap-1 text-gray-500">
                      <IconMapPin
                        className="h-4 w-4 text-gray-400"
                        stroke={1.5}
                      />
                      {offer.seller.addresses.at(0)?.city.name}
                    </div>
                  )}
                {/* TODO */}
                {/* <div className="flex items-center gap-1">
              <span className="text-gray-500">عملکرد</span>
              <span className="font-bold text-emerald-500">
                عالی
              </span>
            </div> */}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-3">
            <div className="flex flex-col items-start justify-between gap-2 md:flex-row lg:items-center">
              <div>
                <span className="mt-2 inline-block font-semibold text-gray-600">
                  قیمت فروشنده
                </span>
                <div className="mt-1 text-xs text-gray-600 md:mt-2 lg:text-left">
                  <span>آخرین به‌روز رسانی قیمت:</span>{" "}
                  <span>
                    {digitsEnToFa(
                      formatDistanceToNow(new Date(offer.createdAt).getTime(), {
                        addSuffix: true
                      })
                    )}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-stretch justify-between text-gray-800">
                <div className="flex items-start gap-2">
                  {hasDiscount && (
                    <div className="mt-2 rounded bg-red-500 px-2 py-1.5 text-center text-sm font-semibold leading-none text-white">
                      {digitsEnToFa(15)}%
                    </div>
                  )}
                  <div>
                    <span className="text-xs leading-none text-gray-600">
                      قیمت هر {uom.name}
                    </span>
                    <div className="flex items-center gap-1 leading-none">
                      <span className="text-lg font-semibold leading-none">
                        {digitsEnToFa(addCommas(offer.amount || 0))}
                      </span>
                      <span className="text-sm leading-none">تومان</span>
                    </div>
                    <div className="mt-2 flex-1">
                      {hasDiscount && (
                        <span className="text-sm text-gray-500 line-through">
                          {digitsEnToFa(addCommas(offer.amount || 0))}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:mr-auto">
              <Button
                size="medium"
                fullWidth
                onClick={() => setContactModalOpen(true)}
              >
                خرید از {offer.seller.name}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SuggestedOffer
