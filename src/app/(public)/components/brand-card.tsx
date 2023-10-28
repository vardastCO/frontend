import Image from "next/image"
import Link from "next/link"
import { digitsEnToFa } from "@persian-tools/persian-tools"

import { Brand } from "@/generated"

interface BrandCardProps {
  brand: Brand
}

const BrandCard = ({ brand }: BrandCardProps) => {
  const onLoadingCompletedImage = () => {
    const div = document.getElementById(`brand-image-${brand?.id}`)
    if (div) {
      div.className = div.className + " opacity-100"
    }
  }

  return (
    <div className="relative px transition hover:z-10 md:hover:shadow-lg">
      <Link
        href={`/brand/${brand?.id}?title=${brand?.name}`}
        prefetch={false}
        className="flex h-full w-full rounded-xl bg-alpha-white lg:px-4"
      >
        <div className="grid flex-1 grid-cols-3 gap-4 lg:flex lg:flex-col">
          <div
            id={`brand-image-${brand?.id}`}
            className={`relative w-32 flex-shrink-0 bg-[url('/images/blank.png')] bg-[length:2em] bg-center bg-no-repeat align-middle duration-1000 ease-out lg:h-48 lg:w-full ${
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
          <div className="lg:col-span1 col-span-2 flex flex-1 flex-col gap-2 border-r p-2 sm:border-r-0 md:gap-0">
            <h4 title={brand?.name} className="font-bold text-alpha-800">
              {brand?.name}
            </h4>
            <p className="text-primary-500">{`${digitsEnToFa(
              brand?.products?.length
            )} محصول`}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default BrandCard
