"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import clsx from "clsx"

import { Category } from "@/generated"

import remToPixels from "@core/utils/remToPixel"
import Link from "@core/components/shared/Link"
import MobileHomeSection from "@/app/(public)/(pages)/(home)/components/MobileHomeSection"
import { ICategoryListLoader } from "@/app/(public)/(pages)/categories/components/CategoryListLoader"

const MobileHomeCategory = ({ categories }: { categories?: Category[] }) => {
  const [selectedItemId, setSelectedItemId] =
    useState<ICategoryListLoader>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const [slideWidth, setSlideWidth] = useState(0)

  useEffect(() => {
    const slide = sliderRef.current?.children[0]

    if (slide?.clientWidth) {
      setSlideWidth(slide?.clientWidth)
    }
  }, [])

  return (
    <MobileHomeSection bgWhite block title="دسته‌بندی‌ها">
      <div className="overflow-hidden">
        <div
          ref={sliderRef}
          className="hide-scrollbar flex h-full w-full overflow-x-auto pb-7 pr-7"
        >
          {categories?.map(({ title, id, imageCategory }) => (
            <div
              className={`h-full w-[30.1vw] flex-shrink-0 cursor-pointer pl-5`}
              key={id}
            >
              <Link
                onClick={() => {
                  setSelectedItemId(id)
                }}
                href={`/categories/${id}/${title}`}
                className={clsx("flex h-full flex-col justify-start gap-y-4")}
              >
                <div
                  style={{
                    height: slideWidth - remToPixels(1.25)
                  }}
                  className={clsx(
                    "relative  w-full rounded-full border border-alpha-400 bg-alpha-50 p-1",
                    selectedItemId === id ? "border-2 border-primary" : ""
                  )}
                >
                  <Image
                    src={
                      (imageCategory &&
                        (imageCategory[0]?.file.presignedUrl?.url as string)) ??
                      "" ??
                      `/images/categories/${id}.png`
                    }
                    alt="category"
                    fill
                    className="rounded-xl object-cover"
                  />
                </div>
                <h5 className="relative z-20 whitespace-pre-wrap bg-opacity-60 text-center font-semibold">
                  {title}
                </h5>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </MobileHomeSection>
  )
}

export default MobileHomeCategory
