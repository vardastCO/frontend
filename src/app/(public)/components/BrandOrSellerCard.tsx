import Image from "next/image"
import { MapPinIcon } from "@heroicons/react/24/outline"
import { digitsEnToFa } from "@persian-tools/persian-tools"

import { Brand, Seller } from "@/generated"

import Link from "@core/components/shared/Link"
import Rating from "@/app/(public)/components/Rating"

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
      href={`/${content.__typename?.toLowerCase()}/${content?.id}?title=${
        content.name
      }`}
      prefetch={false}
      className="relative overflow-hidden rounded bg-alpha-white transition hover:z-10 md:h-auto md:rounded-none md:hover:shadow-lg"
    >
      <div className="flex h-full w-full flex-col lg:px-4">
        <div className="grid flex-1 grid-rows-7 lg:flex lg:flex-col">
          <div
            id={`content-image-${content?.id}`}
            className={`relative row-span-4 flex-shrink-0 bg-center bg-no-repeat align-middle duration-1000 ease-out lg:h-48 lg:w-full ${
              content?.logoFile?.presignedUrl.url ? "opacity-0" : ""
            }`}
          >
            {content?.logoFile?.presignedUrl.url ? (
              <Image
                src={content.logoFile.presignedUrl.url as string}
                alt={content.name}
                fill
                sizes="(max-width: 640px) 33vw, 10vw"
                className=""
                loading="eager"
                onLoadingComplete={onLoadingCompletedImage}
                onError={onLoadingCompletedImage}
              />
            ) : (
              <Image
                src={"/images/blank.png"}
                alt={content.name}
                fill
                sizes="(max-width: 640px) 33vw, 10vw"
                className="object-contain"
                loading="eager"
              />
            )}
          </div>
          <div className="row-span-3 grid grid-rows-1 gap-y-1 p-2">
            <h6
              title={content.name}
              className="line-clamp-2 h-8 font-semibold text-alpha-800"
            >
              {content.name}
            </h6>
            <p className="flex h-4 items-center gap-x-1 py-1 text-xs text-alpha-600">
              {content?.addresses?.length > 0 &&
                content.addresses[0].province.name && (
                  <>
                    <MapPinIcon className="h-3 w-3 text-alpha-600" />
                    <>{content.addresses[0].province.name}</>
                  </>
                )}
            </p>
            <div className="flex items-center justify-between">
              <p className="text-xs text-primary-500">{`${digitsEnToFa(
                (content as Brand).products
                  ? (content as Brand).products?.length
                  : (content as Seller).offers.length
              )} کالا`}</p>
              {content.rating && content.rating > 0 ? (
                <Rating rating={content.rating} />
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
