"use client"

import { useContext } from "react"
import {
  DevicePhoneMobileIcon,
  MapIcon,
  PhoneIcon
} from "@heroicons/react/24/solid"
import { digitsEnToFa } from "@persian-tools/persian-tools"
import { useAtom } from "jotai"

import { ContactInfoTypes } from "@/generated"

import CardAvatar from "@core/components/shared/CardAvatar"
import Link from "@core/components/shared/Link"
import { Dialog, DialogContent, DialogHeader } from "@core/components/ui/dialog"
import { PublicContext } from "@/app/(public)/components/public-provider"

type SellerContactModalProps = {}

export const AddressItem = ({
  address
}: {
  address: {
    address: string
    longitude: number | null | undefined
    latitude: number | null | undefined
  }
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 py-4">
        <div className="flex items-center justify-center rounded-lg bg-alpha-100 p">
          <MapIcon className="h-6 w-6 text-primary" />
        </div>
        <p className="text-justify font-semibold">{address.address}</p>
      </div>
      {address?.latitude && address?.longitude && (
        <div className="flex justify-end">
          <Link
            href={`https://www.google.com/maps/search/?api=1&query=${address?.latitude},${address?.longitude}`}
            target="_blank"
            className="text-left text-lg font-semibold text-info underline"
            prefetch={false}
          >
            نمایش روی نقشه
          </Link>
        </div>
      )}
    </div>
  )
}

const SellerContactModal = (_: SellerContactModalProps) => {
  const { contactModalVisibilityAtom, contactModalDataAtom } =
    useContext(PublicContext)
  const [open, setOpen] = useAtom(contactModalVisibilityAtom)
  const [{ data }] = useAtom(contactModalDataAtom)

  const tel = data?.contacts.find(
    (phone) => phone.type === ContactInfoTypes.Tel
  )
  const mobile = data?.contacts.find(
    (phone) => phone.type === ContactInfoTypes.Mobile
  )
  // const fax = data?.contacts.find(
  //   (phone) => phone.type === ContactInfoTypes.Fax
  // )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader className="border-b pb">
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
                  className="font-semibold underline"
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
                  className="font-semibold underline"
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
          {/* <div className="flex items-center gap-2 py-4">
            <div className="flex items-center justify-center rounded-lg bg-alpha-100 p">
              <EnvelopeIcon className="h-6 w-6 text-primary" />
            </div>
            <div className="flex divide-x divide-alpha-200">
              {fax ? (
                <Link
                  href="tel:+989124204964"
                  dir="ltr"
                  className="font-semibold"
                >
                  {fax?.country?.phonePrefix &&
                    fax?.code &&
                    fax?.number &&
                    // fax?.ext &&
                    digitsEnToFa(`${fax.code}-${fax.number}`)}
                </Link>
              ) : (
                "-"
              )}
            </div>
          </div> */}

          {data?.addresses &&
            data?.addresses.length > 0 &&
            data?.addresses.map(({ address, latitude, longitude, id }) => (
              <AddressItem
                key={id}
                address={{
                  address,
                  latitude,
                  longitude
                }}
              />
            ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SellerContactModal
