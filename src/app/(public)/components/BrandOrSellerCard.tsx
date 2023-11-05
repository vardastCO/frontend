import Image from "next/image"
import Link from "next/link"
import { MapPinIcon } from "@heroicons/react/24/outline"
import { StarIcon } from "@heroicons/react/24/solid"
import { digitsEnToFa } from "@persian-tools/persian-tools"

import { Brand, Seller } from "@/generated"

const BrandOrSellerCard = <T extends Seller | Brand>({
  content
}: {
  content: T
}) => {
  const onLoadingCompletedImage = () => {
    const div = document.getElementById(`content-image-${content?.id}`)
    if (div) {
      div.className = div.className + " opacity-100"
    }
  }

  return (
    <Link
      href={`/${content.__typename?.toLowerCase()}/${content?.id}?title=${content?.name}`}
      prefetch={false}
      className="relative overflow-hidden rounded bg-alpha-white transition hover:z-10 md:h-auto md:rounded-none md:hover:shadow-lg"
    >
      <div className="flex h-full w-full flex-col lg:px-4">
        <div className="grid flex-1 grid-rows-7 gap-2 lg:flex lg:flex-col">
          <div
            id={`content-image-${content?.id}`}
            className={`relative row-span-4 flex-shrink-0 bg-[url('/images/blank.png')] bg-[length:2em] bg-center bg-no-repeat align-middle duration-1000 ease-out lg:h-48 lg:w-full ${
              content?.logoFile?.presignedUrl.url ? "opacity-0" : ""
            }`}
          >
            {content?.logoFile?.presignedUrl.url ? (
              <Image
                src={content?.logoFile?.presignedUrl.url as string}
                alt={content?.name}
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
                alt={content?.name}
                fill
                sizes="(max-width: 640px) 33vw, 10vw"
                className="object-contain"
                loading="eager"
              />
            )}
          </div>
          <div className="row-span-3 grid grid-rows-1 gap-1 p-2">
            <h5
              title={content?.name}
              className="line-clamp-2 h-10 font-semibold text-alpha-800"
            >
              {content?.name}
            </h5>
            <p className="flex h-5 items-center gap-x-2 text-alpha-600">
              {content?.addresses?.length > 0 &&
                content.addresses[0].province.name && (
                  <>
                    <MapPinIcon className="h-4 w-4 text-alpha-600" />
                    <>{content.addresses[0].province.name}</>
                  </>
                )}
            </p>
            <div className="flex items-center justify-between">
              <p className="text-sm text-primary-500">{`${digitsEnToFa(
                (content as Brand).products
                  ? (content as Brand).products?.length
                  : (content as Seller).offers.length
              )} کالا`}</p>
              {content.rating && content.rating > 0 ? (
                <div className="flex items-center gap-x-0.5 bg-warning-50 p-0.5 py-1 text-xs">
                  <span>{digitsEnToFa(+`${content.rating}`)}</span>
                  <StarIcon className="h-4 w-4 text-warning-500" />
                </div>
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

export default BrandOrSellerCard
