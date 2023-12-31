import Image from "next/image"
import { MapPinIcon } from "@heroicons/react/24/outline"
import { digitsEnToFa } from "@persian-tools/persian-tools"

import { Seller } from "@/generated"

import Link from "@core/components/shared/Link"
import Rating from "@/app/(public)/components/Rating"

interface SellerCardProps {
  seller: Seller
}

const SellerCard = ({ seller }: SellerCardProps) => {
  const onLoadingCompletedImage = () => {
    const div =
      typeof window !== "undefined" &&
      document?.getElementById(`seller-image-${seller.id}`)
    if (div) {
      div.className = div.className + " opacity-100"
    }
  }

  return (
    <div className="relative px transition hover:z-10 md:h-auto md:hover:shadow-lg">
      <Link
        href={`/seller/${seller.id}/${seller.name}`}
        prefetch={false}
        className="flex h-full w-full rounded-xl bg-alpha-white lg:px-4"
      >
        <div className="grid flex-1 grid-cols-3 gap-4 lg:flex lg:flex-col">
          <div
            id={`seller-image-${seller.id}`}
            className={`relative w-32 flex-shrink-0 bg-[url('/images/blank.png')] bg-[length:2em] bg-center bg-no-repeat align-middle duration-1000 ease-out lg:h-48 lg:w-full ${
              seller.logoFile?.presignedUrl.url ? "opacity-0" : ""
            }`}
          >
            {seller.logoFile?.presignedUrl.url ? (
              <Image
                src={seller.logoFile?.presignedUrl.url as string}
                alt={seller.name}
                fill
                sizes="(max-width: 640px) 33vw, 10vw"
                className="object-contain"
                loading="eager"
                onLoadingComplete={onLoadingCompletedImage}
                onError={onLoadingCompletedImage}
              />
            ) : (
              <Image
                src={"/images/seller-blank.png"}
                alt={seller.name}
                fill
                sizes="(max-width: 640px) 33vw, 10vw"
                className="object-contain"
                loading="eager"
              />
            )}
          </div>
          <div className="lg:col-span1 col-span-2 flex flex-1 flex-col items-start gap-2 border-r p-2 sm:border-r-0 md:gap-0">
            <h4 title={seller.name} className="font-bold text-alpha-800">
              {seller.name}
            </h4>
            <p className="text-primary-500">
              {seller?.total ? `${digitsEnToFa(seller?.total)} محصول` : ""}
            </p>
            <div className="flex items-center gap-x-2 text-alpha-600">
              <MapPinIcon className="h-4 w-4 text-alpha-600" />
              {seller.addresses.length > 0 && seller.addresses[0].province.name}
            </div>
            {seller.rating && seller?.rating > 0 ? (
              <Rating rating={seller.rating} />
            ) : (
              ""
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default SellerCard
