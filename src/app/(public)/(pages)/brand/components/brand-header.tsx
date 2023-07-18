import Image from "next/image"

import { Brand } from "@/generated"

type BrandHeaderProps = {
  brand: Brand
}

const BrandHeader = ({ brand }: BrandHeaderProps) => {
  return (
    <div className="mb-12 flex items-end gap-6">
      <div className="relative h-28 w-28 rounded-md border border-gray-200">
        <Image
          src="/images/sellers/kasrataps.png"
          fill
          alt="..."
          className="object-contain p-3"
        />
      </div>
      <div className="flex flex-col items-start gap-2">
        <h1 className="text-xl font-bold text-gray-800">{brand.name}</h1>
        <div className="flex items-center gap-6 text-sm text-gray-500">
          کالاهای ثبت شده با این برند
        </div>
      </div>
    </div>
  )
}

export default BrandHeader
