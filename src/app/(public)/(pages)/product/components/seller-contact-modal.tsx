"use client"

import { Dispatch } from "react"
import { digitsEnToFa } from "@persian-tools/persian-tools"
import { SetStateAction } from "jotai"
import { parsePhoneNumber } from "libphonenumber-js"
import { LucideMapPin, LucidePhone, LucideWarehouse } from "lucide-react"

import Link from "@core/components/shared/Link"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@core/components/ui/dialog"
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
          <DialogTitle>اطلاعات تماس {data?.name}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-2.5 rounded-md bg-alpha-50 p-4">
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
              {/* TODO */}
              {/* <div className="flex items-center gap-1">
              <span className="text-alpha-500">عملکرد</span>
              <span className="font-bold text-emerald-500">عالی</span>
            </div> */}
            </div>
          </div>
        </div>
        <div className="flex flex-col divide-y divide-alpha-200">
          {data?.contacts && data?.contacts.length > 0 && (
            <div className="flex items-stretch gap-2 py-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-green-500 text-white">
                <LucidePhone className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-sm font-medium leading-none text-alpha-500">
                  تلفن تماس
                </span>
                <Link
                  href="tel:+989124204964"
                  dir="ltr"
                  className="text-right text-xl font-bold leading-none text-blue-500"
                >
                  {digitsEnToFa(
                    parsePhoneNumber(
                      `+${data?.contacts.at(0)?.country
                        .phonePrefix}${data?.contacts.at(0)?.number}`
                    )?.formatNational()
                  )}
                </Link>
              </div>
            </div>
          )}

          {data?.addresses &&
            data?.addresses.length > 0 &&
            data?.addresses.at(0)?.latitude &&
            data?.addresses.at(0)?.longitude && (
              <div className="flex items-stretch gap-2 py-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-cyan-500 text-white">
                  <LucideMapPin className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col gap-4">
                  <span className="text-sm font-medium leading-none text-alpha-500">
                    موقعیت مکانی
                  </span>
                  <Link
                    href={`https://www.google.com/maps/search/?api=1&query=${data?.addresses.at(
                      0
                    )?.latitude},${data?.addresses.at(0)?.longitude}`}
                    target="_blank"
                    className="font-bold leading-none text-blue-500"
                    prefetch={false}
                  >
                    موقعیت مکانی روی نقشه گوگل
                  </Link>
                </div>
              </div>
            )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SellerContactModal