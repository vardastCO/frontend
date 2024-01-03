import Image from "next/image"
import { digitsEnToFa } from "@persian-tools/persian-tools"

import { Brand } from "@/generated"

import Link from "@core/components/shared/Link"
import Rating from "@/app/(public)/components/Rating"

interface BrandCardProps {
  brand: Brand
}

const BrandCard = ({ brand }: BrandCardProps) => {
  const onLoadingCompletedImage = () => {
    const div =
      typeof window !== "undefined" &&
      document?.getElementById(`brand-image-${brand?.id}`)
    if (div) {
      div.className = div.className + " opacity-100"
    }
  }

  return (
    <Link
      href={`/brand/${brand?.id}/${brand?.name}`}
      prefetch={false}
      className="relative overflow-hidden rounded bg-alpha-white transition hover:z-10 md:h-auto md:rounded-none md:hover:shadow-lg"
    >
      <div className="flex h-full w-full flex-col lg:px-4">
        <div className="grid flex-1 grid-rows-5 gap-2 lg:flex lg:flex-col">
          <div
            id={`brand-image-${brand?.id}`}
            className={`relative row-span-3 flex-shrink-0 bg-[url('/images/blank.png')] bg-[length:2em] bg-center bg-no-repeat align-middle duration-1000 ease-out lg:h-48 lg:w-full ${
              brand?.logoFile?.presignedUrl.url ? "opacity-0" : ""
            }`}
          >
            {brand?.logoFile?.presignedUrl.url ? (
              <Image
                src={brand?.logoFile?.presignedUrl.url as string}
                alt={brand?.name}
                fill
                sizes="(max-width: 640px) 33vw, 10vw"
                className="object-contain"
                loading="eager"
                onLoadingComplete={onLoadingCompletedImage}
                onError={onLoadingCompletedImage}
              />
            ) : (
              <Image
                src={"/images/blank.png"}
                alt={brand?.name}
                fill
                sizes="(max-width: 640px) 33vw, 10vw"
                className="object-contain"
                loading="eager"
              />
            )}
          </div>
          <div className="row-span-2 grid grid-rows-1 gap-1 p-2">
            <h5
              title={brand?.name}
              className="line-clamp-2 h-10 font-semibold text-alpha-800"
            >
              {brand?.name}
            </h5>
            <div className="flex items-center justify-between">
              <p className="text-sm text-primary-500">{`${digitsEnToFa(
                brand?.products?.length
              )} کالا`}</p>
              {brand.rating && brand.rating > 0 ? (
                <Rating rating={brand.rating} />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default BrandCard
