"use client"

import { Dispatch } from "react"
import { MapIcon, PhoneIcon } from "@heroicons/react/24/solid"
import { digitsEnToFa } from "@persian-tools/persian-tools"
import { SetStateAction } from "jotai"
import { parsePhoneNumber } from "libphonenumber-js"

import CardAvatar from "@core/components/shared/CardAvatar"
import Link from "@core/components/shared/Link"
import { Dialog, DialogContent, DialogHeader } from "@core/components/ui/dialog"
import {
  BrandQuery,
  SellerQuery
} from "@/app/(public)/components/BrandOrSellerProfile"

type SellerContactModalProps = {
  open: boolean
  onOpenChange: Dispatch<SetStateAction<boolean>>
  data?: SellerQuery | BrandQuery
}

const SellerContactModal = ({
  open,
  onOpenChange,
  data
}: SellerContactModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <CardAvatar
            url={data?.logoFile?.presignedUrl.url as string}
            name={data?.name || ""}
          />
        </DialogHeader>
        {/* <div className="flex items-center gap-2.5 rounded-md bg-alpha-50 p-4">
          <LucideWarehouse
            className="hidden h-8 w-8 text-alpha-400 md:block"
            strokeWidth={1.5}
          />
          <div className="flex flex-col items-start gap-1.5">
            <div className="font-bold text-alpha-700">{data?.name}</div>
            <div className="flex items-center gap-6 text-sm">
              {data?.addresses && data?.addresses.length > 0 && (
                <div className="flex items-center gap-1 text-alpha-500">
                  <LucideMapPin
                    className="h-4 w-4 text-alpha-400"
                    strokeWidth={1.5}
                  />
                  {data?.addresses.at(0)?.city.name}
                </div>
              )}
              <div className="flex items-center gap-1">
              <span className="text-alpha-500">عملکرد</span>
              <span className="font-bold text-emerald-500">عالی</span>
            </div>
            </div>
          </div>
        </div> */}
        <div className="flex flex-col divide-y divide-alpha-200">
          {data?.contacts && data?.contacts.length > 0 && (
            <div className="flex items-center gap-2 py-4">
              <div className="flex items-center justify-center rounded-lg bg-alpha-100 p">
                <PhoneIcon className="h-6 w-6 text-primary" />
              </div>
              <div className="flex divide-x divide-alpha-200">
                {data?.contacts.map((contact) => (
                  <Link
                    key={contact.number}
                    href="tel:+989124204964"
                    dir="ltr"
                    className="font-semibold"
                    // className="text-right text-xl font-bold leading-none text-blue-500"
                  >
                    {digitsEnToFa(
                      parsePhoneNumber(
                        `+${contact?.country.phonePrefix}${contact?.number}`
                      )?.formatNational()
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {data?.addresses &&
            data?.addresses.length > 0 &&
            data?.addresses.map(
              (address) =>
                address?.latitude &&
                address?.longitude && (
                  <div key={address.id} className="flex flex-col">
                    <div className="flex items-center gap-2 py-4">
                      <div className="flex items-center justify-center rounded-lg bg-alpha-100 p">
                        <MapIcon className="h-6 w-6 text-primary" />
                      </div>
                      <p className="text-justify font-semibold">
                        {address.address}
                      </p>
                    </div>
                    <div className="flex justify-end">
                      <Link
                        href={`https://www.google.com/maps/search/?api=1&query=${data?.addresses.at(
                          0
                        )?.latitude},${address?.longitude}`}
                        target="_blank"
                        className="text-left text-lg font-semibold text-info"
                        prefetch={false}
                      >
                        نمایش روی نقشه
                      </Link>
                    </div>
                  </div>
                )
            )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SellerContactModal
