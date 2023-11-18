import { forwardRef, Ref, useState } from "react"
import Image from "next/image"
import { MapPinIcon } from "@heroicons/react/24/outline"
import { digitsEnToFa } from "@persian-tools/persian-tools"

import { Brand, Seller } from "@/generated"

import Link from "@core/components/shared/Link"
import Rating, { RatingSkeleton } from "@/app/(public)/components/Rating"

export const BrandOrSellerCardSkeleton = () => {
  const [ratio, setRatio] = useState(1 / 1)

  return (
    <div className="relative overflow-hidden rounded bg-alpha-white transition hover:z-10 md:h-auto md:rounded-none md:hover:shadow-lg">
      <div className="flex h-full w-full flex-col lg:px-4">
        <div className="grid flex-1 grid-rows-7 items-start lg:flex lg:flex-col">
          <div
            className={`relative row-span-4 flex flex-shrink-0 transform flex-col items-center justify-center bg-center bg-no-repeat align-middle transition-all duration-1000 ease-out`}
          >
            <div className="w-full">
              <Image
                src={"/images/frameLess.png"}
                alt="skeleton"
                width={400}
                height={400 / ratio}
                layout="fixed"
                onLoadingComplete={({ naturalWidth, naturalHeight }) => {
                  setRatio(naturalWidth / naturalHeight)
                }}
                objectFit="contain"
                className="animated-card"
              />
            </div>
          </div>
          <div className="row-span-3 grid grid-rows-1 gap-y-1 p-2">
            <h6 className="animated-card line-clamp-2 h-8 font-semibold text-alpha-800"></h6>
            <p className="animated-card flex h-4 items-center gap-x-1 py-1 text-xs text-alpha-600"></p>
            <div className=" flex items-center justify-between">
              <p className="animated-card h-full w-10 text-xs text-primary-500"></p>
              <RatingSkeleton />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const BrandOrSellerCard = forwardRef(
  <T extends Seller | Brand>(
    {
      content
    }: {
      content: T
    },
    ref: Ref<HTMLAnchorElement> | undefined
  ) => {
    const onLoadingCompletedImage = () => {
      const div = document.getElementById(`content-image-${content?.id}`)
      if (div) {
        div.className = div.className + " opacity-100"
      }
    }

    return (
      <Link
        ref={ref}
        href={`/${content.__typename?.toLowerCase()}/${content?.id}?title=${
          content.name
        }`}
        prefetch={false}
        className="relative overflow-hidden rounded bg-alpha-white transition hover:z-10 md:h-auto md:rounded-none md:hover:shadow-lg"
      >
        <div className="flex h-full w-full flex-col lg:px-4">
          <div className="grid flex-1 grid-rows-7 items-start lg:flex lg:flex-col">
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
                  sizes="100vw"
                  style={{
                    width: "100%",
                    height: "auto"
                  }}
                  width={125}
                  height={125}
                  onLoadingComplete={onLoadingCompletedImage}
                />
              ) : (
                <Image
                  src={"/images/blank.png"}
                  alt={content.name}
                  sizes="100vw"
                  style={{
                    width: "100%",
                    height: "auto"
                  }}
                  width={125}
                  height={125}
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
)

export default BrandOrSellerCard
