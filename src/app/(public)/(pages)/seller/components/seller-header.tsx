import Image from "next/image"
import { LucideInfo, LucideMapPin, LucideWarehouse } from "lucide-react"

import { Seller } from "@/generated"

import { Button } from "@core/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@core/components/ui/dialog"

type SellerHeaderProps = {
  seller: Seller
}

const SellerHeader = ({ seller }: SellerHeaderProps) => {
  return (
    <div className="mb-8 flex items-end gap-6 md:mb-12">
      <div className="relative flex h-16 w-16 items-center justify-center rounded-md border border-alpha-200 bg-alpha-50 md:h-28 md:w-28">
        {seller.logoFile ? (
          <Image
            src={seller.logoFile.presignedUrl.url}
            fill
            alt={seller.name}
            className="object-contain p-3"
          />
        ) : (
          <LucideWarehouse
            className="h-8 w-8 text-alpha-400 md:h-10 md:w-10"
            strokeWidth={1.5}
          />
        )}
      </div>
      <div className="flex flex-col items-start gap-4">
        <h1 className="text-base font-bold text-alpha-800 md:text-xl">
          {seller.name}
        </h1>
        <div className="flex items-center gap-2 md:gap-6">
          {seller.addresses && seller.addresses.length > 0 && (
            <div className="flex items-center gap-1 text-alpha-500">
              <LucideMapPin
                className="h-4 w-4 text-alpha-400"
                strokeWidth={1.5}
              />
              {seller.addresses.at(0)?.city.name}
            </div>
          )}

          {/* TODO */}
          {/* <div className="flex items-center gap-1">
          <span className="text-alpha-500">عملکرد</span>
          <span className="font-bold text-emerald-500">عالی</span>
        </div> */}
        </div>
      </div>
      {seller.bio && (
        <div className="mr-auto">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary" size="small">
                <LucideInfo className="icon" />
                جزئیات
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>اطلاعات تکمیلی فروشنده</DialogTitle>
              </DialogHeader>
              <div>
                <h3 className="mb-2 font-bold text-alpha-800">معرفی فروشنده</h3>
                <div className="leading-relaxed text-alpha-700">
                  {seller.bio}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  )
}

export default SellerHeader
