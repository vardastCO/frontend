import { forwardRef, Ref, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { MapPinIcon } from "@heroicons/react/24/outline"
import { digitsEnToFa } from "@persian-tools/persian-tools"

import { Brand, Seller } from "@/generated"

import Link from "@core/components/shared/Link"
import { ICategoryListLoader } from "@/app/(public)/(pages)/categories/components/CategoryListLoader"
import Rating, { RatingSkeleton } from "@/app/(public)/components/Rating"

export const BrandOrSellerCardSkeleton = () => {
  return (
    <div className="relative overflow-hidden rounded bg-alpha-white transition hover:z-10 md:h-auto md:rounded-none md:hover:shadow-lg">
      <div className="flex h-full w-full flex-col lg:px-4">
        <div className="grid flex-1 grid-rows-7 items-start lg:flex lg:flex-col">
          <div
            className={`relative row-span-4 flex flex-shrink-0 transform flex-col items-center justify-center bg-center bg-no-repeat align-middle transition-all duration-1000 ease-out`}
          >
            <div className="relative w-full">
              <Image
                src={"/images/frameLess.png"}
                alt="skeleton"
                fill
                className="animated-card object-contain"
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
      content,
      selectedItemId,
      setSelectedItemId
    }: {
      content: T
      selectedItemId?: ICategoryListLoader
      setSelectedItemId?: (_?: ICategoryListLoader) => void
    },
    ref: Ref<HTMLAnchorElement> | undefined
  ) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [containerWidth, setContainerWidth] = useState(0)

    useEffect(() => {
      const container = containerRef.current

      if (container?.clientWidth) {
        setContainerWidth(container?.clientWidth)
      }
    }, [])

    return (
      <Link
        ref={ref}
        href={`/${content.__typename?.toLowerCase()}/${content?.id}/${
          content.name
        }`}
        onClick={() => {
          setSelectedItemId && setSelectedItemId(content.id)
        }}
        prefetch={false}
        className="relative overflow-hidden rounded bg-alpha-white transition hover:z-10 md:h-auto md:rounded-none md:hover:shadow-lg"
      >
        {content.id === selectedItemId && (
          <div className="absolute left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center bg-alpha-white bg-opacity-50">
            {/* <Loader2Icon className="h-10 w-10 animate-spin text-primary" /> */}
          </div>
        )}
        <div ref={containerRef} className="flex h-full w-full flex-col lg:px-4">
          <div className="grid flex-1 grid-rows-7 items-start lg:flex lg:flex-col">
            <div
              className={`relative row-span-4 w-full transform transition-all lg:w-full`}
              style={{
                height: containerWidth
              }}
            >
              {content?.logoFile?.presignedUrl.url ? (
                <Image
                  src={content.logoFile.presignedUrl.url as string}
                  alt={content.name}
                  fill
                  className="object-contain"
                />
              ) : (
                <Image
                  src={"/images/blank.png"}
                  alt={content.name}
                  fill
                  className="object-contain"
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
                <p className="text-xs text-primary-500">
                  {(content as Brand).products && (content as Brand)?.total
                    ? `${digitsEnToFa((content as Brand).total as number)} کالا`
                    : ""}
                  {!(content as Brand).products && (content as Seller)?.total
                    ? `${digitsEnToFa(
                        (content as Seller).total as number
                      )} کالا`
                    : ""}
                </p>
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
