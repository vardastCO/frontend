import Image from "next/image"
import Link from "next/link"
import { LucideWarehouse } from "lucide-react"

import { Brand } from "@/generated"

type BrandHeaderProps = {
  brand: Brand
}

const BrandHeader = ({ brand }: BrandHeaderProps) => {
  return (
    <Link href={`/brand/${brand.id}/${brand.name}`}>
      <div className="mb-8 flex items-end gap-2 md:mb-12 md:gap-6">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-md border border-gray-200 bg-gray-50 md:h-28 md:w-28">
          {brand.logoFile ? (
            <Image
              src={brand.logoFile?.presignedUrl.url}
              fill
              alt={brand.name}
              className="object-contain p-3"
            />
          ) : (
            <LucideWarehouse
              className="h-8 w-8 text-gray-400 md:h-10 md:w-10"
              strokeWidth={1.5}
            />
          )}
        </div>
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-base font-bold text-gray-800 md:text-xl">
            {brand.name}
          </h1>
          <div className="flex items-center gap-6 text-xs text-gray-500 md:text-sm">
            کالاهای ثبت شده با این برند
          </div>
        </div>
      </div>
    </Link>
  )
}

export default BrandHeader
