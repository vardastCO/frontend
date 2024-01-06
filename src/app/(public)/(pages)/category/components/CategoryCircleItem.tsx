import { useState } from "react"
import Image from "next/image"
import clsx from "clsx"

import { Category } from "@/generated"

import remToPixels from "@core/utils/remToPixel"
import Link from "@core/components/shared/Link"
import { ICategoryListLoader } from "@/app/(public)/(pages)/category/components/CategoryListLoader"

type Props = {
  width: number
  data: Category
}

export default function CategoryCircleItem({ width, data }: Props) {
  const [selectedItemId, setSelectedItemId] =
    useState<ICategoryListLoader>(null)

  return (
    <Link
      onClick={() => {
        setSelectedItemId(data.id)
      }}
      href={`/category/${data.id}/${data.title}`}
      className={clsx(
        "flex h-full flex-shrink-0 flex-col justify-start gap-y-4 pl-5"
      )}
      style={{
        width
      }}
    >
      <div
        style={{
          height: width - remToPixels(1.25)
        }}
        className={clsx(
          "relative  w-full rounded-full border border-alpha-400 bg-alpha-50 p-1",
          selectedItemId === data.id ? "border-2 border-primary" : ""
        )}
      >
        <Image
          src={
            data?.imageCategory
              ? data?.imageCategory[0]?.file.presignedUrl?.url
              : `/images/categories/1.png`
          }
          alt="category"
          fill
          className="rounded-xl object-cover"
        />
      </div>
      <h5 className="relative z-20 whitespace-pre-wrap bg-opacity-60 text-center font-semibold">
        {data.title}
      </h5>
    </Link>
  )
}
